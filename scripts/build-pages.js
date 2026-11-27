#!/usr/bin/env node
const fs = require('node:fs')
const path = require('node:path')
const { spawnSync } = require('node:child_process')
const root = path.resolve(__dirname, '..')
const cliRoot = process.env.SASJS_CLI_ROOT ? path.resolve(process.env.SASJS_CLI_ROOT) : path.dirname(require.resolve('@sasjs/cli/package.json'))
const cli = require(path.join(cliRoot, 'package.json'))
const command = path.join(cliRoot, cli.bin.sasjs)
const compiled = spawnSync(process.execPath, [command, 'compile', '-t', 'mock'], { cwd: root, stdio: 'inherit' })
if (compiled.status !== 0) process.exit(compiled.status || 1)
const work = fs.mkdtempSync(path.join(root, '.pages-work-'))
const seed = path.join(work, 'seed')
fs.mkdirSync(seed)
fs.cpSync(path.join(root, 'sasjsbuild/services'), path.join(seed, 'services'), { recursive: true })
const appLoc = '/Public/app/minimal-seed-app'
// The pinned CLI registers every compiled service that carries a JavaScript twin,
// so these files are what the build has to verify: enumerate them rather than
// keeping a second list in step with them. A project that wants a different set
// still ships <syncFolder>/viya-mock-jobs.json, which replaces the derivation.
const mocksRoot = path.join(root, 'sasjs/mocks')
const twins = []
const collectTwins = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) collectTwins(full)
    // the registered path is the service without its extension: JES names it
    else if (entry.name.endsWith('.js')) twins.push(path.relative(mocksRoot, full).split(path.sep).join('/').replace(/\.js$/, ''))
  }
}
collectTwins(mocksRoot)
process.projectDir = root
process.sasjsConstants = { buildDestinationFolder: seed }
process.sasjsConfig = { syncFolder: 'sasjs/mocks' }
process.logger = console
const { buildMockSite } = require(path.join(cliRoot, 'build/commands/build/internal/mockSite/mockSite.js'))
const pages = path.join(root, 'sasjsbuild/pages')
// One definition, written into the page and then looked for when support is
// recorded: a drift between the two would otherwise leave the unsupported
// notice on a page the build calls supported.
const VIYA_NOTICE =
  '<p id="viya-mock-notice" role="alert"><strong>Viya mock unsupported:</strong> this CLI does not register browser job mocks; this demonstration will not work.</p>'
const VIYA_SUPPORTED_NOTICE =
  '<p>Browser mock: registered JavaScript services only; no SAS engine is running.</p>'
async function main() {
  fs.rmSync(pages, { recursive: true, force: true })
  fs.mkdirSync(pages, { recursive: true })
  const targets = [['sasjs', 'SASJS'], ['sas9', 'SAS9'], ['viya', 'SASVIYA']]
  let viyaSupported = false
  for (const [name, type] of targets) {
    const source = name === 'viya' ? path.join(work, 'viya-frontend') : path.join(root, 'src')
    if (name === 'viya') {
      fs.cpSync(path.join(root, 'src'), source, { recursive: true })
      const index = path.join(source, 'index.html')
      let html = fs.readFileSync(index, 'utf8')
      html = html.replace('serverType="SASJS"', 'serverType="SASVIYA"').replace('useComputeApi="true"', 'useComputeApi="false"')
      if (!html.includes('<main>')) throw new Error('the Viya page has no <main> to carry the mock notice')
      html = html.replace('<main>', `<main>${VIYA_NOTICE}`)
      fs.writeFileSync(index, html)
    }
    const output = path.join(pages, name, 'minimal')
    await buildMockSite({ name, serverType: type, appLoc, streamConfig: { webSourcePath: source, mockWebFolder: output, mockWebBasePath: `/${name}/minimal` } })
    if (name === 'viya') {
      const config = JSON.parse(fs.readFileSync(path.join(output, 'host/mock-config.json'), 'utf8'))
      const expected = twins.map((twin) => `${appLoc}/${twin}`)
      viyaSupported = expected.length > 0 && Array.isArray(config.viyaMockJobs) && expected.every((job) => config.viyaMockJobs.includes(job))
      if (viyaSupported) {
        const index = path.join(output, 'index.html')
        const built = fs.readFileSync(index, 'utf8')
        if (!built.includes(VIYA_NOTICE)) throw new Error('the Viya mock notice is missing, so support could not be recorded on the page')
        fs.writeFileSync(index, built.replace(VIYA_NOTICE, VIYA_SUPPORTED_NOTICE))
      }
    }
  }
  fs.mkdirSync(path.join(pages, 'api-console'))
  fs.writeFileSync(path.join(pages, 'api-console/index.html'), '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="refresh" content="0; url=/sasjs/minimal/api-console/"><title>API console moved</title></head><body><a href="/sasjs/minimal/api-console/">Continue to the SASjs API console</a></body></html>')
  fs.writeFileSync(path.join(pages, 'index.html'), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Minimal seed app</title></head><body><main><h1>Minimal seed app mock</h1><p>Select a backend. No SAS engine is running.</p><ul><li><a href="/sasjs/minimal/">SASjs</a></li><li><a href="/sas9/minimal/">SAS 9</a></li><li><a href="/viya/minimal/">Viya${viyaSupported ? '' : ' (unsupported)'}</a> — ${viyaSupported ? 'registered JavaScript mock services' : 'the pinned CLI does not register browser job mocks'}.</li></ul></main></body></html>`)
}
main().catch(error => { console.error(error); process.exitCode = 1 }).finally(() => fs.rmSync(work, { recursive: true, force: true }))

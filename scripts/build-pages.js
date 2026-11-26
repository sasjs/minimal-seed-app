#!/usr/bin/env node
const fs = require('node:fs')
const path = require('node:path')
const { spawnSync } = require('node:child_process')
const root = path.resolve(__dirname, '..')
const cliRoot = process.env.SASJS_CLI_ROOT ? path.resolve(process.env.SASJS_CLI_ROOT) : path.dirname(require.resolve('@sasjs/cli/package.json'))
const cli = require(path.join(cliRoot, 'package.json'))
const command = path.join(cliRoot, cli.bin.sasjs)
const pages = path.join(root, 'sasjsbuild/pages')
async function main() {
  // Keep staging and backup on the same filesystem as the destination.
  fs.mkdirSync(path.dirname(pages), { recursive: true })
  const work = fs.mkdtempSync(path.join(path.dirname(pages), '.pages-work-'))
  let preserveBackup = false
  try {
    // Compile can recreate sasjsbuild, so run it in an isolated project too.
    const project = path.join(work, 'project')
    fs.mkdirSync(project)
    for (const folder of ['sasjs', 'src']) fs.cpSync(path.join(root, folder), path.join(project, folder), { recursive: true })
    fs.copyFileSync(path.join(root, 'package.json'), path.join(project, 'package.json'))
    fs.symlinkSync(path.join(root, 'node_modules'), path.join(project, 'node_modules'), 'dir')
    const compiled = spawnSync(process.execPath, [command, 'compile', '-t', 'mock'], { cwd: project, stdio: 'inherit' })
    if (compiled.error) throw compiled.error
    if (compiled.status !== 0) throw new Error(`Pages compile failed (${compiled.signal || compiled.status})`)
    const seed = path.join(work, 'seed')
    const stagedPages = path.join(work, 'pages')
    fs.mkdirSync(seed)
    fs.cpSync(path.join(project, 'sasjsbuild/services'), path.join(seed, 'services'), { recursive: true })
    fs.copyFileSync(path.join(root, 'sasjs/mocks/viya-mock-jobs.json'), path.join(seed, 'viya-mock-jobs.json'))
    process.projectDir = root
    process.sasjsConstants = { buildDestinationFolder: seed }
    process.sasjsConfig = { syncFolder: 'sasjs/mocks' }
    process.logger = console
    const { buildMockSite } = require(path.join(cliRoot, 'build/commands/build/internal/mockSite/mockSite.js'))
    fs.mkdirSync(stagedPages)
    const targets = [['sasjs', 'SASJS'], ['sas9', 'SAS9'], ['viya', 'SASVIYA']]
    let viyaSupported = false
    for (const [name, type] of targets) {
      const source = name === 'viya' ? path.join(work, 'viya-frontend') : path.join(root, 'src')
      if (name === 'viya') {
        fs.cpSync(path.join(root, 'src'), source, { recursive: true })
        const index = path.join(source, 'index.html')
        let html = fs.readFileSync(index, 'utf8')
        html = html.replace('serverType="SASJS"', 'serverType="SASVIYA"').replace('useComputeApi="true"', 'useComputeApi="false"')
        html = html.replace('<main>', '<main><p id="viya-mock-notice" role="alert"><strong>Viya mock unsupported:</strong> this CLI does not register browser job mocks; this demonstration will not work.</p>')
        fs.writeFileSync(index, html)
      }
      const output = path.join(stagedPages, name, 'minimal')
      await buildMockSite({ name, serverType: type, appLoc: '/Public/app/minimal-seed-app', streamConfig: { webSourcePath: source, mockWebFolder: output, mockWebBasePath: `/${name}/minimal` } })
      if (name === 'viya') {
        const config = JSON.parse(fs.readFileSync(path.join(output, 'host/mock-config.json'), 'utf8'))
        const expected = ['appinit', 'getdata'].map(service => `/Public/app/minimal-seed-app/services/common/${service}`)
        viyaSupported = Array.isArray(config.viyaMockJobs) && expected.every(job => config.viyaMockJobs.includes(job))
        if (viyaSupported) {
          const index = path.join(output, 'index.html')
          fs.writeFileSync(index, fs.readFileSync(index, 'utf8').replace('<p id="viya-mock-notice" role="alert"><strong>Viya mock unsupported:</strong> this CLI does not register browser job mocks; this demonstration will not work.</p>', '<p>Browser mock: registered JavaScript services only; no SAS engine is running.</p>'))
        }
      }
    }
    fs.mkdirSync(path.join(stagedPages, 'api-console'))
    fs.writeFileSync(path.join(stagedPages, 'api-console/index.html'), '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="refresh" content="0; url=/sasjs/minimal/api-console/"><title>API console moved</title></head><body><a href="/sasjs/minimal/api-console/">Continue to the SASjs API console</a></body></html>')
    fs.writeFileSync(path.join(stagedPages, 'index.html'), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Minimal seed app</title></head><body><main><h1>Minimal seed app mock</h1><p>Select a backend. No SAS engine is running.</p><ul><li><a href="/sasjs/minimal/">SASjs</a></li><li><a href="/sas9/minimal/">SAS 9</a></li><li><a href="/viya/minimal/">Viya${viyaSupported ? '' : ' (unsupported)'}</a> — ${viyaSupported ? 'registered JavaScript mock services' : 'the pinned CLI does not register browser job mocks'}.</li></ul></main></body></html>`)
    const backup = path.join(work, 'previous-pages')
    let hadPrevious = false
    try {
      fs.renameSync(pages, backup)
      hadPrevious = true
    } catch (error) {
      if (error.code !== 'ENOENT') throw error
    }
    try {
      fs.renameSync(stagedPages, pages)
    } catch (error) {
      if (hadPrevious) {
        try { fs.renameSync(backup, pages) } catch (rollbackError) {
          preserveBackup = true
          throw new Error(`Could not replace Pages or restore the previous site. Backup retained at ${backup}: ${rollbackError.message}`, { cause: error })
        }
      }
      throw error
    }
  } finally {
    if (!preserveBackup) fs.rmSync(work, { recursive: true, force: true })
  }
}
main().catch(error => { console.error(error); process.exitCode = 1 })

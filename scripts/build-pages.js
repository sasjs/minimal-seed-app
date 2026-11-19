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
process.projectDir = root
process.sasjsConstants = { buildDestinationFolder: seed }
process.sasjsConfig = { syncFolder: 'sasjs/mocks' }
process.logger = console
const { buildMockSite } = require(path.join(cliRoot, 'build/commands/build/internal/mockSite/mockSite.js'))
const pages = path.join(root, 'sasjsbuild/pages')
async function main() {
  fs.rmSync(pages, { recursive: true, force: true })
  fs.mkdirSync(pages, { recursive: true })
  const targets = [['sasjs', 'SASJS'], ['sas9', 'SAS9'], ['viya', 'SASVIYA']]
  for (const [name, type] of targets) {
    const source = name === 'viya' ? path.join(work, 'viya-frontend') : path.join(root, 'src')
    if (name === 'viya') {
      fs.cpSync(path.join(root, 'src'), source, { recursive: true })
      const index = path.join(source, 'index.html')
      let html = fs.readFileSync(index, 'utf8')
      html = html.replace('serverType="SASJS"', 'serverType="SASVIYA"').replace('useComputeApi="true"', 'useComputeApi="false"')
      html = html.replace('<main>', '<main><p role="alert"><strong>Viya mock unsupported:</strong> identity, folders and job execution are not emulated; this demonstration will not work.</p>')
      fs.writeFileSync(index, html)
    }
    await buildMockSite({ name, serverType: type, appLoc: '/Public/app/minimal-seed-app', streamConfig: { webSourcePath: source, mockWebFolder: path.join(pages, name, 'minimal'), mockWebBasePath: `/${name}/minimal` } })
  }
  fs.mkdirSync(path.join(pages, 'api-console'))
  fs.writeFileSync(path.join(pages, 'api-console/index.html'), '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="refresh" content="0; url=/sasjs/minimal/api-console/"><title>API console moved</title></head><body><a href="/sasjs/minimal/api-console/">Continue to the SASjs API console</a></body></html>')
  fs.writeFileSync(path.join(pages, 'index.html'), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Minimal seed app</title></head><body><main><h1>Minimal seed app mock</h1><p>Select a backend. No SAS engine is running.</p><ul><li><a href="/sasjs/minimal/">SASjs</a></li><li><a href="/sas9/minimal/">SAS 9</a></li><li><a href="/viya/minimal/">Viya (unsupported)</a> — identity, folders and job execution are not emulated.</li></ul></main></body></html>`)
}
main().catch(error => { console.error(error); process.exitCode = 1 }).finally(() => fs.rmSync(work, { recursive: true, force: true }))

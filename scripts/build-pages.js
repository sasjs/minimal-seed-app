#!/usr/bin/env node
const fs = require('node:fs')
const path = require('node:path')
const { spawnSync } = require('node:child_process')
const { isMainThread, parentPort, workerData, Worker } = require('node:worker_threads')
const root = path.resolve(__dirname, '..')
const pages = path.join(root, 'sasjsbuild/pages')
const buildDir = path.dirname(pages)
const marker = 'sasjs-pages-swap-v1\n'
let lockWorker

if (!isMainThread) {
  // This thread owns the advisory lock until the main worker exits, including
  // while synchronous CLI compilation blocks the main event loop.
  const fd = fs.openSync(workerData, 'r')
  const lock = spawnSync('flock', ['-n', '-E', '75', '3'], { stdio: ['ignore', 'pipe', 'pipe', fd] })
  if (lock.error || lock.status !== 0) {
    const detail = lock.error ? lock.error.message : lock.status === 75 ? 'another build holds the lock' : `flock failed (${lock.signal || lock.status}): ${lock.stderr.toString().trim()}`
    parentPort.postMessage({ error: detail })
    fs.closeSync(fd)
  } else {
    parentPort.postMessage({ acquired: true })
    parentPort.on('message', () => { fs.closeSync(fd); process.exit(0) })
  }
} else {
  main().catch(error => { console.error(error); process.exitCode = 1 }).finally(() => {
    if (lockWorker) lockWorker.postMessage('release')
  })
}

function acquireLock() {
  return new Promise((resolve, reject) => {
    lockWorker = new Worker(__filename, { workerData: buildDir })
    lockWorker.once('error', reject)
    lockWorker.once('message', result => result.acquired ? resolve() : reject(new Error(`Could not acquire Pages build lock (requires flock): ${result.error}`)))
  })
}

function exists(file) {
  try { fs.lstatSync(file); return true } catch (error) {
    if (error.code === 'ENOENT') return false
    throw error
  }
}

function recoverPreviousPages() {
  const backups = []
  for (const entry of fs.readdirSync(buildDir, { withFileTypes: true })) {
    if (!entry.name.startsWith('.pages-work-') || !entry.isDirectory()) continue
    const work = path.join(buildDir, entry.name)
    const backup = path.join(work, 'previous-pages')
    if (!exists(backup)) continue
    const stamp = path.join(work, 'swap-marker')
    if (!fs.lstatSync(backup).isDirectory() || !exists(stamp) || !fs.lstatSync(stamp).isFile() || fs.readFileSync(stamp, 'utf8') !== marker) {
      throw new Error(`Unrecognised Pages backup at ${backup}; inspect and resolve it manually before rebuilding`)
    }
    backups.push(backup)
  }
  if (!backups.length) return
  if (exists(pages)) {
    console.warn(`Preserving interrupted Pages backups: ${backups.join(', ')}`)
    return
  }
  // Failing closed avoids choosing the wrong version when multiple interrupted
  // or manually moved work directories are present.
  if (backups.length !== 1) {
    throw new Error(`Ambiguous Pages backups: ${backups.join(', ')}. Inspect and resolve them manually before rebuilding`)
  }
  fs.renameSync(backups[0], pages)
  console.warn(`Restored interrupted Pages backup from ${backups[0]}`)
}

async function main() {
  // Directory locking creates no persistent lock file; the kernel releases it
  // if the process is killed. All cooperative Pages builds share this lock.
  fs.mkdirSync(buildDir, { recursive: true })
  await acquireLock()
  recoverPreviousPages()
  const cliRoot = process.env.SASJS_CLI_ROOT ? path.resolve(process.env.SASJS_CLI_ROOT) : path.dirname(require.resolve('@sasjs/cli/package.json'))
  const cli = require(path.join(cliRoot, 'package.json'))
  const command = path.join(cliRoot, cli.bin.sasjs)
  // Keep staging and backup on the same filesystem as the destination.
  const work = fs.mkdtempSync(path.join(buildDir, '.pages-work-'))
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
    fs.writeFileSync(path.join(work, 'swap-marker'), marker, { flag: 'wx' })
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

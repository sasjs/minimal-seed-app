const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { spawn, spawnSync } = require('node:child_process')

const root = path.resolve(__dirname, '..')
const cliRoot = process.env.SASJS_CLI_ROOT ? path.resolve(process.env.SASJS_CLI_ROOT) : path.dirname(require.resolve('@sasjs/cli/package.json'))
const mockSite = path.join(cliRoot, 'build/commands/build/internal/mockSite/mockSite.js')
const supportsManifest = fs.readFileSync(mockSite, 'utf8').includes('viya-mock-jobs.json')

function isolatedProject() {
  const project = fs.mkdtempSync(path.join(os.tmpdir(), 'pages-build-test-'))
  for (const name of ['sasjs', 'scripts', 'src']) fs.cpSync(path.join(root, name), path.join(project, name), { recursive: true })
  fs.copyFileSync(path.join(root, 'package.json'), path.join(project, 'package.json'))
  fs.symlinkSync(path.join(root, 'node_modules'), path.join(project, 'node_modules'), 'dir')
  return project
}

function failedBuildPreservesPages(setup, diagnostic) {
  const project = isolatedProject()
  try {
    const pages = path.join(project, 'sasjsbuild/pages')
    fs.mkdirSync(path.join(pages, 'sasjs/minimal'), { recursive: true })
    fs.writeFileSync(path.join(pages, 'index.html'), 'previous chooser')
    fs.writeFileSync(path.join(pages, 'sasjs/minimal/index.html'), 'previous site')
    const extraEnv = setup(project) || {}

    const result = spawnSync(process.execPath, ['scripts/build-pages.js'], {
      cwd: project, encoding: 'utf8', env: { ...process.env, ...extraEnv }, timeout: 120000
    })
    assert.equal(result.error, undefined)
    assert.notEqual(result.status, 0, 'the build must report failure')
    assert.match(result.stdout + result.stderr, diagnostic)
    assert.equal(fs.readFileSync(path.join(pages, 'index.html'), 'utf8'), 'previous chooser')
    assert.equal(fs.readFileSync(path.join(pages, 'sasjs/minimal/index.html'), 'utf8'), 'previous site')
    assert.deepEqual(fs.readdirSync(path.dirname(pages)), ['pages'], 'failed staging is cleaned up')
  } finally {
    fs.rmSync(project, { recursive: true, force: true })
  }
}

test('a SIGKILL during replacement is recovered before the next failing build', () => {
  const project = isolatedProject()
  try {
    const pages = path.join(project, 'sasjsbuild/pages')
    fs.mkdirSync(pages, { recursive: true })
    fs.writeFileSync(path.join(pages, 'index.html'), 'previous chooser')
    const hook = path.join(project, 'kill-on-rename.cjs')
    fs.writeFileSync(hook, `const fs = require('node:fs')
const path = require('node:path')
const rename = fs.renameSync
fs.renameSync = function (from, to) {
  const result = rename.apply(this, arguments)
  if (from === path.join(process.cwd(), 'sasjsbuild/pages')) process.kill(process.pid, 'SIGKILL')
  return result
}
`)
    const killed = spawnSync(process.execPath, ['scripts/build-pages.js'], {
      cwd: project, encoding: 'utf8', env: { ...process.env, NODE_OPTIONS: `--require=${hook}` }, timeout: 120000
    })
    assert.equal(killed.signal, 'SIGKILL', killed.stdout + killed.stderr)
    assert.equal(fs.existsSync(pages), false, 'the kill hit the rename gap')
    fs.rmSync(path.join(project, 'src/index.html'))
    const retry = spawnSync(process.execPath, ['scripts/build-pages.js'], {
      cwd: project, encoding: 'utf8', env: process.env, timeout: 120000
    })
    assert.notEqual(retry.status, 0, 'the second build should fail')
    assert.match(retry.stdout + retry.stderr, /does not contain an index\.html/)
    assert.equal(fs.readFileSync(path.join(pages, 'index.html'), 'utf8'), 'previous chooser')
  } finally {
    fs.rmSync(project, { recursive: true, force: true })
  }
})

test('a kill after installing the new Pages site permits the next build without deleting the backup', () => {
  const project = isolatedProject()
  try {
    const pages = path.join(project, 'sasjsbuild/pages')
    fs.mkdirSync(pages, { recursive: true })
    fs.writeFileSync(path.join(pages, 'index.html'), 'previous chooser')
    const hook = path.join(project, 'kill-after-install.cjs')
    fs.writeFileSync(hook, `const fs = require('node:fs')
const path = require('node:path')
const rename = fs.renameSync
fs.renameSync = function (from, to) {
  const result = rename.apply(this, arguments)
  if (to === path.join(process.cwd(), 'sasjsbuild/pages') && path.basename(path.dirname(from)).startsWith('.pages-work-')) process.kill(process.pid, 'SIGKILL')
  return result
}
`)
    const killed = spawnSync(process.execPath, ['scripts/build-pages.js'], {
      cwd: project, encoding: 'utf8', env: { ...process.env, NODE_OPTIONS: `--require=${hook}` }, timeout: 120000
    })
    assert.equal(killed.signal, 'SIGKILL', killed.stdout + killed.stderr)
    const backup = fs.readdirSync(path.dirname(pages)).filter(name => name.startsWith('.pages-work-')).map(name => path.join(path.dirname(pages), name, 'previous-pages')).find(fs.existsSync)
    assert.ok(backup, 'kill must leave the old site behind')
    assert.match(fs.readFileSync(path.join(pages, 'index.html'), 'utf8'), /Minimal seed app mock/)
    fs.rmSync(path.join(project, 'src/index.html'))
    const retry = spawnSync(process.execPath, ['scripts/build-pages.js'], { cwd: project, encoding: 'utf8', env: process.env, timeout: 120000 })
    assert.notEqual(retry.status, 0, 'the second build should fail')
    assert.match(retry.stdout + retry.stderr, /does not contain an index\.html/)
    assert.match(fs.readFileSync(path.join(pages, 'index.html'), 'utf8'), /Minimal seed app mock/)
    assert.equal(fs.readFileSync(path.join(backup, 'index.html'), 'utf8'), 'previous chooser')
  } finally {
    fs.rmSync(project, { recursive: true, force: true })
  }
})

test('multiple interrupted backups are left untouched for manual recovery', () => {
  const project = isolatedProject()
  try {
    const buildDir = path.join(project, 'sasjsbuild')
    const backups = ['one', 'two'].map(name => {
      const work = path.join(buildDir, `.pages-work-${name}`)
      const backup = path.join(work, 'previous-pages')
      fs.mkdirSync(backup, { recursive: true })
      fs.writeFileSync(path.join(work, 'swap-marker'), 'sasjs-pages-swap-v1\n')
      fs.writeFileSync(path.join(backup, 'index.html'), name)
      return backup
    })
    const result = spawnSync(process.execPath, ['scripts/build-pages.js'], { cwd: project, encoding: 'utf8', timeout: 120000 })
    assert.notEqual(result.status, 0)
    assert.match(result.stderr, /Ambiguous Pages backups/)
    assert.equal(fs.existsSync(path.join(buildDir, 'pages')), false)
    for (const [index, backup] of backups.entries()) assert.equal(fs.readFileSync(path.join(backup, 'index.html'), 'utf8'), ['one', 'two'][index])
  } finally { fs.rmSync(project, { recursive: true, force: true }) }
})

test('an unrecognised backup is never moved or deleted', () => {
  const project = isolatedProject()
  try {
    const backup = path.join(project, 'sasjsbuild/.pages-work-user/previous-pages')
    fs.mkdirSync(backup, { recursive: true })
    fs.writeFileSync(path.join(backup, 'index.html'), 'user data')
    const result = spawnSync(process.execPath, ['scripts/build-pages.js'], { cwd: project, encoding: 'utf8', timeout: 120000 })
    assert.notEqual(result.status, 0)
    assert.match(result.stderr, /Unrecognised Pages backup/)
    assert.equal(fs.readFileSync(path.join(backup, 'index.html'), 'utf8'), 'user data')
  } finally { fs.rmSync(project, { recursive: true, force: true }) }
})

test('a concurrent build refuses to start while another holds the lock', async () => {
  const project = isolatedProject()
  let holder
  try {
    const buildDir = path.join(project, 'sasjsbuild')
    fs.mkdirSync(buildDir)
    holder = spawn('flock', ['-n', buildDir, process.execPath, '-e', "process.stdout.write('locked\\n'); setInterval(() => {}, 1000)"], { stdio: ['ignore', 'pipe', 'pipe'] })
    await new Promise((resolve, reject) => {
      holder.stdout.once('data', resolve)
      holder.once('error', reject)
      holder.once('exit', code => reject(new Error(`lock holder exited: ${code}`)))
    })
    const result = spawnSync(process.execPath, ['scripts/build-pages.js'], { cwd: project, encoding: 'utf8', timeout: 120000 })
    assert.notEqual(result.status, 0)
    assert.match(result.stderr, /another build holds the lock/)
    assert.deepEqual(fs.readdirSync(buildDir), [])
  } finally {
    if (holder) {
      // flock waits for its child, so terminate the child and let flock exit.
      spawnSync('pkill', ['-TERM', '-P', String(holder.pid)])
      await new Promise(resolve => holder.once('exit', resolve))
    }
    fs.rmSync(project, { recursive: true, force: true })
  }
})

test('a failed Pages build preserves the previous complete artifact', () => {
  // The real mock-site builder rejects a frontend without its entry page.
  failedBuildPreservesPages(project => fs.rmSync(path.join(project, 'src/index.html')), /does not contain an index\.html/)
})

test('an invalid Viya manifest preserves the previous complete artifact', { skip: !supportsManifest && 'CLI does not support Viya manifests' }, () => {
  failedBuildPreservesPages(project => {
    fs.writeFileSync(path.join(project, 'sasjs/mocks/viya-mock-jobs.json'), '["services/common/nonexistent"]')
  }, /viya-mock-jobs\.json must list existing/)
})

test('a failed final rename restores the previous artifact', () => {
  failedBuildPreservesPages(project => {
    const hook = path.join(project, 'fail-rename.cjs')
    fs.writeFileSync(hook, `const fs = require('node:fs')
const path = require('node:path')
const rename = fs.renameSync
fs.renameSync = function (from, to) {
  if (path.basename(from) === 'pages' && path.basename(path.dirname(from)).startsWith('.pages-work-') && to === path.join(process.cwd(), 'sasjsbuild/pages')) {
    throw Object.assign(new Error('injected final rename failure'), { code: 'EIO' })
  }
  return rename.apply(this, arguments)
}
`)
    return { NODE_OPTIONS: `${process.env.NODE_OPTIONS || ''} --require=${hook}` }
  }, /injected final rename failure/)
})

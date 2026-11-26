const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { spawnSync } = require('node:child_process')

const root = path.resolve(__dirname, '..')
const cliRoot = process.env.SASJS_CLI_ROOT ? path.resolve(process.env.SASJS_CLI_ROOT) : path.dirname(require.resolve('@sasjs/cli/package.json'))
const mockSite = path.join(cliRoot, 'build/commands/build/internal/mockSite/mockSite.js')
const supportsManifest = fs.readFileSync(mockSite, 'utf8').includes('viya-mock-jobs.json')

function failedBuildPreservesPages(setup, diagnostic) {
  const project = fs.mkdtempSync(path.join(os.tmpdir(), 'pages-build-test-'))
  try {
    for (const name of ['sasjs', 'scripts', 'src']) {
      fs.cpSync(path.join(root, name), path.join(project, name), { recursive: true })
    }
    fs.copyFileSync(path.join(root, 'package.json'), path.join(project, 'package.json'))
    fs.symlinkSync(path.join(root, 'node_modules'), path.join(project, 'node_modules'), 'dir')
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

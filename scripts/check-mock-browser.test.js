const { test } = require('node:test')
const assert = require('node:assert/strict')
const { spawnSync } = require('node:child_process')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')

const runner = path.join(__dirname, 'check-mock-browser.js')

test('missing browser fails promptly with an actionable error and cleans up', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'seed-browser-test-'))
  try {
    const site = path.join(root, 'sasjsbuild/mock')
    const data = path.join(root, 'sasjs/mocks/services/common')
    fs.mkdirSync(site, { recursive: true })
    fs.mkdirSync(data, { recursive: true })
    fs.writeFileSync(path.join(site, 'index.html'), '<script src="/host/boot.js"></script><sasjs></sasjs>')
    fs.writeFileSync(path.join(data, 'springs.json'), '[{"AREA":"test"}]')
    const binary = path.join(root, 'missing-chromium')
    const result = spawnSync(process.execPath, [runner], {
      cwd: root,
      env: { ...process.env, CHROMIUM_PATH: binary, TMPDIR: root },
      encoding: 'utf8',
      timeout: 5000
    })
    assert.equal(result.error, undefined, 'runner must exit promptly')
    assert.equal(result.status, 1, 'missing browser must fail CI')
    assert.match(result.stderr, /Failed to launch Chromium/)
    assert.ok(result.stderr.includes(binary), 'diagnostic names the binary')
    assert.match(result.stderr, /ENOENT/)
    assert.doesNotMatch(result.stderr, /Unhandled 'error' event/)
    assert.deepEqual(fs.readdirSync(root).filter((name) => name.startsWith('seed-browser-')), [])
  } finally {
    fs.rmSync(root, { recursive: true, force: true })
  }
})

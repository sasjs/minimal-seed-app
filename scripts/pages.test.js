const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const site = path.resolve('sasjsbuild/pages')
test('the Pages root offers the three explicit target URLs', () => {
  assert.ok(fs.existsSync(path.join(site, 'index.html')), 'Pages chooser is built')
  const root = fs.readFileSync(path.join(site, 'index.html'), 'utf8')
  for (const tier of ['sasjs', 'sas9', 'viya']) assert.match(root, new RegExp(`href=["']/${tier}/minimal/["']`))
})
test('each target seed contains the services but not site artifacts', () => {
  for (const tier of ['sasjs', 'sas9', 'viya']) {
    const seed = JSON.parse(fs.readFileSync(path.join(site, tier, 'minimal/host/vfs-seed.json'), 'utf8'))
    const keys = Object.keys(seed.files)
    assert.ok(keys.some(k => k.endsWith('/services/common/getdata.js')), `${tier}: service seeded`)
    assert.ok(!keys.some(k => /\/(pages|viya-frontend|mock)\//.test(k)), `${tier}: no generated site artifacts in seed`)
  }
})
test('the previous API console bookmark points to the SASjs console', () => {
  const page = path.join(site, 'api-console/index.html')
  assert.ok(fs.existsSync(page), 'legacy API console bookmark is retained')
  assert.match(fs.readFileSync(page, 'utf8'), /\/sasjs\/minimal\/api-console\//)
})

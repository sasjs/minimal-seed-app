/*
 * The table parser getdata.js runs on an uploaded `areas` table.
 *
 * It is checked here rather than through the built site, because the site
 * cannot tell a broken parser from a filtered answer: getdata answers the rows
 * whose AREA it recognised, so a row torn in two simply matches nothing and the
 * page draws an empty table. These are the shapes @sasjs/adapter's convertToCSV
 * emits, including the one that used to be mis-split - a quoted value holding a
 * line break.
 *
 * Run: node --test scripts/
 */

const assert = require('node:assert')
const fs = require('fs')
const path = require('path')
const { test } = require('node:test')

const SOURCE = path.resolve(
  __dirname,
  '..',
  'sasjs',
  'mocks',
  'services',
  'common',
  'getdata.js'
)

/* The service is a stored program: a single file with no exports, because that
 * is the shape the host runs. So the parser is taken from the source by its
 * boundaries - if it is renamed or moved, this fails loudly rather than
 * silently testing nothing. */
const loadParser = () => {
  const source = fs.readFileSync(SOURCE, 'utf8')
  const start = source.indexOf('const parseCsv')
  const end = source.indexOf('const wanted')

  assert.ok(start > -1 && end > start, 'parseCsv was not found in getdata.js')

  return new Function(`${source.slice(start, end)}; return parseCsv`)()
}

const parseCsv = loadParser()

test('a plain single-column table', () => {
  assert.deepStrictEqual(parseCsv('area:$char5.\r\nAdak'), [{ AREA: 'Adak' }])
})

test('several rows, CRLF separated', () => {
  assert.deepStrictEqual(parseCsv('area:$char4.\r\nAdak\r\nAdel'), [
    { AREA: 'Adak' },
    { AREA: 'Adel' }
  ])
})

test('several columns keep their order', () => {
  assert.deepStrictEqual(parseCsv('a:$char1. b:best.\r\nx,1\r\ny,2'), [
    { A: 'x', B: '1' },
    { A: 'y', B: '2' }
  ])
})

test('a quoted value with a comma is one value', () => {
  assert.deepStrictEqual(parseCsv('area:$char9.\r\n"Ad,ak"'), [
    { AREA: 'Ad,ak' }
  ])
})

test('a quoted value with a line break is one record', () => {
  assert.deepStrictEqual(parseCsv('area:$char9.\r\n"Ad\nak"'), [
    { AREA: 'Ad\nak' }
  ])
})

test('a quoted line break does not swallow the row after it', () => {
  assert.deepStrictEqual(parseCsv('area:$char9.\r\n"Ad\nak"\r\nAdel'), [
    { AREA: 'Ad\nak' },
    { AREA: 'Adel' }
  ])
})

test('a doubled quote is one quote', () => {
  assert.deepStrictEqual(parseCsv('area:$char6.\r\n"Ad""ak"'), [
    { AREA: 'Ad"ak' }
  ])
})

test('no table is no rows', () => {
  assert.deepStrictEqual(parseCsv(''), [])
  assert.deepStrictEqual(parseCsv('area:$char5.'), [])
})

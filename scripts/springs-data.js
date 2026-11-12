#!/usr/bin/env node
/*
 * Generates `sasjs/mocks/services/common/springs.json` from the seeded
 * dataset in `sasjs/utils/serviceinit.sas`.
 *
 * The SAS services read `mydb.springs`, which `serviceinit.sas` builds from an
 * in-stream datalines block. A mocked build has no SAS, so the JS mock
 * services need the same rows as data. Keeping one source of truth means the
 * mock cannot quietly answer with a dataset the real backend does not have:
 * this script reads the datalines, and `--check` fails when the committed JSON
 * and the SAS differ (the guarded path CI runs).
 *
 * Usage:
 *   node scripts/springs-data.js          # write the JSON
 *   node scripts/springs-data.js --check  # fail if it is out of date
 */

const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname, '..')
const SAS_FILE = path.join(ROOT, 'sasjs', 'utils', 'serviceinit.sas')
const JSON_FILE = path.join(
  ROOT,
  'sasjs',
  'mocks',
  'services',
  'common',
  'springs.json'
)

// The dataset's columns, in the order the datalines supply them.
const COLUMNS = [
  'LATITUDE',
  'LONGITUDE',
  'NAME',
  'AREA',
  'TYPE',
  'FARENHEIT',
  'CELSIUS'
]

/**
 * One datalines record. `infile cards dsd` means comma separated with double
 * quotes around values that contain a comma, and `""` as an embedded quote.
 */
const parseRecord = (line) => {
  const fields = []
  let value = ''
  let quoted = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]

    if (quoted) {
      if (char === '"' && line[i + 1] === '"') {
        value += '"'
        i++
      } else if (char === '"') {
        quoted = false
      } else {
        value += char
      }
    } else if (char === '"') {
      quoted = true
    } else if (char === ',') {
      fields.push(value)
      value = ''
    } else {
      value += char
    }
  }

  fields.push(value)

  return fields
}

/**
 * A numeric field, or null for a missing value. `serviceinit.sas` declares
 * `missing a b c ... z _`, so a single letter (or `.`) is a special missing and
 * %webout renders it as a JSON null.
 */
const parseNumber = (text) => {
  const value = text.trim()

  if (value === '' || value === '.') return null
  if (/^[A-Za-z_]$/.test(value)) return null

  const number = Number(value)
  if (Number.isNaN(number)) {
    throw new Error(`Not a number in the seeded dataset: "${text}"`)
  }

  return number
}

const readSprings = () => {
  const source = fs.readFileSync(SAS_FILE, 'utf8')
  const match = source.match(/datalines4;\r?\n([\s\S]*?)\r?\n;;;;/)

  if (!match) {
    throw new Error(
      `No datalines4 block found in ${path.relative(ROOT, SAS_FILE)}`
    )
  }

  const rows = match[1]
    .split(/\r?\n/)
    .filter((line) => line.trim() !== '')
    .map((line) => {
      const fields = parseRecord(line)

      if (fields.length !== COLUMNS.length) {
        throw new Error(
          `Expected ${COLUMNS.length} fields, found ${fields.length}: ${line}`
        )
      }

      const row = {}
      COLUMNS.forEach((column, index) => {
        row[column] =
          column === 'NAME' || column === 'AREA' || column === 'TYPE'
            ? fields[index]
            : parseNumber(fields[index])
      })

      return row
    })

  if (!rows.length) throw new Error('The seeded dataset is empty')

  return rows
}

/**
 * One row per line, so a change to the source dataset reads as a change to the
 * rows it touched rather than as one enormous line.
 */
const serialise = (rows) =>
  `[\n${rows.map((row) => `  ${JSON.stringify(row)}`).join(',\n')}\n]\n`

const main = () => {
  const check = process.argv.includes('--check')
  const expected = serialise(readSprings())
  const actual = fs.existsSync(JSON_FILE)
    ? fs.readFileSync(JSON_FILE, 'utf8')
    : null

  if (check) {
    if (actual !== expected) {
      console.error(
        `${path.relative(ROOT, JSON_FILE)} is out of date with ` +
          `${path.relative(ROOT, SAS_FILE)}. Run: node scripts/springs-data.js`
      )
      process.exit(1)
    }

    console.log(
      `${path.relative(ROOT, JSON_FILE)} matches ${path.relative(ROOT, SAS_FILE)}`
    )
    return
  }

  if (actual !== expected) {
    fs.writeFileSync(JSON_FILE, expected)
    console.log(
      `Wrote ${JSON.parse(expected).length} rows to ` +
        path.relative(ROOT, JSON_FILE)
    )
  } else {
    console.log(`${path.relative(ROOT, JSON_FILE)} is already up to date`)
  }
}

main()

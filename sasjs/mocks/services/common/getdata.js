/* Minimal Seed App mock: services/common/getdata
 *
 * The JavaScript twin of getdata.sas, for the builds and deployments that run
 * without SAS. `areas` arrives as an uploaded table (the adapter sends an array
 * of rows as CSV, exactly as it does for the SAS service, where %webout(FETCH)
 * builds work.areas from it), and the answer is the matching rows of the seeded
 * dataset as `springs`.
 *
 * The rows come from springs.json beside this file; scripts/springs-data.js
 * generates it from the datalines in sasjs/utils/serviceinit.sas, so the mock
 * cannot answer with a dataset the SAS backend does not have.
 */

const path = require('path')

/* The app location, as src/index.html sends it and the mock target in
 * sasjsconfig.json deploys to. */
const APP_LOC = '/Public/app/minimal-seed-app'

const DRIVE_FILES = path.resolve(weboutPath, '..', '..', '..', 'drive', 'files')
const SPRINGS_FILE = path.join(
  DRIVE_FILES,
  APP_LOC,
  'services',
  'common',
  'springs.json'
)

/* An uploaded table, by name. The host binds one set of _WEBIN_ vars per file:
 * _WEBIN_NAME<n> is the table name, _WEBIN_FILEREF<n> its contents - a string
 * in the browser host, a Buffer on sasjs/server - so both are read as text. */
const getTable = (name) => {
  if (typeof _WEBIN_FILE_COUNT === 'undefined') return ''

  for (let i = 1; i <= _WEBIN_FILE_COUNT; i++) {
    /* direct eval: the _WEBIN_ vars are module-scope consts of the generated
     * program, not properties of globalThis */
    const tableName = eval(
      `typeof _WEBIN_NAME${i} === 'undefined' ? '' : _WEBIN_NAME${i}`
    )
    if (tableName !== name) continue

    return String(eval(`_WEBIN_FILEREF${i}`))
  }

  return ''
}

/* The adapter's table CSV: a header of `name:format.` entries separated by
 * spaces, then one comma separated record per row, values quoted only when they
 * contain a separator or a quote (see convertToCsv in @sasjs/adapter). */
const parseCsv = (csv) => {
  const lines = String(csv || '')
    .split(/\r?\n/)
    .filter((line) => line !== '')

  if (lines.length < 2) return []

  const columns = lines[0]
    .trim()
    .split(/\s+/)
    .map((header) => header.replace(/:.*$/, '').toUpperCase())

  return lines.slice(1).map((line) => {
    const values = []
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
        values.push(value)
        value = ''
      } else {
        value += char
      }
    }

    values.push(value)

    const row = {}
    columns.forEach((column, index) => {
      row[column] = values[index] === undefined ? '' : values[index]
    })

    return row
  })
}

const wanted = new Set(
  parseCsv(getTable('areas')).map((row) => String(row.AREA).trim())
)

const springs = JSON.parse(fs.readFileSync(SPRINGS_FILE, 'utf-8'))

/* proc sql; create table springs as select * from mydb.springs
 *   where area in (select area from work.areas); - dataset order, no sort. */
const rows = springs.filter((row) => wanted.has(row.AREA))

webout('OPEN')
webout('OBJ', 'springs', rows)
webout('CLOSE')

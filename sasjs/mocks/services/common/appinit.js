/* Minimal Seed App mock: services/common/appinit
 *
 * The JavaScript twin of appinit.sas, for the builds and deployments that run
 * without SAS: the `mock` target's browser build, and the JS services the
 * `server` target ships beside the SAS ones.
 *
 * It answers the same webout as the SAS service - the distinct values of AREA
 * in the seeded dataset, as `areas` - so the app renders its dropdown and the
 * screens that follow it without a SAS engine.
 *
 * The rows come from springs.json beside this file, which scripts/springs-data.js
 * generates from the dataset's model - the same seven columns, the same ranges,
 * the same nullable temperatures - with a fixed seed, so the fixture is
 * reproducible rather than random. The SAS service reads mydb.springs; the two
 * agree in shape, not in values, which is what a mock is for.
 */

const path = require('path')

/* weboutPath is <root>/sessions/s<n>/webout.txt and the drive sits beside the
 * sessions folder - the layout sasjs/server uses, which the browser host
 * mirrors. The program's own path names the application folder:
 * /Public/app/minimal-seed-app/services/common/appinit. */
const DRIVE_FILES = path.resolve(weboutPath, '..', '..', '..', 'drive', 'files')
const APP_LOC = String(_program).replace(/\/(services|jobs|tests)\/.*$/, '')
const SPRINGS_FILE = path.join(
  DRIVE_FILES,
  APP_LOC,
  'services',
  'common',
  'springs.json'
)

const springs = JSON.parse(fs.readFileSync(SPRINGS_FILE, 'utf-8'))

/* proc sql; create table areas as select distinct area ... - one row per area,
 * ascending, with the column name the SAS table carries. */
const areas = []
const seen = new Set()

springs.forEach((row) => {
  if (seen.has(row.AREA)) return
  seen.add(row.AREA)
  areas.push({ AREA: row.AREA })
})

areas.sort((a, b) => (a.AREA < b.AREA ? -1 : a.AREA > b.AREA ? 1 : 0))

webout('OPEN')
webout('OBJ', 'areas', areas)
webout('CLOSE')

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
 * The rows are one source, not two: sasjs/utils/serviceinit.sas builds
 * mydb.springs from in-stream datalines, and scripts/springs-data.js writes the
 * same rows to springs.json beside this file. Change the dataset there and run
 * that script.
 */

const path = require('path')

/* The app location, as src/index.html sends it and the mock target in
 * sasjsconfig.json deploys to: the drive path below is that folder. */
const APP_LOC = '/Public/app/minimal-seed-app'

/* weboutPath is <root>/sessions/s<n>/webout.txt and the drive sits beside the
 * sessions folder - the layout sasjs/server uses, which the browser host
 * mirrors. */
const DRIVE_FILES = path.resolve(weboutPath, '..', '..', '..', 'drive', 'files')
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

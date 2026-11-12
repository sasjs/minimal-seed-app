#!/usr/bin/env node
/*
 * Writes `sasjs/mocks/services/common/springs.json` - the dataset the JS mock
 * services answer from.
 *
 * The mock's rows are generated rather than copied, so a fixture meant for a
 * demo does not carry SAS's dataset in the repository. What is taken from the
 * real dataset is its model - the seven columns, their types, the ranges the
 * values sit in, and the facts that a spring may have no temperature and that
 * Celsius follows Fahrenheit. (The SAS side of this app seeds its own copy in
 * sasjs/utils/serviceinit.sas, which is a separate, pre-existing fixture and
 * what ships to a real backend.)
 *
 * Generation is seeded, so the file is a fixture rather than a moving target:
 * the same script produces the same bytes, which is what `--check` asserts in
 * CI. Change the seed or the model and the committed file follows.
 *
 * Usage:
 *   node scripts/springs-data.js          # write the JSON
 *   node scripts/springs-data.js --check  # fail if it is not what this produces
 */

const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname, '..')
const JSON_FILE = path.join(
  ROOT,
  'sasjs',
  'mocks',
  'services',
  'common',
  'springs.json'
)

/* Any change here changes the dataset; the seed is what makes it stable. */
const SEED = 20221112

/* Invented place names, so the dropdown reads like a real application without
 * borrowing the names of the dataset being modelled. */
const AREAS = [
  'Alder Basin',
  'Basalt Ridge',
  'Bitter Creek',
  'Cedar Hollow',
  'Cinder Cone',
  'Copper Flat',
  'Ember Valley',
  'Granite Pass',
  'Juniper Wells',
  'Larkspur',
  'Mica Canyon',
  'Obsidian Gulch',
  'Pineglass',
  'Quarry Bend',
  'Rattlesnake Draw',
  'Salt Lick',
  'Soda Fork',
  'Steamboat Mesa',
  'Tamarack Flats',
  'Willow Tank'
]

/* The vocabulary a spring's name is built from, by area. */
const FEATURES = [
  'Hot Spring',
  'Warm Spring',
  'Fumaroles',
  'Geyser Basin',
  'Thermal Pool',
  'Mineral Spring',
  'Steam Vents',
  'Mud Pots'
]

const LOCATIONS = [
  'North Fork',
  'South Fork',
  'Upper Bench',
  'Lower Bench',
  'East Gulch',
  'West Gulch',
  'Middle Creek',
  'Main Terrace'
]

/* mulberry32 - a small seeded generator, so the fixture does not depend on the
 * runtime's Math.random and can be reproduced anywhere. */
const makeRandom = (seed) => () => {
  seed |= 0
  seed = (seed + 0x6d2b79f5) | 0
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

const between = (random, min, max) => min + random() * (max - min)
const round = (value, places) => Number(value.toFixed(places))
const pick = (random, list) => list[Math.floor(random() * list.length)]

const buildRows = () => {
  const random = makeRandom(SEED)
  const rows = []

  AREAS.forEach((area) => {
    /* three to eight springs per area: a dropdown with an empty answer would
     * exercise a case the app does not draw */
    const count = 3 + Math.floor(random() * 6)

    for (let i = 0; i < count; i++) {
      const farenheit = 68 + Math.floor(random() * 143)

      /* one in six has no temperature reading, as in the dataset's `missing`
       * values - both columns go together, in the shape %webout renders */
      const measured = random() > 0.17

      rows.push({
        LATITUDE: round(between(random, 31, 48), 3),
        LONGITUDE: round(between(random, -122, -104), 3),
        NAME: `${area} ${pick(random, LOCATIONS)} ${pick(random, FEATURES)}`,
        AREA: area,
        TYPE: 'Hotspring',
        FARENHEIT: measured ? farenheit : null,
        CELSIUS: measured ? Math.round(((farenheit - 32) * 5) / 9) : null
      })
    }
  })

  return rows
}

/* One row per line, so a change to the generator reads as a change to the rows
 * it touched rather than as one enormous line. */
const serialise = (rows) =>
  `[\n${rows.map((row) => `  ${JSON.stringify(row)}`).join(',\n')}\n]\n`

const main = () => {
  const check = process.argv.includes('--check')
  const expected = serialise(buildRows())
  const actual = fs.existsSync(JSON_FILE)
    ? fs.readFileSync(JSON_FILE, 'utf8')
    : null

  if (actual === expected) {
    console.log(
      `${path.relative(ROOT, JSON_FILE)} is what this script produces`
    )
    return
  }

  if (check) {
    console.error(
      `${path.relative(ROOT, JSON_FILE)} is not what scripts/springs-data.js ` +
        'produces. Run: node scripts/springs-data.js'
    )
    process.exit(1)
  }

  fs.writeFileSync(JSON_FILE, expected)
  console.log(
    `Wrote ${JSON.parse(expected).length} rows to ` +
      path.relative(ROOT, JSON_FILE)
  )
}

main()

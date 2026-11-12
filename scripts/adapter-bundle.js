#!/usr/bin/env node
/*
 * Keeps `src/sasjs.js` - the adapter bundle the page loads - in step with the
 * adapter this repo pins.
 *
 * The bundle is committed, because the page is served by a static host and
 * `npm ci` runs with scripts disabled. That makes a stale copy the quiet kind
 * of wrong: the app works, against an older adapter than the one in
 * package.json, and nothing says so.
 *
 * Usage:
 *   node scripts/adapter-bundle.js          # write it (also the `prepare` step)
 *   node scripts/adapter-bundle.js --check  # fail when it is out of date
 */

const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname, '..')
const SOURCE = path.join(
  ROOT,
  'node_modules',
  '@sasjs',
  'adapter',
  'dist',
  'sasjs-adapter.js'
)
const TARGET = path.join(ROOT, 'src', 'sasjs.js')
const RELATIVE = path.relative(ROOT, SOURCE)

if (!fs.existsSync(SOURCE)) {
  console.error(`${RELATIVE} is missing - run: npm ci`)
  process.exit(1)
}

const source = fs.readFileSync(SOURCE)
const target = fs.existsSync(TARGET) ? fs.readFileSync(TARGET) : null
const check = process.argv.includes('--check')

if (source.equals(target)) {
  console.log(`${path.relative(ROOT, TARGET)} matches ${RELATIVE}`)
  process.exit(0)
}

if (check) {
  console.error(
    `${path.relative(ROOT, TARGET)} is out of date with ${RELATIVE}. ` +
      'Run: node scripts/adapter-bundle.js'
  )
  process.exit(1)
}

fs.writeFileSync(TARGET, source)
console.log(`Wrote ${path.relative(ROOT, TARGET)} from ${RELATIVE}`)

#!/usr/bin/env node
/*
 * The dependency gate: no high or critical advisories anywhere, and no advisory
 * outside the set this repository has examined and cannot fix from here.
 *
 * `npm audit --audit-level=high` alone is not that gate. It exits 0 while any
 * number of moderates are present, so a new moderate in @sasjs/cli, @sasjs/adapter
 * or @sasjs/core would pass silently - and the level is then lowered for every
 * dev dependency, not just for the one that cannot move.
 *
 * What cannot move: @semantic-release/npm bundles npm 11, and the advisories in
 * that copy (minimatch, glob, tar, sigstore, cacache, pacote and the rest of
 * npm's own tree) live under node_modules/npm/node_modules, which `overrides`
 * cannot reach. The five entries that are not under that path - npm itself and
 * the four semantic-release packages that depend on it - are flagged for the
 * same reason. Everything else is gated at any severity.
 *
 * Run: node scripts/audit-gate.js
 */

const { execFileSync } = require('child_process')

/* The advisories that come from npm 11 as bundled by @semantic-release/npm.
 * Adding to this list is a decision about a specific advisory, which is why the
 * list is written out rather than matched by path or severity. */
const ACCEPTED = new Set([
  '@npmcli/arborist',
  '@npmcli/config',
  '@npmcli/map-workspaces',
  '@npmcli/metavuln-calculator',
  '@npmcli/package-json',
  '@npmcli/run-script',
  '@semantic-release/exec',
  '@semantic-release/github',
  '@semantic-release/npm',
  '@sigstore/sign',
  '@sigstore/tuf',
  '@tufjs/models',
  'cacache',
  'glob',
  'ignore-walk',
  'init-package-json',
  'libnpmaccess',
  'libnpmdiff',
  'libnpmexec',
  'libnpmfund',
  'libnpmorg',
  'libnpmpack',
  'libnpmpublish',
  'libnpmsearch',
  'libnpmteam',
  'libnpmversion',
  'make-fetch-happen',
  'minimatch',
  'npm',
  'npm-packlist',
  'npm-profile',
  'npm-registry-fetch',
  'pacote',
  'semantic-release',
  'sigstore',
  'tuf-js'
])

const audit = () => {
  try {
    return JSON.parse(
      execFileSync('npm', ['audit', '--json'], {
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'ignore'],
        maxBuffer: 64 * 1024 * 1024
      })
    )
  } catch (error) {
    /* npm audit exits non-zero whenever it reports anything, so the JSON on
     * stdout is the result either way - an empty one means it could not run */
    const output = (error.stdout || '').trim()

    if (!output) {
      console.error(
        `npm audit produced no report: ${(error.message || '').split('\n')[0]}`
      )
      process.exit(1)
    }

    return JSON.parse(output)
  }
}

/* An existing audit report can be passed in (a file path), which is how the
 * gate's own tests feed it a report without installing anything. */
const report = process.argv[2]
  ? JSON.parse(require('fs').readFileSync(process.argv[2], 'utf8'))
  : audit()

const vulnerabilities = report.vulnerabilities || {}
const names = Object.keys(vulnerabilities)

const blocking = names.filter((name) => {
  const severity = vulnerabilities[name].severity

  return severity === 'high' || severity === 'critical' || !ACCEPTED.has(name)
})

const accepted = names.length - blocking.length
const counts = report.metadata && report.metadata.vulnerabilities

if (counts) {
  console.log(
    `advisories: ${counts.total} (${counts.critical} critical, ${counts.high} high, ` +
      `${counts.moderate} moderate, ${counts.low} low)`
  )
}

if (blocking.length) {
  console.error(
    `\nblocking advisories (${blocking.length}): ` +
      blocking
        .map((name) => `${name} (${vulnerabilities[name].severity})`)
        .join(', ')
  )
  console.error(
    '\nA high or critical advisory is never accepted. A moderate outside the ' +
      'npm-bundled set is a new decision: fix it, or add it to ACCEPTED in ' +
      'scripts/audit-gate.js with the reason it cannot be fixed here.'
  )
  process.exit(1)
}

console.log(
  `dependency gate passed: ${accepted} accepted advisory package(s), none high ` +
    'or critical, none outside the npm-bundled set'
)

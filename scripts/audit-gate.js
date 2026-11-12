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
 * cannot reach. Those names are accepted ONLY at that path: a direct dependency
 * on `minimatch` is a different thing, and it is gated like anything else. The
 * five entries that are not inside npm's tree are accepted by name, each one a
 * separate decision about a package this repository depends on deliberately.
 *
 * A report that is not an audit result is a failure, not an empty pass: npm 11
 * answers a failed audit with a JSON error document on stdout, and one lockfile
 * deletion is all it takes to produce one.
 *
 * Run: node scripts/audit-gate.js [report.json]
 */

const { execFileSync } = require('child_process')
const fs = require('fs')

/* Accepted by name, because they do not live inside npm's bundled tree and are
 * dependencies this repository chose. Their advisories come from the npm they
 * pull in. */
const ACCEPTED_BY_NAME = new Set([
  '@semantic-release/exec',
  '@semantic-release/github',
  '@semantic-release/npm',
  'npm',
  'semantic-release'
])

/* Accepted only where every reported path resolves inside the npm 11 that
 * @semantic-release/npm bundles. */
const BUNDLED_ONLY = new Set([
  '@npmcli/arborist',
  '@npmcli/config',
  '@npmcli/map-workspaces',
  '@npmcli/metavuln-calculator',
  '@npmcli/package-json',
  '@npmcli/run-script',
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
  'npm-packlist',
  'npm-profile',
  'npm-registry-fetch',
  'pacote',
  'sigstore',
  'tuf-js'
])

const BUNDLED_PATH = 'node_modules/npm/node_modules/'

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
  ? JSON.parse(fs.readFileSync(process.argv[2], 'utf8'))
  : audit()

/* A failure to audit is a failure of the gate. */
if (report.error) {
  console.error(
    `npm audit could not run: ${report.error.code || 'error'} - ` +
      `${report.error.summary || report.error.detail || 'no detail'}`
  )
  process.exit(1)
}

/* And so is a document that cannot answer the question - an empty one has no
 * `vulnerabilities`, and judging nothing is not the same as finding nothing. */
if (
  !report.vulnerabilities ||
  typeof report.vulnerabilities !== 'object' ||
  Array.isArray(report.vulnerabilities)
) {
  console.error(
    'the audit report carries no vulnerabilities object - nothing was judged'
  )
  process.exit(1)
}

if (!report.metadata || !report.metadata.vulnerabilities) {
  console.error(
    'the audit report carries no metadata.vulnerabilities - nothing was judged'
  )
  process.exit(1)
}

const vulnerabilities = report.vulnerabilities
const names = Object.keys(vulnerabilities)

const isAccepted = (name, entry) => {
  if (ACCEPTED_BY_NAME.has(name)) return true
  if (!BUNDLED_ONLY.has(name)) return false

  const nodes = Array.isArray(entry.nodes) ? entry.nodes : []

  return (
    nodes.length > 0 && nodes.every((node) => node.startsWith(BUNDLED_PATH))
  )
}

const blocking = names.filter((name) => {
  const entry = vulnerabilities[name]
  if (entry.severity === 'high' || entry.severity === 'critical') return true

  return !isAccepted(name, entry)
})

const counts = report.metadata.vulnerabilities

console.log(
  `advisories: ${counts.total} (${counts.critical || 0} critical, ` +
    `${counts.high || 0} high, ${counts.moderate || 0} moderate, ` +
    `${counts.low || 0} low)`
)

if (blocking.length) {
  console.error(`\nblocking advisories (${blocking.length}):`)

  blocking.forEach((name) => {
    const entry = vulnerabilities[name]
    const nodes = Array.isArray(entry.nodes) ? entry.nodes.join(', ') : ''

    console.error(`  ${name} (${entry.severity})${nodes ? ` at ${nodes}` : ''}`)
  })

  console.error(
    '\nA high or critical advisory is never accepted. A moderate outside the ' +
      'npm-bundled tree is a new decision: fix it, or add it to ' +
      'scripts/audit-gate.js with the reason it cannot be fixed here.'
  )
  process.exit(1)
}

console.log(
  `dependency gate passed: ${names.length} accepted advisory package(s), ` +
    'none high or critical, none outside the npm-bundled tree'
)

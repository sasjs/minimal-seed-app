/*
 * The dependency gate has to bite on the reports it exists for, or it is a step
 * that prints a number and always passes.
 *
 * Run: node --test scripts/audit-gate.test.js
 */

const assert = require('node:assert')
const { execFileSync } = require('node:child_process')
const fs = require('fs')
const os = require('os')
const path = require('path')
const { test } = require('node:test')

const GATE = path.join(__dirname, 'audit-gate.js')

const run = (report) => {
  const file = path.join(
    fs.mkdtempSync(path.join(os.tmpdir(), 'audit-gate-')),
    'report.json'
  )
  fs.writeFileSync(file, JSON.stringify(report))

  try {
    return {
      status: 0,
      output: execFileSync(process.execPath, [GATE, file], {
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'pipe']
      })
    }
  } catch (error) {
    return {
      status: error.status,
      output: `${error.stdout || ''}${error.stderr || ''}`
    }
  }
}

/* A report with one advisory, in the shape npm audit emits: the vulnerability
 * entry, and the counts it derives them from. */
const report = (vulnerabilities = {}) => {
  const counts = { total: 0, critical: 0, high: 0, moderate: 0, low: 0 }

  Object.values(vulnerabilities).forEach((entry) => {
    counts.total++
    counts[entry.severity] = (counts[entry.severity] || 0) + 1
  })

  return { vulnerabilities, metadata: { vulnerabilities: counts } }
}

const bundled = (name, severity = 'moderate', resolvedAs = name) => ({
  [name]: {
    severity,
    nodes: [`node_modules/npm/node_modules/${resolvedAs}`]
  }
})

test('an accepted moderate inside the npm-bundled tree passes', () => {
  const result = run(
    report({
      ...bundled('glob'),
      ...bundled('minimatch'),
      npm: { severity: 'moderate', nodes: ['node_modules/npm'] }
    })
  )

  assert.strictEqual(result.status, 0)
  assert.match(result.output, /dependency gate passed/)
})

test('a new moderate outside the accepted set fails', () => {
  const result = run(
    report({
      ...bundled('glob'),
      '@sasjs/cli': { severity: 'moderate', nodes: ['node_modules/@sasjs/cli'] }
    })
  )

  assert.notStrictEqual(result.status, 0)
  assert.match(result.output, /blocking advisories/)
  assert.match(result.output, /@sasjs\/cli \(moderate\)/)
})

test('an accepted name resolving outside the bundled tree fails', () => {
  const result = run(
    report({
      minimatch: { severity: 'moderate', nodes: ['node_modules/minimatch'] }
    })
  )

  assert.notStrictEqual(result.status, 0)
  assert.match(result.output, /minimatch \(moderate\)/)
})

test('an accepted name resolving in both places fails', () => {
  const result = run(
    report({
      minimatch: {
        severity: 'moderate',
        nodes: [
          'node_modules/npm/node_modules/minimatch',
          'node_modules/minimatch'
        ]
      }
    })
  )

  assert.notStrictEqual(result.status, 0)
})

test('an advisory with no location fails', () => {
  const result = run(report({ glob: { severity: 'moderate' } }))

  assert.notStrictEqual(result.status, 0)
})

test('a high advisory fails even when its package is accepted', () => {
  const result = run(
    report({ npm: { severity: 'high', nodes: ['node_modules/npm'] } })
  )

  assert.notStrictEqual(result.status, 0)
  assert.match(result.output, /npm \(high\)/)
})

test('a critical advisory fails', () => {
  const result = run(
    report({ tar: { severity: 'critical', nodes: ['node_modules/tar'] } })
  )

  assert.notStrictEqual(result.status, 0)
  assert.match(result.output, /tar \(critical\)/)
})

test('a report with no vulnerabilities passes', () => {
  assert.strictEqual(run(report()).status, 0)
})

test('an error document fails the gate', () => {
  const result = run({
    error: {
      code: 'ENOLOCK',
      summary: 'This command requires an existing lockfile.'
    }
  })

  assert.notStrictEqual(result.status, 0)
  assert.match(result.output, /npm audit could not run: ENOLOCK/)
})

test('a document with no vulnerabilities object fails', () => {
  const result = run({ metadata: { vulnerabilities: { total: 0 } } })

  assert.notStrictEqual(result.status, 0)
  assert.match(result.output, /no vulnerabilities object/)
})

test('a document with no counts fails', () => {
  const result = run({ vulnerabilities: {} })

  assert.notStrictEqual(result.status, 0)
  assert.match(result.output, /no metadata\.vulnerabilities/)
})

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

const report = (vulnerabilities) => ({ vulnerabilities })

test('an accepted moderate inside the npm-bundled set passes', () => {
  const result = run(
    report({ npm: { severity: 'moderate' }, glob: { severity: 'moderate' } })
  )

  assert.strictEqual(result.status, 0)
  assert.match(result.output, /dependency gate passed/)
})

test('a new moderate outside the accepted set fails', () => {
  const result = run(
    report({
      npm: { severity: 'moderate' },
      '@sasjs/cli': { severity: 'moderate' }
    })
  )

  assert.notStrictEqual(result.status, 0)
  assert.match(result.output, /blocking advisories/)
  assert.match(result.output, /@sasjs\/cli \(moderate\)/)
})

test('a high advisory fails even when its package is accepted', () => {
  const result = run(report({ npm: { severity: 'high' } }))

  assert.notStrictEqual(result.status, 0)
  assert.match(result.output, /npm \(high\)/)
})

test('a critical advisory fails', () => {
  const result = run(report({ tar: { severity: 'critical' } }))

  assert.notStrictEqual(result.status, 0)
  assert.match(result.output, /tar \(critical\)/)
})

test('a report with no vulnerabilities passes', () => {
  assert.strictEqual(run(report({})).status, 0)
})

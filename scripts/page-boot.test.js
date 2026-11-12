/* Runs src/scripts.js the way a browser runs it, which is the half of the
 * contract the mock build cannot check: a mock build replays the page's scripts
 * after the load event, so it never sees what a plain host does.
 *
 * A plain host - sasjs/server, SAS 9, Viya, or any static file server - serves
 * index.html as it is, and its <script> tags are in <head>. The browser runs
 * them before <body> exists, so every getElementById() there returns null. The
 * file must therefore do nothing at the top level except decide when to start.
 *
 * The failure this guards is the quiet one: a top-level wiring line throws
 * "Cannot set properties of null (setting 'onclick')", the rest of the file
 * never runs, and the page paints as a heading with nothing behind it.
 */
const assert = require('node:assert/strict')
const { readFileSync } = require('node:fs')
const test = require('node:test')
const vm = require('node:vm')
const path = require('node:path')

const source = readFileSync(
  path.join(__dirname, '..', 'src', 'scripts.js'),
  'utf8'
)

/** An element the app can hide, show and give a handler to. */
const element = (id) => ({
  id,
  hidden: true,
  value: '',
  onclick: null,
  replaceChildren() {},
  appendChild() {}
})

/**
 * The page, with a document that has no body yet.
 *
 * `getElementById` answers null until the test says the document is parsed, which
 * is what a <head> script sees - the point of the exercise is that the file runs
 * cleanly in that state.
 */
const boot = () => {
  /* every DOM lookup the file makes, in order: the loading phase must make
     none, which is what "do nothing at the top level" means */
  const lookups = []
  const elements = Object.fromEntries(
    [
      'login-form',
      'username',
      'password',
      'login-error',
      'data-container',
      'load-startup-data',
      'results',
      'logout-container',
      'logout'
    ].map((id) => [id, element(id)])
  )
  const listeners = {}
  const parsed = { yes: false }

  const document = {
    readyState: 'loading',
    getElementById: (id) => {
      lookups.push(id)
      return parsed.yes ? elements[id] ?? null : null
    },
    querySelector: (selector) =>
      selector === 'sasjs'
        ? {
            getAttribute: (name) =>
              ({
                appLoc: '/Public/app/minimal-seed-app',
                serverType: 'SASJS'
              })[name] ?? null
          }
        : null,
    addEventListener: (type, handler) => {
      listeners[type] = [...(listeners[type] ?? []), handler]
    }
  }

  class Sasjs {
    checkSession() {
      return Promise.resolve({ isLoggedIn: true, userName: 'demo' })
    }
  }

  vm.runInNewContext(source, {
    document,
    window: {},
    console,
    SASjs: { default: Sasjs }
  })

  return { elements, listeners, parsed, lookups }
}

test('the file runs before the body exists, and touches nothing', () => {
  // the assertion is that this does not throw: a null.onclick at the top level
  // stops the file, and with it the app
  assert.doesNotThrow(() => boot())
})

test('the controls are wired once the page has been parsed', async () => {
  const { elements, listeners, parsed, lookups } = boot()

  // the file looked nothing up while the document was still loading. Reading the
  // elements here would only report the stub's own state - the lookups the file
  // actually made are the claim
  assert.deepEqual(lookups, [])

  parsed.yes = true
  assert.equal(listeners.DOMContentLoaded.length, 1)
  listeners.DOMContentLoaded[0]()

  assert.equal(typeof elements['load-startup-data'].onclick, 'function')
  assert.equal(typeof elements.logout.onclick, 'function')

  // and the session check shows the app rather than the login form
  await new Promise((resolve) => setImmediate(resolve))
  assert.equal(elements['data-container'].hidden, false)
  assert.equal(elements['logout-container'].hidden, false)
})

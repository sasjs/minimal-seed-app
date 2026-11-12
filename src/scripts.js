let sasjs

function login(resolve, reject) {
  const username = document.getElementById('username').value
  const password = document.getElementById('password').value

  const failed = () => {
    document.getElementById('login-error').hidden = false
    if (reject) reject()
  }

  sasjs
    .logIn(username, password)
    .then((response) => {
      if (!response.isLoggedIn) return failed()

      document.getElementById('login-error').hidden = true
      afterLogin()
      if (resolve) resolve()
    })
    .catch(failed)
}

function logout() {
  sasjs.logOut()
  showLogin()
}

function afterLogin() {
  document.getElementById('login-form').hidden = true
  document.getElementById('data-container').hidden = false
  document.getElementById('logout-container').hidden = false
}

function showLogin() {
  const loginForm = document.getElementById('login-form')
  const loginError = document.getElementById('login-error')

  loginForm.hidden = false
  loginError.hidden = true
  loginForm.onsubmit = (event) => {
    event.preventDefault()
    login()
  }

  /* whatever the previous session loaded goes with it, and the app starts
     again from its one button rather than from a table nobody asked for */
  document.getElementById('results').replaceChildren()
  document.getElementById('load-startup-data').hidden = false
  document.getElementById('data-container').hidden = true
  document.getElementById('logout-container').hidden = true
}

async function loginRequired() {
  const sasjsConfig = sasjs.getSasjsConfig()
  if (sasjsConfig.loginMechanism === 'Redirected') return await sasjs.logIn()

  return new Promise((resolve, reject) => {
    showLogin()
    document.getElementById('login-form').onsubmit = (event) => {
      event.preventDefault()
      login(resolve, reject)
    }
  })
}

function loadStartupData() {
  if (!sasjs) return

  sasjs
    .request('services/common/appinit', null, undefined, loginRequired)
    .then((responseJson) => {
      if (!responseJson) return
      if (responseJson.status === 449) return loadStartupData()
      if (!responseJson.areas) return

      document.getElementById('load-startup-data').hidden = true
      createAreasDropdown(responseJson.areas)
    })
    .catch((err) => console.error(err))
}

function loadData() {
  const areasDropdown = document.getElementById('areas-dropdown')
  const selectedArea =
    areasDropdown.options[areasDropdown.selectedIndex].value

  sasjs
    .request(
      'services/common/getdata',
      { areas: [{ area: selectedArea }] },
      undefined,
      loginRequired
    )
    .then((responseJson) => {
      if (responseJson && responseJson.springs) {
        renderTable(responseJson.springs)
      }
    })
    .catch((err) => console.error(err))
}

function createAreasDropdown(areas) {
  const results = document.getElementById('results')

  const areasDropDown = document.createElement('select')
  areasDropDown.id = 'areas-dropdown'
  areas.forEach((area) => {
    const option = new Option()
    option.value = area['AREA']
    option.text = area['AREA']
    areasDropDown.options.add(option)
  })
  results.appendChild(areasDropDown)

  const submitButton = document.createElement('button')
  submitButton.id = 'load-data'
  submitButton.innerText = 'Submit'
  submitButton.onclick = loadData
  results.appendChild(submitButton)
}

function renderTable(dataRows) {
  const results = document.getElementById('results')
  const existingTable = document.getElementById('springs-table')
  if (existingTable) results.removeChild(existingTable)

  const table = document.createElement('table')
  table.id = 'springs-table'
  table.appendChild(createTableHeader())

  const tableBody = document.createElement('tbody')
  createRows(dataRows).forEach((row) => tableBody.appendChild(row))
  table.appendChild(tableBody)

  results.appendChild(table)
}

function createTableHeader() {
  const headerRow = document.createElement('thead')
  const row = document.createElement('tr')
  headerRow.appendChild(row)
  const columnNames = [
    'LATITUDE',
    'LONGITUDE',
    'NAME',
    'AREA',
    'TYPE',
    'FARENHEIT',
    'CELSIUS'
  ]
  columnNames.forEach((columnName) => {
    const header = document.createElement('th')
    header.innerText = columnName
    row.appendChild(header)
  })

  return headerRow
}

function createRows(dataRows) {
  const rows = []
  dataRows.forEach((dataRow) => {
    const row = document.createElement('tr')
    for (const field in dataRow) {
      const cell = document.createElement('td')
      cell.innerText = dataRow[field]
      row.appendChild(cell)
    }
    rows.push(row)
  })
  return rows
}

function startApp() {
  const sasjsElement = document.querySelector('sasjs')
  const useComputeApi = sasjsElement.getAttribute('useComputeApi')

  sasjs = new SASjs.default({
    serverUrl: sasjsElement.getAttribute('serverUrl') ?? undefined,
    appLoc: sasjsElement.getAttribute('appLoc') ?? '',
    serverType: sasjsElement.getAttribute('serverType'),
    debug: sasjsElement.getAttribute('debug') === 'true',
    loginMechanism: sasjsElement.getAttribute('loginMechanism') ?? 'Default',
    useComputeApi:
      useComputeApi === 'true'
        ? true
        : useComputeApi === 'false'
        ? false
        : useComputeApi === 'null'
        ? null
        : useComputeApi,
    contextName: sasjsElement.getAttribute('contextName') ?? ''
  })

  sasjs
    .checkSession()
    .then((res) => {
      if (res.isLoggedIn) afterLogin()
      else showLogin()
    })
    .catch((err) => {
      console.error(err)
    })
}

document.getElementById('load-startup-data').onclick = loadStartupData
document.getElementById('logout').onclick = logout

/* Start once the page is parsed, whether this script runs as the document is
   still loading or after it has been parsed. The second case is real: a mock
   build replays the page's scripts once the browser host is ready, which is
   after the load event - and a `window.onload` handler assigned that late
   never runs. */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startApp)
} else {
  startApp()
}

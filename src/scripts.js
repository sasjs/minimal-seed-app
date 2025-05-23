let sasjs

function login(resolve, reject) {
  const username = document.getElementById('username').value
  const password = document.getElementById('password').value
  sasjs.logIn(username, password).then((response) => {
    if (response.isLoggedIn) {
      afterLogin(!resolve)
      if (resolve) resolve()
    } else {
      if (reject) reject()
    }
  })
}

function logout() {
  sasjs.logOut()
  showLogin()
}

function afterLogin(insertStartUpButton = true) {
  const loginForm = document.getElementById('login-form')
  const loginButton = document.getElementById('login')
  loginForm.style.display = 'none'
  loginButton.style.display = 'none'

  const dataContainer = document.getElementById('data-container')
  dataContainer.classList.remove('hidden')

  if (insertStartUpButton) {
    const loadStartupDataButton = document.createElement('button')
    loadStartupDataButton.id = 'load-startup-data'
    loadStartupDataButton.innerText = 'Load Startup Data'
    loadStartupDataButton.onclick = loadStartupData

    dataContainer.appendChild(loadStartupDataButton)
  }

  const logoutContainer = document.getElementById('logout-container')
  logoutContainer.classList.remove('hidden')

  let logoutButton = document.getElementById('logout')
  if (!logoutButton) {
    logoutButton = document.createElement('button')
    logoutButton.id = 'logout'
    logoutButton.innerText = 'Logout'
    logoutButton.onclick = logout

    logoutContainer.appendChild(logoutButton)
  }
}

function showLogin() {
  const loginForm = document.getElementById('login-form')
  const loginButton = document.getElementById('login')
  loginForm.style.display = 'flex'
  loginButton.style.display = 'inline-block'
  loginButton.addEventListener('click', login)

  const dataContainer = document.getElementById('data-container')
  dataContainer.classList.add('hidden')
  const logoutContainer = document.getElementById('logout-container')
  logoutContainer.classList.add('hidden')
}

async function loginRequired() {
  const sasjsConfig = sasjs.getSasjsConfig()
  if (sasjsConfig.loginMechanism === 'Redirected') return await sasjs.logIn()

  return new Promise((resolve, reject) => {
    showLogin()
    const loginButton = document.getElementById('login')
    loginButton.onclick = () => {
      login(resolve, reject)
    }
  })
}

function loadStartupData() {
  if (!sasjs) return

  sasjs
    .request('services/common/appinit', null, undefined, loginRequired)
    .then((response) => {
      let responseJson
      try {
        responseJson = response
      } catch (e) {
        console.error(e)
      }
      if (responseJson && responseJson.status === 449) {
        loadStartupData()
      } else {
        if (responseJson && responseJson.areas) {
          const loadStartupDataButton =
            document.getElementById('load-startup-data')
          loadStartupDataButton.style.display = 'none'
          createAreasDropdown(responseJson.areas)
        }
      }
    })
    .catch((err) => {
      console.error(err)
    })
}

function loadData() {
  const areasDropdown = document.getElementById('areas-dropdown')
  const selectedArea = areasDropdown.options[areasDropdown.selectedIndex].value
  sasjs
    .request(
      'services/common/getdata',
      { areas: [{ area: selectedArea }] },
      undefined,
      loginRequired
    )
    .then((response) => {
      const responseJson = response
      if (responseJson && responseJson.springs && responseJson.springs) {
        const existingTable = document.getElementById('springs-table')
        const dataContainer = document.getElementById('data-container')
        if (existingTable) {
          dataContainer.removeChild(existingTable)
        }
        const table = document.createElement('table')
        table.id = 'springs-table'
        const tableHeader = createTableHeader()
        table.appendChild(tableHeader)
        const tableRows = createRows(responseJson.springs)
        const tableBody = document.createElement('tbody')
        table.appendChild(tableBody)
        tableRows.forEach((row) => tableBody.appendChild(row))
        dataContainer.appendChild(table)
      }
    })
}

function createAreasDropdown(areas) {
  const dataContainer = document.getElementById('data-container')
  const areasDropDown = document.createElement('select')
  areasDropDown.id = 'areas-dropdown'
  areas.forEach((area) => {
    const option = new Option()
    option.value = area['AREA']
    option.text = area['AREA']
    areasDropDown.options.add(option)
  })
  dataContainer.appendChild(areasDropDown)
  const submitButton = document.createElement('button')
  submitButton.onclick = loadData
  submitButton.innerText = 'Submit'
  dataContainer.appendChild(submitButton)
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
    for (field in dataRow) {
      const cell = document.createElement('td')
      cell.innerText = dataRow[field]
      row.appendChild(cell)
    }
    rows.push(row)
  })
  return rows
}

window.onload = function () {
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

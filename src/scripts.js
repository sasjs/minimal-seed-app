let sasjs
let username
let password

function login() {
  username = document.querySelector('#username').value
  password = document.querySelector('#password').value
  sasjs.logIn(username, password).then((response) => {
    if (response.isLoggedIn) {
      afterLogin()
    }
  })
}
function afterLogin() {
  const loadStartupDataButton = document.createElement('button')
  loadStartupDataButton.id = 'load-startup-data'
  loadStartupDataButton.innerText = 'Load Startup Data'
  loadStartupDataButton.onclick = loadStartupData
  document.body.appendChild(loadStartupDataButton)
  const loginForm = document.querySelector('#login-form')
  const loginButton = document.querySelector('#login')
  loginButton.style.display = 'none'
  loginForm.style.display = 'none'
}

function loadStartupData() {
  if (!sasjs) return

  sasjs
    .request('services/common/appinit', null, undefined, async () => {
      await sasjs.logIn(username, password)
    })
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
            document.querySelector('#load-startup-data')
          loadStartupDataButton.style.display = 'none'
          createAreasDropdown(responseJson.areas)
        }
      }
    })
}

function loadData() {
  const areasDropdown = document.querySelector('#areas-dropdown')
  const selectedArea = areasDropdown.options[areasDropdown.selectedIndex].value
  sasjs
    .request(
      'services/common/getdata',
      { areas: [{ area: selectedArea }] },
      undefined,
      async () => {
        await sasjs.logIn(username, password)
      }
    )
    .then((response) => {
      const responseJson = response
      if (responseJson && responseJson.springs && responseJson.springs) {
        const existingTable = document.querySelector('#springs-table')
        if (existingTable) {
          document.body.removeChild(existingTable)
        }
        const table = document.createElement('table')
        table.id = 'springs-table'
        const tableHeader = createTableHeader()
        table.appendChild(tableHeader)
        const tableRows = createRows(responseJson.springs)
        const tableBody = document.createElement('tbody')
        table.appendChild(tableBody)
        tableRows.forEach((row) => tableBody.appendChild(row))
        document.body.appendChild(table)
      }
    })
}

function createAreasDropdown(areas) {
  const areasDropDown = document.createElement('select')
  areasDropDown.id = 'areas-dropdown'
  areas.forEach((area) => {
    const option = new Option()
    option.value = area['AREA']
    option.text = area['AREA']
    areasDropDown.options.add(option)
  })
  document.body.appendChild(areasDropDown)
  const submitButton = document.createElement('button')
  submitButton.onclick = loadData
  submitButton.innerText = 'Submit'
  document.body.appendChild(submitButton)
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
    'CELSIUS',
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

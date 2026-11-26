#!/usr/bin/env node
const assert = require('node:assert/strict')
const fs = require('node:fs')
const http = require('node:http')
const path = require('node:path')
const os = require('node:os')
const { spawn } = require('node:child_process')
const { once } = require('node:events')
const site = path.resolve('sasjsbuild/pages')
const sleep = ms => new Promise(r => setTimeout(r, ms))
const server = http.createServer((req, res) => {
  let url = new URL(req.url, 'http://localhost').pathname
  if (url.endsWith('/')) url += 'index.html'
  const file = path.resolve(site, '.' + url)
  if (!file.startsWith(site + path.sep)) return res.writeHead(403).end()
  try {
    const ext = path.extname(file)
    const body = fs.readFileSync(file)
    res.writeHead(200, { 'Content-Type': ({ '.html': 'text/html', '.js': 'application/javascript', '.json': 'application/json', '.css': 'text/css' })[ext] || 'application/octet-stream', 'Cache-Control': 'no-store' }).end(body)
  } catch { res.writeHead(404).end() }
})
async function main() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'pages-browser-'))
  let chrome, ws
  try {
    server.listen(0, '127.0.0.1'); await once(server, 'listening')
    chrome = spawn(process.env.CHROMIUM_PATH || '/usr/bin/chromium', ['--headless=new','--no-sandbox','--disable-dev-shm-usage','--remote-debugging-port=0',`--user-data-dir=${dir}`,'about:blank'], { stdio: 'ignore' })
    await once(chrome, 'spawn')
    let port
    for (let i=0; i<200 && !port; i++) { try { port=Number(fs.readFileSync(path.join(dir,'DevToolsActivePort'),'utf8').split('\n')[0]) } catch { await sleep(50) } }
    assert.ok(port, 'Chromium startup timeout')
    ws = new WebSocket((await (await fetch(`http://127.0.0.1:${port}/json/version`)).json()).webSocketDebuggerUrl); await once(ws,'open')
    let id=0; const pending=new Map()
    ws.addEventListener('message', e => { const m=JSON.parse(e.data), p=pending.get(m.id); if (!p) return; pending.delete(m.id); clearTimeout(p.timer); m.error ? p.reject(Error(JSON.stringify(m.error))) : p.resolve(m.result) })
    const send=(method,params={},sessionId)=>new Promise((resolve,reject)=>{ const n=++id; const timer=setTimeout(()=>{ pending.delete(n); reject(Error(`CDP timeout ${method}`)) },30000); pending.set(n,{resolve,reject,timer}); ws.send(JSON.stringify({id:n,method,params,sessionId})) })
    async function tab(url) { const {targetId}=await send('Target.createTarget',{url:'about:blank'}); const {sessionId}=await send('Target.attachToTarget',{targetId,flatten:true}); await send('Runtime.enable',{},sessionId); await send('Page.enable',{},sessionId); await send('Page.navigate',{url},sessionId); return sessionId }
    async function evalAt(s,expression) { const r=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true},s); if(r.exceptionDetails) throw Error(JSON.stringify(r.exceptionDetails)); return r.result.value }
    async function wait(s,expression,label) { for(let i=0;i<400;i++){try{if(await evalAt(s,expression))return}catch{} await sleep(50)} throw Error(`Timed out: ${label}`) }
    const base=`http://127.0.0.1:${server.address().port}`
    const chooser=await tab(base+'/')
    await wait(chooser,`document.readyState === 'complete' && !!document.querySelector('a[href="/sasjs/minimal/"]')`,'chooser')
    assert.deepEqual(await evalAt(chooser,`Array.from(document.querySelectorAll('main a'),a=>a.getAttribute('href'))`),['/sasjs/minimal/','/sas9/minimal/','/viya/minimal/'])
    const legacy=await tab(base+'/api-console/')
    await wait(legacy,`location.pathname === '/sasjs/minimal/api-console/'`,'legacy API console redirect')
    const a=await tab(base+'/sasjs/minimal/'), b=await tab(base+'/sas9/minimal/'), v=await tab(base+'/viya/minimal/')
    const viyaNetwork=[]
    let viyaSupported = false
    ws.addEventListener('message', e => {
      const m=JSON.parse(e.data)
      if(m.sessionId===v && m.method==='Network.responseReceived') {
        const r=m.params.response
        if (/\/(identities|folders|files|jobDefinitions|jobExecution)\//.test(new URL(r.url).pathname)) viyaNetwork.push(r)
      }
    })
    await send('Network.enable',{},v)
    for (const [s,tier,type] of [[a,'sasjs','SASJS'],[b,'sas9','SAS9'],[v,'viya','SASVIYA']]) {
      await wait(s,`document.readyState === 'complete' && !!window.__sasjsMockReady`,`${tier} load`)
      const meta=await evalAt(s,`({type:document.querySelector('sasjs').getAttribute('servertype'), config:sasjs.getSasjsConfig(), warning:document.body.innerText, url:location.pathname})`)
      assert.equal(meta.type,type); assert.equal(meta.config.serverType,type)
      if(tier==='viya') {
        assert.equal(meta.config.useComputeApi,false)
        assert.match(meta.config.serverUrl,/\/viya\/minimal$/)
        if (/Viya mock unsupported/i.test(meta.warning)) {
          assert.notEqual(process.env.REQUIRE_VIYA_MOCK, '1', 'Viya mock support is required for this proof')
          const config = await (await fetch(`${base}/viya/minimal/host/mock-config.json`)).json()
          assert.ok(!Array.isArray(config.viyaMockJobs) || !config.viyaMockJobs.length)
          console.log('PASS viya: pinned CLI correctly marked unsupported')
          continue
        }
        viyaSupported = true
      }
      for (const visit of ['first','reload']) {
        if (visit==='reload') { const prev=await evalAt(s,'performance.timeOrigin'); await send('Page.reload',{},s); await wait(s,`performance.timeOrigin !== ${prev} && !!window.__sasjsMockReady`,tier+' reload') }
        await evalAt(s,`window.__sasjsMockReady`)
        await wait(s,`!document.querySelector('#data-container').hidden`,tier+' session '+visit)
        await evalAt(s,`document.querySelector('#load-startup-data').click()`)
        await wait(s,`!!document.querySelector('#areas-dropdown')`,tier+' appinit '+visit)
        await evalAt(s,`document.querySelector('#areas-dropdown').selectedIndex = 1`)
        const area=await evalAt(s,`document.querySelector('#areas-dropdown').value`)
        await evalAt(s,`document.querySelector('#load-data').click()`)
        await wait(s,`!!document.querySelector('#springs-table tbody tr')`,tier+' getdata '+visit)
        const shown=await evalAt(s,`Array.from(document.querySelectorAll('#springs-table tbody tr'), row => row.children[3].innerText)`)
        assert.ok(shown.length && shown.every(value=>value===area), `${tier} getdata filters on the chosen area`)
        console.log(`PASS ${tier} ${visit}: actual UI and service worker`)
      }
    }
    if (viyaSupported) {
      for (const family of ['/folders/', '/files/files', '/jobDefinitions/', '/jobExecution/jobs']) {
        assert.ok(viyaNetwork.some(r=>new URL(r.url).pathname.includes(family)), `Viya ${family} observed`)
      }
      for (const r of viyaNetwork) {
        assert.equal(r.fromServiceWorker,true,`Viya worker response: ${r.url}`)
        assert.match(Object.entries(r.headers).find(([key])=>key.toLowerCase()==='x-sasjs-emulated')?.[1] || '',/^viya@/,`Viya emulation stamp: ${r.url}`)
        assert.ok(r.status >= 200 && r.status < 300, `Viya successful response: ${r.url} ${r.status}`)
      }
      console.log(`PASS viya: ${viyaNetwork.length} stamped responses came from the service worker (folder, file upload, definition and JES)`)
    }
    await evalAt(v,'window.__sasjsMockReady')
    const mounts = [
      [a, 'sasjs', '/sasjs/drive/files/Public/chooser-isolation-proof.txt', 'sasjs-only'],
      [b, 'sas9', '/sasjs/drive/files/Public/chooser-sas9-only.txt', 'sas9-only'],
      [v, 'viya', '/sasjs/drive/files/Public/chooser-viya-only.txt', 'viya-only']
    ]
    for (const [session,,key,value] of mounts) {
      await evalAt(session,`window.SASjsMock.writeFiles({[${JSON.stringify(key)}]:${JSON.stringify(value)}})`)
    }
    for (const [session,tier,own,value] of mounts) {
      for (const visit of ['concurrent', 'reload']) {
        if (visit === 'reload') {
          const prev=await evalAt(session,'performance.timeOrigin')
          await send('Page.reload',{},session)
          await wait(session,`performance.timeOrigin !== ${prev} && !!window.__sasjsMockReady`,tier+' isolation reload')
          await evalAt(session,'window.__sasjsMockReady')
        }
        const files=await evalAt(session,'window.SASjsMock.readAll()')
        assert.equal(files[own],value,`${tier} own file survives ${visit}`)
        for (const [,other,key] of mounts) if (key !== own) {
          assert.equal(files[key],undefined,`${tier} must not read ${other} file on ${visit}`)
        }
      }
    }
    const key=mounts[0][2]
    const prev=await evalAt(a,'performance.timeOrigin')
    await evalAt(a,"window.SASjsMock.as('sasjsuser')")
    await wait(a,`performance.timeOrigin !== ${prev} && !!window.__sasjsMockReady`,'identity reload')
    await evalAt(a,'window.__sasjsMockReady')
    const identityA=await evalAt(a,'window.SASjsMock.identity()')
    assert.equal(identityA.subject,'sasjsuser')
    for (const [session,tier] of [[b,'sas9'],[v,'viya']]) {
      const identity=await evalAt(session,'window.SASjsMock.identity()')
      assert.notEqual(identity && identity.subject,'sasjsuser',`${tier} identity must remain isolated`)
    }
    const before=await evalAt(b,'performance.timeOrigin')
    await send('Page.navigate',{url:base+'/sasjs/minimal/'},b)
    await wait(b,`performance.timeOrigin !== ${before} && !!window.__sasjsMockReady`,'switch target')
    await evalAt(b,'window.__sasjsMockReady')
    assert.equal((await evalAt(b,'window.SASjsMock.readAll()'))[key],'sasjs-only','switching tab reads destination drive')
    console.log('PASS persisted drives and identities isolated between concurrent tabs, reloads and switches')
  } finally { if(ws)ws.close(); if(chrome && chrome.exitCode===null && chrome.signalCode===null){const done=once(chrome,'close');chrome.kill();await done} await new Promise(r=>server.close(r)); fs.rmSync(dir,{recursive:true,force:true,maxRetries:10,retryDelay:100}) }
}
main().catch(e=>{console.error(e);process.exitCode=1})

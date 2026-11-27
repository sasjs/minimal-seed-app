# Vanilla JavaScript Seed App for SASjs
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-7-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

This is the minimal seed app for [SASjs](https://github.com/sasjs/adapter).

## Quick Start on Viya

Just run the following in SAS Studio:

```sas
filename sasjsmsa url
  "https://github.com/sasjs/minimal-seed-app/releases/latest/download/viya.sas";
%inc sasjsmsa;
```

This will deploy the streaming version of the app (compiled using `sasjs cb`)

## SAS9 Setup

Also works on Viya (but for that it is better to use the SASjs CLI).
To deploy the backend services, execute the following:

```sas
/* define the app location, eg in metadata or Viya folders service */
%let apploc=/Public/app/minimal-seed-app;

/* include macros directly, else download & compile manually */
filename mc url "https://raw.githubusercontent.com/sasjs/core/main/all.sas";
%inc mc;

/* create the two services */
filename ft15f001 temp;
parmcards4;
    proc sql;
    create table areas as select distinct area from sashelp.springs;
    %webout(OPEN)
    %webout(OBJ,areas)
    %webout(CLOSE)
;;;;
%mp_createwebservice(path=&apploc/services/common, name=appinit)

parmcards4;
    %webout(FETCH)
    proc sql;
    create table springs as select * from sashelp.springs
      where area in (select area from areas);
    %webout(OPEN)
    %webout(OBJ,springs)
    %webout(CLOSE)
;;;;
%mp_createwebservice(path=&apploc/services/common, name=getdata)
```

Next, open the `src/index.html` file and update the `appLoc` in the `initSasJs()` function to the same folder location used above. Deploy to the SAS Web Server is recommended using the deploy NPM script provided in the `package.json` file.

It deploys the app to a specified server via SSH using the rsync command. Note - this is not available by default on Windows.  A guide for installing it is available [here](https://sasjs.io/windows/#rsync).

To be able to run the deploy script, two environment variables need to be set:

`SSH_ACCOUNT` - your SSH account, this is of the form username@domain.com
`DEPLOY_PATH` - the path on the server where the app will be deployed to, typically `/var/www/html/<some-subfolder>`.

You can run the script like so:

```bash
SSH_ACCOUNT=me@my-sas-server.com
DEPLOY_PATH=/var/www/html/$(whoami)/minimal
npm run deploy
```

You are done!

## Secret scanning before commits

Install the [pre-commit framework](https://pre-commit.com/#installation) and [Go](https://go.dev/doc/install), then run `pre-commit install` in the checkout. Go is needed to build the pinned Gitleaks hook on its first run. The hook scans staged changes; npm does not install it automatically and it can be bypassed. CI separately scans full reachable Git history on pull requests to main, pushes to main, and manual runs; the release job waits for that scan. Making the scan a required merge check also needs repository branch protection. The Pages workflow runs independently.

## Mocked development (no SAS)

Each SAS service has a JavaScript twin in `sasjs/mocks/services/common/` - `appinit.js` and `getdata.js`. They answer the same `webout()` JSON as the `.sas` files beside them, so the frontend cannot tell which one is talking to it. That is what lets the app run with no SAS and no backend.

### A static site in the browser (SASjs CLI)

```bash
npm run mock:build   # sasjs compile -t mock && sasjs build -t mock
npm run mock:start   # serve sasjsbuild/mock at http://localhost:3001
```

The `mock` target sets `streamConfig.mockWeb`, so the build writes an ordinary folder of static files: the frontend, the JavaScript services, and a service worker. The worker intercepts the calls the adapter makes, runs the matching JS service and returns its webout, so requests appear in DevTools like any other and anything written to the drive survives a refresh (IndexedDB).

Serve it over http(s) - a service worker needs a secure context, so `file://` does not work.

### On SASjs Server

Deploy normally with `sasjs cbd -t server`: the `.js` files travel in the pack and land on the drive beside the `.sas` ones. A service asked for without an extension is resolved by trying each run time in `RUN_TIMES` order, so the run time decides which one answers - `RUN_TIMES=js,sas` runs the mocks, the default `sas,js` runs the SAS services. See [JavaScript services](https://cli.sasjs.io/js-services).

### The data

`springs.json` is generated from the dataset's model by `scripts/springs-data.js` (same seven columns, same ranges, fixed seed), not copied out of SAS, so the mocks agree with `mydb.springs` in shape, not in values. Edit the model and run `node scripts/springs-data.js`; `npm run check:data` fails when the committed file and the generator disagree.

### The published demo

https://minimal.sasjs.io is built from `main` by `npm run pages:build` and holds three mocks of the same app - `/sasjs/minimal/`, `/sas9/minimal/` and `/viya/minimal/` - behind a chooser at the root. No SAS engine runs there either.

A mock has no SAS engine behind it - no PROC SQL, no formats, no CAS - so use a real target for anything that needs SAS. Everything else about browser builds is in the [build docs](https://cli.sasjs.io/build).


## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/allanbowe"><img src="https://avatars.githubusercontent.com/u/4420615?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Allan Bowe</b></sub></a><br /><a href="https://github.com/sasjs/minimal-seed-app/commits?author=allanbowe" title="Code">💻</a> <a href="https://github.com/sasjs/minimal-seed-app/commits?author=allanbowe" title="Tests">⚠️</a> <a href="https://github.com/sasjs/minimal-seed-app/pulls?q=is%3Apr+reviewed-by%3Aallanbowe" title="Reviewed Pull Requests">👀</a> <a href="#video-allanbowe" title="Videos">📹</a> <a href="https://github.com/sasjs/minimal-seed-app/commits?author=allanbowe" title="Documentation">📖</a></td>
    <td align="center"><a href="https://www.erudicat.com/"><img src="https://avatars.githubusercontent.com/u/25773492?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Yury Shkoda</b></sub></a><br /><a href="https://github.com/sasjs/minimal-seed-app/commits?author=YuryShkoda" title="Code">💻</a> <a href="https://github.com/sasjs/minimal-seed-app/commits?author=YuryShkoda" title="Tests">⚠️</a> <a href="#projectManagement-YuryShkoda" title="Project Management">📆</a> <a href="#video-YuryShkoda" title="Videos">📹</a> <a href="https://github.com/sasjs/minimal-seed-app/commits?author=YuryShkoda" title="Documentation">📖</a></td>
    <td align="center"><a href="https://krishna-acondy.io/"><img src="https://avatars.githubusercontent.com/u/2980428?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Krishna Acondy</b></sub></a><br /><a href="https://github.com/sasjs/minimal-seed-app/commits?author=krishna-acondy" title="Code">💻</a> <a href="https://github.com/sasjs/minimal-seed-app/commits?author=krishna-acondy" title="Tests">⚠️</a> <a href="https://github.com/sasjs/minimal-seed-app/pulls?q=is%3Apr+reviewed-by%3Akrishna-acondy" title="Reviewed Pull Requests">👀</a> <a href="#infra-krishna-acondy" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#platform-krishna-acondy" title="Packaging/porting to new platform">📦</a> <a href="#maintenance-krishna-acondy" title="Maintenance">🚧</a> <a href="#content-krishna-acondy" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/saadjutt01"><img src="https://avatars.githubusercontent.com/u/8914650?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Muhammad Saad </b></sub></a><br /><a href="https://github.com/sasjs/minimal-seed-app/commits?author=saadjutt01" title="Code">💻</a> <a href="https://github.com/sasjs/minimal-seed-app/commits?author=saadjutt01" title="Tests">⚠️</a> <a href="https://github.com/sasjs/minimal-seed-app/pulls?q=is%3Apr+reviewed-by%3Asaadjutt01" title="Reviewed Pull Requests">👀</a> <a href="#mentoring-saadjutt01" title="Mentoring">🧑‍🏫</a> <a href="https://github.com/sasjs/minimal-seed-app/commits?author=saadjutt01" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/sabhas"><img src="https://avatars.githubusercontent.com/u/82647447?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Sabir Hassan</b></sub></a><br /><a href="https://github.com/sasjs/minimal-seed-app/commits?author=sabhas" title="Code">💻</a> <a href="https://github.com/sasjs/minimal-seed-app/commits?author=sabhas" title="Tests">⚠️</a> <a href="https://github.com/sasjs/minimal-seed-app/pulls?q=is%3Apr+reviewed-by%3Asabhas" title="Reviewed Pull Requests">👀</a> <a href="#ideas-sabhas" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/medjedovicm"><img src="https://avatars.githubusercontent.com/u/18329105?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Mihajlo Medjedovic</b></sub></a><br /><a href="https://github.com/sasjs/minimal-seed-app/commits?author=medjedovicm" title="Code">💻</a> <a href="https://github.com/sasjs/minimal-seed-app/commits?author=medjedovicm" title="Tests">⚠️</a> <a href="https://github.com/sasjs/minimal-seed-app/pulls?q=is%3Apr+reviewed-by%3Amedjedovicm" title="Reviewed Pull Requests">👀</a> <a href="#infra-medjedovicm" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    <td align="center"><a href="https://github.com/VladislavParhomchik"><img src="https://avatars.githubusercontent.com/u/83717836?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Vladislav Parhomchik</b></sub></a><br /><a href="https://github.com/sasjs/minimal-seed-app/commits?author=VladislavParhomchik" title="Tests">⚠️</a> <a href="https://github.com/sasjs/minimal-seed-app/pulls?q=is%3Apr+reviewed-by%3AVladislavParhomchik" title="Reviewed Pull Requests">👀</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
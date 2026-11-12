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

## Local Development

You can put the frontend [directly on the SAS Web Server](https://sasjs.io/frontend/deployment/), else you can also use node to spin up a local web server with CORS disabled. To install, submit `npm install http-server -g`. To execute, navigate to the location where the app is to be loaded and submit: `npx http-server --cors`

## Mocked build (no backend)

The `mock` target builds the app as a static site whose backend runs in the
browser, so it can be developed, demoed and reviewed without a SAS server:

```bash
npm run mock:build
npm run mock:start
```

`npm run mock:build` compiles the project and writes the site to
`sasjsbuild/mock`; `mock:start` serves it at http://localhost:3001. Open the
site over http(s) on localhost - a service worker needs a secure context, so
`file://` does not work.

A published copy is built from `main` and served at
https://minimal.sasjs.io by the "Publish the mocked site" workflow.

The page and the adapter are unchanged. The worker answers `/SASjsApi/...`
from JavaScript services that mirror the SAS ones:

-   `sasjs/mocks/services/common/appinit.js` returns the areas
-   `sasjs/mocks/services/common/getdata.js` returns the springs for the chosen areas
-   `sasjs/mocks/services/common/springs.json` holds the rows themselves

`springs.json` is a generated fixture, not a copy of the SAS dataset:
`scripts/springs-data.js` writes it from the dataset's model - the same seven
columns, the same value ranges, the same nullable temperatures - with a fixed
seed, so the file is reproducible rather than random and the mock answers the
same rows on every build. The SAS services read `mydb.springs`, so the two
agree in shape, not in values.

Change the model in that script and run `node scripts/springs-data.js`;
`npm run check:data` fails when the committed file is not what the script
produces, so the fixture cannot drift from its generator.

The same JS services are what `sasjs cb -t server` ships for the `server`
target, which is why a deployment to sasjs/server also answers without SAS.

A mocked build is a development and demo vehicle. The data lives in the
browser, there is no SAS engine behind it, and nothing computed by SAS (PROC
SQL, formats, CAS) exists there - use a real target for anything that needs
SAS.


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
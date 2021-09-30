# Vanilla JavaScript Seed App for SASjs
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

This is the minimal seed app for [SASjs](https://github.com/sasjs/adapter).

It runs on both SAS 9 and Viya. To deploy the services, execute the following:

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
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
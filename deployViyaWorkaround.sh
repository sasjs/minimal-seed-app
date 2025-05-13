#!/bin/sh

sasjs c -t viya
# Remove the redirect script from the clickme.html file to prevent CSP issues on Viya
npx replace-in-files --regex '<!--[ \t]*\n[ \t]*To prevent redirects[\s\S]*?<script>[\s\S]*?<\/script>\n' --replacement "" ./sasjsbuild/services/clickme.html
sasjs b -t viya
sasjs d -t viya

#!/usr/bin/env node

const github = require('./modules/github');
const getUserEvents = github.api.getUserEvents;
const userEventsAvg = github.stat.userEventsAvg;
const round = require('./modules/math').round;

const USAGE = 'usage: github-api-demo.js username';

function exitError(msg) {
  console.error(msg);
  process.exit(1);
}

const args = process.argv.slice(2);
if (args.length !== 1)
  exitError(USAGE);

const username = args[0];

getUserEvents(username)
  .then(response => {
    if (response.length === 0)
      exitError('User has no events');
    console.log(round(userEventsAvg(response)));
  }, error => {
    exitError('error: could not fetch data from GitHub: ' + error);
  })
  .catch(error => {
    exitError('uncaught exception: ' + error);
  });

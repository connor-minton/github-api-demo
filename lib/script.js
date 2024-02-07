const github = require('./github');
const getUserEvents = github.api.getUserEvents;
const userEventsAvg = github.stat.userEventsAvg;
const round = require('./math').round;

const USAGE = 'usage: github-api-demo.js username';

class Script {
  constructor(options) {
    options = options || {};
    this.logger = options.logger || console;
    this.process = options.process || process;
  }

  main(argv) {
    const username = this._parseArgs(argv).username;

    return getUserEvents(username)
      .then(response => {
        if (response.length === 0)
          this._exitError('User has no events');
        this.logger.log(round(userEventsAvg(response)));
      }, error => {
        this._exitError('error: could not fetch stuff from GitHub: ' + error);
      })
      .catch(error => {
        this._exitError('uncaught exception: ' + error);
      });
  }

  _exitError(msg) {
    this.logger.error(msg);
    this.process.exit(1);
  }

  _parseArgs(argv) {
    const args = argv.slice(2);
    if (args.length !== 1)
      this._exitError(USAGE);
    return { username: args[0] };
  }
}

module.exports = Script;

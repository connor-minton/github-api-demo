const { getUserEvents } = require('./modules/github-service');

getUserEvents('connor-minton')
  .then(response => {
    console.log('success!');
    console.log(response);
  }, error => {
    console.error('error getting data from GitHub: ' + error);
  });

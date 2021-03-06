const config = require('config');
const { request } = require('../http');

function getUserEvents(user) {
  const baseUrl = config.get('githubApiBaseUrl');
  const url = `${baseUrl}/users/${user}/events`;
  return request(url, { json: true })
    .then(result => {
      if (result.response.statusCode >= 400) {
        throw Error(result.body.message);
      }
      return result.body;
    });
}

module.exports = { getUserEvents };

const { request } = require('../http');

function getUserEvents(user) {
  const url = `https://api.github.com/users/${user}/events`;
  return request(url, { json: true })
    .then(result => {
      if (result.response.statusCode >= 400) {
        throw Error(result.body.message);
      }
      return result.body;
    });
}

module.exports = { getUserEvents };

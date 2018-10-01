const { request } = require('../http');

function getUserEvents(user) {
  const url = `https://api.github.com/users/${user}/events`;
  return request(url, { json: true });
}

module.exports = { getUserEvents };

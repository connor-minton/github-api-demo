const request = module.require('request');

// Promise-enabled adapter for `request`
function httpRequest(url, options) {
  return new Promise((resolve, reject) => {
    const requestParams = Object.assign({
      url,
      headers: {
        'User-Agent': 'Node.js'
      }
    }, options);

    request(requestParams, (error, response, body) => {
      if (error) reject(error);
      else resolve(body);
    });
  });
}

module.exports = httpRequest;

const assert = require('assert');
const nock = require('nock');
const http = require('../../lib/http');

describe('http', () => {
  describe('.request()', () => {
    before(() => { if (!nock.isActive()) nock.activate(); });
    after(() => { if (nock.isActive()) nock.restore(); });

    it('should resolve with the server response on 200', () => {
      const response = '{"foo":3,"bar":"hello"}';

      nock('https://api.example.com')
        .get('/users/connor')
        .reply(200, response);

      return http.request('https://api.example.com/users/connor')
        .then(result => {
          assert.strictEqual(result.response.statusCode, 200);
          assert.strictEqual(result.body, response);
        });
    });

    it('should support JSON option', () => {
      const response = '{"foo":3,"bar":"hello"}';

      nock('https://api.example.com')
        .get('/users/connor')
        .reply(200, JSON.parse(response));

      return http.request('https://api.example.com/users/connor', { json: true })
        .then(result => {
          assert.strictEqual(result.response.statusCode, 200);
          assert.deepStrictEqual(result.body, JSON.parse(response));
        });
    });

    it('should resolve with server response on 404', () => {
      const response = '{"message":"not found"}';

      nock('https://api.example.com')
        .get('/users/connor')
        .reply(404, JSON.parse(response));

      return http.request('https://api.example.com/users/connor', { json: true })
        .then(result => {
          assert.strictEqual(result.response.statusCode, 404);
          assert.strictEqual(result.body.message, 'not found');
        });
    });
  });
});

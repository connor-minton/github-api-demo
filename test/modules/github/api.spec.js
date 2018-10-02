const nock = require('nock');
const assert = require('assert');
const config = require('config');
const api = require('../../../modules/github/api');

const githubUrl = config.get('githubApiBaseUrl');

describe('github.api', () => {
  describe('.getUserEvents()', () => {
    before(() => { if (!nock.isActive()) nock.activate(); });
    after(() => { if (nock.isActive()) nock.restore(); });

    it('should return events for an existing user', () => {
      const response = [
        { type: 'PushEvent' },
        { type: 'PullRequestReviewCommentEvent' },
        { type: 'ReleaseEvent' }
      ];

      nock(githubUrl)
        .get('/users/connor/events')
        .reply(200, response);

      return api.getUserEvents('connor')
        .then(events => {
          assert.deepStrictEqual(events, response);
        });
    });

    it('should throw GitHub message when error response is received', () => {
      const response = { message: 'Not Found' };

      nock(githubUrl)
        .get('/users/nonexistent/events')
        .reply(404, response);

      return api.getUserEvents('nonexistent')
        .then(() => {
          assert.fail('promise did not reject');
        }, err => {
          assert.strictEqual(err.message, 'Not Found');
        });
    });
  });
});

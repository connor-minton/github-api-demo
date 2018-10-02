const assert = require('assert');
const config = require('config');
const stat = require('../../../modules/github/stat');

const eventWeights = config.get('eventWeights');

describe('github.stat', () => {
  describe('.userEventsAvg()', () => {
    it('should throw when passed an empty array', () => {
      assert.throws(() => {
        stat.userEventsAvg([]);
      }, /empty/);
    });

    it('should compute the correct weighted average (1)', () => {
      const data = [
        { type: 'asdf' }, { type: 'foo' }, { type: 'bar' }
      ];
      assert.strictEqual(stat.userEventsAvg(data), 1);
    });

    it('should compute the correct weighted average (2)', () => {
      const data = [
        { type: 'PushEvent' }, { type: 'PullRequestReviewCommentEvent' },
        { type: 'ReleaseEvent' }, { type: 'FooEvent' }
      ];
      const result = (
        eventWeights.PushEvent + eventWeights.PullRequestReviewCommentEvent
        + eventWeights.ReleaseEvent + 1
      ) / 4;

      assert.strictEqual(stat.userEventsAvg(data), result);
    });

    it('should compute the correct weighted average (3)', () => {
      const data = [
        { type: 'PushEvent' }, { type: 'PullRequestReviewCommentEvent' },
        { type: 'PushEvent' }
      ];
      const result = (
        2*eventWeights.PushEvent + eventWeights.PullRequestReviewCommentEvent
      ) / 3;

      assert.strictEqual(stat.userEventsAvg(data), result);
    });

    it('should compute the correct weighted average (4)', () => {
      const data = [
        { type: 'PullRequestReviewCommentEvent' }
      ];
      const result = eventWeights.PullRequestReviewCommentEvent;

      assert.strictEqual(stat.userEventsAvg(data), result);
    });
  });
});

const assert = require('assert');
const math = require('../../modules/math');

describe('math', () => {
  describe('.round()', () => {
    it('should round 1.005 to 1.01', () => {
      assert.strictEqual(math.round(1.005).toString(), '1.01');
    });

    it('should round 1.00499999 to 1', () => {
      assert.strictEqual(math.round(1.00499999).toString(), '1');
    });

    it('should round 83.555 to 83.56', () => {
      assert.strictEqual(math.round(83.555).toString(), '83.56');
    });
  });
});

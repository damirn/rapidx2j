var assert = require('assert'),
    r = require('../build/Release/rapidx2j'),
    x = '<a><b>123   </b><c>     abc</c><d>   true      </d></a>';

describe('trim values', function () {
    it('should trim & parser all values', function () {
        var o = r.parse(x);

        assert.equal(o.b, 123);
        assert.equal(o.c, 'abc');
        assert.equal(o.d, true);
    });
});

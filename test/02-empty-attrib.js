var assert = require('assert'),
    r = require('../build/Release/rapidx2j'),
    x = '<a><b c=""></b></a>';

describe('empty attr', function () {
    it('should assign "null" to empty attribute', function () {
        var o = r.parse(x);
        assert(o.b['@c'] === null);
    });
});

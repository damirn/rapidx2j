var assert = require('assert'),
    r = require('../build/Release/rapidx2j');

describe('bignumb', function () {
    it('should return Infinity', function () {
        var o = r.parse('<x><a>69439e4437049853</a></x>');
        assert(!isFinite(o.a));
    });

    it('should return MAX SAFE INTEGER', function () {
        var o = r.parse('<x><a>' + Number.MAX_SAFE_INTEGER + '</a></x>');
        assert(o.a === Number.MAX_SAFE_INTEGER);
    });
});

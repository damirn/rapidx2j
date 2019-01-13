var assert = require('assert'),
    r = require('../build/Release/rapidx2j'),
    x = '<x><a>3.14159</a><B>123</B><c>true</c><d>false</d></x>';

describe('preserve_case', function () {
    it('should preserve case, preserve_case = true', function () {
        var oPreserve = r.parse(x, { preserve_case: true });
        assert('B' in oPreserve);
    });
    it('should not preserve case, preserve_case = false', function () {
        var oNoPreserve = r.parse(x, { preserve_case: false });
        assert('b' in oNoPreserve);
    });
});

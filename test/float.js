var assert = require('assert'),
    r = require('../build/Release/rapidx2j'),
    x = '<x><a>3.14159</a><b>123</b></x>';

describe('parse_float_numbers', function () {
    it('should parse value as float, parse_float_numbers = true', function () {
        var o = r.parse(x);

        assert.equal(typeof o.a, 'number');
        assert.equal(o.a, 3.14159);
        assert.equal(o.b, 123);
    });

    it('should not parse value as float, parse_float_numbers = false', function () {
        var o = r.parse(x, { parse_float_numbers: false });
        assert.equal(typeof o.a, 'string');
        assert.equal(o.a, '3.14159');
    });
});

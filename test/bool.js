var assert = require('assert'),
    r = require('../build/Release/rapidx2j'),
    x = '<x><a>3.14159</a><b>123</b><c>true</c><d>false</d></x>';

describe('parse_boolean_values', function () {
    it('should parse boolean values, parse_boolean_values = true', function () {
        var oParseBool = r.parse(x, {parse_boolean_values: true});
        assert(oParseBool.c === true);
    });

    it('should not parse boolean values, parse_boolean_values = false', function () {
        var oNoParseBool = r.parse(x, {parse_boolean_values: false});
        assert(oNoParseBool.c === 'true');
    });
});


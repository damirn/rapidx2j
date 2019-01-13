var assert = require('assert'),
    r = require('../build/Release/rapidx2j'),
    x = '<x><a attr1="a" attr2="b">val</a></x>';

describe('value_key', function () {
    it('should set key for value, value_key = &', function () {
        var oValueKey = r.parse(x, { value_key: '&' });
        assert('&' in oValueKey.a);
    });

    it('should not set key for value, value_key is undefined', function () {
        var oNoValueKey = r.parse(x);
        assert('keyValue' in oNoValueKey.a);
    });
});

var assert = require('assert'),
    r = require('../build/Release/rapidx2j'),
    x = '<x><a attr1="a" attr2="b">val</a></x>';

describe('attr_prefix', function () {
    it('should add prefix to attributes, attr_prefix = "_"', function () {
        var oAttrPrefix = r.parse(x, { attr_prefix: '_' });
        assert('_attr1' in oAttrPrefix.a && '_attr2' in oAttrPrefix.a);
    });

    it('should not add prefix to attributes, attr_prefix = "@" by default', function () {
        var oAttrNoPrefix = r.parse(x);
        assert('@attr1' in oAttrNoPrefix.a && '@attr2' in oAttrNoPrefix.a);
    });
});


var assert = require('assert'),
    r = require('../build/Release/rapidx2j'),
    x = '<x><a attr1="a" attr2="b">val</a></x>';

describe('attr_group', function () {
    it('should group by attribute prefix, attr_group = true, prefix = "@"', function () {
        var oGroupAttr = r.parse(x, { attr_group: true });
        assert('attr1' in oGroupAttr.a['@'] && 'attr2' in oGroupAttr.a['@']);
    });

    it('should group by attribute prefix, attr_group = false', function () {
        var oNoGroupAttr = r.parse(x, { attr_group: false });
        assert('@attr1' in oNoGroupAttr.a && '@attr2' in oNoGroupAttr.a);
    });
});


var assert = require('assert');
var r = require('../build/Release/rapidx2j');
var x = '<x><a attr1="a" attr2="b">val</a></x>';

describe('ignore_attr', function () {
    it('should ignore any attributes, ignore_attr = true', function () {
        var oAttrIgnore = r.parse(x, { ignore_attr: true });
        assert(typeof oAttrIgnore.a === 'string');
    });

    it('should not ignore attributes, ignore_attr = false', function () {
        var oAttrNoIgnore = r.parse(x);
        assert('@attr1' in oAttrNoIgnore.a && '@attr2' in oAttrNoIgnore.a);
    });
});

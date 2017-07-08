var assert = require('assert'),
    r = require('../build/Release/rapidx2j'),
    x = '<x><a attr1="a" attr2="b">val</a></x>';

var oAttrPrefix = r.parse(x, { attr_prefix: '_' });
var oAttrNoPrefix = r.parse(x);

assert('_attr1' in oAttrPrefix.a && '_attr2' in oAttrPrefix.a);
assert('@attr1' in oAttrNoPrefix.a && '@attr2' in oAttrNoPrefix.a);


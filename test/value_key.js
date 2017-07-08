var assert = require('assert'),
    r = require('../build/Release/rapidx2j'),
    x = '<x><a attr1="a" attr2="b">val</a></x>';

var oValueKey = r.parse(x, { value_key: '&' });
var oNoValueKey = r.parse(x);

assert('&' in oValueKey.a);
assert('keyValue' in oNoValueKey.a);


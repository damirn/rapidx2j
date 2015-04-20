var assert = require('assert'),
    r = require('../build/Release/rapidx2j'),
    x = '<x><a>3.14159</a><b>123</b><c>true</c><d>false</d></x>';

var o = r.parse(x);

assert.equal(o.a, 3.14159);
assert.equal(o.b, 123);
assert.equal(o.c, true);
assert.equal(o.d, false);

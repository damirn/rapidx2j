var assert = require('assert'),
    r = require('../build/Release/rapidx2j'),
    x = '<x><a>3.14159</a><b>123</b></x>';

var o = r.parse(x);

assert.equal(typeof o.a, 'number');
assert.equal(o.a, 3.14159);
assert.equal(o.b, 123);

o = r.parse(x, { parse_float_numbers: false });
assert.equal(typeof o.a, 'string');
assert.equal(o.a, '3.14159');

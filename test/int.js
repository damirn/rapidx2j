var assert = require('assert'),
    r = require('../build/Release/rapidx2j'),
    x = '<x><a>1</a><b>10</b></x>';

var o = r.parse(x);

assert.equal(o.a, 1);
assert.equal(o.b, 10);

o = r.parse(x, { parse_int_numbers: false });
assert.equal(o.a, '1');
assert.equal(o.b, '10');

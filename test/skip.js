var assert = require('assert'),
    r = require('../build/Release/rapidx2j'),
    x = '<x><a>01</a><b>+2</b></x>';

var o = r.parse(x, { skip_parse_when_begins_with: '0+' });

assert.equal(typeof o.a, 'string');
assert.equal(o.a, '01');
assert.equal(o.b, '+2');

o = r.parse(x);
assert.equal(typeof o.a, 'number');
assert.equal(o.a, 1);
assert.equal(o.b, 2);

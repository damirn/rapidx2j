var assert = require('assert'),
    r = require('../build/Release/rapidx2j'),
    x = '<x><a>3.14159</a><B>123</B><c>true</c><d>false</d></x>';

var oPreserve = r.parse(x, { preserve_case: true });
var oNoPreserve = r.parse(x, { preserve_case: false });

assert('B' in oPreserve);
assert('b' in oNoPreserve);


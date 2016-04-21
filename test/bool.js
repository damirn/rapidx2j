var assert = require('assert'),
    r = require('../build/Release/rapidx2j'),
    x = '<x><a>3.14159</a><b>123</b><c>true</c><d>false</d></x>';

var oParseBool = r.parse(x, { parse_boolean_values: true });
var oNoParseBool = r.parse(x, { parse_boolean_values: false });

assert(oParseBool.c === true);
assert(oNoParseBool.c === 'true');


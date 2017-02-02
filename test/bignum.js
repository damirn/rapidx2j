var assert = require('assert'),
    r = require('../build/Release/rapidx2j'),
    x = '<x><a>69439e4437049853</a></x>';

var o = r.parse(x);
console.log(o.a);

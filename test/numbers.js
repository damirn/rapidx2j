var r = require('../build/Release/rapidx2j'),
    x = '<x><a>3.14159</a><b>123</b><c>0</c><d>1.00</d></x>';

var o = r.parse(x);
console.log(o);

o = r.parse(x, { parse_float_numbers: false });
console.log(o);

o = r.parse(x, { parse_int_numbers: false });
console.log(o);

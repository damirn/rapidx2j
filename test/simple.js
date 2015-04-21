var r = require('../build/Release/rapidx2j'),
    x = '<a><b>123</b><c a1="abc" a2="xyz">x</c></a>';

console.log(r.parse(x));

const r = require('../build/Release/rapidx2j');
const x = '<a><b>123</b><b>abc</b></a>';
const y = '<a><b>123</b></a>';

console.log(r.parse(x));
console.log(r.parse(y));
console.log(r.parse(y, { explicit_array: true }));

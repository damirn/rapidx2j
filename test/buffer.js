var fs = require('fs')
var r = require('../build/Release/rapidx2j')
var buffer = fs.readFileSync('test.xml')
var o = r.parse(buffer)
console.log(o)


var assert = require('assert');
var fs = require('fs');
var r = require('../build/Release/rapidx2j');
var buffer = fs.readFileSync(__dirname + '/test.xml');

describe('Buffer as input value', function () {
    it('should parse buffer', function () {
        var o = r.parse(buffer);
        assert(typeof o.b === 'string' && o.b === 'hello');
    });
});

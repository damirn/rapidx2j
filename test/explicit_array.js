var r = require('../build/Release/rapidx2j');
var assert = require('assert');
var x = '<a><b>123</b><b>abc</b></a>';
var y = '<a><b>123</b></a>';

describe('explicit_array', function () {
    it('should return an array for multiple tags', function () {
        var o = r.parse(x);
        assert(isArray(o.b));
    });
    it('should return an array even if single tag, explicit_array = true', function () {
        var b = r.parse(y);
        var o = r.parse(y, { explicit_array: true });
        assert(!isArray(b.b));
        assert(isArray(o.b));
    });
});

function isArray(val) {
    return Object.prototype.toString.call(val) === '[object Array]';
}

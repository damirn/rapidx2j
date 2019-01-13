'use strict';

const r = require('../index');
const assert = require('assert');

describe('explicit_array', () => {
    it('should return an array for multiple tags', () => {
        const x = '<a><b>123</b><b>abc</b></a>';
        const o = r.parse(x);
        assert(isArray(o.b));
    });
    it('should return an array even if single tag, explicit_array = true', () => {
        const y = '<a><b>123</b></a>';
        const b = r.parse(y);
        const o = r.parse(y, { explicit_array: true });
        assert(!isArray(b.b));
        assert(isArray(o.b));
    });
});

function isArray(val) {
    return Object.prototype.toString.call(val) === '[object Array]';
}

'use strict';

const assert = require('assert');
const r = require('../index');
const x = '<x><a>3.14159</a><B>123</B><c>true</c><d>false</d></x>';

describe('preserve_case', () => {
    it('should preserve case, preserve_case = true', () => {
        const oPreserve = r.parse(x, { preserve_case: true });
        assert('B' in oPreserve);
    });
    it('should not preserve case, preserve_case = false', () => {
        const oNoPreserve = r.parse(x, { preserve_case: false });
        assert('b' in oNoPreserve);
    });
});

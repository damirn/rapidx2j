'use strict';

const assert = require('assert');
const r = require('../index');

describe('bignumb', () => {
    it('should return Infinity', () => {
        const o = r.parse('<x><a>69439e4437049853</a></x>');
        assert(!isFinite(o.a));
    });

    it('should return MAX SAFE INTEGER', () => {
        const o = r.parse('<x><a>' + Number.MAX_SAFE_INTEGER + '</a></x>');
        assert(o.a === Number.MAX_SAFE_INTEGER);
    });
});

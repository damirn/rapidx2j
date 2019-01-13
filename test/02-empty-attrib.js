'use strict';

const assert = require('assert');
const r = require('../build/Release/rapidx2j');
const x = '<a><b c=""></b></a>';

describe('empty attr', () => {
    it('should assign "null" to empty attribute', () => {
        const o = r.parse(x);
        assert(o.b['@c'] === null);
    });
});

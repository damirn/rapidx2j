'use strict';

const assert = require('assert');
const r = require('../index');
const x = '<a><b c=""></b></a>';

describe('empty attr', () => {
    it('should assign "null" to an empty attribute', () => {
        const o = r.parse(x);
        assert(o.b['@c'] === null);
    });
});

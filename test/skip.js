'use strict';

const assert = require('assert');
const r = require('../index');
const x = '<x><a>01</a><b>+2</b></x>';

describe('skip_parse_when_begins_with', () => {
    it('should skip parsing values whose text starts with the prefix', () => {
        const o = r.parse(x, { skip_parse_when_begins_with: '0' });

        assert.equal(typeof o.a, 'string');
        assert.equal(o.a, '01');
        assert.equal(typeof o.b, 'number');
        assert.equal(o.b, 2);
    });

    it('should parse all values', () => {
        const o = r.parse(x);
        assert.equal(typeof o.a, 'number');
        assert.equal(o.a, 1);
        assert.equal(o.b, 2);
    });
});

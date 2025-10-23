'use strict';

const assert = require('assert');
const r = require('../index');
const x = '<x><a>01</a><b>+2</b></x>';

describe('skip_parse_when_begins_with', () => {
    it('should skip parsing values that begin with "01" or "+2"', () => {
        const o = r.parse(x, { skip_parse_when_begins_with: '0+' });

        assert.equal(typeof o.a, 'string');
        assert.equal(o.a, '01');
        assert.equal(o.b, '+2');

    });

    it('should parse all values', () => {
        const o = r.parse(x);
        assert.equal(typeof o.a, 'number');
        assert.equal(o.a, 1);
        assert.equal(o.b, 2);
    });
});

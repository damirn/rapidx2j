'use strict';

const assert = require('assert');
const r = require('../index');

describe('empty_tag_value', () => {
    it('should return defined empty value', () => {
        const x = '<a><b></b></a>';
        const a = r.parse(x, { empty_tag_value: null }),
            b = r.parse(x),
            c = r.parse(x, {});

        assert.equal(a.b, null);
        assert.equal(b.b, true);
        assert.equal(c.b, true);
    });
});

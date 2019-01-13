'use strict';

const assert = require('assert');
const r = require('../index');
const x = '<a><b>123   </b><c>     abc</c><d>   true      </d></a>';

describe('trim values', () => {
    it('should trim & parser all values', () => {
        const o = r.parse(x);

        assert.equal(o.b, 123);
        assert.equal(o.c, 'abc');
        assert.equal(o.d, true);
    });
});

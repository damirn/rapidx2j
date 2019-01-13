'use strict';

const assert = require('assert');
const r = require('../index');
const x = '<x><a attr1="a" attr2="b">val</a></x>';

describe('attr_prefix', () => {
    it('should add prefix to attributes, attr_prefix = "_"', () => {
        const oAttrPrefix = r.parse(x, { attr_prefix: '_' });
        assert('_attr1' in oAttrPrefix.a && '_attr2' in oAttrPrefix.a);
    });

    it('should not add prefix to attributes, attr_prefix = "@" by default', () => {
        const oAttrNoPrefix = r.parse(x);
        assert('@attr1' in oAttrNoPrefix.a && '@attr2' in oAttrNoPrefix.a);
    });
});


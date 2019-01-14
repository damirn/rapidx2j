'use strict';

const assert = require('assert');
const r = require('../index');
const x = '<x><a attr1="a" attr2="b">val</a></x>';

describe('ignore_attr', () => {
    it('should ignore any attributes, ignore_attr = true', () => {
        const oAttrIgnore = r.parse(x, { ignore_attr: true });
        assert(typeof oAttrIgnore.a === 'string');
    });

    it('should not ignore attributes, ignore_attr = false', () => {
        const oAttrNoIgnore = r.parse(x);
        assert('@attr1' in oAttrNoIgnore.a && '@attr2' in oAttrNoIgnore.a);
    });
});

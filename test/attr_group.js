'use strict';

const assert = require('assert');
const r = require('../index');
const x = '<x><a attr1="a" attr2="b">val</a></x>';

describe('attr_group', () => {
    it('should group by attribute prefix, attr_group = true, prefix = "@"', () => {
        const oGroupAttr = r.parse(x, { attr_group: true });
        assert('attr1' in oGroupAttr.a['@'] && 'attr2' in oGroupAttr.a['@']);
    });

    it('should group by attribute prefix, attr_group = false', () => {
        const oNoGroupAttr = r.parse(x, { attr_group: false });
        assert('@attr1' in oNoGroupAttr.a && '@attr2' in oNoGroupAttr.a);
    });
});


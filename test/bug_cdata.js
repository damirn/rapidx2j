'use strict';

const assert = require('assert');
const r = require('../index');

describe('CDATA content (bug 2)', () => {
    it('should return the CDATA payload as the element value', () => {
        const xml = '<root><msg><![CDATA[hello & <world>]]></msg></root>';
        const o = r.parse(xml);
        assert.equal(o.msg, 'hello & <world>');
    });

    it('should preserve CDATA payload alongside sibling text', () => {
        const xml = '<root><msg>before<![CDATA[CDATA-bit]]>after</msg></root>';
        const o = r.parse(xml);
        assert.equal(o.msg, 'beforeCDATA-bitafter');
    });
});

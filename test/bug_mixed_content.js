'use strict';

const assert = require('assert');
const r = require('../index');

describe('mixed text/element content (bug 1)', () => {
    it('should concatenate text fragments around inline elements', () => {
        const xml = '<root><a>hello<b/>world</a></root>';
        const o = r.parse(xml);
        assert.equal(o.a.keyValue, 'helloworld');
    });

    it('should keep three text fragments around two inline elements', () => {
        const xml = '<root><a>one<b/>two<c/>three</a></root>';
        const o = r.parse(xml);
        assert.equal(o.a.keyValue, 'onetwothree');
    });
});

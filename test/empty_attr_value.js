'use strict';

const rapidx2j = require('../index');
const assert = require('assert');

describe('empty_attr_value', () => {
    const xml = '<a><b empty_attr="" filled_attr="value"></b></a>';

    it('should return null for empty attributes by default', () => {
        const json = rapidx2j.parse(xml);
        assert.strictEqual(json.b['@empty_attr'], null);
        assert.strictEqual(json.b['@filled_attr'], 'value');
    });

    it('should return empty string when empty_attr_value = ""', () => {
        const json = rapidx2j.parse(xml, { empty_attr_value: '' });
        assert.strictEqual(json.b['@empty_attr'], '');
        assert.strictEqual(json.b['@filled_attr'], 'value');
    });

    it('should return false when empty_attr_value = false', () => {
        const json = rapidx2j.parse(xml, { empty_attr_value: false });
        assert.strictEqual(json.b['@empty_attr'], false);
        assert.strictEqual(json.b['@filled_attr'], 'value');
    });

    it('should return custom string when empty_attr_value = "EMPTY"', () => {
        const json = rapidx2j.parse(xml, { empty_attr_value: 'EMPTY' });
        assert.strictEqual(json.b['@empty_attr'], 'EMPTY');
        assert.strictEqual(json.b['@filled_attr'], 'value');
    });

    it('should return 0 when empty_attr_value = 0', () => {
        const json = rapidx2j.parse(xml, { empty_attr_value: 0 });
        assert.strictEqual(json.b['@empty_attr'], 0);
        assert.strictEqual(json.b['@filled_attr'], 'value');
    });

    it('should work independently from empty_tag_value', () => {
        const xml2 = '<a><b empty_attr=""></b><c></c></a>';
        const json = rapidx2j.parse(xml2, {
            empty_tag_value: 'TAG',
            empty_attr_value: 'ATTR'
        });
        assert.strictEqual(json.b['@empty_attr'], 'ATTR');
        assert.strictEqual(json.c, 'TAG');
    });

    it('should work in async mode', done => {
        rapidx2j.parse(xml, { empty_attr_value: 'ASYNC' }, (err, json) => {
            assert.strictEqual(json.b['@empty_attr'], 'ASYNC');
            assert.strictEqual(json.b['@filled_attr'], 'value');
            done();
        });
    });

    it('should work with attr_group option', () => {
        const json = rapidx2j.parse(xml, {
            empty_attr_value: 'GROUPED',
            attr_group: true
        });
        assert.strictEqual(json.b['@']['empty_attr'], 'GROUPED');
        assert.strictEqual(json.b['@']['filled_attr'], 'value');
    });

    it('should work with different attr_prefix', () => {
        const json = rapidx2j.parse(xml, {
            empty_attr_value: 'PREFIX',
            attr_prefix: '_'
        });
        assert.strictEqual(json.b['_empty_attr'], 'PREFIX');
        assert.strictEqual(json.b['_filled_attr'], 'value');
    });
});

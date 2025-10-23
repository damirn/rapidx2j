'use strict';

const rapidx2j = require('../index');
const assert = require('assert');

describe('explicit_object', () => {
    it('should return a string for text-only elements by default', () => {
        const xml = '<root><item>text content</item></root>';
        const json = rapidx2j.parse(xml);
        assert.strictEqual(typeof json.item, 'string');
        assert.strictEqual(json.item, 'text content');
    });

    it('should return a string when explicit_object = false', () => {
        const xml = '<root><item>text content</item></root>';
        const json = rapidx2j.parse(xml, { explicit_object: false });
        assert.strictEqual(typeof json.item, 'string');
        assert.strictEqual(json.item, 'text content');
    });

    it('should return an object with keyValue when explicit_object = true', () => {
        const xml = '<root><item>text content</item></root>';
        const json = rapidx2j.parse(xml, { explicit_object: true });
        assert.strictEqual(typeof json.item, 'object');
        assert.strictEqual(json.item.keyValue, 'text content');
    });

    it('should always return an object for elements with attributes', () => {
        const xml = '<root><item attr="value">text content</item></root>';

        // Without explicit_object
        const json1 = rapidx2j.parse(xml);
        assert.strictEqual(typeof json1.item, 'object');
        assert.strictEqual(json1.item['@attr'], 'value');
        assert.strictEqual(json1.item.keyValue, 'text content');

        // With explicit_object (should be the same)
        const json2 = rapidx2j.parse(xml, { explicit_object: true });
        assert.strictEqual(typeof json2.item, 'object');
        assert.strictEqual(json2.item['@attr'], 'value');
        assert.strictEqual(json2.item.keyValue, 'text content');
    });

    it('should handle multiple text-only elements', () => {
        const xml = '<root><a>first</a><b>second</b><c>third</c></root>';
        const json = rapidx2j.parse(xml, { explicit_object: true });

        assert.strictEqual(typeof json.a, 'object');
        assert.strictEqual(json.a.keyValue, 'first');

        assert.strictEqual(typeof json.b, 'object');
        assert.strictEqual(json.b.keyValue, 'second');

        assert.strictEqual(typeof json.c, 'object');
        assert.strictEqual(json.c.keyValue, 'third');
    });

    it('should respect custom value_key option', () => {
        const xml = '<root><item>text content</item></root>';
        const json = rapidx2j.parse(xml, { explicit_object: true, value_key: 'text' });
        assert.strictEqual(typeof json.item, 'object');
        assert.strictEqual(json.item.text, 'text content');
        assert.strictEqual(json.item.keyValue, undefined);
    });

    it('should work with numeric values', () => {
        const xml = '<root><number>123</number></root>';
        const json = rapidx2j.parse(xml, { explicit_object: true });
        assert.strictEqual(typeof json.number, 'object');
        assert.strictEqual(json.number.keyValue, 123);
    });

    it('should work with boolean values', () => {
        const xml = '<root><bool>true</bool></root>';
        const json = rapidx2j.parse(xml, { explicit_object: true });
        assert.strictEqual(typeof json.bool, 'object');
        assert.strictEqual(json.bool.keyValue, true);
    });

    it('should handle mixed elements (some with attributes, some without)', () => {
        const xml = '<root><plain>text</plain><withAttr attr="val">text2</withAttr></root>';
        const json = rapidx2j.parse(xml, { explicit_object: true });

        // Both should be objects
        assert.strictEqual(typeof json.plain, 'object');
        assert.strictEqual(json.plain.keyValue, 'text');

        assert.strictEqual(typeof json.withattr, 'object');
        assert.strictEqual(json.withattr['@attr'], 'val');
        assert.strictEqual(json.withattr.keyValue, 'text2');
    });

    it('should work in async mode', done => {
        const xml = '<root><item>async text</item></root>';
        rapidx2j.parse(xml, { explicit_object: true }, (err, json) => {
            assert.strictEqual(typeof json.item, 'object');
            assert.strictEqual(json.item.keyValue, 'async text');
            done();
        });
    });

    it.skip('should work with parseAsync', async () => {
        const xml = '<root><item>promise text</item></root>';
        const json = await rapidx2j.parseAsync(xml, { explicit_object: true });
        assert.strictEqual(typeof json.item, 'object');
        assert.strictEqual(json.item.keyValue, 'promise text');
    });

    it('should not affect elements with child elements', () => {
        const xml = '<root><parent><child>text</child></parent></root>';
        const json = rapidx2j.parse(xml, { explicit_object: true });

        // Parent should be an object with child property
        assert.strictEqual(typeof json.parent, 'object');
        assert.strictEqual(typeof json.parent.child, 'object');
        assert.strictEqual(json.parent.child.keyValue, 'text');
    });

    it('should work with explicit_array option', () => {
        const xml = '<root><item>text</item></root>';
        const json = rapidx2j.parse(xml, { explicit_object: true, explicit_array: true });

        assert(Array.isArray(json.item));
        assert.strictEqual(json.item.length, 1);
        assert.strictEqual(typeof json.item[0], 'object');
        assert.strictEqual(json.item[0].keyValue, 'text');
    });

    it('should work with include_root option', () => {
        const xml = '<root><item>text</item></root>';
        const json = rapidx2j.parse(xml, { explicit_object: true, include_root: true });

        assert.strictEqual(typeof json.root, 'object');
        assert.strictEqual(typeof json.root.item, 'object');
        assert.strictEqual(json.root.item.keyValue, 'text');
    });

    it('should handle empty text nodes consistently', () => {
        const xml = '<root><empty></empty></root>';

        // Without explicit_object
        const json1 = rapidx2j.parse(xml);
        assert.strictEqual(json1.empty, true); // Default empty_tag_value

        // With explicit_object - should still use empty_tag_value, not create object
        const json2 = rapidx2j.parse(xml, { explicit_object: true });
        assert.strictEqual(json2.empty, true);
    });

    it('should work with whitespace-only content', () => {
        const xml = '<root><item>   </item></root>';
        const json = rapidx2j.parse(xml, { explicit_object: true });

        // Whitespace-only is treated as empty, uses empty_tag_value
        assert.strictEqual(json.item, true);
    });
});

'use strict';

const rapidx2j = require('../index');
const assert = require('assert');

describe('parseAsync', () => {
    const xml = '<root><item>value</item><number>123</number></root>';

    it('should return a Promise', () => {
        const result = rapidx2j.parseAsync(xml);
        assert(result instanceof Promise, 'parseAsync should return a Promise');
    });

    it('should parse XML and resolve with the result', async () => {
        const json = await rapidx2j.parseAsync(xml);
        assert.strictEqual(json.item, 'value');
        assert.strictEqual(json.number, 123);
    });

    it('should work with options', async () => {
        const json = await rapidx2j.parseAsync(xml, { include_root: true });
        assert.strictEqual(json.root.item, 'value');
        assert.strictEqual(json.root.number, 123);
    });

    it('should respect the parse_int_numbers option', async () => {
        const json = await rapidx2j.parseAsync(xml, { parse_int_numbers: false });
        assert.strictEqual(json.item, 'value');
        assert.strictEqual(json.number, '123');
        assert.strictEqual(typeof json.number, 'string');
    });

    it('should respect the empty_tag_value option', async () => {
        const emptyXml = '<root><empty></empty></root>';
        const json = await rapidx2j.parseAsync(emptyXml, { empty_tag_value: null });
        assert.strictEqual(json.empty, null);
    });

    it('should respect the empty_attr_value option', async () => {
        const attrXml = '<root><item attr=""></item></root>';
        const json = await rapidx2j.parseAsync(attrXml, { empty_attr_value: '' });
        assert.strictEqual(json.item['@attr'], '');
    });

    it('should reject on invalid XML', async () => {
        try {
            await rapidx2j.parseAsync('<invalid>xml');
            assert.fail('Should have thrown an error');
        } catch (err) {
            // Expected error
            assert(err !== undefined);
        }
    });

    it('should work without the options parameter', async () => {
        const json = await rapidx2j.parseAsync(xml);
        assert.strictEqual(json.item, 'value');
    });

    it('should work with Buffer input', async () => {
        const buffer = Buffer.from(xml);
        const json = await rapidx2j.parseAsync(buffer);
        assert.strictEqual(json.item, 'value');
        assert.strictEqual(json.number, 123);
    });

    it('should handle complex XML', async () => {
        const complexXml = '<root><items><item id="1">first</item><item id="2">second</item></items></root>';
        const json = await rapidx2j.parseAsync(complexXml);
        assert(Array.isArray(json.items.item));
        assert.strictEqual(json.items.item.length, 2);
        assert.strictEqual(json.items.item[0]['@id'], 1); // Attributes are parsed as numbers by default
        assert.strictEqual(json.items.item[1]['@id'], 2);
    });
});

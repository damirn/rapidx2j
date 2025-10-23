'use strict';

const rapidx2j = require('../index');
const assert = require('assert');

describe('include_root', () => {
    it('should not include root tag by default', done => {
        const xml = '<root><child>value</child></root>';
        rapidx2j.parse(xml, (err, json) => {
            assert.strictEqual(json.child, 'value');
            assert.strictEqual(json.root, undefined);
            done();
        });
    });

    it('should not include root tag when include_root = false', done => {
        const xml = '<root><child>value</child></root>';
        const options = {
            include_root: false
        };
        rapidx2j.parse(xml, options, (err, json) => {
            assert.strictEqual(json.child, 'value');
            assert.strictEqual(json.root, undefined);
            done();
        });
    });

    it('should include root tag when include_root = true', done => {
        const xml = '<root><child>value</child></root>';
        const options = {
            include_root: true
        };
        rapidx2j.parse(xml, options, (err, json) => {
            assert.strictEqual(json.root.child, 'value');
            done();
        });
    });

    it('should include root tag in sync mode when include_root = true', () => {
        const xml = '<root><child>value</child></root>';
        const options = {
            include_root: true
        };
        const json = rapidx2j.parse(xml, options);
        assert.strictEqual(json.root.child, 'value');
    });

    it('should include root tag with multiple children', () => {
        const xml = '<root><child1>value1</child1><child2>value2</child2></root>';
        const options = {
            include_root: true
        };
        const json = rapidx2j.parse(xml, options);
        assert.strictEqual(json.root.child1, 'value1');
        assert.strictEqual(json.root.child2, 'value2');
    });

    it('should include root tag with attributes', () => {
        const xml = '<root attr="test"><child>value</child></root>';
        const options = {
            include_root: true
        };
        const json = rapidx2j.parse(xml, options);
        assert.strictEqual(json.root['@attr'], 'test');
        assert.strictEqual(json.root.child, 'value');
    });

    it('should preserve root tag case when preserve_case = true', () => {
        const xml = '<MyRoot><Child>value</Child></MyRoot>';
        const options = {
            include_root: true,
            preserve_case: true
        };
        const json = rapidx2j.parse(xml, options);
        assert.strictEqual(json.MyRoot.Child, 'value');
    });

    it('should lowercase root tag when preserve_case = false', () => {
        const xml = '<MyRoot><Child>value</Child></MyRoot>';
        const options = {
            include_root: true,
            preserve_case: false
        };
        const json = rapidx2j.parse(xml, options);
        assert.strictEqual(json.myroot.child, 'value');
    });
});

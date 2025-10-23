'use strict';

const rapidx2j = require('../index');
const assert = require('assert');

describe('Number parsing with mixed options', () => {
    const xml = '<x><a>3.141</a><b>123</b><c>0x40</c><d>1.00</d></x>';

    it('should parse all numbers with default options', () => {
        const json = rapidx2j.parse(xml);
        assert.strictEqual(json.a, 3.141);
        assert.strictEqual(json.b, 123);
        assert.strictEqual(json.c, 64); // 0x40 in hex
        assert.strictEqual(json.d, 1);
    });

    it('should NOT parse floats when parse_float_numbers = false', () => {
        const json = rapidx2j.parse(xml, { parse_float_numbers: false });
        assert.strictEqual(json.a, '3.141');
        assert.strictEqual(json.b, 123);
        assert.strictEqual(json.c, '0x40'); // hex not parsed as int
        assert.strictEqual(json.d, '1.00');
    });

    it('should NOT parse integers when parse_int_numbers = false', () => {
        const json = rapidx2j.parse(xml, { parse_int_numbers: false });
        assert.strictEqual(json.a, 3.141); // float should still parse (has decimal point)
        assert.strictEqual(json.b, '123', 'Integer should be string when parse_int_numbers is false');
        assert.strictEqual(json.c, '0x40', 'Hex should be string when parse_int_numbers is false');
        assert.strictEqual(json.d, 1, '1.00 has decimal point so it is a float, should parse even when parse_int_numbers is false');
    });

    it('should not parse any numbers when both are false', () => {
        const json = rapidx2j.parse(xml, {
            parse_int_numbers: false,
            parse_float_numbers: false
        });
        assert.strictEqual(json.a, '3.141');
        assert.strictEqual(json.b, '123');
        assert.strictEqual(json.c, '0x40');
        assert.strictEqual(json.d, '1.00');
    });
});

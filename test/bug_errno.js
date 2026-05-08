'use strict';

const assert = require('assert');
const r = require('../index');

// C `long` is 32-bit on Windows (even on x64) and on 32-bit Unix; 64-bit elsewhere.
// LONG_MAX must match the platform so strtol returns it without overflowing.
function platformLongMax() {
    if (process.platform === 'win32') return '2147483647';
    if (process.arch === 'ia32' || process.arch === 'arm') return '2147483647';
    return '9223372036854775807';
}

describe('strtol errno isolation (bug 5)', () => {
    it('should parse a LONG_MAX value as a number even after a previous overflow set errno=ERANGE', () => {
        // First value overflows long; second equals LONG_MAX exactly.
        // Without resetting errno between strtol calls, the second value is
        // mis-rejected as overflow and returned as a string.
        const xml = `<root><big>99999999999999999999</big><max>${platformLongMax()}</max></root>`;
        const o = r.parse(xml, { parse_int_numbers: true, parse_float_numbers: false });
        assert.equal(typeof o.big, 'string');
        assert.equal(typeof o.max, 'number');
    });
});

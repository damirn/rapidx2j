'use strict';

const assert = require('assert');
const r = require('../index');

describe('skip_parse_when_begins_with prefix semantics (bug 3)', () => {
    it('should skip values whose text starts with the full prefix string', () => {
        const xml = '<x><a>NA123</a><b>NB456</b></x>';
        const o = r.parse(xml, { skip_parse_when_begins_with: 'NA' });
        assert.equal(o.a, 'NA123');
        assert.equal(typeof o.b, 'string');
        assert.equal(o.b, 'NB456');
    });

    it('should not match a value that only shares the first character of the prefix', () => {
        const xml = '<x><a>1234</a></x>';
        const o = r.parse(xml, { skip_parse_when_begins_with: '12X' });
        assert.equal(typeof o.a, 'number');
        assert.equal(o.a, 1234);
    });

    it('should treat the prefix as a literal string, not a character set', () => {
        const xml = '<x><a>+5</a></x>';
        const o = r.parse(xml, { skip_parse_when_begins_with: 'XYZ' });
        assert.equal(typeof o.a, 'number');
        assert.equal(o.a, 5);
    });
});

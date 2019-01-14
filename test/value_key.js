'use strict';

const assert = require('assert');
const r = require('../index');
const x = '<x><a attr1="a" attr2="b">val</a></x>';

describe('value_key', () => {
    it('should set key for value, value_key = &', () => {
        const oValueKey = r.parse(x, { value_key: '&' });
        assert('&' in oValueKey.a);
    });

    it('should not set key for value, value_key is undefined', () => {
        const oNoValueKey = r.parse(x);
        assert('keyValue' in oNoValueKey.a);
    });
});

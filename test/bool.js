'use strict';

const assert = require('assert');
const r = require('../index');
const x = '<x><a>3.14159</a><b>123</b><c>true</c><d>false</d></x>';

describe('parse_boolean_values', () => {
    it('should parse boolean values, parse_boolean_values = true', () => {
        const oParseBool = r.parse(x, {parse_boolean_values: true});
        assert(oParseBool.c === true);
    });

    it('should not parse boolean values, parse_boolean_values = false', () => {
        const oNoParseBool = r.parse(x, {parse_boolean_values: false});
        assert(oNoParseBool.c === 'true');
    });
});


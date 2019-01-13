'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const r = require('../index');
const buffer = fs.readFileSync(path.resolve(__dirname, 'test.xml'));

describe('Buffer as input value', () => {
    it('should parse buffer', () => {
        const o = r.parse(buffer);
        assert(typeof o.b === 'string' && o.b === 'hello');
    });
});

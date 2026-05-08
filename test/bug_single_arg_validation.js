'use strict';

const assert = require('assert');
const native = require('../build/Release/rapidx2j');

describe('single-arg type validation (bug 7)', () => {
    it('should throw when called with a single non-string non-Buffer argument', () => {
        assert.throws(() => native.parse(123), /String|Buffer/);
    });

    it('should throw when called with a single boolean argument', () => {
        assert.throws(() => native.parse(true), /String|Buffer/);
    });

    it('should still accept a string with no options', () => {
        const o = native.parse('<x><a>1</a></x>');
        assert.equal(o.a, 1);
    });
});

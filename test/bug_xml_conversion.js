'use strict';

const assert = require('assert');
const rapidx2j = require('../index');
const native = require('../build/Release/rapidx2j');

// An object whose string conversion throws (issue #72)
const throwingXml = () => ({
    [Symbol.toPrimitive]() { throw new Error('boom-from-toString'); }
});

describe('xml string conversion failure (issue #72)', () => {
    it('native parse should propagate the conversion exception', () => {
        assert.throws(() => native.parse(throwingXml(), {}), /boom-from-toString/);
    });

    it('native parseAsync should propagate the conversion exception and not call back', () => {
        let called = false;
        assert.throws(() => native.parseAsync(throwingXml(), {}, () => { called = true; }),
            /boom-from-toString/);
        return new Promise(resolve => setTimeout(resolve, 20)).then(() => {
            assert.strictEqual(called, false);
        });
    });

    it('should reject objects faking a Buffer constructor name', async () => {
        const fake = throwingXml();
        Object.defineProperty(fake, 'constructor', { value: { name: 'Buffer' } });
        assert.throws(() => rapidx2j.parse(fake), /XML needs to be a string or a buffer/);
        await assert.rejects(rapidx2j.parseAsync(fake), /XML needs to be a string or a buffer/);
    });
});

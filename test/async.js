'use strict';

const assert = require('assert');
const r = require('../index');
const x = '<a b="1"></a>';

describe('async', () => {
    it('should parse value in async mode with defined options', done => {
        r.parse(x, {
            attr_prefix: 'attr1_'
        }, (err, o) => {
            assert.equal(o.attr1_b, 1);
            assert.equal(o.attr2_b, undefined);
            done();
        });
    });

    it('should parse value in async mode without defined options', done => {
        r.parse(x, (err, o) => {
            assert.equal(o['@b'], 1);
            done();
        });
    });
});

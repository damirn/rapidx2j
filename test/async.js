var assert = require('assert'),
    r = require('../index'),
    x = '<a b="1"></a>';

describe('async', function () {
    it('should parse value in async mode with defined options', function (done) {
        r.parse(x, {
            attr_prefix: 'attr1_'
        }, function (err, o) {
            assert.equal(o.attr1_b, 1);
            assert.equal(o.attr2_b, undefined);
            done();
        });
    });

    it('should parse value in async mode without defined options', function (done) {
        r.parse(x, function (err, o) {
            assert.equal(o['@b'], 1);
            done();
        });
    });
});

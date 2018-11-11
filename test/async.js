var assert = require('assert'),
    r = require('../build/Release/rapidx2j'),
	x = '<a b="1"></a>';

r.parseAsync(x, {
	attr_prefix: 'attr1_'
}, function (err, o) {
	assert.equal(o.attr1_b, 1);
	assert.equal(o.attr2_b, undefined);
});

r.parseAsync(x, {
	attr_prefix: 'attr2_'
}, function (err, o) {
	assert.equal(o.attr1_b, undefined);
	assert.equal(o.attr2_b, 1);
});

const assert = require('assert');
const r = require('../build/Release/rapidx2j');
const x = '<x><a attr1="a" attr2="b">val</a></x>';

const oAttrIgnore = r.parse(x, { ignore_attr: true });
const oAttrNoIgnore = r.parse(x);

assert(typeof oAttrIgnore.a === 'string');
assert('@attr1' in oAttrNoIgnore.a && '@attr2' in oAttrNoIgnore.a);


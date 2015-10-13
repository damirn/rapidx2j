//var r = require('../build/Release/rapidx2j'),
var r = require('..'),
    x = '<a><b attrFalse="" attrTest="test"></b><null></null></a>';

console.log(r.parse(x, {
	attr_key:'_', 
	empty_tag_value: null,
	empty_attr_value: false
}));

var native = require('./build/Release/rapidx2j');

exports.parse = function(xml, options) {
  if (typeof options === 'undefined')
    options = { empty_tag_value: true };
  if (typeof options.empty_tag_value === 'undefined')
    options.empty_tag_value == true;
  var res = native.parse(xml, options);
  return res;
}

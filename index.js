var native = require('./build/Release/rapid');

exports.parse = function(xml) {
  var res = native.parse(xml);
  return res;
}

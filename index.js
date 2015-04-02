var native = require('./build/Release/rapidx2j');

exports.parse = function(xml) {
  var res = native.parse(xml);
  return res;
}

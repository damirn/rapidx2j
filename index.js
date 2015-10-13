var native = require('./build/Release/rapidx2j');

const default_options = { empty_tag_value: true, parse_int_numbers: true, parse_float_numbers: true, skip_parse_when_begins_with: '' };

exports.parse = function(xml, options, cb) {
  if (typeof cb === 'undefined') {
    // two params?
    if (typeof options === 'function') {
      // cb with default options
      cb = options;
      options = default_options;
    }
  }
  if (!options || typeof options === 'undefined')
    options = default_options;
  if (typeof options.empty_tag_value === 'undefined')
    options.empty_tag_value = true;
  if (typeof options.parse_int_numbers === 'undefined')
    options.parse_int_numbers = true;
  if (typeof options.parse_float_numbers === 'undefined')
    options.parse_float_numbers = true;
  if (typeof options.skip_parse_when_begins_with === 'undefined')
    options.skip_parse_when_begins_with = '';
  if (typeof cb === 'function')
    return native.parseAsync(xml, options, cb);
  var res = native.parse(xml, options);
  return res;
}

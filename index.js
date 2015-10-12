var native = require('./build/Release/rapidx2j');

exports.parse = function(xml, options, cb) {
  
  // Parse options
  if (typeof options === 'undefined')
    options = { empty_tag_value: true, parse_int_numbers: true, parse_float_numbers: true, skip_parse_when_begins_with: '' };
  if (typeof options.empty_tag_value === 'undefined')
    options.empty_tag_value = true;
  if (typeof options.parse_int_numbers === 'undefined')
    options.parse_int_numbers = true;
  if (typeof options.parse_float_numbers === 'undefined')
    options.parse_float_numbers = true;
  if (typeof options.skip_parse_when_begins_with === 'undefined')
    options.skip_parse_when_begins_with = '';

  // Async: Do we need to call back?    
  if (typeof cb === 'function') {
    process.nextTick(function() {
      try {
        result = native.parse(xml, options);
        cb(null, result);
      } catch (err) {
        cb(err);
      }
    });
  }
  
  // Sync response
  else { 
    var result = native.parse(xml, options);
    return result;
  }
}

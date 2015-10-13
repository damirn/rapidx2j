var native = require('./build/Release/rapidx2j');

const default_options = {
  attr_key: '@', 
  empty_tag_value: true, 
  empty_attr_value: '', 
  parse_int_numbers: true, 
  parse_float_numbers: true, 
  skip_parse_when_begins_with: ''
};

/**
 * Process options and call RapidXML
 *
 * @param {string} xml - The XML to parse.
 * @param {object} [options] - Change default options (optional).
 * @param {function} [callback] - Provide callback for async method (optional).
 */
exports.parse = function() {
  var xml, options, callback;

  // Get arguments
  var args = Array.prototype.slice.call(arguments, 0);

  // xml argument should be string or buffer
  if (typeof args[0] == 'string' || (typeof args[0] == 'object' && args[0].constructor && args[0].constructor.name = 'Buffer'))
    xml = args.shift();
  else
    throw new Error('XML needs to be a string of buffer.');

  // options argument should be any object
  if (typeof args[0] == 'object')
    options = args.shift();
  else
    options = {};

  // options argument
  if (typeof args[0] == 'function')
    callback = args.shift();

  /*
   * Parse options
   */

  // Options needs to be any `object` except not `null`
  if (!options || typeof options === 'undefined')
    options = {};
  // Prepend string for attributes needs to be string
  if (typeof options.attr_key !== 'string')
    options.attr_key = default_options.attr_key;
  // `empty_tag_value` can be anything including `undefined`, but not being defined uses default
  if (!options.hasOwnProperty('empty_tag_value'))
    options.empty_tag_value = default_options.empty_tag_value;
  // `empty_attr_value` can be anything including `undefined`
  if (!options.hasOwnProperty('empty_attr_value'))
    options.empty_attr_value = default_options.empty_attr_value;
  // Parse numbers
  if (typeof options.parse_int_numbers !== 'boolean')
    options.parse_int_numbers = default_options.parse_int_numbers;
  // Parse numbers
  if (typeof options.parse_float_numbers !== 'boolean')
    options.parse_float_numbers = default_options.parse_float_numbers;
  // Skip these tags for a speedup
  if (typeof options.skip_parse_when_begins_with !== 'string')
    options.skip_parse_when_begins_with = default_options.skip_parse_when_begins_with;

  // Async
  if (callback)
    return native.parseAsync(xml, options, callback);

  // Sync
  return native.parse(xml, options);
}

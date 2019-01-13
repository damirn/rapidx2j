var native = require('./build/Release/rapidx2j');

var default_options = {
  empty_tag_value: true,
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
 *
 * @returns {object|function}
 */
exports.parse = function() {
  var xml, options = {}, callback;

  // Get arguments
  var args = Array.prototype.slice.call(arguments, 0);

  // xml argument should be string or buffer
  if (typeof args[0] === 'string' || (typeof args[0] === 'object' && args[0].constructor && args[0].constructor.name === 'Buffer'))
    xml = args.shift();
  else
    throw new Error('XML needs to be a string or a buffer.');

  // options argument should be any object
  if (typeof args[0] === 'object' && args[0] !== null)
    options = args.shift();

  // options argument
  if (typeof args[0] === 'function')
    callback = args.shift();

  /*
   * Parse options
   */

  // `empty_tag_value` can be anything including `undefined`, but not being defined uses default
  if (!options.hasOwnProperty('empty_tag_value'))
    options.empty_tag_value = default_options.empty_tag_value;
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
};

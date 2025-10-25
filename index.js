'use strict';

const native = require('./build/Release/rapidx2j');

const DEFAULT_OPTIONS = {
    empty_tag_value: true,
    parse_int_numbers: true,
    parse_float_numbers: true,
    skip_parse_when_begins_with: '',
    include_root: false
};

/**
 * @param {*} val - Any value to check
 * @return {boolean} - `true` if object, otherwise `false`
 */
const isObject = val => typeof val === 'object' && val !== null;

/**
 * Process options and call RapidXML
 *
 * @param {string|Buffer} xml - The XML to parse.
 * @param {object} [options] - Change default options (optional).
 * @param {function} [callback] - Provide callback for async method (optional).
 *
 * @returns {object|function}
 */
module.exports.parse = function () {
    let xml, options = {}, callback;

    // Get arguments
    const args = Array.prototype.slice.call(arguments, 0);

    // xml argument should be string or buffer
    if (typeof args[0] === 'string' ||
        (isObject(args[0]) && args[0].constructor && args[0].constructor.name === 'Buffer')
    ) {
        xml = args.shift();
    } else {
        throw new Error('XML needs to be a string or a buffer.');
    }

    // options argument should be any object
    if (isObject(args[0])) {
        options = args.shift();
    }

    // options argument
    if (typeof args[0] === 'function') {
        callback = args.shift();
    }

    /*
     * Parse options
     */

    // `empty_tag_value` can be anything including `undefined`, but not being defined uses default
    if (!options.hasOwnProperty('empty_tag_value')) {
        options.empty_tag_value = DEFAULT_OPTIONS.empty_tag_value;
    }

    // Parse numbers
    if (typeof options.parse_int_numbers !== 'boolean') {
        options.parse_int_numbers = DEFAULT_OPTIONS.parse_int_numbers;
    }

    // Parse numbers
    if (typeof options.parse_float_numbers !== 'boolean') {
        options.parse_float_numbers = DEFAULT_OPTIONS.parse_float_numbers;
    }

    // Skip these tags for a speedup
    if (typeof options.skip_parse_when_begins_with !== 'string') {
        options.skip_parse_when_begins_with = DEFAULT_OPTIONS.skip_parse_when_begins_with;
    }

    // Async
    if (callback) {
        return native.parseAsync(xml, options, callback);
    }

    // Sync
    return native.parse(xml, options);
};

/**
 * Parse XML asynchronously and return a Promise
 *
 * @param {string|Buffer} xml - The XML to parse.
 * @param {object} [options] - Change default options (optional).
 *
 * @returns {Promise<object>}
 */
module.exports.parseAsync = function (xml, options = {}) {
    return new Promise((resolve, reject) => {
        module.exports.parse(xml, options, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

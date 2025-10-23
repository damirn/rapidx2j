# rapidx2j

[![CI](https://github.com/damirn/rapidx2j/actions/workflows/ci.yml/badge.svg)](https://github.com/damirn/rapidx2j/actions/workflows/ci.yml)

A Node.js module for converting XML documents into JSON objects. It is one of the fastest converters available. Uses [RapidXML](http://rapidxml.sourceforge.net/). Inspired by [fast-feed](https://github.com/rla/fast-feed).

## Installation

`npm install --save rapidx2j`

## Usage

`x2j.parse(xml_string[, options][, callback]);`

#### Sync

```javascript
const x2j = require('rapidx2j');
const json = x2j.parse(xml_string);
console.log(json);
```

#### Sync with optional config object:

```javascript
const x2j = require('rapidx2j');
const options = {
  attr_group: false,
  attr_prefix: '@',
  ignore_attr: false,
  empty_tag_value: null,
  empty_attr_value: null,
  parse_boolean_values: true,
  parse_int_numbers: true,
  parse_float_numbers: true,
  preserve_case: false,
  explicit_array: false,
  explicit_object: false,
  skip_parse_when_begins_with: '',
  value_key: 'keyValue',
  include_root: false
};
const json = x2j.parse(xml_string, options);
console.log(json);
```

#### Async with callback

```javascript
const x2j = require('rapidx2j');
const json = x2j.parse(xml_string, (err, json) => {
  if (!err) {
    console.log(json);
  }
});
```

Note that by default, rapidx2j uses `true` as the value for empty XML tags. The `empty_tag_value` config parameter allows you to set this to something else (e.g., `null`).

`empty_attr_value` sets the value for empty XML attributes (default is `null`). This is independent of `empty_tag_value` and allows you to customize how empty attributes like `<tag attr="">` are parsed (e.g., empty string, false, or any custom value).

`parse_boolean_values`, `parse_int_numbers`, and `parse_float_numbers` control whether XML values are parsed as booleans, integers, or floats to their appropriate JavaScript types.

`preserve_case` controls whether XML tag and attribute name case is preserved.

`skip_parse_when_begins_with` prevents parsing of XML values that begin with the specified string to their appropriate JavaScript types.

`ignore_attr` disables parsing of all attributes.

`explicit_object` ensures that text-only elements are always returned as objects with the text value stored in the `value_key` property (default: `keyValue`). By default (`false`), text-only elements are returned as strings, while elements with attributes are returned as objects. Setting this to `true` provides consistent object structure across all elements.

`include_root` includes the root XML element in the output. By default (`false`), the root element is stripped and only its children are returned, which differs from libraries like xml2js and fast-xml-parser. Set to `true` for compatibility with those libraries.

## Supported Node versions

 * Node.js 16.x
 * Node.js 18.x
 * Node.js 20.x (LTS)
 * Node.js 22.x (LTS)

**Note:** The library may work on earlier Node.js versions (4.x - 15.x), but these are no longer tested in CI.

## Contributors

* Damir Nedžibović ([@Damirn](https://github.com/damirn))
* Sander Steenhuis ([@Redsandro](https://twitter.com/Redsandro))
* Chris Bricker ([@NFNChris](https://github.com/NFNChris))
* Ivan Zubok ([@akaNightmare](https://github.com/akaNightmare))

## License & copyright

Copyright (c) 2015-2025 Damir Nedžibović

Use of this software is granted under the MIT or the Boost Software License,
to be chosen freely by the user.

RapidXML is dual-licensed (MIT and Boost Software License, see LICENSE.rapidxml).

# rapidx2j

[![CI](https://github.com/damirn/rapidx2j/actions/workflows/ci.yml/badge.svg)](https://github.com/damirn/rapidx2j/actions/workflows/ci.yml)

A Node.js module for converting XML documents into JSON objects. Uses [RapidXML](http://rapidxml.sourceforge.net/). Inspired by [fast-feed](https://github.com/rla/fast-feed).

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

#### Async with Promise/await

```javascript
const x2j = require('rapidx2j');

// Basic usage
const json = await x2j.parseAsync(xml_string);
console.log(json);

// With options
const json = await x2j.parseAsync(xml_string, options);
console.log(json);

// Error handling
try {
  const json = await x2j.parseAsync(xml_string);
  console.log(json);
} catch (error) {
  console.error('Parse error:', error);
}
```

## Configuration Options

Note that by default, rapidx2j uses `true` as the value for empty XML tags. The `empty_tag_value` config parameter allows you to set this to something else (e.g., `null`).

`empty_attr_value` sets the value for empty XML attributes (default is `null`). This is independent of `empty_tag_value` and allows you to customize how empty attributes like `<tag attr="">` are parsed (e.g., empty string, false, or any custom value).

`parse_boolean_values`, `parse_int_numbers`, and `parse_float_numbers` control whether XML values are parsed as booleans, integers, or floats to their appropriate JavaScript types.

`preserve_case` controls whether XML tag and attribute name case is preserved.

`skip_parse_when_begins_with` prevents parsing of XML values that begin with the specified string to their appropriate JavaScript types.

`ignore_attr` disables parsing of all attributes.

`explicit_object` ensures that text-only elements are always returned as objects with the text value stored in the `value_key` property (default: `keyValue`). By default (`false`), text-only elements are returned as strings, while elements with attributes are returned as objects. Setting this to `true` provides consistent object structure across all elements.

`include_root` includes the root XML element in the output. By default (`false`), the root element is stripped and only its children are returned, which differs from libraries like xml2js and fast-xml-parser. Set to `true` for compatibility with those libraries.

## Benchmark

The `benchmark` directory contains a script comparing rapidx2j against `fast-xml-parser`, `xml2js`, and `xml-js` on a few XML inputs. Results depend on the input, hardware, and Node version; run it yourself to get numbers for your environment:

```bash
cd benchmark
npm install
npm run bench
```

See [benchmark/README.md](benchmark/README.md) for methodology and the parsers that were excluded.

### Sample numbers

macOS on Apple M3 Pro, Node.js v26.0.0, 5 warmup runs + 50 timed iterations per parser:

**small.xml (~1 KB)**

| Rank | Parser | Avg (ms) | Min (ms) | Max (ms) | vs Fastest |
|------|--------|----------|----------|----------|------------|
| 1 | **rapidx2j** | 0.01 | 0.01 | 0.02 | 1.00x (baseline) |
| 2 | **fast-xml-parser** | 0.07 | 0.03 | 0.73 | 6.08x slower |
| 3 | **xml2js** | 0.07 | 0.04 | 0.21 | 6.48x slower |
| 4 | **xml-js** | 0.09 | 0.03 | 0.50 | 8.18x slower |

**medium.xml (~5 KB)**

| Rank | Parser | Avg (ms) | Min (ms) | Max (ms) | vs Fastest |
|------|--------|----------|----------|----------|------------|
| 1 | **rapidx2j** | 0.06 | 0.06 | 0.15 | 1.00x (baseline) |
| 2 | **xml-js** | 0.17 | 0.16 | 0.29 | 2.67x slower |
| 3 | **fast-xml-parser** | 0.22 | 0.18 | 0.71 | 3.44x slower |
| 4 | **xml2js** | 0.24 | 0.20 | 0.47 | 3.85x slower |

**soccer.xml (~1.9 MB)**

| Rank | Parser | Avg (ms) | Min (ms) | Max (ms) | vs Fastest |
|------|--------|----------|----------|----------|------------|
| 1 | **rapidx2j** | 25.78 | 24.45 | 29.05 | 1.00x (baseline) |
| 2 | **xml-js** | 42.92 | 40.19 | 49.30 | 1.66x slower |
| 3 | **fast-xml-parser** | 57.36 | 55.55 | 60.92 | 2.22x slower |
| 4 | **xml2js** | 71.29 | 69.49 | 74.58 | 2.76x slower |

## Supported Node versions

 * Node.js 18.x
 * Node.js 20.x
 * Node.js 22.x (LTS)
 * Node.js 24.x (LTS)
 * Node.js 26.x

**Note:** Node 16 and earlier are no longer supported because `node-gyp@12+` (required for Node 26) needs Node 18+ APIs.

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

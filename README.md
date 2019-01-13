# rapidx2j

Node.JS module for converting XML documents into JSON objects. It is one
of the fastest converters available. Uses [RapidXML](http://rapidxml.sourceforge.net/).
Inspired by [fast-feed](https://github.com/rla/fast-feed).

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
  parse_boolean_values: true,
  parse_int_numbers: true,
  parse_float_numbers: true,
  preserve_case: false,
  explicit_array: false,
  skip_parse_when_begins_with: '',
  value_key: 'keyValue'
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

Note that by default, rapidx2j will use 'true' as a value for empty XML tags; with config param 'empty_tag_value' one can set that to something else
(i.e. to 'null' in this case).
'parse_boolean_values', 'parse_int_numbers' and 'parse_float_numbers' will or will not parse XML values which are bool/int/float numbers to appropriate java script types.
'preserve_case' will or will not preserve XML tag and attribute name case.
'skip_parse_when_begins_with' will not parse XML values which begin with a given string to appropriate javascript types.
'ignore_attr' will not parse any attributes.

## Supported Node versions

 * node 0.10.x
 * node 0.12.x
 * node 4.x
 * node 5.x
 * node 6.x
 * node 8.x
 * node 9.x
 * node 10.x
 * node 11.x

## Contributors

* Damir Nedžibović ([@Damirn](https://github.com/damirn))
* Sander Steenhuis ([@Redsandro](https://twitter.com/Redsandro))
* Chris Bricker ([@NFNChris](https://github.com/NFNChris))

## License & copyright

Copyright (c) 2015-2019 Damir Nedžibović

Use of this software is granted under the MIT or the Boost Software License,
to be chosen freely by the user.

RapidXML is dual-licensed (MIT and Boost Software License, see LICENSE.rapidxml).

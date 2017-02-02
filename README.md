# rapidx2j

Node.JS module for converting XML documents into JSON objects. It should be one
of the fastest converters available. Uses [RapidXML](http://rapidxml.sourceforge.net/).
Inspired by [fast-feed](https://github.com/rla/fast-feed).

## Installation

`npm install --save rapidx2j`

## Usage

`x2j.parse(xml_string[, options][, callback]);`

#### Sync

```javascript
var x2j = require('rapidx2j');
var json = x2j.parse(xml_string);
console.log(json);
```

#### Sync with optional config object:

```javascript
var x2j = require('rapidx2j');
var options = {
  empty_tag_value: null,
  parse_boolean_values: true,
  parse_int_numbers: true,
  parse_float_numbers: true,
  preserve_case: false,
  skip_parse_when_begins_with: ''  
};
var json = x2j.parse(xml_string, options);
console.log(json);
```

#### Async with callback

```javascript
var x2j = require('rapidx2j');
var json = x2j.parse(xml_string, function(err, json) {
  if (!err)
    console.log(json);
});
```

Note that by default, rapidx2j will use 'true' as a value for empty XML tags; with config param 'empty_tag_value' one can set that to something else
(i.e. to 'null' in this case).
'parse_boolean_values', 'parse_int_numbers' and 'parse_float_numbers' will or will not parse XML values which are bool/int/float numbers to appropriate java script types.
'preserve_case' will or will not preserve XML tag and attribute name case.
'skip_parse_when_begins_with' will not parse XML values which begin with a given string to appropriate java script types.
## Supported Node versions

 * node 0.10.x
 * node 0.12.x
 * node 4.x
 * node 5.x

## Contributors

* Damir Nedžibović ([@Damirn](https://github.com/damirn))
* Sander Steenhuis ([@Redsandro](https://twitter.com/Redsandro))

## License & copyright

Copyright (c) 2015 Damir Nedžibović

Use of this software is granted under the MIT or the Boost Software License,
to be chosen freely by the user.

RapidXML is dual-licensed (MIT and Boost Software License, see LICENSE.rapidxml).

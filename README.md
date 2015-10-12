# rapidx2j

Node.JS module for converting XML documents into JSON objects. It should be one
of the fastest converters available. Uses [RapidXML](http://rapidxml.sourceforge.net/).
Inspired by [fast-feed](https://github.com/rla/fast-feed).

## Installation

`npm install --save rapidx2j`

If your `gyp` is out of date, you might run into the following error:

```
gyp_main.py: error: no such option: --no-parallel
```

Either update to the latest `gyp` or edit your `node_gyp` and comment out `argv.push('--no-parallel')`, e.g.:
`nano /usr/local/lib/node_modules/npm/node_modules/node-gyp/lib/configure.js`

```
    argv.push('-Dvisibility=default')
    argv.push('-Dnode_root_dir=' + nodeDir)
    argv.push('-Dmodule_root_dir=' + process.cwd())
    argv.push('--depth=.')
    //argv.push('--no-parallel')
```

## Usage

`x2j.parse(xml_string[, options[, callback]]);`

#### Sync

```javascript
var x2j = require('rapidx2j');
var json = x2j.parse(xml_string);
console.log(json);
```

Or with optional config object:

```javascript
var x2j = require('rapidx2j');
var options = {
  empty_tag_value: null,
  parse_int_numbers: true,
  parse_float_numbers: true,
  skip_parse_when_begins_with: ''  
};
var json = x2j.parse(xml_string, options);
console.log(json);
```

#### Async with callback

```javascript
var x2j = require('rapidx2j');
var json = x2j.parse(xml_string, null, function(err, json) {
  if (!err)
    console.log(json);
});
```

Note that by default, rapidx2j will use 'true' as a value for empty XML tags; with config param 'empty_tag_value' one can set that to something else
(i.e. to 'null' in this case).
'parse_int_numbers' and 'parse_float_numbers' will or will not parse XML values which are int/float numbers to appropriate java script types.
'skip_parse_when_begins_with' will not parse XML values which begin with a given string to appropriate java script types.
## Supported Node versions

 * node 0.10.x
 * node 0.12.x

## License & copyright

Copyright (c) 2015 Damir Nedžibović

Use of this software is granted under the MIT or the Boost Software License,
to be chosen freely by the user.

RapidXML is dual-licensed (MIT and Boost Software License, see LICENSE.rapidxml).

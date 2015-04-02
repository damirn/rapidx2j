# rapidx2j

Node.JS module for converting XML documents into JSON objects. It should be one
of the fastest converters available. Uses [RapidXML](http://rapidxml.sourceforge.net/).
Inspired by [fast-feed](https://github.com/rla/fast-feed).

## Usage

```javascript
var x2j = require('rapidx2j');
var json = x2j.parse(xml_string) {
    console.log(json);
});
```
## Supported Node versions

 * node 0.12.x

## License & copyright

Copyright (c) 2015 Damir Nedžibović

Use of this software is granted under the MIT or the Boost Software License,
to be chosen freely by the user.

RapidXML is dual-licensed (MIT and Boost Software License, see LICENSE.rapidxml).

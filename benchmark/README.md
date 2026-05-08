# rapidx2j Benchmark

Performance comparison of popular XML to JSON parsers for Node.js.

## Parsers Tested

- **rapidx2j** - Native C++ binding using RapidXML
- **fast-xml-parser** - High-performance pure JavaScript parser (176M+ downloads/month)
- **xml2js** - Popular and flexible XML parser
- **xml-js** - Simple and versatile converter

### Excluded from Benchmark

**Different parsing approach (incomparable):**
- **camaro** - Requires templates for selective data extraction, not a full XML-to-JSON converter. As noted in camaro's documentation: "this is an unfair game for camaro because it only transforms the fields specified in the template."
- **txml** - Only parses XML into a DOM-like structure with `{tagName, attributes, children}` objects, not a JSON representation. Example: `<book id="1"><title>Test</title></book>` becomes `[{tagName: "book", attributes: {id: "1"}, children: [{tagName: "title", children: ["Test"]}]}]` instead of `{book: {title: "Test", "@_id": "1"}}`. Different task, so excluded.

**Unmaintained/Abandoned:**
- **libxmljs/libxmljs2** - Marked "NO LONGER MAINTAINED" as of September 2024
- **parser-xml2json** (Rust) - Last published 8 years ago, only 1 download/week
- **xml-stream** - Last published 11 years ago (2013)

## Running the Benchmark

### Installation

```bash
cd benchmark
npm install
```

### Run Benchmark

```bash
# Console output
npm run bench

# Markdown table output
npm run bench:markdown
```

## Test Files

The benchmark includes XML files of varying complexity:

- **small.xml** (~1 KB) - Simple book catalog with 3 entries
- **medium.xml** (~5 KB) - E-commerce data with products, reviews, and customers
- **soccer.xml** (~1.9 MB) - Complex sports event data from [node-xml2js-olympics](https://github.com/Redsandro/node-xml2js-olympics)

## Benchmark Methodology

Each parser:
1. Parses the same XML content
2. Runs 5 warmup iterations (untimed) followed by 50 timed iterations per parser, per XML file
3. Records per-iteration durations and reports avg/min/max
4. Results are compared against the fastest parser, per XML file

The benchmark uses Node.js `perf_hooks` for performance measurement. Module loads and parser instances are hoisted out of the timed loop so the first iteration isn't measuring `require()` overhead.

## Adding More Parsers

To add a new parser to the benchmark:

1. Add the parser to `package.json` dependencies
2. In `index.js`, hoist the `require()` and any parser construction to the top of the file (alongside the existing parsers), then reference them from the `parse:` callback:

```javascript
const parserLib = require('parser-name');
const parserInstance = new parserLib.Parser({ /* options */ });

// ...inside the `parsers` object:
'parser-name': {
  parse: (xml) => parserInstance.parse(xml)
}
```

Keeping `require()` and construction out of `parse:` is important — otherwise the first timed iteration measures module load instead of parsing.

3. Run the benchmark

## Sample Results

Sample numbers (macOS, Apple M3 Pro, Node.js v26.0.0) live in the [top-level README](../README.md#sample-numbers). Run `npm run bench` to produce numbers for your own environment.

## Notes

- Benchmark focuses on parsing speed only
- Does not test feature completeness or output format compatibility
- Different parsers may have different configuration options affecting performance
- Real-world performance depends on XML structure and parser configuration

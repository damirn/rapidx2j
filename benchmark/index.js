#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');

// Hoist requires and parser construction outside the timed function so the
// first iteration measures parsing, not module load.
const x2j = require('../index.js');
const { XMLParser } = require('fast-xml-parser');
const xml2js = require('xml2js');
const xmlJsConvert = require('xml-js');

const fastXmlParser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@'
});
const xml2jsParser = new xml2js.Parser();

// Parsers to benchmark
const parsers = {
  // Note: Excluded parsers that don't perform full XML-to-JSON conversion:
  // - camaro: requires templates for selective extraction
  // - txml: only parses XML into DOM-like structure (tagName/children), not JSON representation
  'rapidx2j': {
    parse: (xml) => x2j.parse(xml)
  },
  'fast-xml-parser': {
    parse: (xml) => fastXmlParser.parse(xml)
  },
  'xml2js': {
    parse: (xml) => xml2jsParser.parseStringPromise(xml)
  },
  'xml-js': {
    parse: (xml) => xmlJsConvert.xml2js(xml, { compact: true })
  }
};

// Test configuration
const WARMUP = 5;
const ITERATIONS = 50;
const XML_FILES = ['small.xml', 'medium.xml', 'soccer.xml'];

// Results storage: results[fileName][parserName] = [durations...]
const results = {};

function formatDuration(ms) {
  return ms.toFixed(2);
}

async function runTest(fileName, parserName, parser, xmlContent) {
  // Warmup runs are not recorded; let the JIT settle.
  for (let i = 0; i < WARMUP; i++) {
    try {
      await parser.parse(xmlContent);
    } catch (e) {
      console.error(`  ${parserName}: warmup error: ${e.message}`);
      return;
    }
  }

  const times = [];
  for (let i = 0; i < ITERATIONS; i++) {
    const start = performance.now();
    try {
      await parser.parse(xmlContent);
      times.push(performance.now() - start);
    } catch (e) {
      console.error(`  ${parserName}: iteration ${i} error: ${e.message}`);
      return;
    }
  }
  results[fileName][parserName] = times;
  const stats = calculateStats(times);
  console.log(`  ${parserName.padEnd(20)} avg ${formatDuration(stats.avg)} ms (min ${formatDuration(stats.min)}, max ${formatDuration(stats.max)})`);
}

/**
 * Calculate statistics
 */
function calculateStats(times) {
  const validTimes = times.filter(t => t !== null);
  if (validTimes.length === 0) return null;

  const sum = validTimes.reduce((a, b) => a + b, 0);
  const avg = sum / validTimes.length;
  const min = Math.min(...validTimes);
  const max = Math.max(...validTimes);

  return { avg, min, max, count: validTimes.length };
}

/**
 * Display results in table format
 */
function displayResults(markdown = false) {
  console.log('\n' + '='.repeat(80));
  console.log('BENCHMARK RESULTS');
  console.log('='.repeat(80));

  for (const fileName of XML_FILES) {
    if (!results[fileName]) continue;
    const rankings = Object.entries(results[fileName])
      .map(([name, times]) => ({ name, stats: calculateStats(times) }))
      .filter(r => r.stats !== null)
      .sort((a, b) => a.stats.avg - b.stats.avg);
    if (rankings.length === 0) continue;
    const fastest = rankings[0].stats.avg;

    console.log(`\n${fileName}`);
    if (markdown) {
      console.log('| Rank | Parser | Avg (ms) | Min (ms) | Max (ms) | vs Fastest |');
      console.log('|------|--------|----------|----------|----------|------------|');
      rankings.forEach((r, i) => {
        const factor = (r.stats.avg / fastest).toFixed(2);
        const factorStr = i === 0 ? '1.00x (baseline)' : `${factor}x slower`;
        console.log(`| ${i + 1} | **${r.name}** | ${formatDuration(r.stats.avg)} | ${formatDuration(r.stats.min)} | ${formatDuration(r.stats.max)} | ${factorStr} |`);
      });
    } else {
      const nameWidth = Math.max(...rankings.map(r => r.name.length), 10);
      console.log(
        'Rank'.padEnd(6) +
        'Parser'.padEnd(nameWidth + 2) +
        'Avg (ms)'.padStart(12) +
        'Min (ms)'.padStart(12) +
        'Max (ms)'.padStart(12) +
        'vs Fastest'.padStart(16)
      );
      console.log('-'.repeat(nameWidth + 60));
      rankings.forEach((r, i) => {
        const factor = (r.stats.avg / fastest).toFixed(2);
        const factorStr = i === 0 ? '1.00x' : `${factor}x`;
        console.log(
          `${(i + 1).toString().padEnd(6)}` +
          `${r.name.padEnd(nameWidth + 2)}` +
          `${formatDuration(r.stats.avg).padStart(12)}` +
          `${formatDuration(r.stats.min).padStart(12)}` +
          `${formatDuration(r.stats.max).padStart(12)}` +
          `${factorStr.padStart(16)}`
        );
      });
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log(`Warmup: ${WARMUP} runs per parser, timed: ${ITERATIONS} iterations per parser`);
  console.log(`Node version: ${process.version}`);
  console.log(`Platform: ${process.platform} ${process.arch}`);
  console.log('='.repeat(80) + '\n');
}

/**
 * Main benchmark execution
 */
async function main() {
  const markdown = process.argv.includes('--markdown');

  console.log('XML to JSON Parser Benchmark');
  console.log('='.repeat(80));
  console.log(`Warmup: ${WARMUP}, iterations: ${ITERATIONS}`);
  console.log(`Test files: ${XML_FILES.join(', ')}`);

  for (const xmlFile of XML_FILES) {
    const xmlPath = path.join(__dirname, 'xml', xmlFile);

    if (!fs.existsSync(xmlPath)) {
      console.error(`\nError: Test file not found: ${xmlPath}`);
      console.error('Please ensure XML test files are in the ./xml directory.');
      process.exit(1);
    }

    const xmlContent = fs.readFileSync(xmlPath, 'utf8');
    const xmlSize = (Buffer.byteLength(xmlContent, 'utf8') / 1024).toFixed(2);
    console.log(`\n${xmlFile} (${xmlSize} KB):`);
    results[xmlFile] = {};

    for (const [parserName, parser] of Object.entries(parsers)) {
      await runTest(xmlFile, parserName, parser, xmlContent);
    }
  }

  displayResults(markdown);
}

// Run benchmark
main().catch(error => {
  console.error('\nBenchmark failed:', error);
  process.exit(1);
});

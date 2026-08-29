#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

const distDirectory = path.resolve(process.argv[2] ?? 'dist');
const sourceMaps = fs
  .readdirSync(distDirectory, { withFileTypes: true })
  .filter((entry) => entry.isFile() && entry.name.endsWith('.map'))
  .map((entry) => path.join(distDirectory, entry.name));

if (sourceMaps.length === 0) throw new Error(`no source maps found in ${distDirectory}`);

let sourceCount = 0;
for (const sourceMapPath of sourceMaps) {
  const sourceMap = JSON.parse(fs.readFileSync(sourceMapPath, 'utf8'));
  if (!Array.isArray(sourceMap.sources)) {
    throw new Error(`${path.basename(sourceMapPath)} does not contain a sources array`);
  }

  sourceMap.sources = sourceMap.sources.map((source) => {
    if (typeof source !== 'string') {
      throw new Error(`${path.basename(sourceMapPath)} contains a non-string source`);
    }
    sourceCount += 1;
    return source.startsWith('../src/') ? `./src/${source.slice('../src/'.length)}` : source;
  });

  for (const source of sourceMap.sources) {
    if (!source.startsWith('./src/')) continue;
    const target = path.resolve(path.dirname(sourceMapPath), source);
    if (!fs.existsSync(target)) {
      throw new Error(`${path.basename(sourceMapPath)} references missing packaged source ${source}`);
    }
  }

  fs.writeFileSync(sourceMapPath, `${JSON.stringify(sourceMap)}\n`);
}

if (sourceCount === 0) throw new Error(`source maps in ${distDirectory} contain no sources`);

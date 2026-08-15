#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

const sdkPath = path.join(__dirname, '..', 'src', 'sdk.gen.ts');
let source = fs.readFileSync(sdkPath, 'utf8');

const optionsPattern = /> = Options2<TData, ThrowOnError, TResponse> & \{/g;
const responseStylePattern = /^\s+responseStyle: 'data',\n/gm;
const optionsSpreadPattern = /^(\s+)\.\.\.options,?\n/gm;

const optionsMatches = source.match(optionsPattern) ?? [];
const responseStyleMatches = source.match(responseStylePattern) ?? [];
const optionsSpreadMatches = source.match(optionsSpreadPattern) ?? [];

if (optionsMatches.length !== 1) {
  throw new Error(`Expected one generated SDK Options alias, found ${optionsMatches.length}`);
}

if (responseStyleMatches.length === 0 || responseStyleMatches.length !== optionsSpreadMatches.length) {
  throw new Error('Generated SDK request layout changed; refusing to apply unsafe contract fixes');
}

source = source.replace(
  optionsPattern,
  "> = Omit<Options2<TData, ThrowOnError, TResponse>, 'responseStyle'> & {",
);
source = source.replace(responseStylePattern, '');
source = source.replace(
  optionsSpreadPattern,
  (_, indentation) =>
    `${indentation}throwOnError: true as ThrowOnError,\n` +
    `${indentation}...options,\n` +
    `${indentation}responseStyle: 'data',\n`,
);
source = source.replace(/[ \t]+$/gm, '');

fs.writeFileSync(sdkPath, source);
process.stdout.write(`Applied SDK contracts to ${responseStyleMatches.length} operations\n`);

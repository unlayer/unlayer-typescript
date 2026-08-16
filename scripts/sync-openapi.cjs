#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

const sourceUrl = 'https://api.unlayer.com/v3/docs/json';
const outputPath = path.join(__dirname, '..', 'openapi.json');
const temporaryPath = `${outputPath}.tmp`;

async function main() {
  const response = await fetch(sourceUrl);
  if (!response.ok) {
    throw new Error(`OpenAPI download failed with HTTP ${response.status}`);
  }

  const document = await response.json();
  if (typeof document !== 'object' || document === null || typeof document.paths !== 'object') {
    throw new Error('Downloaded OpenAPI document has no paths object');
  }

  // Remote input lets Hey infer this origin from the document URL. Preserve
  // that behavior explicitly when generating from the local snapshot.
  document.servers = [{ url: 'https://api.unlayer.com' }];

  try {
    fs.writeFileSync(temporaryPath, `${JSON.stringify(document, null, 2)}\n`);
    fs.renameSync(temporaryPath, outputPath);
  } finally {
    fs.rmSync(temporaryPath, { force: true });
  }

  process.stdout.write(`Updated ${path.basename(outputPath)} from ${sourceUrl}\n`);
}

main().catch((error) => {
  process.stderr.write(`${error.stack ?? error}\n`);
  process.exitCode = 1;
});

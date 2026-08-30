#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

const DEFAULT_SOURCE_URL = 'https://api.unlayer.com/v3/docs/json';
const DEFAULT_OUTPUT_PATH = path.join(__dirname, '..', 'openapi.json');
const DOWNLOAD_TIMEOUT_MS = 30_000;

async function fetchOpenApiDocument(
  sourceUrl,
  fetcher = fetch,
  signal = AbortSignal.timeout(DOWNLOAD_TIMEOUT_MS),
) {
  const response = await fetcher(sourceUrl, {
    headers: { Accept: 'application/json' },
    signal,
  });
  if (!response.ok) {
    throw new Error(`OpenAPI download failed with HTTP ${response.status}`);
  }

  const document = await response.json();
  if (
    typeof document !== 'object' ||
    document === null ||
    typeof document.paths !== 'object' ||
    document.paths === null ||
    Array.isArray(document.paths) ||
    Object.keys(document.paths).length === 0
  ) {
    throw new Error('Downloaded OpenAPI document has no public paths');
  }

  // Remote input lets Hey infer this origin from the document URL. Preserve
  // that behavior explicitly when generating from the local snapshot.
  document.servers = [{ url: 'https://api.unlayer.com' }];
  return document;
}

function writeOpenApiDocument(document, outputPath) {
  const temporaryPath = `${outputPath}.tmp`;

  try {
    fs.writeFileSync(temporaryPath, `${JSON.stringify(document, null, 2)}\n`);
    fs.renameSync(temporaryPath, outputPath);
  } finally {
    fs.rmSync(temporaryPath, { force: true });
  }
}

async function main({
  sourceUrl = process.env.SDK_OPENAPI_URL ?? DEFAULT_SOURCE_URL,
  outputPath = process.env.SDK_OPENAPI_OUTPUT ?? DEFAULT_OUTPUT_PATH,
  fetcher = fetch,
  signal = AbortSignal.timeout(DOWNLOAD_TIMEOUT_MS),
} = {}) {
  const document = await fetchOpenApiDocument(sourceUrl, fetcher, signal);
  writeOpenApiDocument(document, outputPath);

  process.stdout.write(
    `Updated ${path.basename(outputPath)} from ${sourceUrl} (${Object.keys(document.paths).length} paths)\n`,
  );
}

module.exports = {
  DEFAULT_OUTPUT_PATH,
  DEFAULT_SOURCE_URL,
  DOWNLOAD_TIMEOUT_MS,
  fetchOpenApiDocument,
  main,
  writeOpenApiDocument,
};

if (require.main === module) {
  main().catch((error) => {
    process.stderr.write(`${error.stack ?? error}\n`);
    process.exitCode = 1;
  });
}

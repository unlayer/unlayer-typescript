import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';
import test from 'node:test';

const require = createRequire(import.meta.url);
const { fetchOpenApiDocument, main } = require('../scripts/sync-openapi.cjs');

test('normalizes and writes a non-empty OpenAPI document', async (context) => {
  const temporaryDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'unlayer-sdk-openapi-'));
  context.after(() => fs.rmSync(temporaryDirectory, { recursive: true }));

  const outputPath = path.join(temporaryDirectory, 'openapi.json');
  const sourceDocument = {
    openapi: '3.0.0',
    paths: { '/v3/templates': { get: {} } },
    servers: [{ url: 'http://internal.example.test' }],
  };
  const fetcher = async (url, options) => {
    assert.equal(url, 'https://example.test/openapi.json');
    assert.equal(options.headers.Accept, 'application/json');
    assert.ok(options.signal instanceof AbortSignal);
    return new Response(JSON.stringify(sourceDocument));
  };

  await main({
    sourceUrl: 'https://example.test/openapi.json',
    outputPath,
    fetcher,
  });

  const writtenDocument = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
  assert.deepEqual(writtenDocument.paths, sourceDocument.paths);
  assert.deepEqual(writtenDocument.servers, [{ url: 'https://api.unlayer.com' }]);
});

test('rejects unsuccessful and empty OpenAPI responses', async () => {
  await assert.rejects(
    fetchOpenApiDocument(
      'https://example.test/openapi.json',
      async () => new Response(null, { status: 503 }),
    ),
    /HTTP 503/,
  );

  await assert.rejects(
    fetchOpenApiDocument(
      'https://example.test/openapi.json',
      async () => new Response(JSON.stringify({ paths: {} })),
    ),
    /no public paths/,
  );
});

test('preserves transport failures', async () => {
  const transportError = new TypeError('network unavailable');

  await assert.rejects(
    fetchOpenApiDocument('https://example.test/openapi.json', async () => {
      throw transportError;
    }),
    (error) => error === transportError,
  );
});

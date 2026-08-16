import assert from 'node:assert/strict';
import http from 'node:http';

import { Unlayer } from '@unlayer/sdk';
import { createClient } from '@unlayer/sdk/client';

const requests = [];

const server = http.createServer(async (request, response) => {
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);

  requests.push({
    body: Buffer.concat(chunks).toString('utf8'),
    headers: request.headers,
    method: request.method,
    url: request.url,
  });

  response.setHeader('Content-Type', 'application/json');

  if (request.url?.includes('name=unauthorized')) {
    response.statusCode = 401;
    response.end(JSON.stringify({ error: 'unauthorized', message: 'Bad token' }));
    return;
  }

  if (request.method === 'POST' && request.url === '/v3/domains') {
    response.end(
      JSON.stringify({
        data: { domain: 'example.com', id: 42, status: 'pending' },
      }),
    );
    return;
  }

  response.end(
    JSON.stringify({
      data: [{ displayMode: 'email', id: 'template-1', name: 'Welcome' }],
      has_more: false,
      next_cursor: null,
    }),
  );
});

await new Promise((resolve, reject) => {
  server.once('error', reject);
  server.listen(0, '127.0.0.1', resolve);
});

try {
  const address = server.address();
  assert.notEqual(address, null);
  assert.equal(typeof address, 'object');

  const sdk = new Unlayer({
    client: createClient({
      auth: 'test-token',
      baseUrl: `http://127.0.0.1:${address.port}`,
    }),
  });

  const templates = await sdk.templates.listTemplates({
    query: {
      displayMode: 'email',
      limit: 10,
      name: 'Summer & Sale',
      projectId: 'project-1',
    },
    // JavaScript callers can still pass this low-level option. SDK methods
    // must keep their documented data-only shape at runtime.
    responseStyle: 'fields',
  });

  assert.deepEqual(templates, {
    data: [{ displayMode: 'email', id: 'template-1', name: 'Welcome' }],
    has_more: false,
    next_cursor: null,
  });

  const domain = await sdk.domains.createDomain({
    body: { domain: 'example.com' },
  });

  assert.deepEqual(domain, {
    data: { domain: 'example.com', id: 42, status: 'pending' },
  });

  await assert.rejects(sdk.templates.listTemplates({ query: { name: 'unauthorized' } }), (error) => {
    assert.deepEqual(error, {
      error: 'unauthorized',
      message: 'Bad token',
    });
    return true;
  });

  await assert.rejects(
    sdk.templates.listTemplates({
      query: { name: 'unauthorized-undefined' },
      throwOnError: undefined,
    }),
    (error) => {
      assert.deepEqual(error, {
        error: 'unauthorized',
        message: 'Bad token',
      });
      return true;
    },
  );

  const noThrowResult = await sdk.templates.listTemplates({
    query: { name: 'unauthorized-no-throw' },
    throwOnError: false,
  });
  assert.equal(noThrowResult, undefined);

  assert.equal(requests.length, 5);

  const listUrl = new URL(requests[0].url, 'http://localhost');
  assert.equal(requests[0].method, 'GET');
  assert.equal(requests[0].headers.authorization, 'Bearer test-token');
  assert.equal(listUrl.pathname, '/v3/templates');
  assert.equal(listUrl.searchParams.get('displayMode'), 'email');
  assert.equal(listUrl.searchParams.get('limit'), '10');
  assert.equal(listUrl.searchParams.get('name'), 'Summer & Sale');
  assert.equal(listUrl.searchParams.get('projectId'), 'project-1');

  assert.equal(requests[1].method, 'POST');
  assert.equal(requests[1].url, '/v3/domains');
  assert.equal(requests[1].headers.authorization, 'Bearer test-token');
  assert.match(requests[1].headers['content-type'], /^application\/json/);
  assert.deepEqual(JSON.parse(requests[1].body), { domain: 'example.com' });

  process.stdout.write('Packed SDK smoke passed: auth, query, body, success, and error behavior\n');
} finally {
  await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
}

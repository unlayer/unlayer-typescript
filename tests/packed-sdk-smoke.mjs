import assert from 'node:assert/strict';
import http from 'node:http';

import * as sdkPackage from '@unlayer/sdk';
import * as clientPackage from '@unlayer/sdk/client';

const { Unlayer } = sdkPackage;
const { createClient } = clientPackage;

assert.equal(Object.hasOwn(sdkPackage, 'client'), false);
assert.equal(Object.hasOwn(clientPackage, 'client'), false);
assert.equal(Object.hasOwn(Unlayer, '__registry'), false);
assert.throws(() => new Unlayer(), /client created with createClient\(\) is required/);

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

  if (request.method === 'GET' && request.url?.startsWith('/v3/templates/folder')) {
    response.end(
      JSON.stringify({
        data: { id: 'folder/Welcome & Spring', name: 'Path template' },
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

  const template = await sdk.templates.getTemplate({
    path: { id: 'folder/Welcome & Spring' },
  });

  assert.deepEqual(template, {
    data: { id: 'folder/Welcome & Spring', name: 'Path template' },
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

  await assert.rejects(
    sdk.templates.listTemplates({
      query: { name: 'unauthorized-no-throw' },
      // JavaScript callers can pass options omitted from the TypeScript SDK
      // surface. High-level operations must still preserve their contract.
      throwOnError: false,
    }),
    (error) => {
      assert.deepEqual(error, {
        error: 'unauthorized',
        message: 'Bad token',
      });
      return true;
    },
  );

  let defaultFactoryRequest;
  const defaultFactorySdk = new Unlayer({
    client: createClient({
      auth: 'factory-token',
      fetch: async (request) => {
        defaultFactoryRequest = request;
        return new Response(
          JSON.stringify({
            data: [],
            has_more: false,
            next_cursor: null,
          }),
          { headers: { 'Content-Type': 'application/json' } },
        );
      },
    }),
  });

  await defaultFactorySdk.templates.listTemplates();
  assert.equal(defaultFactoryRequest.url, 'https://api.unlayer.com/v3/templates');
  assert.equal(defaultFactoryRequest.headers.get('authorization'), 'Bearer factory-token');

  const transportError = new TypeError('transport failed');
  const transportClient = createClient({
    fetch: async () => {
      throw transportError;
    },
  });
  const transportSdk = new Unlayer({ client: transportClient });

  await assert.rejects(transportSdk.templates.listTemplates(), (error) => error === transportError);

  const transportFields = await transportClient.get({
    responseStyle: 'fields',
    throwOnError: false,
    url: '/v3/templates',
  });
  assert.equal(transportFields.error, transportError);
  assert.equal(transportFields.response, undefined);

  const abortController = new AbortController();
  const abortError = new DOMException('request aborted', 'AbortError');
  abortController.abort(abortError);
  const abortSdk = new Unlayer({
    client: createClient({
      fetch: async (request) => {
        assert.equal(request.signal.aborted, true);
        throw request.signal.reason;
      },
    }),
  });

  await assert.rejects(
    abortSdk.templates.listTemplates({ signal: abortController.signal }),
    (error) => error === abortError,
  );

  assert.equal(requests.length, 6);

  const listUrl = new URL(requests[0].url, 'http://localhost');
  assert.equal(requests[0].method, 'GET');
  assert.equal(requests[0].headers.authorization, 'Bearer test-token');
  assert.equal(listUrl.pathname, '/v3/templates');
  assert.equal(listUrl.searchParams.get('displayMode'), 'email');
  assert.equal(listUrl.searchParams.get('limit'), '10');
  assert.equal(listUrl.searchParams.get('name'), 'Summer & Sale');
  assert.equal(listUrl.searchParams.get('projectId'), 'project-1');

  assert.equal(requests[1].method, 'GET');
  assert.equal(requests[1].url, '/v3/templates/folder%2FWelcome%20%26%20Spring');
  assert.equal(requests[1].headers.authorization, 'Bearer test-token');

  assert.equal(requests[2].method, 'POST');
  assert.equal(requests[2].url, '/v3/domains');
  assert.equal(requests[2].headers.authorization, 'Bearer test-token');
  assert.match(requests[2].headers['content-type'], /^application\/json/);
  assert.deepEqual(JSON.parse(requests[2].body), { domain: 'example.com' });

  process.stdout.write(
    'Packed SDK smoke passed: isolated clients, auth, path/query/body serialization, factory defaults, HTTP, transport, and abort behavior\n',
  );
} finally {
  await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
}

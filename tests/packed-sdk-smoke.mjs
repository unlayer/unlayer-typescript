import assert from 'node:assert/strict';
import http from 'node:http';

import UnlayerDefault, * as sdkPackage from '@unlayer/sdk';

const {
  APIConnectionError,
  APIConnectionTimeoutError,
  APIError,
  APIUserAbortError,
  AuthenticationError,
  Unlayer,
} = sdkPackage;

assert.equal(UnlayerDefault, Unlayer);
assert.equal(new APIConnectionError() instanceof APIError, true);
for (const internalExport of ['Blocks', 'NativeUnlayer', 'createClient', 'ListBlocksData', 'Templates']) {
  assert.equal(Object.hasOwn(sdkPackage, internalExport), false);
}

await assert.rejects(
  import('@unlayer/sdk/client'),
  (error) => error?.code === 'ERR_PACKAGE_PATH_NOT_EXPORTED',
);

const requests = [];
let retryRequests = 0;

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

  if (request.url?.includes('name=compat')) {
    const url = new URL(request.url, 'http://localhost');
    const cursor = url.searchParams.get('cursor');
    response.end(
      JSON.stringify({
        data: [
          {
            id: cursor ? 'compat-template-2' : 'compat-template-1',
            name: cursor ? 'Second page' : 'First page',
          },
        ],
        has_more: !cursor,
        next_cursor: cursor ? null : 'compat-page-2',
      }),
    );
    return;
  }

  if (request.url?.includes('name=retry')) {
    retryRequests += 1;
    if (retryRequests === 1) {
      response.statusCode = 503;
      response.setHeader('Retry-After', '0');
      response.end(JSON.stringify({ error: 'unavailable', message: 'Try again' }));
      return;
    }
  }

  if (request.method === 'GET' && request.url?.startsWith('/v3/templates/folder')) {
    response.end(
      JSON.stringify({
        data: { id: 'folder/Welcome & Spring', name: 'Path template' },
      }),
    );
    return;
  }

  if (request.method === 'GET' && request.url === '/v3/projects/project-1') {
    response.end(JSON.stringify({ data: { id: 1, name: 'Project' } }));
    return;
  }

  if (request.method === 'GET' && request.url === '/v3/workspaces') {
    response.end(JSON.stringify({ data: [{ id: 2, name: 'Workspace' }] }));
    return;
  }

  if (request.method === 'GET' && request.url === '/v3/workspaces/workspace-1') {
    response.end(JSON.stringify({ data: { id: 2, name: 'Workspace', projects: [] } }));
    return;
  }

  if (request.method === 'POST' && request.url?.startsWith('/v3/templates/convert/')) {
    response.end(JSON.stringify({ success: true, data: { design: { body: {} } } }));
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

  const publicSdk = new UnlayerDefault({
    baseURL: `http://127.0.0.1:${address.port}`,
    maxRetries: 1,
    personalAccessToken: 'compat-token',
    projectID: 'compat-project',
    timeout: 1_000,
  });

  assert.equal(typeof publicSdk.templates.list, 'function');
  assert.equal(typeof publicSdk.templates.retrieve, 'function');
  assert.equal('listTemplates' in publicSdk.templates, false);
  assert.deepEqual(Object.keys(publicSdk.templates), []);
  assert.equal('blocks' in publicSdk, false);
  assert.equal('domains' in publicSdk, false);
  assert.equal(Unlayer.Templates, publicSdk.templates.constructor);
  assert.equal(Unlayer.Convert.FullToSimple, publicSdk.convert.fullToSimple.constructor);

  const publicTemplates = [];
  for await (const item of publicSdk.templates.list({ name: 'compat' })) {
    publicTemplates.push(item);
  }
  assert.deepEqual(
    publicTemplates.map((item) => item.id),
    ['compat-template-1', 'compat-template-2'],
  );

  const template = await publicSdk.templates.retrieve('folder/Welcome & Spring');
  assert.equal(template.data.id, 'folder/Welcome & Spring');

  const project = await publicSdk.projects.retrieve('project-1');
  assert.equal(project.data.name, 'Project');

  const workspaces = await publicSdk.workspaces.list();
  assert.equal(workspaces.data[0].name, 'Workspace');
  const workspace = await publicSdk.workspaces.retrieve('workspace-1');
  assert.equal(workspace.data.name, 'Workspace');

  const fullToSimple = await publicSdk.convert.fullToSimple.create({ design: { body: {} } });
  const simpleToFull = await publicSdk.convert.simpleToFull.create({ design: { body: {} } });
  assert.equal(fullToSimple.success, true);
  assert.equal(simpleToFull.success, true);

  await assert.rejects(
    publicSdk.templates.list({ name: 'unauthorized' }),
    (error) =>
      error instanceof AuthenticationError && error.status === 401 && error.message === '401 Bad token',
  );

  const retriedTemplates = await publicSdk.templates.list({ name: 'retry' });
  assert.equal(retriedTemplates.data[0].id, 'template-1');
  assert.equal(retryRequests, 2);

  const authenticatedRequest = requests.find((request) => request.url?.includes('name=compat'));
  assert.equal(authenticatedRequest.headers.authorization, 'Bearer compat-token');
  assert.equal(authenticatedRequest.headers['x-project-id'], 'compat-project');

  const retrieveRequest = requests.find((request) => request.url?.startsWith('/v3/templates/folder'));
  assert.equal(retrieveRequest.url, '/v3/templates/folder%2FWelcome%20%26%20Spring');

  const conversionRequests = requests.filter((request) => request.url?.includes('/convert/'));
  assert.equal(conversionRequests.length, 2);
  for (const request of conversionRequests) {
    assert.equal(request.method, 'POST');
    assert.deepEqual(JSON.parse(request.body), { design: { body: {} } });
  }

  const timeoutSdk = new UnlayerDefault({
    maxRetries: 0,
    personalAccessToken: 'compat-token',
    timeout: 1_000,
    fetch: async (request) =>
      new Promise((_resolve, reject) => {
        request.signal.addEventListener('abort', () => reject(request.signal.reason), {
          once: true,
        });
      }),
  });
  await assert.rejects(
    timeoutSdk.workspaces.list({ timeout: 5 }),
    (error) => error instanceof APIConnectionTimeoutError,
  );

  const previousEnvironmentAPIKey = process.env.UNLAYER_API_KEY;
  let explicitNullAuthorization;
  try {
    process.env.UNLAYER_API_KEY = 'environment-api-key';
    const explicitNullSdk = new UnlayerDefault({
      apiKey: null,
      baseURL: 'https://example.test',
      maxRetries: 0,
      personalAccessToken: 'explicit-personal-token',
      fetch: async (request) => {
        explicitNullAuthorization = request.headers.get('authorization');
        return new Response(JSON.stringify({ data: [] }), {
          headers: { 'content-type': 'application/json' },
        });
      },
    });
    await explicitNullSdk.workspaces.list();
  } finally {
    if (previousEnvironmentAPIKey === undefined) delete process.env.UNLAYER_API_KEY;
    else process.env.UNLAYER_API_KEY = previousEnvironmentAPIKey;
  }
  assert.equal(explicitNullAuthorization, 'Bearer explicit-personal-token');

  let requestCache;
  const requestOptionsSdk = new UnlayerDefault({
    apiKey: 'compat-token',
    baseURL: 'https://example.test',
    maxRetries: 0,
    fetch: async (request) => {
      requestCache = request.cache;
      return new Response(JSON.stringify({ data: [] }), {
        headers: { 'content-type': 'application/json' },
      });
    },
  });
  await requestOptionsSdk.workspaces.list({ fetchOptions: { cache: 'no-store' } });
  assert.equal(requestCache, 'no-store');

  let abortedFetchCalls = 0;
  const abortSdk = new UnlayerDefault({
    apiKey: 'compat-token',
    baseURL: 'https://example.test',
    maxRetries: 0,
    fetch: async () => {
      abortedFetchCalls += 1;
      return new Response(JSON.stringify({ data: [] }), {
        headers: { 'content-type': 'application/json' },
      });
    },
  });
  const abortController = new AbortController();
  abortController.abort('already aborted');
  await assert.rejects(
    abortSdk.workspaces.list({ signal: abortController.signal }),
    (error) => error instanceof APIUserAbortError,
  );
  assert.equal(abortedFetchCalls, 0);

  process.stdout.write(
    'Packed SDK smoke passed: one allowlisted client, legacy compatibility, closed exports, auth, pagination, retries, timeouts, cancellation, errors, and all seven public operations\n',
  );
} finally {
  await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
}

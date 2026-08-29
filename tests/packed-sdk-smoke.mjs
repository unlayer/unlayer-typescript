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
let perRequestNoRetryRequests = 0;
let dateRetryRequests = 0;
let unreasonableRetryRequests = 0;
let retriedPostRequests = 0;
let streamingResponseStartedResolve;
const streamingResponseStarted = new Promise((resolve) => {
  streamingResponseStartedResolve = resolve;
});

const server = http.createServer(async (request, response) => {
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  const requestURL = new URL(request.url ?? '/', 'http://localhost');

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

  if (request.url?.includes('name=no-retry')) {
    perRequestNoRetryRequests += 1;
    response.statusCode = 503;
    response.end(JSON.stringify({ error: 'unavailable', message: 'Do not retry' }));
    return;
  } else if (request.url?.includes('name=retry-date')) {
    dateRetryRequests += 1;
    if (dateRetryRequests === 1) {
      response.statusCode = 503;
      const retryAt = Math.ceil(Date.now() / 1_000) * 1_000 + 1_000;
      response.setHeader('Retry-After', new Date(retryAt).toUTCString());
      response.end(JSON.stringify({ error: 'unavailable', message: 'Retry at date' }));
      return;
    }
  } else if (request.url?.includes('name=retry-unreasonable')) {
    unreasonableRetryRequests += 1;
    if (unreasonableRetryRequests === 1) {
      response.statusCode = 503;
      response.setHeader('Retry-After', '999999');
      response.end(JSON.stringify({ error: 'unavailable', message: 'Try again later' }));
      return;
    }
  } else if (request.url?.includes('name=retry')) {
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

  if (request.method === 'GET' && requestURL.pathname === '/v3/projects/project-1') {
    response.end(JSON.stringify({ data: { id: 1, name: 'Project' } }));
    return;
  }

  if (request.method === 'GET' && requestURL.pathname === '/v3/workspaces') {
    if (request.headers['x-stream-abort'] === 'true') {
      response.on('error', () => undefined);
      response.write('{"data":[');
      response.flushHeaders();
      streamingResponseStartedResolve();
      setTimeout(() => response.end(']}'), 1_000).unref();
      return;
    }
    response.end(JSON.stringify({ data: [{ id: 2, name: 'Workspace' }] }));
    return;
  }

  if (request.method === 'GET' && requestURL.pathname === '/v3/workspaces/workspace-1') {
    response.end(JSON.stringify({ data: { id: 2, name: 'Workspace', projects: [] } }));
    return;
  }

  if (request.method === 'POST' && request.url?.startsWith('/v3/templates/convert/')) {
    if (request.headers['x-retry-post'] === 'true') {
      retriedPostRequests += 1;
      if (retriedPostRequests === 1) {
        response.statusCode = 503;
        response.setHeader('Retry-After', '0');
        response.end(JSON.stringify({ error: 'unavailable', message: 'Retry the POST' }));
        return;
      }
    }
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

  const awaitedPagePromise = publicSdk.templates.list({ name: 'compat' });
  assert.equal(awaitedPagePromise instanceof Promise, true);
  assert.equal(typeof awaitedPagePromise.asResponse, 'function');
  assert.equal(typeof awaitedPagePromise.withResponse, 'function');
  const pageRawResponse = await awaitedPagePromise.asResponse();
  const pageAndResponse = await awaitedPagePromise.withResponse();
  assert.equal(pageAndResponse.response, pageRawResponse);
  assert.equal(pageRawResponse.status, 200);
  assert.equal(pageAndResponse.data.getPaginatedItems()[0].id, 'compat-template-1');

  const awaitedPageTemplates = [];
  for await (const item of pageAndResponse.data) awaitedPageTemplates.push(item.id);
  assert.deepEqual(awaitedPageTemplates, ['compat-template-1', 'compat-template-2']);

  const pages = [];
  const pageForIteration = await publicSdk.templates.list({ name: 'compat' });
  assert.equal(pageForIteration.hasNextPage(), true);
  for await (const page of pageForIteration.iterPages()) {
    pages.push(page.getPaginatedItems().map((item) => item.id));
  }
  assert.deepEqual(pages, [['compat-template-1'], ['compat-template-2']]);

  const manualFirstPage = await publicSdk.templates.list({ name: 'compat' });
  const manualSecondPage = await manualFirstPage.getNextPage();
  assert.equal(manualSecondPage.getPaginatedItems()[0].id, 'compat-template-2');
  assert.equal(manualSecondPage.hasNextPage(), false);

  const publicTemplates = [];
  for await (const item of publicSdk.templates.list({ name: 'compat' })) {
    publicTemplates.push(item);
  }
  assert.deepEqual(
    publicTemplates.map((item) => item.id),
    ['compat-template-1', 'compat-template-2'],
  );

  const initialCursorPage = await publicSdk.templates.list({
    cursor: 'compat-page-2',
    name: 'compat',
  });
  assert.equal(initialCursorPage.data[0].id, 'compat-template-2');
  const initialCursorRequest = requests.find(
    (request) => request.url?.includes('name=compat') && request.url.includes('cursor=compat-page-2'),
  );
  assert.notEqual(initialCursorRequest, undefined);

  const templatePromise = publicSdk.templates.retrieve('folder/Welcome & Spring');
  assert.equal(templatePromise instanceof Promise, true);
  assert.equal(typeof templatePromise.asResponse, 'function');
  assert.equal(typeof templatePromise.withResponse, 'function');
  const templateRawResponse = await templatePromise.asResponse();
  const template = await templatePromise;
  const templateAndResponse = await templatePromise.withResponse();
  assert.equal(templateAndResponse.data, template);
  assert.equal(templateAndResponse.response, templateRawResponse);
  assert.equal(templateRawResponse.bodyUsed, false);
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

  const unauthorizedRequest = publicSdk.templates.list({ name: 'unauthorized' });
  const unauthorizedResponse = await unauthorizedRequest.asResponse();
  assert.equal(unauthorizedResponse.status, 401);
  await assert.rejects(
    unauthorizedRequest,
    (error) =>
      error instanceof AuthenticationError && error.status === 401 && error.message === '401 Bad token',
  );

  const retriedTemplates = await publicSdk.templates.list({ name: 'retry' });
  assert.equal(retriedTemplates.data[0].id, 'template-1');
  assert.equal(retryRequests, 2);

  const unreasonableRetryStartedAt = Date.now();
  const boundedRetryTemplates = await publicSdk.templates.list({ name: 'retry-unreasonable' });
  assert.equal(boundedRetryTemplates.data[0].id, 'template-1');
  assert.equal(unreasonableRetryRequests, 2);
  assert.ok(Date.now() - unreasonableRetryStartedAt < 2_000);

  const dateRetryStartedAt = Date.now();
  const dateRetryTemplates = await publicSdk.templates.list({ name: 'retry-date' });
  assert.equal(dateRetryTemplates.data[0].id, 'template-1');
  assert.equal(dateRetryRequests, 2);
  assert.ok(Date.now() - dateRetryStartedAt >= 700);
  assert.ok(Date.now() - dateRetryStartedAt < 3_000);

  await assert.rejects(
    publicSdk.templates.list({ name: 'no-retry' }, { maxRetries: 0 }),
    (error) => error.status === 503,
  );
  assert.equal(perRequestNoRetryRequests, 1);

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

  const retriedPostBody = { design: { body: { id: 'retry-body' } } };
  const retriedPost = await publicSdk.convert.fullToSimple.create(retriedPostBody, {
    headers: { 'X-Retry-Post': 'true' },
  });
  assert.equal(retriedPost.success, true);
  assert.equal(retriedPostRequests, 2);
  const retriedPostBodies = requests
    .filter((request) => request.headers['x-retry-post'] === 'true')
    .map((request) => JSON.parse(request.body));
  assert.deepEqual(retriedPostBodies, [retriedPostBody, retriedPostBody]);

  const optionMergeRequestStart = requests.length;
  const optionMergeSdk = new UnlayerDefault({
    baseURL: `http://127.0.0.1:${address.port}`,
    defaultHeaders: {
      'X-Project-ID': 'default-header-project',
      'X-Remove-Me': 'remove-me',
    },
    defaultQuery: { projectId: 'default-query-project', stable: 'kept' },
    maxRetries: 0,
    personalAccessToken: 'compat-token',
    projectID: 'constructor-project',
  });
  await optionMergeSdk.templates.retrieve('folder/Welcome & Spring', { projectId: undefined });
  await optionMergeSdk.projects.retrieve('project-1');
  await optionMergeSdk.workspaces.list({ headers: { 'X-Remove-Me': null } });
  const optionMergeRequests = requests.slice(optionMergeRequestStart);
  const queryRemovalRequest = optionMergeRequests.find((request) =>
    request.url?.startsWith('/v3/templates/folder'),
  );
  const queryRemovalURL = new URL(queryRemovalRequest.url, 'http://localhost');
  assert.equal(queryRemovalURL.searchParams.has('projectId'), false);
  assert.equal(queryRemovalURL.searchParams.get('stable'), 'kept');
  const querylessRequest = optionMergeRequests.find((request) =>
    request.url?.startsWith('/v3/projects/project-1'),
  );
  const querylessURL = new URL(querylessRequest.url, 'http://localhost');
  assert.equal(querylessURL.searchParams.get('projectId'), 'default-query-project');
  assert.equal(querylessURL.searchParams.get('stable'), 'kept');
  const headerRemovalRequest = optionMergeRequests.find(
    (request) => new URL(request.url, 'http://localhost').pathname === '/v3/workspaces',
  );
  assert.equal(headerRemovalRequest.headers['x-project-id'], 'default-header-project');
  assert.equal('x-remove-me' in headerRemovalRequest.headers, false);

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

  const previousEnvironmentPAT = process.env.UNLAYER_PERSONAL_ACCESS_TOKEN;
  let inheritedAuthorization;
  try {
    process.env.UNLAYER_API_KEY = 'first-environment-api-key';
    delete process.env.UNLAYER_PERSONAL_ACCESS_TOKEN;
    class CustomUnlayer extends UnlayerDefault {}
    const environmentSdk = new CustomUnlayer({
      baseURL: 'https://example.test',
      maxRetries: 0,
      fetch: async (request) => {
        inheritedAuthorization = request.headers.get('authorization');
        return new Response(JSON.stringify({ data: [] }), {
          headers: { 'content-type': 'application/json' },
        });
      },
    });
    process.env.UNLAYER_API_KEY = 'second-environment-api-key';
    const clonedSdk = environmentSdk.withOptions({});
    assert.equal(clonedSdk instanceof CustomUnlayer, true);
    await clonedSdk.workspaces.list();
  } finally {
    if (previousEnvironmentAPIKey === undefined) delete process.env.UNLAYER_API_KEY;
    else process.env.UNLAYER_API_KEY = previousEnvironmentAPIKey;
    if (previousEnvironmentPAT === undefined) delete process.env.UNLAYER_PERSONAL_ACCESS_TOKEN;
    else process.env.UNLAYER_PERSONAL_ACCESS_TOKEN = previousEnvironmentPAT;
  }
  assert.equal(inheritedAuthorization, 'Bearer first-environment-api-key');

  let requestCache;
  const requestAuthorizations = [];
  const requestBodies = [];
  const requestMethods = [];
  const requestURLs = [];
  let customFetchReceiver = 'not called';
  const requestOptionsSdk = new UnlayerDefault({
    apiKey: 'compat-token',
    baseURL: 'https://example.test',
    maxRetries: 0,
    fetch: async function (request) {
      customFetchReceiver = this;
      requestCache = request.cache;
      requestAuthorizations.push(request.headers.get('authorization'));
      requestBodies.push(request.body);
      requestMethods.push(request.method);
      requestURLs.push(request.url);
      return new Response(JSON.stringify({ data: [] }), {
        headers: { 'content-type': 'application/json' },
      });
    },
  });
  await requestOptionsSdk.workspaces.list({ fetchOptions: { cache: 'no-store' } });
  assert.equal(requestCache, 'no-store');
  assert.equal(customFetchReceiver, undefined);
  await requestOptionsSdk.workspaces.list({
    headers: { Authorization: 'Bearer request-authorization' },
  });
  assert.equal(requestAuthorizations.at(-1), 'Bearer request-authorization');
  await requestOptionsSdk.workspaces.list({ headers: { Authorization: null } });
  assert.equal(requestAuthorizations.at(-1), null);
  let generatedClientOverrideUsed = false;
  await requestOptionsSdk.workspaces.list({
    client: {
      get: () => {
        generatedClientOverrideUsed = true;
        throw new Error('Generated client override should have been stripped');
      },
    },
  });
  assert.equal(generatedClientOverrideUsed, false);
  await requestOptionsSdk.workspaces.list({
    baseUrl: 'https://attacker.example',
    body: 'injected body',
    method: 'POST',
    path: { workspaceId: 'injected' },
    query: { injected: 'true' },
    security: [],
    url: '/v3/blocks',
    fetchOptions: {
      baseUrl: 'https://fetch-options-attacker.example',
      body: 'fetch options body',
      method: 'DELETE',
      url: '/v3/domains',
    },
  });
  assert.equal(requestURLs.at(-1), 'https://example.test/v3/workspaces');
  assert.equal(requestMethods.at(-1), 'GET');
  assert.equal(requestBodies.at(-1), null);
  assert.equal(requestAuthorizations.at(-1), 'Bearer compat-token');

  const malformedSdk = new UnlayerDefault({
    apiKey: 'compat-token',
    baseURL: 'https://example.test',
    maxRetries: 0,
    fetch: async () =>
      new Response('{malformed JSON', {
        headers: { 'content-type': 'application/json' },
        status: 200,
      }),
  });
  const malformedRequest = malformedSdk.workspaces.list();
  const malformedResponse = await malformedRequest.asResponse();
  assert.equal(malformedResponse.status, 200);
  assert.equal(await malformedResponse.text(), '{malformed JSON');
  await assert.rejects(malformedRequest, (error) => error instanceof APIError && error.status === 200);

  let unauthenticatedFetchCalls = 0;
  const unauthenticatedSdk = new UnlayerDefault({
    apiKey: null,
    baseURL: 'https://example.test',
    maxRetries: 0,
    personalAccessToken: null,
    fetch: async () => {
      unauthenticatedFetchCalls += 1;
      return new Response(JSON.stringify({ data: [] }), {
        headers: { 'content-type': 'application/json' },
      });
    },
  });
  await assert.rejects(unauthenticatedSdk.workspaces.list(), /Could not resolve authentication method/);
  assert.equal(unauthenticatedFetchCalls, 0);
  await unauthenticatedSdk.workspaces.list({ headers: { Authorization: null } });
  assert.equal(unauthenticatedFetchCalls, 1);

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

  const streamingAbortController = new AbortController();
  const streamingRequest = publicSdk.workspaces.list({
    headers: { 'X-Stream-Abort': 'true' },
    signal: streamingAbortController.signal,
  });
  await streamingResponseStarted;
  streamingAbortController.abort('abort while reading response body');
  await assert.rejects(streamingRequest, (error) => error instanceof APIUserAbortError);

  process.stdout.write(
    'Packed SDK smoke passed: one allowlisted client, legacy compatibility, closed exports, auth, pagination, retries, timeouts, cancellation, errors, and all seven public operations\n',
  );
} finally {
  await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
}

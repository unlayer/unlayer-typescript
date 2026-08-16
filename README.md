# Unlayer TypeScript SDK

The official TypeScript SDK for the Unlayer API. It is generated directly from
Unlayer's API v3 OpenAPI document with [Hey API](https://heyapi.dev/) and uses
the native Fetch API.

## Installation

```bash
npm install @unlayer/sdk
```

## Quick start

```ts
import { Unlayer } from '@unlayer/sdk';
import { createClient } from '@unlayer/sdk/client';

const unlayer = new Unlayer({
  client: createClient({
    auth: process.env['UNLAYER_API_KEY'],
    baseUrl: 'https://api.unlayer.com',
    throwOnError: true,
  }),
});

const templates = await unlayer.templates.listTemplates({
  query: { limit: 20, projectId: 'your-project-id' },
});

const template = await unlayer.templates.getTemplate({
  path: { id: 'template-id' },
});
```

With `throwOnError: true`, failed requests reject with the typed API error body.

## Native API shape

Operations are grouped by their API resource. Parameters use Hey API's native
`path`, `query`, and `body` groups:

```ts
await unlayer.templates.convertFullToSimple({
  body: { design },
});
```

Types for request parameters, successful responses, and error responses are
exported from `@unlayer/sdk`.

To override the API URL, Fetch implementation, headers, or other native client
options, pass them to `createClient()`:

```ts
const client = createClient({
  auth: process.env['UNLAYER_API_KEY'],
  baseUrl: 'https://api.unlayer.com',
  fetch: customFetch,
  headers: { 'X-Request-ID': requestId },
  throwOnError: true,
});

const unlayer = new Unlayer({ client });
```

Each `Unlayer` instance can receive its own client, so credentials and runtime
configuration remain isolated.

## Development

The generated files under `src/` are replaced by automation from the deployed
production OpenAPI document. Change the API schema or generator configuration
in [`unlayer/unlayer`](https://github.com/unlayer/unlayer), not in generated
files here.

```bash
pnpm install
pnpm test
```

`pnpm test` checks repository formatting and generated source types, builds
CommonJS and ESM output, verifies the package export map, and validates the
packed type surface. It also installs the tarball in an isolated consumer and
checks real HTTP request and response behavior against a local server.

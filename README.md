# Unlayer TypeScript SDK

The official TypeScript SDK for the Unlayer API. It is generated directly from
Unlayer's API v3 OpenAPI document with [Hey API](https://heyapi.dev/) and uses
the native Fetch API.

> [!IMPORTANT]
> Use this SDK only from trusted server-side code. Never expose an API key or
> Personal Access Token in browser, mobile, or other client-side code.

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
  }),
});

const templates = await unlayer.templates.listTemplates({
  query: { limit: 20, projectId: 'your-project-id' },
});

const template = await unlayer.templates.getTemplate({
  path: { id: 'template-id' },
});
```

`Unlayer` requires an explicitly configured client. SDK instances do not use a
shared registry or shared credentials.

SDK operations throw the parsed API error body by default. Generated error-body
types are exported, but caught values should still be narrowed at runtime.
API failures throw the parsed body rather than an `Error` instance; network
failures retain the native Fetch error behavior.

## Native API shape

Operations are grouped by their API resource. Parameters use Hey API's native
`path`, `query`, and `body` groups:

```ts
await unlayer.templates.convertFullToSimple({
  body: { design },
});
```

Types for request parameters, successful responses, and error responses are
exported from `@unlayer/sdk`. Resource methods always return the data-only
response shape and always throw on failures so HTTP, network, abort, URL, and
response parsing errors cannot be mistaken for missing data. The lower-level
client remains available from `@unlayer/sdk/client` for callers that need Hey
API's native field response or non-throwing behavior.

To override the API URL, Fetch implementation, headers, or other native client
options, pass them to `createClient()`:

```ts
const client = createClient({
  auth: process.env['UNLAYER_API_KEY'],
  fetch: customFetch,
  headers: { 'X-Request-ID': requestId },
});

const unlayer = new Unlayer({ client });
```

`createClient()` defaults to `https://api.unlayer.com` and throwing on errors.
Pass `baseUrl` or `throwOnError` only when intentionally overriding those
defaults.

Each `Unlayer` instance can receive its own client, so credentials and runtime
configuration remain isolated.

## Migrating from 0.1

Version 0.2 replaces the generated wrapper runtime with the native Hey API
client. Construct a client explicitly and pass it to `Unlayer`:

```ts
// 0.1
import Unlayer from '@unlayer/sdk';

const unlayer = new Unlayer({ apiKey: process.env['UNLAYER_API_KEY'] });
await unlayer.templates.list({ limit: 20, projectId: 'your-project-id' });
```

```ts
// 0.2+
import { Unlayer } from '@unlayer/sdk';
import { createClient } from '@unlayer/sdk/client';

const unlayer = new Unlayer({
  client: createClient({
    auth: process.env['UNLAYER_API_KEY'],
  }),
});

await unlayer.templates.listTemplates({
  query: { limit: 20, projectId: 'your-project-id' },
});
```

Operation names now match the OpenAPI operation IDs, and parameters are grouped
under `path`, `query`, and `body`. The default export, implicit environment
configuration, custom error hierarchy, retries, timeouts, and pagination
helpers from 0.1 are no longer part of the SDK. API errors are parsed bodies,
not `Error` subclasses, and do not carry response status or headers. Configure
retry behavior with a custom Fetch implementation and timeouts with a request
signal when needed:

```ts
await unlayer.templates.listTemplates({
  query: { projectId: 'your-project-id' },
  signal: AbortSignal.timeout(60_000),
});
```

Git URL dependencies are no longer supported because generated build output is
not committed. To test an unreleased revision, clone it and install the packed
`dist` archive as described in `CONTRIBUTING.md`.

## Development

The generated files under `src/` come from the committed public OpenAPI snapshot
and the pinned configuration in `openapi-ts.config.ts`. Do not edit generated
files directly. Regenerate them with Node.js 22.18 or newer:

```bash
pnpm install
pnpm generate
pnpm test
```

Run `pnpm sync-spec` before generation only when intentionally updating the
snapshot from the production API document. This keeps unrelated API changes out
of generator and configuration updates.

The published SDK supports Node.js 20 and newer. The newer Node.js requirement
applies only to the development and generation toolchain.

`pnpm test` checks repository formatting and generated source types, builds
CommonJS and ESM output, verifies the package export map, and validates the
packed type surface. It also installs the tarball in an isolated consumer and
checks real HTTP request and response behavior against a local server.

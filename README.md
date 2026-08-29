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
import Unlayer from '@unlayer/sdk';

const unlayer = new Unlayer({
  apiKey: process.env['UNLAYER_API_KEY'],
  projectID: 'your-project-id',
});

const templates = await unlayer.templates.list({ limit: 20 });

const template = await unlayer.templates.retrieve('template-id');
```

The client also reads `UNLAYER_API_KEY`, `UNLAYER_PERSONAL_ACCESS_TOKEN`,
`UNLAYER_PROJECT_ID`, and `UNLAYER_BASE_URL` when their corresponding options
are omitted.

## Public API

The SDK exposes one allowlisted API with the same resource and method shapes as
version 0.1:

```text
templates.list(params?, options?)
templates.retrieve(id, params?, options?)
projects.retrieve(id, options?)
workspaces.list(options?)
workspaces.retrieve(id, options?)
convert.fullToSimple.create(body, options?)
convert.simpleToFull.create(body, options?)
```

The OpenAPI-generated transport is internal. Operations do not become public
merely because they appear in the production OpenAPI document, and generated
operation-ID names such as `listTemplates()` are not exported.

## Pagination, retries, and errors

```ts
for await (const item of unlayer.templates.list({ limit: 20 })) {
  console.log(item.id);
}
```

Requests retry connection failures, 408, 409, 429, and 5xx responses twice by
default. Configure client-level retry and timeout behavior when constructing
the SDK:

```ts
const unlayer = new Unlayer({
  maxRetries: 3,
  timeout: 30_000,
});
```

API failures throw an `APIError` subclass with the response status, headers,
and parsed error body. Network, timeout, and abort failures use
`APIConnectionError`, `APIConnectionTimeoutError`, and `APIUserAbortError`.

```ts
try {
  await unlayer.templates.retrieve('missing-template');
} catch (error) {
  if (error instanceof Unlayer.NotFoundError) {
    console.error(error.status, error.message);
  }
}
```

## Adding a public endpoint

[`public-api.json`](public-api.json) is the public SDK contract. Adding an
operation there and running `pnpm generate` validates it against OpenAPI and
generates its public resource, method, and types. Operations absent from the
allowlist remain internal. Generation fails if an allowlisted operation is
removed or its declared path or pagination contract changes.

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

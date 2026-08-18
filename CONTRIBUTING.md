## Setting up the environment

This repository uses the pnpm version pinned in `package.json`. Development and
SDK generation require Node.js 22.18 or newer; the published package supports
Node.js 20 and newer. Enable Corepack before setup so the correct pnpm version
is selected automatically.

To set up the repository, run:

```sh
$ corepack enable
$ pnpm install
$ pnpm build
```

This will install all the required dependencies and build output files to `dist/`.

## Why Hey API

The SDK uses Hey API because it produces an idiomatic TypeScript Fetch client,
can run entirely from this repository, and adds no runtime dependency to the
published package. The generator, OpenAPI snapshot, configuration, and
postprocessing are all pinned and reviewable, so regeneration does not depend
on a hosted SDK-generation service.

OpenAPI Generator was considered for its broad language support, but Hey API's
TypeScript output and native Fetch surface require less package-specific
adaptation here. Hosted generators would retain an external control plane, and
custom or LLM-generated runtime code would create more maintenance than a
pinned open-source generator. This repository intentionally scopes generation
to the TypeScript package.

## Modifying/Adding code

The SDK source is generated with the pinned Hey API version and
`openapi-ts.config.ts` from the committed `openapi.json` snapshot. Run:

```sh
$ pnpm generate
```

Generation replaces `src/` and then applies the small, fail-closed SDK contract
postprocessor. Do not edit generated source by hand. If Hey API changes its
generated request layout, the postprocessor stops instead of producing an SDK
with mismatched runtime and TypeScript behavior.

To intentionally update the snapshot from the public production API document,
run both commands and review the specification and generated-source diffs:

```sh
$ pnpm sync-spec
$ pnpm generate
```

The sync command records the canonical API server in the local snapshot. Hey
previously inferred that origin from the remote document URL, while local-file
generation requires it explicitly.

The `Sync OpenAPI` workflow performs this check once a day and can also be run
manually. When the production document changes, it regenerates and verifies the
SDK before opening or updating one automation PR. The workflow exits early when
the committed snapshot is already current.

`pnpm test` regenerates the SDK from the committed snapshot and fails if the
checked-in source has drifted.

## Testing an unreleased package

Git URL dependencies are not supported because generated build output is not
committed to the repository. To test an unreleased revision, build and pack the
same package layout that the release workflow publishes:

```sh
$ pnpm build
$ archive=$(npm pack --silent ./dist)
$ cd ../my-package
$ npm install "../unlayer-typescript/$archive"
```

This exercises the package manifest and files that consumers receive from npm
instead of linking directly to repository internals.

## Running tests

```sh
$ pnpm test
```

This verifies source types and formatting, CommonJS and ESM builds, public
package exports, and the packed type surface. It also installs the package in an
isolated consumer and exercises its HTTP behavior.

## Linting and formatting

This repository uses [prettier](https://www.npmjs.com/package/prettier) and
[eslint](https://www.npmjs.com/package/eslint) to format the code in the repository.

To lint:

```sh
$ pnpm lint
```

To format and fix all lint issues automatically:

```sh
$ pnpm fix
```

## Publishing and releases

Release Please maintains the release PR. Merging that PR creates a GitHub
release and dispatches the `Publish NPM` workflow at the matching tag. Publishing
uses npm trusted publishing. The workflow runs full verification on Node.js 24,
tests the exact packed tarball on Node.js 20, and publishes that same artifact
only after both jobs pass.

The repository requires two one-time settings:

- GitHub Actions must be allowed to create pull requests. The built-in,
  short-lived `GITHUB_TOKEN` creates SDK update PRs, release PRs, tags, and
  releases only within this repository.
- An npm trusted publisher for organization `unlayer`, repository
  `unlayer-typescript`, workflow `publish-npm.yml`, with `npm publish` allowed.

No GitHub App, personal access token, or long-lived npm token is required.
GitHub's OIDC token provides short-lived npm credentials and npm automatically
records package provenance.

To retry a failed package release, manually run the
[`Publish NPM` workflow](https://github.com/unlayer/unlayer-typescript/actions/workflows/publish-npm.yml)
and select the matching `v<version>` release tag. Branches cannot publish.

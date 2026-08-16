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

## Modifying/Adding code

The SDK source is generated with the pinned Hey API version and
`openapi-ts.config.ts` from the deployed production OpenAPI document. Run:

```sh
$ pnpm generate
```

Generation replaces `src/` and then applies the small, fail-closed SDK contract
postprocessor. Do not edit generated source by hand. If Hey API changes its
generated request layout, the postprocessor stops instead of producing an SDK
with mismatched runtime and TypeScript behavior.

## Using the repository from source

If you’d like to use the repository from source, you can either install from git or link to a cloned repository:

To install via git:

```sh
$ npm install git+ssh://git@github.com:unlayer/unlayer-typescript.git
```

Alternatively, to link a local copy of the repo:

```sh
# Clone
$ git clone https://www.github.com/unlayer/unlayer-typescript
$ cd unlayer-typescript

$ pnpm link --global
$ cd ../my-package
$ pnpm link --global @unlayer/sdk
```

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
release, which triggers the `Publish NPM` workflow and publishes `@unlayer/sdk`
through npm trusted publishing.

The repository requires two one-time release settings:

- Repository secrets named `SDK_PUBLISHER_CLIENT_ID` and
  `SDK_PUBLISHER_PRIVATE_KEY` for the GitHub App that creates release PRs and
  releases. Install the app on this repository with read/write access to
  contents, issues, and pull requests.
- An npm trusted publisher for organization `unlayer`, repository
  `unlayer-typescript`, workflow `publish-npm.yml`, with `npm publish` allowed.

No long-lived npm token is required. GitHub's OIDC token provides short-lived
credentials and npm automatically records package provenance.

To retry a failed package release, manually run the
[`Publish NPM` workflow](https://github.com/unlayer/unlayer-typescript/actions/workflows/publish-npm.yml)
for the release commit.

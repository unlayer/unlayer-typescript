## Setting up the environment

This repository uses the pnpm version pinned in `package.json`. Enable Corepack
before setup so the correct version is selected automatically.

To set up the repository, run:

```sh
$ corepack enable
$ pnpm install
$ pnpm build
```

This will install all the required dependencies and build output files to `dist/`.

## Modifying/Adding code

The SDK source is generated with Hey API from Unlayer API v3. Automation
replaces `src/` from the deployed production OpenAPI document, except for
`src/version.ts`. Do not edit generated source by hand. Change the API schema or
generator configuration in
[`unlayer/unlayer`](https://github.com/unlayer/unlayer) instead.

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

Changes made to this repository via the automated release PR pipeline should publish to npm automatically. If
the changes aren't made through the automated pipeline, you may want to make releases manually.

### Publish with a GitHub workflow

You can release to package managers by using [the `Publish NPM` GitHub action](https://www.github.com/unlayer/unlayer-typescript/actions/workflows/publish-npm.yml). This requires a setup organization or repository secret to be set up.

### Publish manually

If you need to manually release a package, you can run the `bin/publish-npm` script with an `NPM_TOKEN` set on
the environment.

# Changelog

## [0.2.0](https://github.com/unlayer/unlayer-typescript/compare/v0.1.0...v0.2.0) (2026-08-30)


### ⚠ BREAKING CHANGES

* **repo:** replace the 0.1 default-export wrapper, implicit configuration, custom errors, retries, timeouts, pagination helpers, and operation signatures with the named native Hey API client and resource methods.

### Features

* generate allowlisted compatible public API ([156fa92](https://github.com/unlayer/unlayer-typescript/commit/156fa929ab9d53be20a0aecb1a2334bbc469c60a))
* **repo:** replace wrapper with native Hey API SDK ([3e23834](https://github.com/unlayer/unlayer-typescript/commit/3e23834b33a90607dcc7a6985c56edd2e1a8bd6f))


### Bug Fixes

* close SDK compatibility and release gaps ([3e22138](https://github.com/unlayer/unlayer-typescript/commit/3e2213815789034e2f5abbac85e26bb73b92bdea))
* preserve request compatibility and harden releases ([2d2e942](https://github.com/unlayer/unlayer-typescript/commit/2d2e9421ca17e6e2b06b22d658add945cc6ce7f0))
* **repo:** enforce safe SDK client defaults ([09a3266](https://github.com/unlayer/unlayer-typescript/commit/09a3266bcd8301b1a4827cbd689f6df3fd27c156))
* **repo:** fail closed on npm registry errors ([ba04bc7](https://github.com/unlayer/unlayer-typescript/commit/ba04bc70914e2da97a24a76ce83f93167e83ff75))
* **repo:** isolate generated SDK clients ([b49c5ba](https://github.com/unlayer/unlayer-typescript/commit/b49c5ba42bb674414ff47ce586af1e1bcaf645f0))
* **repo:** preserve default SDK error throwing ([73cb592](https://github.com/unlayer/unlayer-typescript/commit/73cb592513a24dc0b0f4c2377fc8fc63dbd8d38d))
* **repo:** target release workflow dispatches ([8758fa1](https://github.com/unlayer/unlayer-typescript/commit/8758fa1599a2b881ea6857d85f4007c2c02cb55d))
* **repo:** target release workflow dispatches ([101116a](https://github.com/unlayer/unlayer-typescript/commit/101116aaba8fe38428d72550030310bd7291990e))
* restore SDK compatibility behavior ([7ea4769](https://github.com/unlayer/unlayer-typescript/commit/7ea47693a187d6408421dbdacd7a9d1a860068fe))


### Chores

* **repo:** correct public package metadata ([0e00e4a](https://github.com/unlayer/unlayer-typescript/commit/0e00e4aa4d5838b532ec3d10131bbda7caaeafc6))


### Documentation

* **repo:** document automated release setup ([bdc586e](https://github.com/unlayer/unlayer-typescript/commit/bdc586e858e279aefd204a3e46d292f1a371b37a))
* **repo:** document Hey API generator choice ([334d20f](https://github.com/unlayer/unlayer-typescript/commit/334d20fd9d59d055f8a07e1571f1927db631fb23))
* **repo:** document native SDK migration ([3db499a](https://github.com/unlayer/unlayer-typescript/commit/3db499abe31e31d153454d1c14c0d8165724c69a))
* **repo:** document self-contained SDK automation ([a61e78f](https://github.com/unlayer/unlayer-typescript/commit/a61e78f39f62efafb242ddedb96e8cb097fb0a6b))
* **repo:** document supported unreleased SDK testing ([6ecde61](https://github.com/unlayer/unlayer-typescript/commit/6ecde61acbba367c22f449d8e2f01411657c8a64))
* **repo:** keep SDK guidance public-safe ([210e997](https://github.com/unlayer/unlayer-typescript/commit/210e9973ffff15c395b588ad312876378a4a1ca8))


### Build System

* **repo:** make SDK generation deterministic ([e5f0f43](https://github.com/unlayer/unlayer-typescript/commit/e5f0f43e80ce8e5f27dabd1a836760e59c88c60f))
* **repo:** migrate SDK tooling to pnpm ([0dc6265](https://github.com/unlayer/unlayer-typescript/commit/0dc62658aefba1f2a11747d1d5342eb50c4db003))
* **repo:** override vulnerable YAML parser ([7e4ea6c](https://github.com/unlayer/unlayer-typescript/commit/7e4ea6c2ca9489890bc6fd12ed4f53696e1937ce))
* **repo:** polish distributed package metadata ([1ff30a9](https://github.com/unlayer/unlayer-typescript/commit/1ff30a92775e1e3ae27fffa1f5aacbcd889be0de))
* **repo:** reject unexpected ungrouped API operations ([15e987f](https://github.com/unlayer/unlayer-typescript/commit/15e987fa11c27a804bedf4da138b64666d32e10e))

## 0.1.0 (2026-02-24)

Full Changelog: [v0.0.1...v0.1.0](https://github.com/unlayer/unlayer-typescript/compare/v0.0.1...v0.1.0)

### Features

* **api:** api update ([f740048](https://github.com/unlayer/unlayer-typescript/commit/f7400489d675a869198a40ccdb2bd6eb056f1d1e))
* **api:** api update ([15c4f5f](https://github.com/unlayer/unlayer-typescript/commit/15c4f5f8eb2d50becac341c9f6526e446dd8f1ee))
* **api:** api update ([1c583dc](https://github.com/unlayer/unlayer-typescript/commit/1c583dc28042f3e5a84b7068d22e96194ebee24d))
* **api:** api update ([1017fc3](https://github.com/unlayer/unlayer-typescript/commit/1017fc3e4937e25cab5e217e17eeabf13e3bdd86))
* **api:** api update ([cedc263](https://github.com/unlayer/unlayer-typescript/commit/cedc26385bcf9090c87e2fec80bd81928f0a326d))
* **api:** api update ([7e5c849](https://github.com/unlayer/unlayer-typescript/commit/7e5c8493d44ba71997013f1c7e0fdf8806e5809f))
* **api:** api update ([9546893](https://github.com/unlayer/unlayer-typescript/commit/9546893626914ce1cb7c109cdc6846112315fa7d))
* **api:** api update ([d63b09d](https://github.com/unlayer/unlayer-typescript/commit/d63b09d013478b8ee8381e1ec41a9218f9d56a57))
* **api:** api update ([776ec7f](https://github.com/unlayer/unlayer-typescript/commit/776ec7fbc85b93335d429856815321ff1a1d8482))
* **api:** api update ([362d1df](https://github.com/unlayer/unlayer-typescript/commit/362d1dfcaa4c692275e2334b6f78ac225ba692bb))
* **api:** api update ([9cc02bd](https://github.com/unlayer/unlayer-typescript/commit/9cc02bd3c6a9657a9bbe2c315a2d0b4db3c0fab4))
* **api:** api update ([ae81c29](https://github.com/unlayer/unlayer-typescript/commit/ae81c29c39b393ffd7669e7a1042ae6ee77ba318))
* **api:** api update ([a910a85](https://github.com/unlayer/unlayer-typescript/commit/a910a85afca32c312bce89eb845bc7b2d16abc48))
* **api:** api update ([98fea2f](https://github.com/unlayer/unlayer-typescript/commit/98fea2faa6c3e165cd2512c8609558c58cfeed91))
* **api:** api update ([d57a0ee](https://github.com/unlayer/unlayer-typescript/commit/d57a0eedf033b07863274dacbb547a4948850fdd))
* **api:** api update ([5e0102a](https://github.com/unlayer/unlayer-typescript/commit/5e0102a05e6705e10e7e1d4763311c9f2bbe1a36))
* **api:** api update ([b440140](https://github.com/unlayer/unlayer-typescript/commit/b44014041a854feb5f1ea5e27caa017ccd4faa76))
* **api:** api update ([818ccf5](https://github.com/unlayer/unlayer-typescript/commit/818ccf5368794101a025c35fd32bd7cd493080b6))
* **api:** api update ([715f301](https://github.com/unlayer/unlayer-typescript/commit/715f301d5701c92c49a933b17e7f132782e25a88))
* **api:** api update ([cd7f8f5](https://github.com/unlayer/unlayer-typescript/commit/cd7f8f50454a9ec2e36228aa83731905f43613b4))
* **api:** api update ([d3c0bb9](https://github.com/unlayer/unlayer-typescript/commit/d3c0bb98e603de73c979e183998e8ec166e4a850))
* **api:** api update ([4bca036](https://github.com/unlayer/unlayer-typescript/commit/4bca036b92435aaafdcd26598825e30dde50a53c))
* **api:** api update ([488204d](https://github.com/unlayer/unlayer-typescript/commit/488204db0c50381103c01a4a85b99cbc7a6cafe6))
* **api:** api update ([56cd90c](https://github.com/unlayer/unlayer-typescript/commit/56cd90c08c04545866f0f0db4178a76ac7e464ed))
* **api:** api update ([05bdd2a](https://github.com/unlayer/unlayer-typescript/commit/05bdd2ae310c66d8afe9b8a20cba0da6a99068fd))
* **api:** api update ([eaa72f9](https://github.com/unlayer/unlayer-typescript/commit/eaa72f92f6303f6ddb973c0aaee7cdf3f6204cdf))
* **api:** api update ([f725c4b](https://github.com/unlayer/unlayer-typescript/commit/f725c4ba942b4fc30d9554333dfc076365491e0c))
* **api:** api update ([dc1e86b](https://github.com/unlayer/unlayer-typescript/commit/dc1e86bc2018c62150112a424bb974f04d9b0dd5))


### Bug Fixes

* **client:** avoid memory leak with abort signals ([7bda4ec](https://github.com/unlayer/unlayer-typescript/commit/7bda4eca34dd59002d95dac84403244197d8084d))
* **client:** avoid removing abort listener too early ([e1d6c3b](https://github.com/unlayer/unlayer-typescript/commit/e1d6c3b236c91d8d427a330bce8424440f569b2d))
* **docs/contributing:** correct pnpm link command ([fcb94a9](https://github.com/unlayer/unlayer-typescript/commit/fcb94a94994eb22cba4c4376e9e2e451d107f0e6))


### Performance Improvements

* faster formatting ([8bcad9d](https://github.com/unlayer/unlayer-typescript/commit/8bcad9dbea995a0859146219a76be54d08fd679e))


### Chores

* break long lines in snippets into multiline ([73adfc7](https://github.com/unlayer/unlayer-typescript/commit/73adfc7245bfb131d23674ad8ccc567edc35214f))
* **ci:** upgrade `actions/github-script` ([a1b0a85](https://github.com/unlayer/unlayer-typescript/commit/a1b0a85ef6290d9d235ece57e85f4103dfd009cd))
* **client:** do not parse responses with empty content-length ([b692976](https://github.com/unlayer/unlayer-typescript/commit/b692976a8ee156603ed7e0e0c081074d72901800))
* **client:** restructure abort controller binding ([655c82b](https://github.com/unlayer/unlayer-typescript/commit/655c82b9650d633f9b122137038b0e6520622273))
* do not install brew dependencies in ./scripts/bootstrap by default ([f6f1e00](https://github.com/unlayer/unlayer-typescript/commit/f6f1e006b1151073d8024e480944a2dddacd996b))
* **internal/client:** fix form-urlencoded requests ([572b771](https://github.com/unlayer/unlayer-typescript/commit/572b771e15912f404312e45faeb9cc9a41266fb7))
* **internal:** avoid type checking errors with ts-reset ([46d1721](https://github.com/unlayer/unlayer-typescript/commit/46d1721a5ac010bdd157246a5b9af33a6f543e70))
* **internal:** codegen related update ([709520b](https://github.com/unlayer/unlayer-typescript/commit/709520b589721f8c120f6a2c98dead7fe590d396))
* **internal:** codegen related update ([999534c](https://github.com/unlayer/unlayer-typescript/commit/999534c25b827c76f1a2d63baa504c561be021fc))
* **internal:** fix incremental formatting in some cases ([13dcf7a](https://github.com/unlayer/unlayer-typescript/commit/13dcf7ad2a4a96ac1fbcccdf4764b3a58323ff7b))
* **internal:** fix pagination internals not accepting option promises ([3424373](https://github.com/unlayer/unlayer-typescript/commit/3424373440f1c9e4cd4ea84fddbd19a1ae20658f))
* **internal:** ignore .eslintcache ([c7109e6](https://github.com/unlayer/unlayer-typescript/commit/c7109e673b18e528540c7cc7f370fa28f0d14560))
* **internal:** remove .eslintcache ([e76b794](https://github.com/unlayer/unlayer-typescript/commit/e76b794c23937c12cd72d49e28f5b147f7331e36))
* **internal:** remove deprecated `compilerOptions.baseUrl` from tsconfig.json ([dcd138d](https://github.com/unlayer/unlayer-typescript/commit/dcd138dc4e5866dc2b97723ff07431689b886ae3))
* **internal:** update `actions/checkout` version ([10a8cd6](https://github.com/unlayer/unlayer-typescript/commit/10a8cd6c427e5b947a9da3bf02329c42558f148b))
* **internal:** upgrade babel, qs, js-yaml ([da573c3](https://github.com/unlayer/unlayer-typescript/commit/da573c308c179440bd919cb600ecc97193f795f9))
* **internal:** use npm pack for build uploads ([f21454e](https://github.com/unlayer/unlayer-typescript/commit/f21454e64e09a5b7d1cce44901609b5b3515a75b))
* **jsdoc:** fix [@link](https://github.com/link) annotations to refer only to parts of the package‘s public interface ([5ac93e5](https://github.com/unlayer/unlayer-typescript/commit/5ac93e5142e7e629f48d318acc71193c1056a002))
* update mock server docs ([224d107](https://github.com/unlayer/unlayer-typescript/commit/224d1071995723a089064f18a92c17225b186a83))
* update SDK settings ([60c8dc9](https://github.com/unlayer/unlayer-typescript/commit/60c8dc98d816f0212c0b53eb6d3379840b33bf31))
* update SDK settings ([807f568](https://github.com/unlayer/unlayer-typescript/commit/807f5683421fb5b1961d5ead6dbd5ca79875b1e0))

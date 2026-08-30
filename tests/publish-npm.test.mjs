import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const packageJson = JSON.parse(fs.readFileSync(path.join(repositoryRoot, 'package.json'), 'utf8'));
const [packageMajor, packageMinor, packagePatch] = packageJson.version
  .split('-', 1)[0]
  .split('.')
  .map(BigInt);
const earlierRegistryVersion =
  packagePatch > 0n ? `${packageMajor}.${packageMinor}.${packagePatch - 1n}`
  : packageMinor > 0n ? `${packageMajor}.${packageMinor - 1n}.0`
  : packageMajor > 0n ? `${packageMajor - 1n}.0.0`
  : '0.0.0-0';
const laterRegistryVersion = `${packageMajor + 1n}.0.0`;

function createHarness() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'unlayer-sdk-publish-test.'));
  const fakeBin = path.join(root, 'bin');
  const packageDir = path.join(root, 'package');
  const publishLog = path.join(root, 'publish.log');
  fs.mkdirSync(fakeBin);
  fs.mkdirSync(packageDir);

  const pack = spawnSync('npm', ['pack', '--silent', '--pack-destination', packageDir, './dist'], {
    cwd: repositoryRoot,
    encoding: 'utf8',
    env: { ...process.env, NPM_CONFIG_CACHE: path.join(root, 'npm-cache') },
  });
  assert.equal(pack.status, 0, pack.stderr);

  const archiveName = pack.stdout.trim();
  assert.notEqual(archiveName, '');
  const archive = path.join(packageDir, archiveName);

  const fakeNpm = path.join(fakeBin, 'npm');
  fs.writeFileSync(
    fakeNpm,
    `#!/usr/bin/env bash
set -euo pipefail

case "\${1:-}" in
  --version)
    echo '11.5.1'
    ;;
  view)
    case "\${FAKE_NPM_VIEW_MODE:-}" in
      success)
        printf '"%s"\n' "\${FAKE_NPM_LAST_VERSION:-0.0.0}"
        ;;
      e404)
        echo '{"error":{"code":"E404"}}'
        exit 1
        ;;
      registry-error)
        echo 'registry unavailable' >&2
        exit 1
        ;;
      empty)
        ;;
      malformed)
        echo 'not-json'
        ;;
      *)
        echo "unexpected view mode: \${FAKE_NPM_VIEW_MODE:-}" >&2
        exit 1
        ;;
    esac
    ;;
  publish)
    printf '%s\\n' "$*" > "\$FAKE_NPM_PUBLISH_LOG"
    ;;
  *)
    echo "unexpected npm command: $*" >&2
    exit 1
    ;;
esac
`,
  );
  fs.chmodSync(fakeNpm, 0o755);

  const run = (mode, { archiveArgument = archive, lastVersion = earlierRegistryVersion } = {}) =>
    spawnSync('bash', ['./bin/publish-npm', archiveArgument], {
      cwd: repositoryRoot,
      encoding: 'utf8',
      env: {
        ...process.env,
        FAKE_NPM_PUBLISH_LOG: publishLog,
        FAKE_NPM_LAST_VERSION: lastVersion,
        FAKE_NPM_VIEW_MODE: mode,
        GITHUB_ACTIONS: 'true',
        GITHUB_REF_NAME: `v${packageJson.version}`,
        GITHUB_REF_TYPE: 'tag',
        GITHUB_SHA: 'HEAD',
        PATH: `${fakeBin}:${process.env.PATH}`,
        RELEASE_MAIN_REF: 'HEAD',
      },
    });

  return {
    archive,
    cleanup: () => fs.rmSync(root, { force: true, recursive: true }),
    publishLog,
    run,
  };
}

for (const mode of ['success', 'e404']) {
  test(`publishes after an accepted npm view ${mode} response`, () => {
    const harness = createHarness();
    try {
      const result = harness.run(mode);
      assert.equal(result.status, 0, result.stderr);
      assert.equal(
        fs.readFileSync(harness.publishLog, 'utf8').trim(),
        `publish ${fs.realpathSync(harness.archive)} --tag latest --access public`,
      );
    } finally {
      harness.cleanup();
    }
  });
}

test('publishes a workflow-style relative archive path as a local file', () => {
  const harness = createHarness();
  const relativeDirectory = fs.mkdtempSync(path.join(repositoryRoot, 'sdk-package-test.'));
  const relativeArchive = path.join(relativeDirectory, path.basename(harness.archive));
  fs.copyFileSync(harness.archive, relativeArchive);

  try {
    const archiveArgument = path.relative(repositoryRoot, relativeArchive);
    assert.equal(path.isAbsolute(archiveArgument), false);
    assert.equal(archiveArgument.startsWith('.'), false);

    const result = harness.run('e404', { archiveArgument });
    assert.equal(result.status, 0, result.stderr);
    assert.equal(
      fs.readFileSync(harness.publishLog, 'utf8').trim(),
      `publish ${fs.realpathSync(relativeArchive)} --tag latest --access public`,
    );
  } finally {
    fs.rmSync(relativeDirectory, { force: true, recursive: true });
    harness.cleanup();
  }
});

test('does not move latest backwards when an older stable release is dispatched', () => {
  const harness = createHarness();
  try {
    const result = harness.run('success', { lastVersion: laterRegistryVersion });
    assert.notEqual(result.status, 0);
    assert.equal(
      result.stderr.includes(
        `refusing to move the latest dist-tag from ${laterRegistryVersion} to ${packageJson.version}`,
      ),
      true,
    );
    assert.equal(fs.existsSync(harness.publishLog), false);
  } finally {
    harness.cleanup();
  }
});

test('semantic version ordering handles stable and prerelease versions', () => {
  const compare = (candidate, current) =>
    spawnSync('node', ['./scripts/utils/is-newer-semver.cjs', candidate, current], {
      cwd: repositoryRoot,
      encoding: 'utf8',
    });

  assert.equal(compare('1.0.1', '1.0.0').status, 0);
  assert.equal(compare('1.0.0', '1.0.0-rc.1').status, 0);
  assert.equal(compare('1.0.0-rc.2', '1.0.0-rc.1').status, 0);
  assert.notEqual(compare('1.0.0', '1.0.0').status, 0);
  assert.notEqual(compare('1.0.0-rc.1', '1.0.0').status, 0);
  assert.notEqual(compare('1.0.0-alpha.2', '1.0.0-alpha.10').status, 0);
  assert.notEqual(compare('1.0.0-alpha.01', '1.0.0-alpha.1').status, 0);
});

for (const mode of ['registry-error', 'empty', 'malformed']) {
  test(`does not publish after an npm view ${mode} response`, () => {
    const harness = createHarness();
    try {
      const result = harness.run(mode);
      assert.notEqual(result.status, 0);
      assert.equal(fs.existsSync(harness.publishLog), false);
    } finally {
      harness.cleanup();
    }
  });
}

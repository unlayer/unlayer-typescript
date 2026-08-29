import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const packageJson = JSON.parse(fs.readFileSync(path.join(repositoryRoot, 'package.json'), 'utf8'));
const publishWorkflow = fs.readFileSync(
  path.join(repositoryRoot, '.github/workflows/publish-npm.yml'),
  'utf8',
);
const syncWorkflow = fs.readFileSync(path.join(repositoryRoot, '.github/workflows/sync-openapi.yml'), 'utf8');

test('the package declares the actual Node runtime floor', () => {
  assert.equal(packageJson.engines?.node, '>=20.3.0');
});

test('the spec sync does not expose checkout credentials to generated code', () => {
  assert.match(syncWorkflow, /- uses: actions\/checkout@v6\n\s+with:\n\s+persist-credentials: false/);
});

test('the release checkout fetches main without persisting credentials', () => {
  assert.match(
    publishWorkflow,
    /jobs:\n\s+verify:[\s\S]*?- uses: actions\/checkout@v6\n\s+with:\n\s+fetch-depth: 0\n\s+persist-credentials: false/,
  );
});

test('the release reference guard rejects commits outside main', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'unlayer-sdk-release-ref-test.'));
  const fakeGit = path.join(root, 'git');
  fs.writeFileSync(
    fakeGit,
    `#!/usr/bin/env bash
if [ "\${1:-}" = merge-base ] && [ "\${2:-}" = --is-ancestor ]; then
  [ "\${FAKE_GIT_ANCESTOR:-}" = true ]
  exit
fi
echo "unexpected git invocation: $*" >&2
exit 2
`,
  );
  fs.chmodSync(fakeGit, 0o755);

  const run = (ancestor) =>
    spawnSync('bash', ['./bin/check-release-ref'], {
      cwd: repositoryRoot,
      encoding: 'utf8',
      env: {
        ...process.env,
        FAKE_GIT_ANCESTOR: String(ancestor),
        GITHUB_ACTIONS: 'true',
        GITHUB_REF_NAME: `v${packageJson.version}`,
        GITHUB_REF_TYPE: 'tag',
        GITHUB_SHA: 'release-commit',
        PATH: `${root}:${process.env.PATH}`,
        RELEASE_MAIN_REF: 'origin/main',
      },
    });

  try {
    const accepted = run(true);
    assert.equal(accepted.status, 0, accepted.stderr);

    const rejected = run(false);
    assert.notEqual(rejected.status, 0);
    assert.match(rejected.stderr, /is not an ancestor of origin\/main/);
  } finally {
    fs.rmSync(root, { force: true, recursive: true });
  }
});

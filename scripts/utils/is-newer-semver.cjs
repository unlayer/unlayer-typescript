#!/usr/bin/env node

const SEMVER_PATTERN =
  /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$/;

const parse = (version) => {
  const match = SEMVER_PATTERN.exec(version);
  if (!match) throw new Error(`invalid semantic version: ${version}`);
  const prerelease = match[4]?.split('.') ?? [];
  if (prerelease.some((identifier) => /^\d+$/.test(identifier) && /^0\d+/.test(identifier))) {
    throw new Error(`invalid semantic version: ${version}`);
  }
  return {
    core: match.slice(1, 4),
    prerelease,
  };
};

const compareNumericIdentifiers = (left, right) => {
  if (left.length !== right.length) return left.length < right.length ? -1 : 1;
  if (left === right) return 0;
  return left < right ? -1 : 1;
};

const compareIdentifiers = (left, right) => {
  const leftIsNumber = /^\d+$/.test(left);
  const rightIsNumber = /^\d+$/.test(right);
  if (leftIsNumber && rightIsNumber) return compareNumericIdentifiers(left, right);
  if (leftIsNumber !== rightIsNumber) return leftIsNumber ? -1 : 1;
  if (left === right) return 0;
  return left < right ? -1 : 1;
};

const compare = (leftVersion, rightVersion) => {
  const left = parse(leftVersion);
  const right = parse(rightVersion);

  for (let index = 0; index < left.core.length; index += 1) {
    const result = compareNumericIdentifiers(left.core[index], right.core[index]);
    if (result !== 0) return result;
  }

  if (left.prerelease.length === 0 || right.prerelease.length === 0) {
    if (left.prerelease.length === right.prerelease.length) return 0;
    return left.prerelease.length === 0 ? 1 : -1;
  }

  const length = Math.max(left.prerelease.length, right.prerelease.length);
  for (let index = 0; index < length; index += 1) {
    const leftIdentifier = left.prerelease[index];
    const rightIdentifier = right.prerelease[index];
    if (leftIdentifier === undefined || rightIdentifier === undefined) {
      return leftIdentifier === undefined ? -1 : 1;
    }
    const result = compareIdentifiers(leftIdentifier, rightIdentifier);
    if (result !== 0) return result;
  }
  return 0;
};

if (process.argv.length !== 4) {
  console.error('usage: is-newer-semver.cjs <candidate> <current>');
  process.exit(2);
}

try {
  process.exitCode = compare(process.argv[2], process.argv[3]) > 0 ? 0 : 1;
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 2;
}

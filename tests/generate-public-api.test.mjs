import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import test from 'node:test';

const require = createRequire(import.meta.url);
const {
  renderFacade,
  renderPackageIndex,
  renderTypeAliases,
  validateManifest,
} = require('../scripts/generate-public-api.cjs');

const manifest = JSON.parse(fs.readFileSync(new URL('../public-api.json', import.meta.url), 'utf8'));
const openApi = JSON.parse(fs.readFileSync(new URL('../openapi.json', import.meta.url), 'utf8'));
const sdkSource = fs.readFileSync(new URL('../src/sdk.gen.ts', import.meta.url), 'utf8');

const validate = (candidate) => validateManifest({ manifest: candidate, openApi, sdkSource });

test('the initial public SDK exposes only the seven allowlisted operations', () => {
  const result = validate(manifest);

  assert.deepEqual(result.exposedOperationIds, [
    'listTemplates',
    'getTemplate',
    'getProject',
    'listWorkspaces',
    'getWorkspace',
    'convertFullToSimple',
    'convertSimpleToFull',
  ]);
  assert.equal(result.availableOperationIds.length, 50);
  assert.equal(result.unexposedOperationIds.length, 43);
  assert.equal(result.unexposedOperationIds.includes('listBlocks'), true);

  const facade = renderFacade(manifest.operations);
  const packageIndex = renderPackageIndex(manifest.operations);
  const typeAliases = renderTypeAliases(manifest.operations);
  assert.equal(facade.includes('export class Blocks'), false);
  assert.match(typeAliases, /export type TemplateListResponsesCursorPage = CursorPage<TemplateListResponse>/);
  assert.match(typeAliases, /export namespace TemplateRetrieveResponse/);
  assert.match(facade, /export declare namespace Unlayer/);
  assert.match(facade, /type TemplateListResponsesCursorPage as TemplateListResponsesCursorPage/);
  assert.match(facade, /PagePromise<TemplateListResponsesCursorPage, TemplateListResponse>/);
  assert.match(facade, /cursor === undefined \? \{\} : \{ cursor: cursor \}/);
  assert.match(
    facade,
    /return new APIPromise\(\n\s+createCompatibilityRequest\(options, \(requestOptions\) =>/,
  );
  assert.match(facade, /this\.#generatedTemplates\.getTemplate\(\{\n\s+\.\.\.requestOptions/);
  assert.match(facade, /query: query \?\? \{\}/);
  assert.equal(packageIndex.includes('NativeUnlayer'), false);
  assert.equal(packageIndex.includes('ListBlocksData'), false);
  assert.equal(sdkSource.includes("responseStyle: 'data'"), false);
  assert.match(sdkSource, /responseStyle: 'fields'/);
});

test('adding an operation to the allowlist generates its public resource', () => {
  const withBlocks = structuredClone(manifest);
  withBlocks.operations.push({
    operationId: 'listBlocks',
    resource: ['blocks'],
    method: 'list',
    transport: 'blocks',
    params: {
      location: 'query',
      type: 'BlockListParams',
      optional: true,
    },
    response: {
      type: 'BlockListResponse',
      kind: 'item',
      property: 'data',
    },
    pagination: {
      type: 'cursor',
      pageType: 'BlockListResponsesCursorPage',
      items: 'data',
      cursor: 'cursor',
      nextCursor: 'next_cursor',
      hasMore: 'has_more',
    },
  });

  const result = validate(withBlocks);
  assert.equal(result.exposedOperationIds.length, 8);
  assert.equal(result.unexposedOperationIds.includes('listBlocks'), false);
  assert.match(renderFacade(withBlocks.operations), /export class Blocks/);
});

test('paginated operations pass every declared path argument to the transport', () => {
  const operation = structuredClone(
    manifest.operations.find((candidate) => candidate.operationId === 'listTemplates'),
  );
  operation.resource = ['projects', 'templates'];
  operation.pathArguments = [
    { name: 'projectID', target: 'projectId', type: 'string' },
    { name: 'folderID', target: 'folderId', type: 'string' },
  ];

  const facade = renderFacade([operation]);
  assert.match(facade, /list\(\n\s+projectID: string,\n\s+folderID: string,/);
  assert.match(
    facade,
    /path: \{ projectId: projectID, folderId: folderID \},\n\s+query: \{ \.\.\.\(query \?\? \{\}\)/,
  );
});

test('generation fails closed when an allowlisted OpenAPI contract changes', () => {
  const broken = structuredClone(manifest);
  broken.operations.find((operation) => operation.operationId === 'getTemplate').pathArguments = [];

  assert.throws(() => validate(broken), /getTemplate path arguments changed/);
});

test('generation fails closed when a legacy nested type changes', () => {
  const broken = structuredClone(manifest);
  broken.operations.find(
    (operation) => operation.operationId === 'getTemplate',
  ).response.nestedTypes[0].path = ['missing'];

  assert.throws(() => validate(broken), /getTemplate response nested type Data no longer exists in OpenAPI/);
});

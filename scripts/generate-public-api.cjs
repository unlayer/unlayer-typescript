#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const manifestPath = path.join(root, 'public-api.json');
const openApiPath = path.join(root, 'openapi.json');
const sdkPath = path.join(root, 'src', 'sdk.gen.ts');
const templatePath = path.join(__dirname, 'templates', 'compat.ts');
const publicApiPath = path.join(root, 'src', 'public-api.ts');
const packageIndexPath = path.join(root, 'src', 'index.ts');

const readJson = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf8'));

const upperFirst = (value) => value.charAt(0).toUpperCase() + value.slice(1);

const pascalCase = (value) =>
  upperFirst(value.replace(/[-_]+([a-zA-Z0-9])/g, (_match, character) => character.toUpperCase()));

const camelCase = (value) => {
  const converted = value.replace(/[-_]+([a-zA-Z0-9])/g, (_match, character) => character.toUpperCase());
  return converted.charAt(0).toLowerCase() + converted.slice(1);
};

const isIdentifier = (value) => /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(value);

const operationTypeStem = (operationId) => upperFirst(operationId);

const operationPublicTypes = (operation) =>
  [operation.params?.type, operation.response.type, operation.pagination?.pageType].filter(Boolean);

const resolveSchema = (openApi, schema) => {
  if (!schema?.$ref) return schema;
  const parts = schema.$ref.split('/');
  if (parts[0] !== '#' || parts[1] !== 'components' || parts[2] !== 'schemas' || parts.length !== 4) {
    throw new Error(`Unsupported schema reference: ${schema.$ref}`);
  }
  return openApi.components?.schemas?.[parts[3]];
};

const collectOpenApiOperations = (openApi) => {
  const operations = new Map();
  const methods = ['get', 'post', 'put', 'patch', 'delete'];

  for (const [route, pathItem] of Object.entries(openApi.paths ?? {})) {
    for (const method of methods) {
      const operation = pathItem[method];
      if (!operation?.operationId) continue;
      if (operations.has(operation.operationId)) {
        throw new Error(`Duplicate OpenAPI operationId: ${operation.operationId}`);
      }
      operations.set(operation.operationId, {
        method,
        operation,
        parameters: [...(pathItem.parameters ?? []), ...(operation.parameters ?? [])],
        route,
      });
    }
  }

  return operations;
};

const successSchema = (openApi, operation) => {
  const response = Object.entries(operation.responses ?? {}).find(([status]) => /^2\d\d$/.test(status))?.[1];
  return resolveSchema(openApi, response?.content?.['application/json']?.schema);
};

const requestBodySchema = (openApi, operation) =>
  resolveSchema(openApi, operation.requestBody?.content?.['application/json']?.schema);

const schemaAtPath = (openApi, schema, sourcePath) => {
  let current = resolveSchema(openApi, schema);
  for (const segment of sourcePath) {
    current = resolveSchema(openApi, current?.properties?.[segment]);
  }
  return current;
};

const validateNestedTypes = ({ entry, label, nestedTypes, openApi, schema }) => {
  const names = new Set();
  for (const nestedType of nestedTypes ?? []) {
    if (
      !Array.isArray(nestedType.name) ||
      nestedType.name.length === 0 ||
      !nestedType.name.every(isIdentifier) ||
      !Array.isArray(nestedType.path) ||
      nestedType.path.length === 0 ||
      !nestedType.path.every(isIdentifier) ||
      (nestedType.item !== undefined && typeof nestedType.item !== 'boolean')
    ) {
      throw new Error(`${entry.operationId} contains invalid ${label} nested type metadata`);
    }
    const publicName = nestedType.name.join('.');
    if (names.has(publicName)) {
      throw new Error(`${entry.operationId} declares duplicate ${label} nested type ${publicName}`);
    }
    names.add(publicName);

    const resolved = schemaAtPath(openApi, schema, nestedType.path);
    if (!resolved) {
      throw new Error(`${entry.operationId} ${label} nested type ${publicName} no longer exists in OpenAPI`);
    }
    if (nestedType.item && resolved.type !== 'array' && !resolved.items) {
      throw new Error(`${entry.operationId} ${label} nested type ${publicName} is no longer an array`);
    }
  }
};

const validateManifest = ({ manifest, openApi, sdkSource }) => {
  if (manifest.version !== 1 || !Array.isArray(manifest.operations)) {
    throw new Error('public-api.json must contain version 1 and an operations array');
  }

  const openApiOperations = collectOpenApiOperations(openApi);
  const exposedOperationIds = new Set();
  const publicMethods = new Set();
  const publicTypes = new Map();

  for (const entry of manifest.operations) {
    if (!entry || typeof entry !== 'object') throw new Error('Every public API entry must be an object');
    if (!isIdentifier(entry.operationId ?? '')) {
      throw new Error(`Invalid public operationId: ${String(entry.operationId)}`);
    }
    if (exposedOperationIds.has(entry.operationId)) {
      throw new Error(`Duplicate allowlisted operationId: ${entry.operationId}`);
    }
    exposedOperationIds.add(entry.operationId);

    if (
      !Array.isArray(entry.resource) ||
      entry.resource.length === 0 ||
      !entry.resource.every(isIdentifier)
    ) {
      throw new Error(`${entry.operationId} must define a non-empty resource path of TypeScript identifiers`);
    }
    if (!isIdentifier(entry.method ?? '') || !isIdentifier(entry.transport ?? '')) {
      throw new Error(`${entry.operationId} must define valid method and transport identifiers`);
    }

    const publicMethod = `${entry.resource.join('.')}.${entry.method}`;
    if (publicMethods.has(publicMethod)) throw new Error(`Duplicate public SDK method: ${publicMethod}`);
    publicMethods.add(publicMethod);

    const openApiOperation = openApiOperations.get(entry.operationId);
    if (!openApiOperation) {
      throw new Error(`Allowlisted operation ${entry.operationId} is missing from openapi.json`);
    }

    const expectedTransport = camelCase(openApiOperation.operation.tags?.[0] ?? '');
    if (entry.transport !== expectedTransport) {
      throw new Error(
        `${entry.operationId} uses transport ${entry.transport}, but its first OpenAPI tag generates ${expectedTransport}`,
      );
    }
    if (!sdkSource.includes(`public ${entry.operationId}<`)) {
      throw new Error(`Allowlisted operation ${entry.operationId} is missing from the generated SDK`);
    }

    const actualPathArguments = openApiOperation.parameters
      .filter((parameter) => parameter.in === 'path' && parameter.required)
      .map((parameter) => parameter.name)
      .sort();
    const declaredPathArguments = (entry.pathArguments ?? []).map((argument) => argument.target).sort();
    if (JSON.stringify(actualPathArguments) !== JSON.stringify(declaredPathArguments)) {
      throw new Error(
        `${entry.operationId} path arguments changed: expected [${declaredPathArguments}], found [${actualPathArguments}]`,
      );
    }
    for (const argument of entry.pathArguments ?? []) {
      if (!isIdentifier(argument.name ?? '') || !isIdentifier(argument.target ?? '') || !argument.type) {
        throw new Error(`${entry.operationId} contains an invalid public path argument`);
      }
    }

    if (entry.params) {
      if (!['body', 'query'].includes(entry.params.location) || !isIdentifier(entry.params.type ?? '')) {
        throw new Error(`${entry.operationId} contains invalid public params metadata`);
      }
      if (entry.params.name !== undefined && !isIdentifier(entry.params.name)) {
        throw new Error(`${entry.operationId} contains an invalid params name`);
      }
      if (entry.params.location === 'body' && !openApiOperation.operation.requestBody) {
        throw new Error(`${entry.operationId} declares body params, but OpenAPI has no request body`);
      }
      if (
        entry.params.location === 'query' &&
        !openApiOperation.parameters.some((parameter) => parameter.in === 'query')
      ) {
        throw new Error(`${entry.operationId} declares query params, but OpenAPI has no query parameters`);
      }
      validateNestedTypes({
        entry,
        label: 'params',
        nestedTypes: entry.params.nestedTypes,
        openApi,
        schema:
          entry.params.location === 'body' ?
            requestBodySchema(openApi, openApiOperation.operation)
          : undefined,
      });
    }

    if (!entry.response || !isIdentifier(entry.response.type ?? '')) {
      throw new Error(`${entry.operationId} must define a public response type`);
    }
    if (!['item', 'response'].includes(entry.response.kind)) {
      throw new Error(`${entry.operationId} has unsupported response kind ${entry.response.kind}`);
    }
    if (entry.response.kind === 'item' && !isIdentifier(entry.response.property ?? '')) {
      throw new Error(`${entry.operationId} item responses must define their array property`);
    }
    validateNestedTypes({
      entry,
      label: 'response',
      nestedTypes: entry.response.nestedTypes,
      openApi,
      schema: successSchema(openApi, openApiOperation.operation),
    });

    for (const typeName of operationPublicTypes(entry)) {
      const owner = publicTypes.get(typeName);
      if (owner && owner !== entry.operationId) {
        throw new Error(`Public type ${typeName} is declared by both ${owner} and ${entry.operationId}`);
      }
      publicTypes.set(typeName, entry.operationId);
    }

    if (entry.pagination) {
      if (entry.pagination.type !== 'cursor' || entry.params?.location !== 'query') {
        throw new Error(`${entry.operationId} uses unsupported pagination metadata`);
      }
      for (const property of ['items', 'cursor', 'nextCursor', 'hasMore']) {
        if (!isIdentifier(entry.pagination[property] ?? '')) {
          throw new Error(`${entry.operationId} pagination must define ${property}`);
        }
      }
      if (!isIdentifier(entry.pagination.pageType ?? '')) {
        throw new Error(`${entry.operationId} pagination must define a public pageType`);
      }
      const schema = successSchema(openApi, openApiOperation.operation);
      const properties = schema?.properties ?? {};
      if (properties[entry.pagination.items]?.type !== 'array') {
        throw new Error(`${entry.operationId} pagination items are no longer an array`);
      }
      if (!properties[entry.pagination.hasMore] || !properties[entry.pagination.nextCursor]) {
        throw new Error(`${entry.operationId} pagination response fields changed`);
      }
      if (!openApiOperation.parameters.some((parameter) => parameter.name === entry.pagination.cursor)) {
        throw new Error(`${entry.operationId} pagination cursor parameter changed`);
      }
    }
  }

  const availableOperationIds = [...openApiOperations.values()]
    .filter(({ operation }) => operation.tags?.[0])
    .map(({ operation }) => operation.operationId)
    .sort();
  const unexposedOperationIds = availableOperationIds.filter(
    (operationId) => !exposedOperationIds.has(operationId),
  );

  return {
    availableOperationIds,
    exposedOperationIds: [...exposedOperationIds],
    unexposedOperationIds,
  };
};

const buildResourceTree = (operations) => {
  const rootNode = { children: new Map(), operations: [], path: [] };

  for (const operation of operations) {
    let node = rootNode;
    for (const segment of operation.resource) {
      if (!node.children.has(segment)) {
        node.children.set(segment, {
          children: new Map(),
          operations: [],
          path: [...node.path, segment],
        });
      }
      node = node.children.get(segment);
    }
    node.operations.push(operation);
  }

  return rootNode;
};

const classNameForNode = (node) => pascalCase(node.path[node.path.length - 1]);
const generatedClassName = (transport) => `Generated${pascalCase(transport)}`;
const transportFieldName = (transport) => `generated${pascalCase(transport)}`;

const renderTypeAliases = (operations) => {
  const aliases = [];
  for (const entry of operations) {
    const stem = operationTypeStem(entry.operationId);
    if (entry.params) {
      aliases.push(
        `export type ${entry.params.type} = NonNullable<${stem}Data['${entry.params.location}']>;`,
      );
      aliases.push(renderNestedTypeNamespace(entry.params.type, entry.params.nestedTypes));
    }
    const responseExpression =
      entry.response.kind === 'item' ?
        `${stem}Response['${entry.response.property}'][number]`
      : `${stem}Response`;
    aliases.push(`export type ${entry.response.type} = ${responseExpression};`);
    aliases.push(renderNestedTypeNamespace(entry.response.type, entry.response.nestedTypes));
    if (entry.pagination) {
      aliases.push(`export type ${entry.pagination.pageType} = CursorPage<${entry.response.type}>;`);
    }
  }
  return aliases.filter(Boolean).join('\n');
};

const nestedTypeExpression = (typeName, nestedType) => {
  let expression = typeName;
  for (const segment of nestedType.path) {
    expression = `NonNullable<${expression}['${segment}']>`;
  }
  if (nestedType.item) expression = `${expression}[number]`;
  return expression;
};

const renderNestedTypeNamespace = (typeName, nestedTypes = []) => {
  if (nestedTypes.length === 0) return '';
  const root = { children: new Map() };
  for (const nestedType of nestedTypes) {
    let node = root;
    for (const segment of nestedType.name) {
      if (!node.children.has(segment)) node.children.set(segment, { children: new Map() });
      node = node.children.get(segment);
    }
    node.expression = nestedTypeExpression(typeName, nestedType);
  }

  const renderChildren = (node, indent) =>
    [...node.children.entries()]
      .flatMap(([name, child]) => {
        const lines = [];
        if (child.expression) lines.push(`${indent}export type ${name} = ${child.expression};`);
        if (child.children.size) {
          lines.push(
            `${indent}export namespace ${name} {\n${renderChildren(child, `${indent}  `)}\n${indent}}`,
          );
        }
        return lines;
      })
      .join('\n');

  return `export namespace ${typeName} {\n${renderChildren(root, '  ')}\n}`;
};

const renderMethod = (entry) => {
  const parameters = (entry.pathArguments ?? []).map((argument) => `${argument.name}: ${argument.type}`);
  if (entry.params) {
    const name = entry.params.name ?? (entry.params.location === 'body' ? 'body' : 'query');
    parameters.push(
      entry.params.optional ?
        `${name}: ${entry.params.type} | null | undefined = {}`
      : `${name}: ${entry.params.type}`,
    );
  }
  parameters.push('options?: RequestOptions');

  const returnType =
    entry.pagination ?
      `PagePromise<${entry.pagination.pageType}, ${entry.response.type}>`
    : `APIPromise<${entry.response.type}>`;
  const transport = `this.#${transportFieldName(entry.transport)}`;
  const pathRequestField =
    entry.pathArguments?.length ?
      `path: { ${entry.pathArguments.map((argument) => `${argument.target}: ${argument.name}`).join(', ')} }`
    : undefined;

  if (entry.pagination) {
    const paramsName = entry.params.name ?? 'query';
    const requestFields = [
      ...(pathRequestField ? [pathRequestField] : []),
      `query: { ...(${paramsName} ?? {}), ...(cursor === undefined ? {} : { ${entry.pagination.cursor}: cursor }) }`,
    ];
    return `  ${entry.method}(\n    ${parameters.join(
      ',\n    ',
    )},\n  ): ${returnType} {\n    return new PagePromise((cursor) =>\n      createCompatibilityRequest(options, (requestOptions) =>\n        ${transport}.${
      entry.operationId
    }({\n          ...requestOptions,\n          ${requestFields.join(
      ',\n          ',
    )},\n        }),\n      ),\n    );\n  }`;
  }

  const requestFields = [];
  if (pathRequestField) requestFields.push(pathRequestField);
  if (entry.params) {
    const paramsName = entry.params.name ?? (entry.params.location === 'body' ? 'body' : 'query');
    const optionalParams =
      entry.params.location === 'query' ? `${paramsName} ?? {}` : `${paramsName} ?? undefined`;
    requestFields.push(`${entry.params.location}: ${entry.params.optional ? optionalParams : paramsName}`);
  }

  const call =
    requestFields.length === 0 ?
      `${transport}.${entry.operationId}(requestOptions)`
    : `${transport}.${entry.operationId}({\n          ...requestOptions,\n          ${requestFields.join(
        ',\n          ',
      )},\n        })`;

  return `  ${entry.method}(\n    ${parameters.join(
    ',\n    ',
  )},\n  ): ${returnType} {\n    return new APIPromise(\n      createCompatibilityRequest(options, (requestOptions) =>\n        ${call},\n      ),\n    );\n  }`;
};

const renderResourceClass = (node) => {
  const className = classNameForNode(node);
  const children = [...node.children.values()];
  const transports = [...new Set(node.operations.map((operation) => operation.transport))].sort();
  const members = [];

  for (const transport of transports) {
    members.push(`  readonly #${transportFieldName(transport)}: ${generatedClassName(transport)};`);
  }
  for (const child of children) {
    members.push(`  readonly ${child.path[child.path.length - 1]}: ${classNameForNode(child)};`);
  }

  const constructorLines = [];
  for (const transport of transports) {
    constructorLines.push(
      `    this.#${transportFieldName(transport)} = new ${generatedClassName(transport)}({ client });`,
    );
  }
  for (const child of children) {
    constructorLines.push(
      `    this.${child.path[child.path.length - 1]} = new ${classNameForNode(child)}(client);`,
    );
  }

  const methods = node.operations.map(renderMethod);
  const sections = [
    `export class ${className} {`,
    members.join('\n'),
    `\n  constructor(client: Client) {\n${constructorLines.join('\n')}\n  }`,
    methods.length ? `\n${methods.join('\n\n')}` : '',
    '}',
  ];
  const resourceClass = sections.filter((section) => section !== '').join('\n');
  const childAssignments = children
    .map((child) => `${className}.${classNameForNode(child)} = ${classNameForNode(child)};`)
    .join('\n');
  return [resourceClass, childAssignments].filter(Boolean).join('\n\n');
};

const flattenNodesPostOrder = (rootNode) => {
  const nodes = [];
  const visit = (node) => {
    for (const child of node.children.values()) visit(child);
    if (node.path.length) nodes.push(node);
  };
  visit(rootNode);
  return nodes;
};

const renderResourceNamespaces = (rootNode, operations) => {
  const blocks = [];
  for (const node of flattenNodesPostOrder(rootNode)) {
    const types = operations
      .filter((operation) => node.path.every((segment, index) => operation.resource[index] === segment))
      .flatMap(operationPublicTypes);
    const uniqueTypes = [...new Set(types)];
    const children = [...node.children.values()];
    if (uniqueTypes.length === 0 && children.length === 0) continue;
    const exports = [
      ...children.map((child) => `${classNameForNode(child)} as ${classNameForNode(child)}`),
      ...uniqueTypes.map((typeName) => `type ${typeName} as ${typeName}`),
    ];
    blocks.push(
      `export declare namespace ${classNameForNode(node)} {\n  export {\n${exports
        .map((entry) => `    ${entry},`)
        .join('\n')}\n  };\n}`,
    );
  }
  return blocks.join('\n\n');
};

const renderFacade = (operations) => {
  const rootNode = buildResourceTree(operations);
  const nodes = flattenNodesPostOrder(rootNode);
  const topLevelResources = [...rootNode.children.values()];
  const resourceNamespaces = renderResourceNamespaces(rootNode, operations);
  const resourceProperties = topLevelResources
    .map((node) => `  readonly ${node.path[0]}: ${classNameForNode(node)};`)
    .join('\n');
  const resourceInitializers = topLevelResources
    .map((node) => `    this.${node.path[0]} = new ${classNameForNode(node)}(resolved.client);`)
    .join('\n');
  const staticResourceAssignments = topLevelResources
    .map((node) => `Unlayer.${classNameForNode(node)} = ${classNameForNode(node)};`)
    .join('\n');
  const unlayerResourceExports = topLevelResources
    .map((node) => {
      const types = operations
        .filter((operation) => operation.resource[0] === node.path[0])
        .flatMap(operationPublicTypes);
      return [
        `${classNameForNode(node)} as ${classNameForNode(node)}`,
        ...[...new Set(types)].map((typeName) => `type ${typeName} as ${typeName}`),
      ];
    })
    .flat();

  return `${nodes
    .map(renderResourceClass)
    .join(
      '\n\n',
    )}\n\n${resourceNamespaces}\n\nexport class Unlayer {\n  static readonly Unlayer = Unlayer;\n  static readonly DEFAULT_TIMEOUT = 60_000;\n  static readonly UnlayerError = UnlayerError;\n  static readonly APIError = APIError;\n  static readonly APIConnectionError = APIConnectionError;\n  static readonly APIConnectionTimeoutError = APIConnectionTimeoutError;\n  static readonly APIUserAbortError = APIUserAbortError;\n  static readonly NotFoundError = NotFoundError;\n  static readonly ConflictError = ConflictError;\n  static readonly RateLimitError = RateLimitError;\n  static readonly BadRequestError = BadRequestError;\n  static readonly AuthenticationError = AuthenticationError;\n  static readonly InternalServerError = InternalServerError;\n  static readonly PermissionDeniedError = PermissionDeniedError;\n  static readonly UnprocessableEntityError = UnprocessableEntityError;\n\n  readonly apiKey: string | null;\n  readonly personalAccessToken: string | null;\n  readonly projectID: string | null;\n  readonly baseURL: string;\n  readonly maxRetries: number;\n  readonly timeout: number;\n  readonly logger: Logger;\n  readonly logLevel: LogLevel;\n  readonly fetchOptions: RequestInit | undefined;\n${resourceProperties}\n\n  private readonly compatibilityOptions: ClientOptions;\n\n  constructor(options: ClientOptions = {}) {\n    const resolved = resolveCompatibilityClient(options);\n    this.compatibilityOptions = resolved.options;\n    this.apiKey = resolved.apiKey;\n    this.personalAccessToken = resolved.personalAccessToken;\n    this.projectID = resolved.projectID;\n    this.baseURL = resolved.baseURL;\n    this.maxRetries = resolved.maxRetries;\n    this.timeout = resolved.timeout;\n    this.logger = resolved.logger;\n    this.logLevel = resolved.logLevel;\n    this.fetchOptions = resolved.fetchOptions;\n${resourceInitializers}\n  }\n\n  withOptions(options: Partial<ClientOptions>): this {\n    const Client = this.constructor as new (options: ClientOptions) => this;\n    return new Client({\n      ...this.compatibilityOptions,\n      apiKey: this.apiKey,\n      baseURL: this.baseURL,\n      fetchOptions: this.fetchOptions,\n      logLevel: this.logLevel,\n      logger: this.logger,\n      maxRetries: this.maxRetries,\n      personalAccessToken: this.personalAccessToken,\n      projectID: this.projectID,\n      timeout: this.timeout,\n      ...options,\n    });\n  }\n}\n\n${staticResourceAssignments}\n\nexport declare namespace Unlayer {\n  export {\n    CursorPage as CursorPage,\n    type CursorPageParams as CursorPageParams,\n    type CursorPageResponse as CursorPageResponse,\n    type RequestOptions as RequestOptions,\n${unlayerResourceExports
    .map((entry) => `    ${entry},`)
    .join('\n')}\n  };\n}\n\nexport default Unlayer;`;
};

const renderImports = (operations) => {
  const transports = [...new Set(operations.map((operation) => operation.transport))].sort();
  const generatedClasses = transports
    .map((transport) => `${pascalCase(transport)} as ${generatedClassName(transport)}`)
    .join(', ');
  const generatedTypes = [
    ...new Set(
      operations.flatMap((operation) => {
        const stem = operationTypeStem(operation.operationId);
        return operation.params ? [`${stem}Data`, `${stem}Response`] : [`${stem}Response`];
      }),
    ),
  ].sort();

  return `import { ${generatedClasses} } from './sdk.gen';\nimport type { ${generatedTypes.join(
    ', ',
  )} } from './types.gen';`;
};

const renderPackageIndex = (operations) => {
  const publicTypes = [
    'ClientOptions',
    'CursorPageParams',
    'CursorPageResponse',
    ...operations.flatMap(operationPublicTypes),
    'Logger',
    'LogLevel',
    'RequestOptions',
  ];
  return `// This file is generated from public-api.json by scripts/generate-public-api.cjs.\n\nexport { Unlayer as default, Unlayer } from './public-api';\nexport { APIConnectionError, APIConnectionTimeoutError, APIError, APIPromise, APIUserAbortError, AuthenticationError, BadRequestError, ConflictError, CursorPage, InternalServerError, NotFoundError, PagePromise, PermissionDeniedError, RateLimitError, UnlayerError, UnprocessableEntityError } from './public-api';\nexport type { ${[
    ...new Set(publicTypes),
  ]
    .sort()
    .join(', ')} } from './public-api';\n`;
};

const generate = () => {
  const manifest = readJson(manifestPath);
  const openApi = readJson(openApiPath);
  const sdkSource = fs.readFileSync(sdkPath, 'utf8');
  const template = fs.readFileSync(templatePath, 'utf8');
  const validation = validateManifest({ manifest, openApi, sdkSource });

  for (const marker of ['/* PUBLIC_API_IMPORTS */', '/* PUBLIC_API_TYPES */', '/* PUBLIC_API_FACADE */']) {
    if (template.split(marker).length !== 2) throw new Error(`Expected exactly one ${marker} marker`);
  }

  const publicApiSource = template
    .replace('/* PUBLIC_API_IMPORTS */', renderImports(manifest.operations))
    .replace('/* PUBLIC_API_TYPES */', renderTypeAliases(manifest.operations))
    .replace('/* PUBLIC_API_FACADE */', renderFacade(manifest.operations));

  fs.writeFileSync(publicApiPath, publicApiSource);
  fs.writeFileSync(packageIndexPath, renderPackageIndex(manifest.operations));
  process.stdout.write(
    `Generated ${validation.exposedOperationIds.length} public SDK operations; ${validation.unexposedOperationIds.length} OpenAPI operations remain internal\n`,
  );
  return validation;
};

if (require.main === module) generate();

module.exports = {
  collectOpenApiOperations,
  generate,
  renderFacade,
  renderPackageIndex,
  renderTypeAliases,
  validateManifest,
};

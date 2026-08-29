// Runtime template for the allowlisted public SDK. Edit this template instead of src/public-api.ts.

import { createClient } from './client';
import type { Client, Config } from './client';
import { createQuerySerializer } from './client/utils.gen';

import { Projects as GeneratedProjects, Templates as GeneratedTemplates, Workspaces as GeneratedWorkspaces } from './sdk.gen';
import type { ConvertFullToSimpleData, ConvertFullToSimpleResponse, ConvertSimpleToFullData, ConvertSimpleToFullResponse, GetProjectResponse, GetTemplateData, GetTemplateResponse, GetWorkspaceResponse, ListTemplatesData, ListTemplatesResponse, ListWorkspacesResponse } from './types.gen';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'off';

export interface Logger {
  debug(...args: unknown[]): void;
  error(...args: unknown[]): void;
  info(...args: unknown[]): void;
  warn(...args: unknown[]): void;
}

type HeaderValue = string | null | undefined;
type HeadersLike =
  | Headers
  | ReadonlyArray<readonly [string, HeaderValue]>
  | Record<string, HeaderValue | ReadonlyArray<HeaderValue>>
  | null
  | undefined;

export interface ClientOptions {
  apiKey?: string | null;
  personalAccessToken?: string | null;
  projectID?: string | null;
  baseURL?: string | null;
  maxRetries?: number;
  timeout?: number;
  fetch?: typeof fetch;
  fetchOptions?: RequestInit;
  defaultHeaders?: HeadersLike;
  defaultQuery?: Record<string, string | undefined>;
  logger?: Logger;
  logLevel?: LogLevel;
}

export interface RequestOptions extends Omit<RequestInit, 'body' | 'headers' | 'method'> {
  fetchOptions?: RequestInit;
  headers?: HeadersLike;
  maxRetries?: number;
  timeout?: number;
}

export type TemplateListParams = NonNullable<ListTemplatesData['query']>;
export type TemplateListResponse = ListTemplatesResponse['data'][number];
export type TemplateListResponsesCursorPage = CursorPage<TemplateListResponse>;
export type TemplateRetrieveParams = NonNullable<GetTemplateData['query']>;
export type TemplateRetrieveResponse = GetTemplateResponse;
export namespace TemplateRetrieveResponse {
  export type Data = NonNullable<TemplateRetrieveResponse['data']>;
}
export type ProjectRetrieveResponse = GetProjectResponse;
export namespace ProjectRetrieveResponse {
  export type Data = NonNullable<ProjectRetrieveResponse['data']>;
  export namespace Data {
    export type Workspace = NonNullable<NonNullable<ProjectRetrieveResponse['data']>['workspace']>;
  }
}
export type WorkspaceListResponse = ListWorkspacesResponse;
export namespace WorkspaceListResponse {
  export type Data = NonNullable<WorkspaceListResponse['data']>[number];
}
export type WorkspaceRetrieveResponse = GetWorkspaceResponse;
export namespace WorkspaceRetrieveResponse {
  export type Data = NonNullable<WorkspaceRetrieveResponse['data']>;
  export namespace Data {
    export type Project = NonNullable<NonNullable<WorkspaceRetrieveResponse['data']>['projects']>[number];
  }
}
export type FullToSimpleCreateParams = NonNullable<ConvertFullToSimpleData['body']>;
export namespace FullToSimpleCreateParams {
  export type Design = NonNullable<FullToSimpleCreateParams['design']>;
}
export type FullToSimpleCreateResponse = ConvertFullToSimpleResponse;
export namespace FullToSimpleCreateResponse {
  export type Data = NonNullable<FullToSimpleCreateResponse['data']>;
}
export type SimpleToFullCreateParams = NonNullable<ConvertSimpleToFullData['body']>;
export namespace SimpleToFullCreateParams {
  export type Design = NonNullable<SimpleToFullCreateParams['design']>;
  export namespace Design {
    export type _Conversion = NonNullable<NonNullable<SimpleToFullCreateParams['design']>['_conversion']>;
  }
}
export type SimpleToFullCreateResponse = ConvertSimpleToFullResponse;
export namespace SimpleToFullCreateResponse {
  export type Data = NonNullable<SimpleToFullCreateResponse['data']>;
}

type APIResponseProps<T> = {
  data: T;
  response: Response;
};

const rawResponses = new WeakMap<Response, Response>();

export class APIPromise<T> extends Promise<T> {
  readonly #responsePromise: Promise<APIResponseProps<T>>;
  #parsedPromise: Promise<T> | undefined;

  constructor(responsePromise: PromiseLike<APIResponseProps<T>>) {
    super((resolve) => resolve(undefined as T));
    this.#responsePromise = Promise.resolve(responsePromise).then((result) => ({
      data: result.data,
      response: rawResponses.get(result.response) ?? result.response,
    }));
  }

  asResponse(): Promise<Response> {
    return this.#responsePromise.then(({ response }) => response);
  }

  withResponse(): Promise<{ data: T; response: Response }> {
    return this.#responsePromise;
  }

  #parse(): Promise<T> {
    return (this.#parsedPromise ??= this.#responsePromise.then(({ data }) => data));
  }

  override then<TResult1 = T, TResult2 = never>(
    onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null,
  ): Promise<TResult1 | TResult2> {
    return this.#parse().then(onfulfilled, onrejected);
  }

  override catch<TResult = never>(
    onrejected?: ((reason: unknown) => TResult | PromiseLike<TResult>) | null,
  ): Promise<T | TResult> {
    return this.#parse().catch(onrejected);
  }

  override finally(onfinally?: (() => void) | null): Promise<T> {
    return this.#parse().finally(onfinally);
  }
}

export class UnlayerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = new.target.name;
  }
}

export class APIError extends UnlayerError {
  readonly status: number | undefined;
  readonly headers: Headers | undefined;
  readonly error: unknown;

  constructor(
    status: number | undefined,
    error: unknown,
    message: string | undefined,
    headers: Headers | undefined,
  ) {
    super(apiErrorMessage(status, error, message));
    this.status = status;
    this.headers = headers;
    this.error = error;
  }

  static generate(
    status: number | undefined,
    error: unknown,
    message: string | undefined,
    headers: Headers | undefined,
  ): APIError {
    if (!status || !headers) return new APIConnectionError({ cause: error, message });
    const ErrorClass = errorClassForStatus(status);
    return new ErrorClass(status, error, message, headers);
  }
}

export class APIConnectionError extends APIError {
  readonly cause: unknown;

  constructor({ message, cause }: { message?: string; cause?: unknown } = {}) {
    super(undefined, undefined, message ?? 'Connection error.', undefined);
    this.cause = cause;
  }
}

export class APIConnectionTimeoutError extends APIConnectionError {
  constructor({ message, cause }: { message?: string; cause?: unknown } = {}) {
    super({ message: message ?? 'Request timed out.', cause });
  }
}

export class APIUserAbortError extends APIError {
  readonly cause: unknown;

  constructor({ message, cause }: { message?: string; cause?: unknown } = {}) {
    super(undefined, undefined, message ?? 'Request was aborted.', undefined);
    this.cause = cause;
  }
}

export class BadRequestError extends APIError {}
export class AuthenticationError extends APIError {}
export class PermissionDeniedError extends APIError {}
export class NotFoundError extends APIError {}
export class ConflictError extends APIError {}
export class UnprocessableEntityError extends APIError {}
export class RateLimitError extends APIError {}
export class InternalServerError extends APIError {}

type CursorResponse<T> = {
  data: Array<T>;
  has_more: boolean;
  next_cursor?: string | null;
};

export interface CursorPageParams {
  cursor?: string;
  limit?: number;
}

export interface CursorPageResponse<T> extends CursorResponse<T> {}

export class CursorPage<T> implements AsyncIterable<T> {
  readonly data: Array<T>;
  readonly has_more: boolean;
  readonly next_cursor: string | null;

  constructor(
    response: CursorResponse<T>,
    private readonly loadPage: (cursor: string) => Promise<CursorPage<T>>,
  ) {
    this.data = response.data;
    this.has_more = response.has_more;
    this.next_cursor = response.next_cursor ?? null;
  }

  hasNextPage(): boolean {
    return this.data.length > 0 && this.has_more && Boolean(this.next_cursor);
  }

  getPaginatedItems(): Array<T> {
    return this.data;
  }

  async getNextPage(): Promise<this> {
    if (!this.next_cursor) {
      throw new UnlayerError('No next page is available.');
    }
    return (await this.loadPage(this.next_cursor)) as this;
  }

  async *iterPages(): AsyncGenerator<this> {
    let page: this = this;
    yield page;
    while (page.hasNextPage()) {
      page = await page.getNextPage();
      yield page;
    }
  }

  async *[Symbol.asyncIterator](): AsyncGenerator<T> {
    for await (const page of this.iterPages()) {
      for (const item of page.getPaginatedItems()) yield item;
    }
  }
}

export class PagePromise<
    PageClass extends CursorPage<Item>,
    Item = ReturnType<PageClass['getPaginatedItems']>[number],
  >
  extends APIPromise<PageClass>
  implements AsyncIterable<Item>
{
  constructor(fetchPage: (cursor?: string) => PromiseLike<APIResponseProps<CursorResponse<Item>>>) {
    const loadPage = async (cursor?: string): Promise<APIResponseProps<PageClass>> => {
      const result = await fetchPage(cursor);
      const page = new CursorPage<Item>(result.data, async (nextCursor) => {
        const nextPage = await loadPage(nextCursor);
        return nextPage.data;
      }) as PageClass;
      return { data: page, response: result.response };
    };
    super(loadPage());
  }

  async *[Symbol.asyncIterator](): AsyncGenerator<Item> {
    const page = await this;
    for await (const item of page) yield item;
  }
}

type NativeHeaderValue = string | ReadonlyArray<string> | null | undefined;
const INTERNAL_ALLOW_MISSING_AUTH = 'x-unlayer-sdk-internal-allow-missing-auth';
const INTERNAL_MAX_RETRIES = 'x-unlayer-sdk-internal-max-retries';
const INTERNAL_TIMEOUT = 'x-unlayer-sdk-internal-timeout';
type NativeRequestOptions = Omit<RequestOptions, 'fetchOptions' | 'headers' | 'maxRetries' | 'timeout'> & {
  headers?: Record<string, NativeHeaderValue>;
};

const mergeNullableHeaders = (...sources: Array<HeadersLike>): Record<string, NativeHeaderValue> => {
  const headers = new Map<string, { name: string; value: NativeHeaderValue }>();
  for (const source of sources) {
    if (!source) continue;
    const entries: Iterable<readonly [string, HeaderValue | ReadonlyArray<HeaderValue>]> =
      source instanceof Headers ? source.entries()
      : Array.isArray(source) ? source
      : Object.entries(source);
    for (const [name, value] of entries) {
      if (value === undefined) continue;
      const normalized: NativeHeaderValue =
        Array.isArray(value) ?
          value.filter((item): item is string => item !== null && item !== undefined)
        : (value as HeaderValue);
      headers.set(name.toLowerCase(), { name, value: normalized });
    }
  }
  return Object.fromEntries([...headers.values()].map(({ name, value }) => [name, value]));
};

const nativeRequestOptions = (options?: RequestOptions): NativeRequestOptions => {
  const {
    client: _client,
    fetchOptions,
    headers: requestHeaders,
    maxRetries,
    timeout,
    ...requestOptions
  } = (options ?? {}) as RequestOptions & { client?: unknown };
  const {
    body: _fetchBody,
    headers: fetchHeaders,
    method: _fetchMethod,
    ...fetchConfig
  } = fetchOptions ?? {};
  const headers = mergeNullableHeaders(requestHeaders, fetchHeaders);
  if (headerValue(headers, 'authorization') === null) {
    headers[INTERNAL_ALLOW_MISSING_AUTH] = 'true';
  }
  if (maxRetries !== undefined) headers[INTERNAL_MAX_RETRIES] = String(maxRetries);
  if (timeout !== undefined) headers[INTERNAL_TIMEOUT] = String(timeout);
  return {
    ...requestOptions,
    ...fetchConfig,
    ...(Object.keys(headers).length ? { headers } : {}),
  };
};

const headerValue = (headers: Record<string, NativeHeaderValue>, name: string): NativeHeaderValue =>
  Object.entries(headers).find(([header]) => header.toLowerCase() === name.toLowerCase())?.[1];

const defaultLogger: Logger = {
  debug: (...args) => console.debug(...args),
  error: (...args) => console.error(...args),
  info: (...args) => console.info(...args),
  warn: (...args) => console.warn(...args),
};

type ResolvedCompatibilityClient = {
  apiKey: string | null;
  baseURL: string;
  client: Client;
  fetchOptions: RequestInit | undefined;
  logLevel: LogLevel;
  logger: Logger;
  maxRetries: number;
  personalAccessToken: string | null;
  projectID: string | null;
  timeout: number;
  options: ClientOptions;
};

type CompatibilityClientConfig = Config & {
  query?: Record<string, string | undefined>;
};

const resolveCompatibilityClient = (options: ClientOptions): ResolvedCompatibilityClient => {
  const apiKey = options.apiKey === undefined ? readEnv('UNLAYER_API_KEY') ?? null : options.apiKey;
  const personalAccessToken =
    options.personalAccessToken === undefined ?
      readEnv('UNLAYER_PERSONAL_ACCESS_TOKEN') ?? null
    : options.personalAccessToken;
  const projectID =
    options.projectID === undefined ? readEnv('UNLAYER_PROJECT_ID') ?? null : options.projectID;
  const configuredBaseURL = options.baseURL === undefined ? readEnv('UNLAYER_BASE_URL') : options.baseURL;
  const baseURL = configuredBaseURL || 'https://api.unlayer.com';
  const maxRetries = validateInteger('maxRetries', options.maxRetries ?? 2, 0);
  const timeout = validateInteger('timeout', options.timeout ?? 60_000, 1);
  const logger = options.logger ?? defaultLogger;
  const logLevel = options.logLevel ?? 'warn';

  const {
    body: _fetchBody,
    headers: fetchHeaders,
    method: _fetchMethod,
    ...fetchConfig
  } = options.fetchOptions ?? {};
  const headers = mergeNullableHeaders(
    projectID ? { 'X-Project-ID': projectID } : undefined,
    personalAccessToken ?? apiKey ? { Authorization: `Bearer ${personalAccessToken ?? apiKey}` } : undefined,
    fetchHeaders,
    options.defaultHeaders,
  );
  const fetchImplementation = options.fetch ?? globalThis.fetch;
  const querySerializer = createQuerySerializer();

  const compatibilityFetch = createCompatibilityFetch({
    allowMissingAuth: headerValue(headers, 'authorization') === null,
    fetch: fetchImplementation,
    logLevel,
    logger,
    maxRetries,
    timeout,
  });

  const clientConfig: CompatibilityClientConfig = {
    ...fetchConfig,
    baseUrl: baseURL,
    fetch: compatibilityFetch,
    headers,
    query: options.defaultQuery,
    querySerializer: (query) => querySerializer({ ...options.defaultQuery, ...query }),
  };
  const client = createClient(clientConfig);

  client.interceptors.error.use((error, response, request) => {
    if (error instanceof UnlayerError) return error;
    if (response) {
      return APIError.generate(response.status, error, errorMessage(error), response.headers);
    }
    if (request?.signal.aborted) return new APIUserAbortError({ cause: error });
    return new APIConnectionError({ cause: error, message: errorMessage(error) });
  });

  return {
    apiKey,
    baseURL,
    client,
    fetchOptions: options.fetchOptions,
    logLevel,
    logger,
    maxRetries,
    personalAccessToken,
    projectID,
    timeout,
    options: {
      ...options,
      apiKey,
      baseURL,
      fetch: fetchImplementation,
      logLevel,
      logger,
      maxRetries,
      personalAccessToken,
      projectID,
      timeout,
    },
  };
};

type CompatibilityFetchOptions = {
  allowMissingAuth: boolean;
  fetch: typeof fetch;
  logLevel: LogLevel;
  logger: Logger;
  maxRetries: number;
  timeout: number;
};

const createCompatibilityFetch =
  (options: CompatibilityFetchOptions): typeof fetch =>
  async (input, init): Promise<Response> => {
    const originalRequest = input instanceof Request ? input : new Request(input, init);
    const inputRequest = originalRequest;
    const headers = new Headers(inputRequest.headers);
    const allowMissingAuth = options.allowMissingAuth || headers.get(INTERNAL_ALLOW_MISSING_AUTH) === 'true';
    const maxRetriesHeader = headers.get(INTERNAL_MAX_RETRIES);
    const timeoutHeader = headers.get(INTERNAL_TIMEOUT);
    headers.delete(INTERNAL_ALLOW_MISSING_AUTH);
    headers.delete(INTERNAL_MAX_RETRIES);
    headers.delete(INTERNAL_TIMEOUT);
    if (!headers.has('authorization') && !allowMissingAuth) {
      throw new UnlayerError(
        'Could not resolve authentication method. Expected either apiKey or personalAccessToken to be set. Or for the Authorization header to be explicitly omitted.',
      );
    }
    const request = new Request(inputRequest, { headers });
    const maxRetries =
      maxRetriesHeader === null ?
        options.maxRetries
      : validateInteger('maxRetries', Number(maxRetriesHeader), 0);
    const timeout =
      timeoutHeader === null ? options.timeout : validateInteger('timeout', Number(timeoutHeader), 1);
    const requestOptions = { ...options, maxRetries, timeout };
    let lastError: unknown;

    for (let attempt = 0; attempt <= maxRetries; attempt += 1) {
      if (request.signal.aborted) {
        throw new APIUserAbortError({ cause: request.signal.reason });
      }
      const controller = new AbortController();
      let timedOut = false;
      const attemptSignal = AbortSignal.any([request.signal, controller.signal]);
      const timeoutID = setTimeout(() => {
        timedOut = true;
        controller.abort(new APIConnectionTimeoutError({ message: `Request timed out after ${timeout}ms.` }));
      }, timeout);

      try {
        const response = await options.fetch(new Request(request.clone(), { signal: attemptSignal }));
        clearTimeout(timeoutID);
        if (attempt < maxRetries && retryableStatus(response.status)) {
          await response.body?.cancel();
          logRetry(requestOptions, attempt + 1, `HTTP ${response.status}`);
          await retryDelay(
            attempt,
            request.signal,
            response.headers.get('retry-after'),
            response.headers.get('retry-after-ms'),
          );
          continue;
        }
        const responseForParsing = response.clone();
        rawResponses.set(responseForParsing, response);
        return responseForParsing;
      } catch (error) {
        lastError = error;
        if (request.signal.aborted) throw new APIUserAbortError({ cause: error });
        if (attempt >= maxRetries) {
          if (timedOut) {
            throw new APIConnectionTimeoutError({
              cause: error,
              message: `Request timed out after ${timeout}ms.`,
            });
          }
          throw error;
        }
        logRetry(requestOptions, attempt + 1, timedOut ? 'timeout' : 'connection error');
        await retryDelay(attempt, request.signal);
      } finally {
        clearTimeout(timeoutID);
      }
    }

    throw lastError;
  };

const retryableStatus = (status: number): boolean =>
  status === 408 || status === 409 || status === 429 || status >= 500;

const retryDelay = async (
  attempt: number,
  signal: AbortSignal,
  retryAfter?: string | null,
  retryAfterMilliseconds?: string | null,
): Promise<void> => {
  const retryAfterMillisecondsValue = retryAfterMilliseconds ? Number(retryAfterMilliseconds) : Number.NaN;
  const retryAfterSeconds = retryAfter ? Number(retryAfter) : Number.NaN;
  const retryAfterDate =
    retryAfter && !Number.isFinite(retryAfterSeconds) ? Date.parse(retryAfter) : Number.NaN;
  const requestedDelay =
    Number.isFinite(retryAfterMillisecondsValue) ? retryAfterMillisecondsValue
    : Number.isFinite(retryAfterSeconds) ? retryAfterSeconds * 1_000
    : Number.isFinite(retryAfterDate) ? retryAfterDate - Date.now()
    : Number.NaN;
  const delay =
    Number.isFinite(requestedDelay) && requestedDelay >= 0 && requestedDelay < 60_000 ?
      requestedDelay
    : Math.min(250 * 2 ** attempt, 2_000);

  await new Promise<void>((resolve, reject) => {
    let timeoutID: ReturnType<typeof setTimeout>;
    const abort = () => {
      clearTimeout(timeoutID);
      signal.removeEventListener('abort', abort);
      reject(new APIUserAbortError({ cause: signal.reason }));
    };
    const finish = () => {
      signal.removeEventListener('abort', abort);
      resolve();
    };
    timeoutID = setTimeout(finish, delay);
    if (signal.aborted) abort();
    else signal.addEventListener('abort', abort, { once: true });
  });
};

const logRetry = (options: CompatibilityFetchOptions, attempt: number, reason: string): void => {
  if (options.logLevel === 'debug' || options.logLevel === 'info') {
    options.logger.info(`Retrying request (${attempt}/${options.maxRetries}) after ${reason}`);
  }
};

const readEnv = (name: string): string | undefined => {
  const processLike = globalThis as typeof globalThis & {
    process?: { env?: Record<string, string | undefined> };
  };
  return processLike.process?.env?.[name];
};

const validateInteger = (name: string, value: number, minimum: number): number => {
  if (!Number.isInteger(value) || value < minimum) {
    throw new TypeError(`${name} must be an integer greater than or equal to ${minimum}.`);
  }
  return value;
};

const errorMessage = (error: unknown): string | undefined => {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  if (error && typeof error === 'object' && 'message' in error) {
    const message = (error as { message?: unknown }).message;
    if (typeof message === 'string') return message;
  }
  return undefined;
};

const apiErrorMessage = (status: number | undefined, error: unknown, message: string | undefined): string => {
  const errorText =
    error && typeof error === 'object' && 'message' in error ?
      typeof error.message === 'string' ?
        error.message
      : JSON.stringify(error.message)
    : error !== undefined ? JSON.stringify(error)
    : message;

  if (status && errorText) return `${status} ${errorText}`;
  if (status) return `${status} status code (no body)`;
  return errorText ?? '(no status code or body)';
};

type APIErrorConstructor = new (
  status: number | undefined,
  error: unknown,
  message: string | undefined,
  headers: Headers | undefined,
) => APIError;

const errorClassForStatus = (status: number | undefined): APIErrorConstructor => {
  if (status === 400) return BadRequestError;
  if (status === 401) return AuthenticationError;
  if (status === 403) return PermissionDeniedError;
  if (status === 404) return NotFoundError;
  if (status === 409) return ConflictError;
  if (status === 422) return UnprocessableEntityError;
  if (status === 429) return RateLimitError;
  if (status !== undefined && status >= 500) return InternalServerError;
  return APIError;
};

export class Templates {
  readonly #generatedTemplates: GeneratedTemplates;

  constructor(client: Client) {
    this.#generatedTemplates = new GeneratedTemplates({ client });
  }

  list(
    query: TemplateListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<TemplateListResponsesCursorPage, TemplateListResponse> {
    return new PagePromise(async (cursor) =>
      this.#generatedTemplates.listTemplates({
        ...nativeRequestOptions(options),
        query: { ...(query ?? {}), ...(cursor === undefined ? {} : { cursor: cursor }) },
      }),
    );
  }

  retrieve(
    id: string,
    query: TemplateRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<TemplateRetrieveResponse> {
    return new APIPromise(this.#generatedTemplates.getTemplate({
      ...nativeRequestOptions(options),
      path: { id: id },
      query: query ?? {},
    }));
  }
}

export class Projects {
  readonly #generatedProjects: GeneratedProjects;

  constructor(client: Client) {
    this.#generatedProjects = new GeneratedProjects({ client });
  }

  retrieve(
    id: string,
    options?: RequestOptions,
  ): APIPromise<ProjectRetrieveResponse> {
    return new APIPromise(this.#generatedProjects.getProject({
      ...nativeRequestOptions(options),
      path: { id: id },
    }));
  }
}

export class Workspaces {
  readonly #generatedWorkspaces: GeneratedWorkspaces;

  constructor(client: Client) {
    this.#generatedWorkspaces = new GeneratedWorkspaces({ client });
  }

  list(
    options?: RequestOptions,
  ): APIPromise<WorkspaceListResponse> {
    return new APIPromise(this.#generatedWorkspaces.listWorkspaces(nativeRequestOptions(options)));
  }

  retrieve(
    workspaceID: string,
    options?: RequestOptions,
  ): APIPromise<WorkspaceRetrieveResponse> {
    return new APIPromise(this.#generatedWorkspaces.getWorkspace({
      ...nativeRequestOptions(options),
      path: { workspaceId: workspaceID },
    }));
  }
}

export class FullToSimple {
  readonly #generatedTemplates: GeneratedTemplates;

  constructor(client: Client) {
    this.#generatedTemplates = new GeneratedTemplates({ client });
  }

  create(
    body: FullToSimpleCreateParams,
    options?: RequestOptions,
  ): APIPromise<FullToSimpleCreateResponse> {
    return new APIPromise(this.#generatedTemplates.convertFullToSimple({
      ...nativeRequestOptions(options),
      body: body,
    }));
  }
}

export class SimpleToFull {
  readonly #generatedTemplates: GeneratedTemplates;

  constructor(client: Client) {
    this.#generatedTemplates = new GeneratedTemplates({ client });
  }

  create(
    body: SimpleToFullCreateParams,
    options?: RequestOptions,
  ): APIPromise<SimpleToFullCreateResponse> {
    return new APIPromise(this.#generatedTemplates.convertSimpleToFull({
      ...nativeRequestOptions(options),
      body: body,
    }));
  }
}

export class Convert {
  readonly fullToSimple: FullToSimple;
  readonly simpleToFull: SimpleToFull;

  constructor(client: Client) {
    this.fullToSimple = new FullToSimple(client);
    this.simpleToFull = new SimpleToFull(client);
  }
}

Convert.FullToSimple = FullToSimple;
Convert.SimpleToFull = SimpleToFull;

export declare namespace Templates {
  export {
    type TemplateListParams as TemplateListParams,
    type TemplateListResponse as TemplateListResponse,
    type TemplateListResponsesCursorPage as TemplateListResponsesCursorPage,
    type TemplateRetrieveParams as TemplateRetrieveParams,
    type TemplateRetrieveResponse as TemplateRetrieveResponse,
  };
}

export declare namespace Projects {
  export {
    type ProjectRetrieveResponse as ProjectRetrieveResponse,
  };
}

export declare namespace Workspaces {
  export {
    type WorkspaceListResponse as WorkspaceListResponse,
    type WorkspaceRetrieveResponse as WorkspaceRetrieveResponse,
  };
}

export declare namespace FullToSimple {
  export {
    type FullToSimpleCreateParams as FullToSimpleCreateParams,
    type FullToSimpleCreateResponse as FullToSimpleCreateResponse,
  };
}

export declare namespace SimpleToFull {
  export {
    type SimpleToFullCreateParams as SimpleToFullCreateParams,
    type SimpleToFullCreateResponse as SimpleToFullCreateResponse,
  };
}

export declare namespace Convert {
  export {
    FullToSimple as FullToSimple,
    SimpleToFull as SimpleToFull,
    type FullToSimpleCreateParams as FullToSimpleCreateParams,
    type FullToSimpleCreateResponse as FullToSimpleCreateResponse,
    type SimpleToFullCreateParams as SimpleToFullCreateParams,
    type SimpleToFullCreateResponse as SimpleToFullCreateResponse,
  };
}

export class Unlayer {
  static readonly Unlayer = Unlayer;
  static readonly DEFAULT_TIMEOUT = 60_000;
  static readonly UnlayerError = UnlayerError;
  static readonly APIError = APIError;
  static readonly APIConnectionError = APIConnectionError;
  static readonly APIConnectionTimeoutError = APIConnectionTimeoutError;
  static readonly APIUserAbortError = APIUserAbortError;
  static readonly NotFoundError = NotFoundError;
  static readonly ConflictError = ConflictError;
  static readonly RateLimitError = RateLimitError;
  static readonly BadRequestError = BadRequestError;
  static readonly AuthenticationError = AuthenticationError;
  static readonly InternalServerError = InternalServerError;
  static readonly PermissionDeniedError = PermissionDeniedError;
  static readonly UnprocessableEntityError = UnprocessableEntityError;

  readonly apiKey: string | null;
  readonly personalAccessToken: string | null;
  readonly projectID: string | null;
  readonly baseURL: string;
  readonly maxRetries: number;
  readonly timeout: number;
  readonly logger: Logger;
  readonly logLevel: LogLevel;
  readonly fetchOptions: RequestInit | undefined;
  readonly templates: Templates;
  readonly projects: Projects;
  readonly workspaces: Workspaces;
  readonly convert: Convert;

  private readonly compatibilityOptions: ClientOptions;

  constructor(options: ClientOptions = {}) {
    const resolved = resolveCompatibilityClient(options);
    this.compatibilityOptions = resolved.options;
    this.apiKey = resolved.apiKey;
    this.personalAccessToken = resolved.personalAccessToken;
    this.projectID = resolved.projectID;
    this.baseURL = resolved.baseURL;
    this.maxRetries = resolved.maxRetries;
    this.timeout = resolved.timeout;
    this.logger = resolved.logger;
    this.logLevel = resolved.logLevel;
    this.fetchOptions = resolved.fetchOptions;
    this.templates = new Templates(resolved.client);
    this.projects = new Projects(resolved.client);
    this.workspaces = new Workspaces(resolved.client);
    this.convert = new Convert(resolved.client);
  }

  withOptions(options: Partial<ClientOptions>): this {
    const Client = this.constructor as new (options: ClientOptions) => this;
    return new Client({
      ...this.compatibilityOptions,
      apiKey: this.apiKey,
      baseURL: this.baseURL,
      fetchOptions: this.fetchOptions,
      logLevel: this.logLevel,
      logger: this.logger,
      maxRetries: this.maxRetries,
      personalAccessToken: this.personalAccessToken,
      projectID: this.projectID,
      timeout: this.timeout,
      ...options,
    });
  }
}

Unlayer.Templates = Templates;
Unlayer.Projects = Projects;
Unlayer.Workspaces = Workspaces;
Unlayer.Convert = Convert;

export declare namespace Unlayer {
  export {
    CursorPage as CursorPage,
    type CursorPageParams as CursorPageParams,
    type CursorPageResponse as CursorPageResponse,
    type RequestOptions as RequestOptions,
    Templates as Templates,
    type TemplateListParams as TemplateListParams,
    type TemplateListResponse as TemplateListResponse,
    type TemplateListResponsesCursorPage as TemplateListResponsesCursorPage,
    type TemplateRetrieveParams as TemplateRetrieveParams,
    type TemplateRetrieveResponse as TemplateRetrieveResponse,
    Projects as Projects,
    type ProjectRetrieveResponse as ProjectRetrieveResponse,
    Workspaces as Workspaces,
    type WorkspaceListResponse as WorkspaceListResponse,
    type WorkspaceRetrieveResponse as WorkspaceRetrieveResponse,
    Convert as Convert,
    type FullToSimpleCreateParams as FullToSimpleCreateParams,
    type FullToSimpleCreateResponse as FullToSimpleCreateResponse,
    type SimpleToFullCreateParams as SimpleToFullCreateParams,
    type SimpleToFullCreateResponse as SimpleToFullCreateResponse,
  };
}

export default Unlayer;

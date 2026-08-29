// Runtime template for the allowlisted public SDK. Edit this template instead of src/public-api.ts.

import { createClient } from './client';
import type { Client } from './client';

/* PUBLIC_API_IMPORTS */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'off';

export interface Logger {
  debug(...args: unknown[]): void;
  error(...args: unknown[]): void;
  info(...args: unknown[]): void;
  warn(...args: unknown[]): void;
}

export interface ClientOptions {
  apiKey?: string | null;
  personalAccessToken?: string | null;
  projectID?: string | null;
  baseURL?: string | null;
  maxRetries?: number;
  timeout?: number;
  fetch?: typeof fetch;
  fetchOptions?: RequestInit;
  defaultHeaders?: HeadersInit;
  defaultQuery?: Record<string, string | undefined>;
  logger?: Logger;
  logLevel?: LogLevel;
}

export interface RequestOptions extends Omit<RequestInit, 'body' | 'method'> {
  fetchOptions?: RequestInit;
  maxRetries?: number;
  timeout?: number;
}

/* PUBLIC_API_TYPES */

export const APIPromise = Promise;
export type APIPromise<T> = Promise<T>;

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
    return this.has_more && Boolean(this.next_cursor);
  }

  async getNextPage(): Promise<CursorPage<T>> {
    if (!this.next_cursor) {
      throw new UnlayerError('No next page is available.');
    }
    return this.loadPage(this.next_cursor);
  }

  async *[Symbol.asyncIterator](): AsyncIterator<T> {
    for (const item of this.data) yield item;
  }
}

export class PagePromise<T> implements PromiseLike<CursorPage<T>>, AsyncIterable<T> {
  private readonly promise: Promise<CursorPage<T>>;

  constructor(fetchPage: (cursor?: string) => Promise<CursorResponse<T>>) {
    const loadPage = async (cursor?: string): Promise<CursorPage<T>> => {
      const response = await fetchPage(cursor);
      return new CursorPage(response, (nextCursor) => loadPage(nextCursor));
    };
    this.promise = loadPage();
  }

  then<TResult1 = CursorPage<T>, TResult2 = never>(
    onfulfilled?: ((value: CursorPage<T>) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null,
  ): Promise<TResult1 | TResult2> {
    return this.promise.then(onfulfilled, onrejected);
  }

  catch<TResult = never>(
    onrejected?: ((reason: unknown) => TResult | PromiseLike<TResult>) | null,
  ): Promise<CursorPage<T> | TResult> {
    return this.promise.catch(onrejected);
  }

  finally(onfinally?: (() => void) | null): Promise<CursorPage<T>> {
    return this.promise.finally(onfinally);
  }

  async *[Symbol.asyncIterator](): AsyncIterator<T> {
    let page = await this.promise;
    while (true) {
      for (const item of page.data) yield item;
      if (!page.hasNextPage()) return;
      page = await page.getNextPage();
    }
  }
}

type NativeRequestOptions = Omit<RequestOptions, 'maxRetries' | 'timeout'>;

const nativeRequestOptions = (options?: RequestOptions): NativeRequestOptions => {
  const { fetchOptions, maxRetries, timeout, ...requestOptions } = options ?? {};
  const {
    body: _fetchBody,
    headers: fetchHeaders,
    method: _fetchMethod,
    ...fetchConfig
  } = fetchOptions ?? {};
  const nativeOptions = { ...requestOptions, ...fetchConfig };
  if (
    fetchHeaders === undefined &&
    requestOptions.headers === undefined &&
    maxRetries === undefined &&
    timeout === undefined
  ) {
    return nativeOptions;
  }

  const headers = new Headers(requestOptions.headers);
  new Headers(fetchHeaders).forEach((value, key) => headers.set(key, value));
  if (maxRetries !== undefined) headers.set('x-unlayer-sdk-internal-max-retries', String(maxRetries));
  if (timeout !== undefined) headers.set('x-unlayer-sdk-internal-timeout', String(timeout));
  return { ...nativeOptions, headers };
};

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
  const headers = new Headers(fetchHeaders);
  new Headers(options.defaultHeaders).forEach((value, key) => headers.set(key, value));
  if (projectID) headers.set('X-Project-ID', projectID);

  const compatibilityFetch = createCompatibilityFetch({
    defaultQuery: options.defaultQuery,
    fetch: options.fetch ?? globalThis.fetch,
    logLevel,
    logger,
    maxRetries,
    timeout,
  });

  const client = createClient({
    ...fetchConfig,
    auth: personalAccessToken ?? apiKey ?? undefined,
    baseUrl: baseURL,
    fetch: compatibilityFetch,
    headers,
  });

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
  };
};

type CompatibilityFetchOptions = {
  defaultQuery: Record<string, string | undefined> | undefined;
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
    const url = new URL(originalRequest.url);
    for (const [key, value] of Object.entries(options.defaultQuery ?? {})) {
      if (value !== undefined && !url.searchParams.has(key)) url.searchParams.set(key, value);
    }
    const inputRequest = new Request(url, originalRequest);
    const headers = new Headers(inputRequest.headers);
    const maxRetriesHeader = headers.get('x-unlayer-sdk-internal-max-retries');
    const timeoutHeader = headers.get('x-unlayer-sdk-internal-timeout');
    headers.delete('x-unlayer-sdk-internal-max-retries');
    headers.delete('x-unlayer-sdk-internal-timeout');
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
      const abortFromCaller = () => controller.abort(request.signal.reason);
      request.signal.addEventListener('abort', abortFromCaller, { once: true });
      if (request.signal.aborted) abortFromCaller();
      const timeoutID = setTimeout(() => {
        timedOut = true;
        controller.abort(new APIConnectionTimeoutError({ message: `Request timed out after ${timeout}ms.` }));
      }, timeout);

      try {
        if (controller.signal.aborted) {
          throw new APIUserAbortError({ cause: controller.signal.reason });
        }
        const response = await options.fetch(new Request(request.clone(), { signal: controller.signal }));
        if (attempt < maxRetries && retryableStatus(response.status)) {
          await response.body?.cancel();
          logRetry(requestOptions, attempt + 1, `HTTP ${response.status}`);
          await retryDelay(attempt, request.signal, response.headers.get('retry-after'));
          continue;
        }
        return response;
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
        request.signal.removeEventListener('abort', abortFromCaller);
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
): Promise<void> => {
  const retryAfterSeconds = retryAfter ? Number(retryAfter) : Number.NaN;
  const delay =
    Number.isFinite(retryAfterSeconds) ?
      Math.max(0, retryAfterSeconds * 1_000)
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

/* PUBLIC_API_FACADE */

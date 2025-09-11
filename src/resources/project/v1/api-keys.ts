// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class APIKeys extends APIResource {
  /**
   * Create a new API key for the project.
   */
  create(body: APIKeyCreateParams, options?: RequestOptions): APIPromise<APIKeyCreateResponse> {
    return this._client.post('/project/v1/api-keys/', { body, ...options });
  }

  /**
   * Get API key details by ID.
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<APIKeyRetrieveResponse> {
    return this._client.get(path`/project/v1/api-keys/${id}/`, options);
  }

  /**
   * Update API key settings.
   */
  update(
    id: string,
    body: APIKeyUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<APIKeyUpdateResponse> {
    return this._client.put(path`/project/v1/api-keys/${id}/`, { body, ...options });
  }

  /**
   * List all API keys for the project.
   */
  list(options?: RequestOptions): APIPromise<APIKeyListResponse> {
    return this._client.get('/project/v1/api-keys/', options);
  }

  /**
   * Revoke API key.
   */
  delete(id: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/project/v1/api-keys/${id}/`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface APIKeyCreateResponse {
  data?: APIKeyCreateResponse.Data;
}

export namespace APIKeyCreateResponse {
  export interface Data {
    id?: string;

    active?: boolean;

    createdAt?: string;

    domains?: Array<string>;

    key?: string;

    name?: string;
  }
}

export interface APIKeyRetrieveResponse {
  data?: APIKeyRetrieveResponse.Data;
}

export namespace APIKeyRetrieveResponse {
  export interface Data {
    id?: string;

    active?: boolean;

    createdAt?: string;

    domains?: Array<string>;

    key?: string;

    lastUsed?: string;

    name?: string;
  }
}

export interface APIKeyUpdateResponse {
  data?: APIKeyUpdateResponse.Data;
}

export namespace APIKeyUpdateResponse {
  export interface Data {
    id?: string;

    active?: boolean;

    createdAt?: string;

    domains?: Array<string>;

    key?: string;

    lastUsed?: string;

    name?: string;
  }
}

export interface APIKeyListResponse {
  data?: Array<APIKeyListResponse.Data>;
}

export namespace APIKeyListResponse {
  export interface Data {
    id?: string;

    active?: boolean;

    createdAt?: string;

    domains?: Array<string>;

    key?: string;

    lastUsed?: string;

    name?: string;
  }
}

export interface APIKeyCreateParams {
  /**
   * Name for the API key
   */
  name: string;

  /**
   * Allowed domains for this API key
   */
  domains?: Array<string>;
}

export interface APIKeyUpdateParams {
  /**
   * Whether the API key is active
   */
  active?: boolean;

  /**
   * Updated allowed domains
   */
  domains?: Array<string>;

  /**
   * Updated name for the API key
   */
  name?: string;
}

export declare namespace APIKeys {
  export {
    type APIKeyCreateResponse as APIKeyCreateResponse,
    type APIKeyRetrieveResponse as APIKeyRetrieveResponse,
    type APIKeyUpdateResponse as APIKeyUpdateResponse,
    type APIKeyListResponse as APIKeyListResponse,
    type APIKeyCreateParams as APIKeyCreateParams,
    type APIKeyUpdateParams as APIKeyUpdateParams,
  };
}

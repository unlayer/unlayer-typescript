// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class V1 extends APIResource {
  /**
   * Create a new API key for the project.
   */
  apiKeysCreate(body: V1APIKeysCreateParams, options?: RequestOptions): APIPromise<V1APIKeysCreateResponse> {
    return this._client.post('/project/v1/api-keys', { body, ...options });
  }

  /**
   * Revoke API key.
   */
  apiKeysDelete(id: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/project/v1/api-keys/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * List all API keys for the project.
   */
  apiKeysList(options?: RequestOptions): APIPromise<V1APIKeysListResponse> {
    return this._client.get('/project/v1/api-keys', options);
  }

  /**
   * Get API key details by ID.
   */
  apiKeysRetrieve(id: string, options?: RequestOptions): APIPromise<V1APIKeysRetrieveResponse> {
    return this._client.get(path`/project/v1/api-keys/${id}`, options);
  }

  /**
   * Update API key settings.
   */
  apiKeysUpdate(
    id: string,
    body: V1APIKeysUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<V1APIKeysUpdateResponse> {
    return this._client.put(path`/project/v1/api-keys/${id}`, { body, ...options });
  }

  /**
   * Get project details for the authenticated project.
   */
  currentList(options?: RequestOptions): APIPromise<V1CurrentListResponse> {
    return this._client.get('/project/v1/current', options);
  }

  /**
   * Add a new domain to the project.
   */
  domainsCreate(body: V1DomainsCreateParams, options?: RequestOptions): APIPromise<V1DomainsCreateResponse> {
    return this._client.post('/project/v1/domains', { body, ...options });
  }

  /**
   * Remove domain from project.
   */
  domainsDelete(id: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/project/v1/domains/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * List all domains for the project.
   */
  domainsList(options?: RequestOptions): APIPromise<V1DomainsListResponse> {
    return this._client.get('/project/v1/domains', options);
  }

  /**
   * Get domain details by ID.
   */
  domainsRetrieve(id: string, options?: RequestOptions): APIPromise<V1DomainsRetrieveResponse> {
    return this._client.get(path`/project/v1/domains/${id}`, options);
  }

  /**
   * Update domain settings.
   */
  domainsUpdate(
    id: string,
    body: V1DomainsUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<V1DomainsUpdateResponse> {
    return this._client.put(path`/project/v1/domains/${id}`, { body, ...options });
  }

  /**
   * Create a new project template.
   */
  templatesCreate(
    body: V1TemplatesCreateParams,
    options?: RequestOptions,
  ): APIPromise<V1TemplatesCreateResponse> {
    return this._client.post('/project/v1/templates', { body, ...options });
  }

  /**
   * Delete project template.
   */
  templatesDelete(id: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/project/v1/templates/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Get all project templates.
   */
  templatesList(options?: RequestOptions): APIPromise<V1TemplatesListResponse> {
    return this._client.get('/project/v1/templates', options);
  }

  /**
   * Get project template by ID.
   */
  templatesRetrieve(id: string, options?: RequestOptions): APIPromise<V1TemplatesRetrieveResponse> {
    return this._client.get(path`/project/v1/templates/${id}`, options);
  }

  /**
   * Update project template.
   */
  templatesUpdate(
    id: string,
    body: V1TemplatesUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<V1TemplatesUpdateResponse> {
    return this._client.put(path`/project/v1/templates/${id}`, { body, ...options });
  }
}

export interface V1APIKeysCreateResponse {
  data?: V1APIKeysCreateResponse.Data;
}

export namespace V1APIKeysCreateResponse {
  export interface Data {
    id?: string;

    active?: boolean;

    createdAt?: string;

    domains?: Array<string>;

    key?: string;

    name?: string;
  }
}

export interface V1APIKeysListResponse {
  data?: Array<V1APIKeysListResponse.Data>;
}

export namespace V1APIKeysListResponse {
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

export interface V1APIKeysRetrieveResponse {
  data?: V1APIKeysRetrieveResponse.Data;
}

export namespace V1APIKeysRetrieveResponse {
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

export interface V1APIKeysUpdateResponse {
  data?: V1APIKeysUpdateResponse.Data;
}

export namespace V1APIKeysUpdateResponse {
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

export interface V1CurrentListResponse {
  data?: V1CurrentListResponse.Data;
}

export namespace V1CurrentListResponse {
  export interface Data {
    id?: number;

    createdAt?: string;

    name?: string;

    status?: string;

    workspace?: Data.Workspace;
  }

  export namespace Data {
    export interface Workspace {
      id?: number;

      name?: string;
    }
  }
}

export interface V1DomainsCreateResponse {
  data?: V1DomainsCreateResponse.Data;
}

export namespace V1DomainsCreateResponse {
  export interface Data {
    id?: string;

    createdAt?: string;

    domain?: string;

    status?: string;

    verified?: boolean;
  }
}

export interface V1DomainsListResponse {
  data?: Array<V1DomainsListResponse.Data>;
}

export namespace V1DomainsListResponse {
  export interface Data {
    id?: string;

    createdAt?: string;

    domain?: string;

    status?: 'active' | 'pending' | 'failed';

    verified?: boolean;
  }
}

export interface V1DomainsRetrieveResponse {
  data?: V1DomainsRetrieveResponse.Data;
}

export namespace V1DomainsRetrieveResponse {
  export interface Data {
    id?: string;

    createdAt?: string;

    domain?: string;

    status?: string;

    verified?: boolean;
  }
}

export interface V1DomainsUpdateResponse {
  data?: V1DomainsUpdateResponse.Data;
}

export namespace V1DomainsUpdateResponse {
  export interface Data {
    id?: string;

    createdAt?: string;

    domain?: string;

    status?: string;

    verified?: boolean;
  }
}

export interface V1TemplatesCreateResponse {
  data?: V1TemplatesCreateResponse.Data;
}

export namespace V1TemplatesCreateResponse {
  export interface Data {
    id?: string;

    body?: string;

    createdAt?: string;

    name?: string;

    subject?: string;

    updatedAt?: string;
  }
}

export interface V1TemplatesListResponse {
  data?: Array<V1TemplatesListResponse.Data>;
}

export namespace V1TemplatesListResponse {
  export interface Data {
    id?: string;

    body?: string;

    createdAt?: string;

    name?: string;

    subject?: string;

    updatedAt?: string;
  }
}

export interface V1TemplatesRetrieveResponse {
  data?: V1TemplatesRetrieveResponse.Data;
}

export namespace V1TemplatesRetrieveResponse {
  export interface Data {
    id?: string;

    body?: string;

    createdAt?: string;

    name?: string;

    subject?: string;

    updatedAt?: string;
  }
}

export interface V1TemplatesUpdateResponse {
  data?: V1TemplatesUpdateResponse.Data;
}

export namespace V1TemplatesUpdateResponse {
  export interface Data {
    id?: string;

    body?: string;

    createdAt?: string;

    name?: string;

    subject?: string;

    updatedAt?: string;
  }
}

export interface V1APIKeysCreateParams {
  /**
   * Name for the API key
   */
  name: string;

  /**
   * Allowed domains for this API key
   */
  domains?: Array<string>;
}

export interface V1APIKeysUpdateParams {
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

export interface V1DomainsCreateParams {
  /**
   * Domain name to add
   */
  domain: string;
}

export interface V1DomainsUpdateParams {
  /**
   * Updated domain name
   */
  domain?: string;
}

export interface V1TemplatesCreateParams {
  /**
   * Template name
   */
  name: string;

  /**
   * Email body content
   */
  body?: string;

  /**
   * Email subject line
   */
  subject?: string;
}

export interface V1TemplatesUpdateParams {
  /**
   * Updated email body content
   */
  body?: string;

  /**
   * Updated template name
   */
  name?: string;

  /**
   * Updated email subject line
   */
  subject?: string;
}

export declare namespace V1 {
  export {
    type V1APIKeysCreateResponse as V1APIKeysCreateResponse,
    type V1APIKeysListResponse as V1APIKeysListResponse,
    type V1APIKeysRetrieveResponse as V1APIKeysRetrieveResponse,
    type V1APIKeysUpdateResponse as V1APIKeysUpdateResponse,
    type V1CurrentListResponse as V1CurrentListResponse,
    type V1DomainsCreateResponse as V1DomainsCreateResponse,
    type V1DomainsListResponse as V1DomainsListResponse,
    type V1DomainsRetrieveResponse as V1DomainsRetrieveResponse,
    type V1DomainsUpdateResponse as V1DomainsUpdateResponse,
    type V1TemplatesCreateResponse as V1TemplatesCreateResponse,
    type V1TemplatesListResponse as V1TemplatesListResponse,
    type V1TemplatesRetrieveResponse as V1TemplatesRetrieveResponse,
    type V1TemplatesUpdateResponse as V1TemplatesUpdateResponse,
    type V1APIKeysCreateParams as V1APIKeysCreateParams,
    type V1APIKeysUpdateParams as V1APIKeysUpdateParams,
    type V1DomainsCreateParams as V1DomainsCreateParams,
    type V1DomainsUpdateParams as V1DomainsUpdateParams,
    type V1TemplatesCreateParams as V1TemplatesCreateParams,
    type V1TemplatesUpdateParams as V1TemplatesUpdateParams,
  };
}

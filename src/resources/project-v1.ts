// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class ProjectV1 extends APIResource {
  /**
   * Create a new API key for the project.
   */
  apiKeysCreate(
    body: ProjectV1APIKeysCreateParams,
    options?: RequestOptions,
  ): APIPromise<ProjectV1APIKeysCreateResponse> {
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
  apiKeysList(options?: RequestOptions): APIPromise<ProjectV1APIKeysListResponse> {
    return this._client.get('/project/v1/api-keys', options);
  }

  /**
   * Get API key details by ID.
   */
  apiKeysRetrieve(id: string, options?: RequestOptions): APIPromise<ProjectV1APIKeysRetrieveResponse> {
    return this._client.get(path`/project/v1/api-keys/${id}`, options);
  }

  /**
   * Update API key settings.
   */
  apiKeysUpdate(
    id: string,
    body: ProjectV1APIKeysUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ProjectV1APIKeysUpdateResponse> {
    return this._client.put(path`/project/v1/api-keys/${id}`, { body, ...options });
  }

  /**
   * Get project details for the authenticated project.
   */
  currentList(options?: RequestOptions): APIPromise<ProjectV1CurrentListResponse> {
    return this._client.get('/project/v1/current', options);
  }

  /**
   * Add a new domain to the project.
   */
  domainsCreate(
    body: ProjectV1DomainsCreateParams,
    options?: RequestOptions,
  ): APIPromise<ProjectV1DomainsCreateResponse> {
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
  domainsList(options?: RequestOptions): APIPromise<ProjectV1DomainsListResponse> {
    return this._client.get('/project/v1/domains', options);
  }

  /**
   * Get domain details by ID.
   */
  domainsRetrieve(id: string, options?: RequestOptions): APIPromise<ProjectV1DomainsRetrieveResponse> {
    return this._client.get(path`/project/v1/domains/${id}`, options);
  }

  /**
   * Update domain settings.
   */
  domainsUpdate(
    id: string,
    body: ProjectV1DomainsUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ProjectV1DomainsUpdateResponse> {
    return this._client.put(path`/project/v1/domains/${id}`, { body, ...options });
  }

  /**
   * Create a new project template.
   */
  templatesCreate(
    body: ProjectV1TemplatesCreateParams,
    options?: RequestOptions,
  ): APIPromise<ProjectV1TemplatesCreateResponse> {
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
  templatesList(options?: RequestOptions): APIPromise<ProjectV1TemplatesListResponse> {
    return this._client.get('/project/v1/templates', options);
  }

  /**
   * Get project template by ID.
   */
  templatesRetrieve(id: string, options?: RequestOptions): APIPromise<ProjectV1TemplatesRetrieveResponse> {
    return this._client.get(path`/project/v1/templates/${id}`, options);
  }

  /**
   * Update project template.
   */
  templatesUpdate(
    id: string,
    body: ProjectV1TemplatesUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ProjectV1TemplatesUpdateResponse> {
    return this._client.put(path`/project/v1/templates/${id}`, { body, ...options });
  }
}

export interface ProjectV1APIKeysCreateResponse {
  data?: ProjectV1APIKeysCreateResponse.Data;
}

export namespace ProjectV1APIKeysCreateResponse {
  export interface Data {
    id?: string;

    active?: boolean;

    createdAt?: string;

    domains?: Array<string>;

    key?: string;

    name?: string;
  }
}

export interface ProjectV1APIKeysListResponse {
  data?: Array<ProjectV1APIKeysListResponse.Data>;
}

export namespace ProjectV1APIKeysListResponse {
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

export interface ProjectV1APIKeysRetrieveResponse {
  data?: ProjectV1APIKeysRetrieveResponse.Data;
}

export namespace ProjectV1APIKeysRetrieveResponse {
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

export interface ProjectV1APIKeysUpdateResponse {
  data?: ProjectV1APIKeysUpdateResponse.Data;
}

export namespace ProjectV1APIKeysUpdateResponse {
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

export interface ProjectV1CurrentListResponse {
  data?: ProjectV1CurrentListResponse.Data;
}

export namespace ProjectV1CurrentListResponse {
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

export interface ProjectV1DomainsCreateResponse {
  data?: ProjectV1DomainsCreateResponse.Data;
}

export namespace ProjectV1DomainsCreateResponse {
  export interface Data {
    id?: string;

    createdAt?: string;

    domain?: string;

    status?: string;

    verified?: boolean;
  }
}

export interface ProjectV1DomainsListResponse {
  data?: Array<ProjectV1DomainsListResponse.Data>;
}

export namespace ProjectV1DomainsListResponse {
  export interface Data {
    id?: string;

    createdAt?: string;

    domain?: string;

    status?: 'active' | 'pending' | 'failed';

    verified?: boolean;
  }
}

export interface ProjectV1DomainsRetrieveResponse {
  data?: ProjectV1DomainsRetrieveResponse.Data;
}

export namespace ProjectV1DomainsRetrieveResponse {
  export interface Data {
    id?: string;

    createdAt?: string;

    domain?: string;

    status?: string;

    verified?: boolean;
  }
}

export interface ProjectV1DomainsUpdateResponse {
  data?: ProjectV1DomainsUpdateResponse.Data;
}

export namespace ProjectV1DomainsUpdateResponse {
  export interface Data {
    id?: string;

    createdAt?: string;

    domain?: string;

    status?: string;

    verified?: boolean;
  }
}

export interface ProjectV1TemplatesCreateResponse {
  data?: ProjectV1TemplatesCreateResponse.Data;
}

export namespace ProjectV1TemplatesCreateResponse {
  export interface Data {
    id?: string;

    body?: string;

    createdAt?: string;

    name?: string;

    subject?: string;

    updatedAt?: string;
  }
}

export interface ProjectV1TemplatesListResponse {
  data?: Array<ProjectV1TemplatesListResponse.Data>;
}

export namespace ProjectV1TemplatesListResponse {
  export interface Data {
    id?: string;

    body?: string;

    createdAt?: string;

    name?: string;

    subject?: string;

    updatedAt?: string;
  }
}

export interface ProjectV1TemplatesRetrieveResponse {
  data?: ProjectV1TemplatesRetrieveResponse.Data;
}

export namespace ProjectV1TemplatesRetrieveResponse {
  export interface Data {
    id?: string;

    body?: string;

    createdAt?: string;

    name?: string;

    subject?: string;

    updatedAt?: string;
  }
}

export interface ProjectV1TemplatesUpdateResponse {
  data?: ProjectV1TemplatesUpdateResponse.Data;
}

export namespace ProjectV1TemplatesUpdateResponse {
  export interface Data {
    id?: string;

    body?: string;

    createdAt?: string;

    name?: string;

    subject?: string;

    updatedAt?: string;
  }
}

export interface ProjectV1APIKeysCreateParams {
  /**
   * Name for the API key
   */
  name: string;

  /**
   * Allowed domains for this API key
   */
  domains?: Array<string>;
}

export interface ProjectV1APIKeysUpdateParams {
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

export interface ProjectV1DomainsCreateParams {
  /**
   * Domain name to add
   */
  domain: string;
}

export interface ProjectV1DomainsUpdateParams {
  /**
   * Updated domain name
   */
  domain?: string;
}

export interface ProjectV1TemplatesCreateParams {
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

export interface ProjectV1TemplatesUpdateParams {
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

export declare namespace ProjectV1 {
  export {
    type ProjectV1APIKeysCreateResponse as ProjectV1APIKeysCreateResponse,
    type ProjectV1APIKeysListResponse as ProjectV1APIKeysListResponse,
    type ProjectV1APIKeysRetrieveResponse as ProjectV1APIKeysRetrieveResponse,
    type ProjectV1APIKeysUpdateResponse as ProjectV1APIKeysUpdateResponse,
    type ProjectV1CurrentListResponse as ProjectV1CurrentListResponse,
    type ProjectV1DomainsCreateResponse as ProjectV1DomainsCreateResponse,
    type ProjectV1DomainsListResponse as ProjectV1DomainsListResponse,
    type ProjectV1DomainsRetrieveResponse as ProjectV1DomainsRetrieveResponse,
    type ProjectV1DomainsUpdateResponse as ProjectV1DomainsUpdateResponse,
    type ProjectV1TemplatesCreateResponse as ProjectV1TemplatesCreateResponse,
    type ProjectV1TemplatesListResponse as ProjectV1TemplatesListResponse,
    type ProjectV1TemplatesRetrieveResponse as ProjectV1TemplatesRetrieveResponse,
    type ProjectV1TemplatesUpdateResponse as ProjectV1TemplatesUpdateResponse,
    type ProjectV1APIKeysCreateParams as ProjectV1APIKeysCreateParams,
    type ProjectV1APIKeysUpdateParams as ProjectV1APIKeysUpdateParams,
    type ProjectV1DomainsCreateParams as ProjectV1DomainsCreateParams,
    type ProjectV1DomainsUpdateParams as ProjectV1DomainsUpdateParams,
    type ProjectV1TemplatesCreateParams as ProjectV1TemplatesCreateParams,
    type ProjectV1TemplatesUpdateParams as ProjectV1TemplatesUpdateParams,
  };
}

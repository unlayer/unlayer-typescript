// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Project extends APIResource {
  /**
   * Create a new API key for the project.
   */
  apiKeysCreate(
    body: ProjectAPIKeysCreateParams,
    options?: RequestOptions,
  ): APIPromise<ProjectAPIKeysCreateResponse> {
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
  apiKeysList(options?: RequestOptions): APIPromise<ProjectAPIKeysListResponse> {
    return this._client.get('/project/v1/api-keys', options);
  }

  /**
   * Get API key details by ID.
   */
  apiKeysRetrieve(id: string, options?: RequestOptions): APIPromise<ProjectAPIKeysRetrieveResponse> {
    return this._client.get(path`/project/v1/api-keys/${id}`, options);
  }

  /**
   * Update API key settings.
   */
  apiKeysUpdate(
    id: string,
    body: ProjectAPIKeysUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ProjectAPIKeysUpdateResponse> {
    return this._client.put(path`/project/v1/api-keys/${id}`, { body, ...options });
  }

  /**
   * Get project details for the authenticated project.
   */
  currentList(options?: RequestOptions): APIPromise<ProjectCurrentListResponse> {
    return this._client.get('/project/v1/current', options);
  }

  /**
   * Add a new domain to the project.
   */
  domainsCreate(
    body: ProjectDomainsCreateParams,
    options?: RequestOptions,
  ): APIPromise<ProjectDomainsCreateResponse> {
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
  domainsList(options?: RequestOptions): APIPromise<ProjectDomainsListResponse> {
    return this._client.get('/project/v1/domains', options);
  }

  /**
   * Get domain details by ID.
   */
  domainsRetrieve(id: string, options?: RequestOptions): APIPromise<ProjectDomainsRetrieveResponse> {
    return this._client.get(path`/project/v1/domains/${id}`, options);
  }

  /**
   * Update domain settings.
   */
  domainsUpdate(
    id: string,
    body: ProjectDomainsUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ProjectDomainsUpdateResponse> {
    return this._client.put(path`/project/v1/domains/${id}`, { body, ...options });
  }

  /**
   * Create a new project template.
   */
  templatesCreate(
    body: ProjectTemplatesCreateParams,
    options?: RequestOptions,
  ): APIPromise<ProjectTemplatesCreateResponse> {
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
  templatesList(options?: RequestOptions): APIPromise<ProjectTemplatesListResponse> {
    return this._client.get('/project/v1/templates', options);
  }

  /**
   * Get project template by ID.
   */
  templatesRetrieve(id: string, options?: RequestOptions): APIPromise<ProjectTemplatesRetrieveResponse> {
    return this._client.get(path`/project/v1/templates/${id}`, options);
  }

  /**
   * Update project template.
   */
  templatesUpdate(
    id: string,
    body: ProjectTemplatesUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ProjectTemplatesUpdateResponse> {
    return this._client.put(path`/project/v1/templates/${id}`, { body, ...options });
  }
}

export interface ProjectAPIKeysCreateResponse {
  data?: ProjectAPIKeysCreateResponse.Data;
}

export namespace ProjectAPIKeysCreateResponse {
  export interface Data {
    id?: string;

    active?: boolean;

    createdAt?: string;

    domains?: Array<string>;

    key?: string;

    name?: string;
  }
}

export interface ProjectAPIKeysListResponse {
  data?: Array<ProjectAPIKeysListResponse.Data>;
}

export namespace ProjectAPIKeysListResponse {
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

export interface ProjectAPIKeysRetrieveResponse {
  data?: ProjectAPIKeysRetrieveResponse.Data;
}

export namespace ProjectAPIKeysRetrieveResponse {
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

export interface ProjectAPIKeysUpdateResponse {
  data?: ProjectAPIKeysUpdateResponse.Data;
}

export namespace ProjectAPIKeysUpdateResponse {
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

export interface ProjectCurrentListResponse {
  data?: ProjectCurrentListResponse.Data;
}

export namespace ProjectCurrentListResponse {
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

export interface ProjectDomainsCreateResponse {
  data?: ProjectDomainsCreateResponse.Data;
}

export namespace ProjectDomainsCreateResponse {
  export interface Data {
    id?: string;

    createdAt?: string;

    domain?: string;

    status?: string;

    verified?: boolean;
  }
}

export interface ProjectDomainsListResponse {
  data?: Array<ProjectDomainsListResponse.Data>;
}

export namespace ProjectDomainsListResponse {
  export interface Data {
    id?: string;

    createdAt?: string;

    domain?: string;

    status?: 'active' | 'pending' | 'failed';

    verified?: boolean;
  }
}

export interface ProjectDomainsRetrieveResponse {
  data?: ProjectDomainsRetrieveResponse.Data;
}

export namespace ProjectDomainsRetrieveResponse {
  export interface Data {
    id?: string;

    createdAt?: string;

    domain?: string;

    status?: string;

    verified?: boolean;
  }
}

export interface ProjectDomainsUpdateResponse {
  data?: ProjectDomainsUpdateResponse.Data;
}

export namespace ProjectDomainsUpdateResponse {
  export interface Data {
    id?: string;

    createdAt?: string;

    domain?: string;

    status?: string;

    verified?: boolean;
  }
}

export interface ProjectTemplatesCreateResponse {
  data?: ProjectTemplatesCreateResponse.Data;
}

export namespace ProjectTemplatesCreateResponse {
  export interface Data {
    id?: string;

    body?: string;

    createdAt?: string;

    name?: string;

    subject?: string;

    updatedAt?: string;
  }
}

export interface ProjectTemplatesListResponse {
  data?: Array<ProjectTemplatesListResponse.Data>;
}

export namespace ProjectTemplatesListResponse {
  export interface Data {
    id?: string;

    body?: string;

    createdAt?: string;

    name?: string;

    subject?: string;

    updatedAt?: string;
  }
}

export interface ProjectTemplatesRetrieveResponse {
  data?: ProjectTemplatesRetrieveResponse.Data;
}

export namespace ProjectTemplatesRetrieveResponse {
  export interface Data {
    id?: string;

    body?: string;

    createdAt?: string;

    name?: string;

    subject?: string;

    updatedAt?: string;
  }
}

export interface ProjectTemplatesUpdateResponse {
  data?: ProjectTemplatesUpdateResponse.Data;
}

export namespace ProjectTemplatesUpdateResponse {
  export interface Data {
    id?: string;

    body?: string;

    createdAt?: string;

    name?: string;

    subject?: string;

    updatedAt?: string;
  }
}

export interface ProjectAPIKeysCreateParams {
  /**
   * Name for the API key
   */
  name: string;

  /**
   * Allowed domains for this API key
   */
  domains?: Array<string>;
}

export interface ProjectAPIKeysUpdateParams {
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

export interface ProjectDomainsCreateParams {
  /**
   * Domain name to add
   */
  domain: string;
}

export interface ProjectDomainsUpdateParams {
  /**
   * Updated domain name
   */
  domain?: string;
}

export interface ProjectTemplatesCreateParams {
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

export interface ProjectTemplatesUpdateParams {
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

export declare namespace Project {
  export {
    type ProjectAPIKeysCreateResponse as ProjectAPIKeysCreateResponse,
    type ProjectAPIKeysListResponse as ProjectAPIKeysListResponse,
    type ProjectAPIKeysRetrieveResponse as ProjectAPIKeysRetrieveResponse,
    type ProjectAPIKeysUpdateResponse as ProjectAPIKeysUpdateResponse,
    type ProjectCurrentListResponse as ProjectCurrentListResponse,
    type ProjectDomainsCreateResponse as ProjectDomainsCreateResponse,
    type ProjectDomainsListResponse as ProjectDomainsListResponse,
    type ProjectDomainsRetrieveResponse as ProjectDomainsRetrieveResponse,
    type ProjectDomainsUpdateResponse as ProjectDomainsUpdateResponse,
    type ProjectTemplatesCreateResponse as ProjectTemplatesCreateResponse,
    type ProjectTemplatesListResponse as ProjectTemplatesListResponse,
    type ProjectTemplatesRetrieveResponse as ProjectTemplatesRetrieveResponse,
    type ProjectTemplatesUpdateResponse as ProjectTemplatesUpdateResponse,
    type ProjectAPIKeysCreateParams as ProjectAPIKeysCreateParams,
    type ProjectAPIKeysUpdateParams as ProjectAPIKeysUpdateParams,
    type ProjectDomainsCreateParams as ProjectDomainsCreateParams,
    type ProjectDomainsUpdateParams as ProjectDomainsUpdateParams,
    type ProjectTemplatesCreateParams as ProjectTemplatesCreateParams,
    type ProjectTemplatesUpdateParams as ProjectTemplatesUpdateParams,
  };
}

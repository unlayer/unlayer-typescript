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
    params: ProjectAPIKeysCreateParams,
    options?: RequestOptions,
  ): APIPromise<ProjectAPIKeysCreateResponse> {
    const { projectId, ...body } = params;
    return this._client.post('/project/v1/api-keys', { query: { projectId }, body, ...options });
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
  apiKeysList(
    query: ProjectAPIKeysListParams,
    options?: RequestOptions,
  ): APIPromise<ProjectAPIKeysListResponse> {
    return this._client.get('/project/v1/api-keys', { query, ...options });
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
   * Get project details for the specified project.
   */
  currentList(
    query: ProjectCurrentListParams,
    options?: RequestOptions,
  ): APIPromise<ProjectCurrentListResponse> {
    return this._client.get('/project/v1/current', { query, ...options });
  }

  /**
   * Add a new domain to the project.
   */
  domainsCreate(
    params: ProjectDomainsCreateParams,
    options?: RequestOptions,
  ): APIPromise<ProjectDomainsCreateResponse> {
    const { projectId, ...body } = params;
    return this._client.post('/project/v1/domains', { query: { projectId }, body, ...options });
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
  domainsList(
    query: ProjectDomainsListParams,
    options?: RequestOptions,
  ): APIPromise<ProjectDomainsListResponse> {
    return this._client.get('/project/v1/domains', { query, ...options });
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
    params: ProjectTemplatesCreateParams,
    options?: RequestOptions,
  ): APIPromise<ProjectTemplatesCreateResponse> {
    const { projectId, ...body } = params;
    return this._client.post('/project/v1/templates', { query: { projectId }, body, ...options });
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
  templatesList(
    query: ProjectTemplatesListParams,
    options?: RequestOptions,
  ): APIPromise<ProjectTemplatesListResponse> {
    return this._client.get('/project/v1/templates', { query, ...options });
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

  /**
   * Delete a personal access token. You can only delete your own tokens.
   */
  tokensDelete(tokenID: string, options?: RequestOptions): APIPromise<ProjectTokensDeleteResponse> {
    return this._client.delete(path`/project/v1/tokens/${tokenID}`, options);
  }

  /**
   * List all personal access tokens for the authenticated user.
   */
  tokensList(options?: RequestOptions): APIPromise<ProjectTokensListResponse> {
    return this._client.get('/project/v1/tokens', options);
  }

  /**
   * Get all workspaces accessible by the current token.
   */
  workspacesList(options?: RequestOptions): APIPromise<ProjectWorkspacesListResponse> {
    return this._client.get('/project/v1/workspaces', options);
  }

  /**
   * Get a specific workspace by ID with its projects.
   */
  workspacesRetrieve(
    workspaceID: string,
    options?: RequestOptions,
  ): APIPromise<ProjectWorkspacesRetrieveResponse> {
    return this._client.get(path`/project/v1/workspaces/${workspaceID}`, options);
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

export interface ProjectTokensDeleteResponse {
  message?: string;

  success?: boolean;
}

export interface ProjectTokensListResponse {
  data?: Array<ProjectTokensListResponse.Data>;
}

export namespace ProjectTokensListResponse {
  export interface Data {
    id?: number;

    createdAt?: string;

    expiresAt?: string | null;

    lastUsedAt?: string | null;

    name?: string;

    scope?: string;

    workspaceId?: number | null;

    workspaceName?: string | null;
  }
}

export interface ProjectWorkspacesListResponse {
  data?: Array<ProjectWorkspacesListResponse.Data>;
}

export namespace ProjectWorkspacesListResponse {
  export interface Data {
    id?: number;

    name?: string;
  }
}

export interface ProjectWorkspacesRetrieveResponse {
  data?: ProjectWorkspacesRetrieveResponse.Data;
}

export namespace ProjectWorkspacesRetrieveResponse {
  export interface Data {
    id?: number;

    name?: string;

    projects?: Array<Data.Project>;
  }

  export namespace Data {
    export interface Project {
      id?: number;

      name?: string;

      status?: string;
    }
  }
}

export interface ProjectAPIKeysCreateParams {
  /**
   * Query param: The project ID to create API key for
   */
  projectId: string;

  /**
   * Body param: Name for the API key
   */
  name: string;

  /**
   * Body param: Allowed domains for this API key
   */
  domains?: Array<string>;
}

export interface ProjectAPIKeysListParams {
  /**
   * The project ID to get API keys for
   */
  projectId: string;
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

export interface ProjectCurrentListParams {
  /**
   * The project ID
   */
  projectId: string;
}

export interface ProjectDomainsCreateParams {
  /**
   * Query param: The project ID to add domain to
   */
  projectId: string;

  /**
   * Body param: Domain name to add
   */
  domain: string;
}

export interface ProjectDomainsListParams {
  /**
   * The project ID to get domains for
   */
  projectId: string;
}

export interface ProjectDomainsUpdateParams {
  /**
   * Updated domain name
   */
  domain?: string;
}

export interface ProjectTemplatesCreateParams {
  /**
   * Query param: The project ID to create template for
   */
  projectId: string;

  /**
   * Body param: Template name
   */
  name: string;

  /**
   * Body param: Email body content
   */
  body?: string;

  /**
   * Body param: Email subject line
   */
  subject?: string;
}

export interface ProjectTemplatesListParams {
  /**
   * The project ID to get templates for
   */
  projectId: string;
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
    type ProjectTokensDeleteResponse as ProjectTokensDeleteResponse,
    type ProjectTokensListResponse as ProjectTokensListResponse,
    type ProjectWorkspacesListResponse as ProjectWorkspacesListResponse,
    type ProjectWorkspacesRetrieveResponse as ProjectWorkspacesRetrieveResponse,
    type ProjectAPIKeysCreateParams as ProjectAPIKeysCreateParams,
    type ProjectAPIKeysListParams as ProjectAPIKeysListParams,
    type ProjectAPIKeysUpdateParams as ProjectAPIKeysUpdateParams,
    type ProjectCurrentListParams as ProjectCurrentListParams,
    type ProjectDomainsCreateParams as ProjectDomainsCreateParams,
    type ProjectDomainsListParams as ProjectDomainsListParams,
    type ProjectDomainsUpdateParams as ProjectDomainsUpdateParams,
    type ProjectTemplatesCreateParams as ProjectTemplatesCreateParams,
    type ProjectTemplatesListParams as ProjectTemplatesListParams,
    type ProjectTemplatesUpdateParams as ProjectTemplatesUpdateParams,
  };
}

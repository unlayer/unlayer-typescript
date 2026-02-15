// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Templates extends APIResource {
  /**
   * Create a new project template.
   */
  create(params: TemplateCreateParams, options?: RequestOptions): APIPromise<TemplateCreateResponse> {
    const { projectId, ...body } = params;
    return this._client.post('/project/v1/templates', { query: { projectId }, body, ...options });
  }

  /**
   * Get project template by ID.
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<TemplateRetrieveResponse> {
    return this._client.get(path`/project/v1/templates/${id}`, options);
  }

  /**
   * Update project template.
   */
  update(
    id: string,
    body: TemplateUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<TemplateUpdateResponse> {
    return this._client.put(path`/project/v1/templates/${id}`, { body, ...options });
  }

  /**
   * List project templates with cursor-based pagination. Returns templates in
   * descending order by update time.
   */
  list(query: TemplateListParams, options?: RequestOptions): APIPromise<TemplateListResponse> {
    return this._client.get('/project/v1/templates', { query, ...options });
  }

  /**
   * Delete project template.
   */
  delete(id: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/project/v1/templates/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface TemplateCreateResponse {
  data?: TemplateCreateResponse.Data;
}

export namespace TemplateCreateResponse {
  export interface Data {
    /**
     * Template ID
     */
    id?: string;

    createdAt?: string;

    /**
     * Template type/display mode
     */
    displayMode?: 'email' | 'web' | 'document';

    /**
     * Template name
     */
    name?: string;

    updatedAt?: string;
  }
}

export interface TemplateRetrieveResponse {
  data?: TemplateRetrieveResponse.Data;
}

export namespace TemplateRetrieveResponse {
  export interface Data {
    id?: string;

    body?: string;

    createdAt?: string;

    name?: string;

    subject?: string;

    updatedAt?: string;
  }
}

export interface TemplateUpdateResponse {
  data?: TemplateUpdateResponse.Data;
}

export namespace TemplateUpdateResponse {
  export interface Data {
    id?: string;

    body?: string;

    createdAt?: string;

    name?: string;

    subject?: string;

    updatedAt?: string;
  }
}

export interface TemplateListResponse {
  data: Array<TemplateListResponse.Data>;

  /**
   * Whether there are more results after this page
   */
  has_more: boolean;

  /**
   * Cursor for the next page. Null if no more results.
   */
  next_cursor?: string | null;
}

export namespace TemplateListResponse {
  export interface Data {
    /**
     * Template ID
     */
    id?: string;

    createdAt?: string;

    /**
     * Template type/display mode
     */
    displayMode?: 'email' | 'web' | 'document';

    /**
     * Template name
     */
    name?: string;

    updatedAt?: string;
  }
}

export interface TemplateCreateParams {
  /**
   * Query param: The project ID to create the template in
   */
  projectId: string;

  /**
   * Body param: Template name
   */
  name: string;

  /**
   * Body param: Template type/display mode
   */
  displayMode?: 'email' | 'web' | 'document';
}

export interface TemplateUpdateParams {
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

export interface TemplateListParams {
  /**
   * The project ID to list templates for
   */
  projectId: string;

  /**
   * Pagination cursor from previous response
   */
  cursor?: string;

  /**
   * Filter by template type
   */
  displayMode?: 'email' | 'web' | 'document';

  /**
   * Number of templates to return (1-100)
   */
  limit?: number;

  /**
   * Filter by name (case-insensitive search)
   */
  name?: string;
}

export declare namespace Templates {
  export {
    type TemplateCreateResponse as TemplateCreateResponse,
    type TemplateRetrieveResponse as TemplateRetrieveResponse,
    type TemplateUpdateResponse as TemplateUpdateResponse,
    type TemplateListResponse as TemplateListResponse,
    type TemplateCreateParams as TemplateCreateParams,
    type TemplateUpdateParams as TemplateUpdateParams,
    type TemplateListParams as TemplateListParams,
  };
}

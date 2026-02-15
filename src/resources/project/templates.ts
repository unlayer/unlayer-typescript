// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Templates extends APIResource {
  /**
   * Get project template by ID.
   */
  retrieve(
    id: string,
    query: TemplateRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<TemplateRetrieveResponse> {
    return this._client.get(path`/v3/project/templates/${id}`, { query, ...options });
  }

  /**
   * List project templates with cursor-based pagination. Returns templates in
   * descending order by update time.
   */
  list(
    query: TemplateListParams,
    options?: RequestOptions,
  ): PagePromise<TemplateListResponsesCursorPage, TemplateListResponse> {
    return this._client.getAPIList('/v3/project/templates', CursorPage<TemplateListResponse>, {
      query,
      ...options,
    });
  }
}

export type TemplateListResponsesCursorPage = CursorPage<TemplateListResponse>;

export interface TemplateRetrieveResponse {
  data?: TemplateRetrieveResponse.Data;
}

export namespace TemplateRetrieveResponse {
  export interface Data {
    id?: string;

    createdAt?: string;

    design?: { [key: string]: unknown };

    displayMode?: 'email' | 'web' | 'document';

    html?: string | null;

    name?: string;

    updatedAt?: string;
  }
}

export interface TemplateListResponse {
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

export interface TemplateRetrieveParams {
  /**
   * The project ID
   */
  projectId: string;
}

export interface TemplateListParams extends CursorPageParams {
  /**
   * The project ID to list templates for
   */
  projectId: string;

  /**
   * Filter by template type
   */
  displayMode?: 'email' | 'web' | 'document';

  /**
   * Filter by name (case-insensitive search)
   */
  name?: string;
}

export declare namespace Templates {
  export {
    type TemplateRetrieveResponse as TemplateRetrieveResponse,
    type TemplateListResponse as TemplateListResponse,
    type TemplateListResponsesCursorPage as TemplateListResponsesCursorPage,
    type TemplateRetrieveParams as TemplateRetrieveParams,
    type TemplateListParams as TemplateListParams,
  };
}

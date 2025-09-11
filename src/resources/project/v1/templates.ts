// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Templates extends APIResource {
  /**
   * Create a new project template.
   */
  create(body: TemplateCreateParams, options?: RequestOptions): APIPromise<TemplateCreateResponse> {
    return this._client.post('/project/v1/templates/', { body, ...options });
  }

  /**
   * Get project template by ID.
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<TemplateRetrieveResponse> {
    return this._client.get(path`/project/v1/templates/${id}/`, options);
  }

  /**
   * Update project template.
   */
  update(
    id: string,
    body: TemplateUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<TemplateUpdateResponse> {
    return this._client.put(path`/project/v1/templates/${id}/`, { body, ...options });
  }

  /**
   * Get all project templates.
   */
  list(options?: RequestOptions): APIPromise<TemplateListResponse> {
    return this._client.get('/project/v1/templates/', options);
  }

  /**
   * Delete project template.
   */
  delete(id: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/project/v1/templates/${id}/`, {
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
    id?: string;

    body?: string;

    createdAt?: string;

    name?: string;

    subject?: string;

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
  data?: Array<TemplateListResponse.Data>;
}

export namespace TemplateListResponse {
  export interface Data {
    id?: string;

    body?: string;

    createdAt?: string;

    name?: string;

    subject?: string;

    updatedAt?: string;
  }
}

export interface TemplateCreateParams {
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

export declare namespace Templates {
  export {
    type TemplateCreateResponse as TemplateCreateResponse,
    type TemplateRetrieveResponse as TemplateRetrieveResponse,
    type TemplateUpdateResponse as TemplateUpdateResponse,
    type TemplateListResponse as TemplateListResponse,
    type TemplateCreateParams as TemplateCreateParams,
    type TemplateUpdateParams as TemplateUpdateParams,
  };
}

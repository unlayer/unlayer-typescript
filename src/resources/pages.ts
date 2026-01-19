// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Pages extends APIResource {
  /**
   * Convert page design JSON to HTML with optional merge tags.
   */
  renderCreate(
    params: PageRenderCreateParams,
    options?: RequestOptions,
  ): APIPromise<PageRenderCreateResponse> {
    const { projectId, ...body } = params;
    return this._client.post('/pages/v1/render', { query: { projectId }, body, ...options });
  }
}

export interface PageRenderCreateResponse {
  data?: PageRenderCreateResponse.Data;
}

export namespace PageRenderCreateResponse {
  export interface Data {
    /**
     * Rendered HTML content
     */
    html?: string;
  }
}

export interface PageRenderCreateParams {
  /**
   * Query param: The project ID
   */
  projectId: string;

  /**
   * Body param: Proprietary design format JSON
   */
  design: { [key: string]: unknown };

  /**
   * Body param: Optional merge tags for personalization
   */
  mergeTags?: { [key: string]: string };
}

export declare namespace Pages {
  export {
    type PageRenderCreateResponse as PageRenderCreateResponse,
    type PageRenderCreateParams as PageRenderCreateParams,
  };
}

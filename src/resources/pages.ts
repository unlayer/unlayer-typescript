// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Pages extends APIResource {
  /**
   * Convert page design JSON to HTML with optional merge tags.
   *
   * @example
   * ```ts
   * const response = await client.pages.renderCreate({
   *   design: {
   *     counters: {
   *       u_row: 1,
   *       u_column: 1,
   *       u_content_text: 1,
   *     },
   *     body: {
   *       rows: [
   *         {
   *           cells: [1],
   *           columns: [
   *             {
   *               contents: [
   *                 {
   *                   type: 'text',
   *                   values: { text: 'Hello World' },
   *                 },
   *               ],
   *             },
   *           ],
   *         },
   *       ],
   *     },
   *   },
   * });
   * ```
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
  /**
   * Rendered HTML content
   */
  html?: string;
}

export interface PageRenderCreateParams {
  /**
   * Body param: Proprietary design format JSON
   */
  design: { [key: string]: unknown };

  /**
   * Query param: The project ID (required for PAT auth, not needed for API Key auth)
   */
  projectId?: string;

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

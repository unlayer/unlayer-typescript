// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as V1API from './v1';
import { V1, V1RenderCreateParams, V1RenderCreateResponse } from './v1';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Pages extends APIResource {
  v1: V1API.V1 = new V1API.V1(this._client);

  /**
   * Convert page design JSON to HTML with optional merge tags.
   *
   * @example
   * ```ts
   * const response = await client.pages.renderCreate({
   *   design: {
   *     counters: { u_row: 1, u_column: 1, u_content_text: 1 },
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
  renderCreate(body: PageRenderCreateParams, options?: RequestOptions): APIPromise<PageRenderCreateResponse> {
    return this._client.post('/pages/v1/render', { body, ...options });
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
   * Proprietary design format JSON
   */
  design: { [key: string]: unknown };

  /**
   * Optional merge tags for personalization
   */
  mergeTags?: { [key: string]: string };
}

Pages.V1 = V1;

export declare namespace Pages {
  export {
    type PageRenderCreateResponse as PageRenderCreateResponse,
    type PageRenderCreateParams as PageRenderCreateParams,
  };

  export {
    V1 as V1,
    type V1RenderCreateResponse as V1RenderCreateResponse,
    type V1RenderCreateParams as V1RenderCreateParams,
  };
}

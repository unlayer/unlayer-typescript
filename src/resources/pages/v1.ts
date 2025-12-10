// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class V1 extends APIResource {
  /**
   * Convert page design JSON to HTML with optional merge tags.
   *
   * @example
   * ```ts
   * const response = await client.pages.v1.renderCreate({
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
  renderCreate(body: V1RenderCreateParams, options?: RequestOptions): APIPromise<V1RenderCreateResponse> {
    return this._client.post('/pages/v1/render', { body, ...options });
  }
}

export interface V1RenderCreateResponse {
  /**
   * Rendered HTML content
   */
  html?: string;
}

export interface V1RenderCreateParams {
  /**
   * Proprietary design format JSON
   */
  design: { [key: string]: unknown };

  /**
   * Optional merge tags for personalization
   */
  mergeTags?: { [key: string]: string };
}

export declare namespace V1 {
  export {
    type V1RenderCreateResponse as V1RenderCreateResponse,
    type V1RenderCreateParams as V1RenderCreateParams,
  };
}

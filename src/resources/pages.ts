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
   *   design: { counters: 'bar', body: 'bar' },
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

export declare namespace Pages {
  export {
    type PageRenderCreateResponse as PageRenderCreateResponse,
    type PageRenderCreateParams as PageRenderCreateParams,
  };
}

// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class V1 extends APIResource {
  /**
   * Convert page design JSON to HTML with optional merge tags.
   */
  render(body: V1RenderParams, options?: RequestOptions): APIPromise<V1RenderResponse> {
    return this._client.post('/pages/v1/render/', { body, ...options });
  }
}

export interface V1RenderResponse {
  /**
   * Rendered HTML content
   */
  html?: string;
}

export interface V1RenderParams {
  /**
   * Proprietary design format JSON
   */
  design: unknown;

  /**
   * Optional merge tags for personalization
   */
  mergeTags?: { [key: string]: string };
}

export declare namespace V1 {
  export { type V1RenderResponse as V1RenderResponse, type V1RenderParams as V1RenderParams };
}

// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class PagesV1 extends APIResource {
  /**
   * Convert page design JSON to HTML with optional merge tags.
   */
  renderCreate(
    body: PagesV1RenderCreateParams,
    options?: RequestOptions,
  ): APIPromise<PagesV1RenderCreateResponse> {
    return this._client.post('/pages/v1/render', { body, ...options });
  }
}

export interface PagesV1RenderCreateResponse {
  /**
   * Rendered HTML content
   */
  html?: string;
}

export interface PagesV1RenderCreateParams {
  /**
   * Proprietary design format JSON
   */
  design: { [key: string]: unknown };

  /**
   * Optional merge tags for personalization
   */
  mergeTags?: { [key: string]: string };
}

export declare namespace PagesV1 {
  export {
    type PagesV1RenderCreateResponse as PagesV1RenderCreateResponse,
    type PagesV1RenderCreateParams as PagesV1RenderCreateParams,
  };
}

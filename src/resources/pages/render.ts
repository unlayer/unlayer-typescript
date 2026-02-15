// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Render extends APIResource {
  /**
   * Convert page design JSON to HTML with optional merge tags.
   */
  create(params: RenderCreateParams, options?: RequestOptions): APIPromise<RenderCreateResponse> {
    const { projectId, ...body } = params;
    return this._client.post('/pages/v1/render', { query: { projectId }, body, ...options });
  }
}

export interface RenderCreateResponse {
  data?: RenderCreateResponse.Data;
}

export namespace RenderCreateResponse {
  export interface Data {
    /**
     * Rendered HTML content
     */
    html?: string;
  }
}

export interface RenderCreateParams {
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

export declare namespace Render {
  export { type RenderCreateResponse as RenderCreateResponse, type RenderCreateParams as RenderCreateParams };
}

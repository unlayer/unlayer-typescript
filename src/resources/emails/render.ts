// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Render extends APIResource {
  /**
   * Render a saved email template with optional merge variables. Returns the final
   * HTML without sending. Useful for previewing emails before sending.
   */
  create(body: RenderCreateParams, options?: RequestOptions): APIPromise<RenderCreateResponse> {
    return this._client.post('/v3/emails/render', { body, ...options });
  }
}

export interface RenderCreateResponse {
  data: RenderCreateResponse.Data;
}

export namespace RenderCreateResponse {
  export interface Data {
    /**
     * Rendered HTML content
     */
    html?: string;

    /**
     * Template name (can be used as default subject)
     */
    subject?: string | null;
  }
}

export interface RenderCreateParams {
  /**
   * Template ID to render
   */
  templateId: string;

  /**
   * Merge variables to substitute. Use {{key}} syntax in your template.
   */
  variables?: { [key: string]: string };
}

export declare namespace Render {
  export { type RenderCreateResponse as RenderCreateResponse, type RenderCreateParams as RenderCreateParams };
}

// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Send extends APIResource {
  /**
   * Send email with design JSON or HTML content.
   */
  create(params: SendCreateParams, options?: RequestOptions): APIPromise<SendCreateResponse> {
    const { projectId, ...body } = params;
    return this._client.post('/emails/v1/send', { query: { projectId }, body, ...options });
  }
}

export interface SendCreateResponse {
  data?: SendCreateResponse.Data;
}

export namespace SendCreateResponse {
  export interface Data {
    /**
     * Unique message identifier
     */
    messageId?: string;

    status?: 'sent' | 'queued' | 'failed';
  }
}

export interface SendCreateParams {
  /**
   * Query param: The project ID
   */
  projectId: string;

  /**
   * Body param: Recipient email address
   */
  to: string;

  /**
   * Body param: Proprietary design format JSON
   */
  design?: { [key: string]: unknown };

  /**
   * Body param: HTML content to send
   */
  html?: string;

  /**
   * Body param: Optional merge tags for personalization
   */
  mergeTags?: { [key: string]: string };

  /**
   * Body param: Email subject line
   */
  subject?: string;
}

export declare namespace Send {
  export { type SendCreateResponse as SendCreateResponse, type SendCreateParams as SendCreateParams };
}

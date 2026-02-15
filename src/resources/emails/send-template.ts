// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class SendTemplate extends APIResource {
  /**
   * Send email using an existing template with merge tags.
   */
  create(params: SendTemplateCreateParams, options?: RequestOptions): APIPromise<SendTemplateCreateResponse> {
    const { projectId, ...body } = params;
    return this._client.post('/emails/v1/send/template', { query: { projectId }, body, ...options });
  }
}

export interface SendTemplateCreateResponse {
  data?: SendTemplateCreateResponse.Data;
}

export namespace SendTemplateCreateResponse {
  export interface Data {
    /**
     * Unique message identifier
     */
    messageId?: string;

    status?: 'sent' | 'queued' | 'failed';
  }
}

export interface SendTemplateCreateParams {
  /**
   * Query param: The project ID
   */
  projectId: string;

  /**
   * Body param: ID of the template to use
   */
  templateId: string;

  /**
   * Body param: Recipient email address
   */
  to: string;

  /**
   * Body param: Optional merge tags for personalization
   */
  mergeTags?: { [key: string]: string };

  /**
   * Body param: Email subject line (optional, uses template default if not provided)
   */
  subject?: string;
}

export declare namespace SendTemplate {
  export {
    type SendTemplateCreateResponse as SendTemplateCreateResponse,
    type SendTemplateCreateParams as SendTemplateCreateParams,
  };
}

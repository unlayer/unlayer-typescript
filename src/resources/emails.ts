// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Emails extends APIResource {
  /**
   * Retrieve details of a previously sent email.
   */
  retrieve(
    id: string,
    query: EmailRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<EmailRetrieveResponse> {
    return this._client.get(path`/emails/v1/emails/${id}`, { query, ...options });
  }

  /**
   * Convert design JSON to HTML with optional merge tags.
   */
  renderCreate(
    params: EmailRenderCreateParams,
    options?: RequestOptions,
  ): APIPromise<EmailRenderCreateResponse> {
    const { projectId, ...body } = params;
    return this._client.post('/emails/v1/render', { query: { projectId }, body, ...options });
  }

  /**
   * Send email with design JSON or HTML content.
   */
  sendCreate(params: EmailSendCreateParams, options?: RequestOptions): APIPromise<EmailSendCreateResponse> {
    const { projectId, ...body } = params;
    return this._client.post('/emails/v1/send', { query: { projectId }, body, ...options });
  }

  /**
   * Send email using an existing template with merge tags.
   */
  sendTemplateTemplate(
    params: EmailSendTemplateTemplateParams,
    options?: RequestOptions,
  ): APIPromise<EmailSendTemplateTemplateResponse> {
    const { projectId, ...body } = params;
    return this._client.post('/emails/v1/send/template', { query: { projectId }, body, ...options });
  }
}

export interface EmailRetrieveResponse {
  data?: EmailRetrieveResponse.Data;
}

export namespace EmailRetrieveResponse {
  export interface Data {
    /**
     * Email message ID
     */
    id?: string;

    /**
     * HTML content of the email (optional)
     */
    html?: string;

    /**
     * When the email was sent
     */
    sentAt?: string;

    /**
     * Current email status
     */
    status?: 'sent' | 'delivered' | 'opened' | 'clicked' | 'bounced' | 'failed';

    /**
     * Email subject line
     */
    subject?: string;

    /**
     * Recipient email address
     */
    to?: string;
  }
}

export interface EmailRenderCreateResponse {
  data?: EmailRenderCreateResponse.Data;
}

export namespace EmailRenderCreateResponse {
  export interface Data {
    /**
     * Rendered HTML content
     */
    html?: string;
  }
}

export interface EmailSendCreateResponse {
  data?: EmailSendCreateResponse.Data;
}

export namespace EmailSendCreateResponse {
  export interface Data {
    /**
     * Unique message identifier
     */
    messageId?: string;

    status?: 'sent' | 'queued' | 'failed';
  }
}

export interface EmailSendTemplateTemplateResponse {
  data?: EmailSendTemplateTemplateResponse.Data;
}

export namespace EmailSendTemplateTemplateResponse {
  export interface Data {
    /**
     * Unique message identifier
     */
    messageId?: string;

    status?: 'sent' | 'queued' | 'failed';
  }
}

export interface EmailRetrieveParams {
  /**
   * The project ID
   */
  projectId: string;
}

export interface EmailRenderCreateParams {
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

export interface EmailSendCreateParams {
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

export interface EmailSendTemplateTemplateParams {
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

export declare namespace Emails {
  export {
    type EmailRetrieveResponse as EmailRetrieveResponse,
    type EmailRenderCreateResponse as EmailRenderCreateResponse,
    type EmailSendCreateResponse as EmailSendCreateResponse,
    type EmailSendTemplateTemplateResponse as EmailSendTemplateTemplateResponse,
    type EmailRetrieveParams as EmailRetrieveParams,
    type EmailRenderCreateParams as EmailRenderCreateParams,
    type EmailSendCreateParams as EmailSendCreateParams,
    type EmailSendTemplateTemplateParams as EmailSendTemplateTemplateParams,
  };
}

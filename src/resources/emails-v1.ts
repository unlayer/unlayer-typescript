// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class EmailsV1 extends APIResource {
  /**
   * Retrieve details of a previously sent email.
   *
   * @example
   * ```ts
   * const response = await client.emailsV1.emailsRetrieve('id');
   * ```
   */
  emailsRetrieve(id: string, options?: RequestOptions): APIPromise<EmailsV1EmailsRetrieveResponse> {
    return this._client.get(path`/emails/v1/emails/${id}`, options);
  }

  /**
   * Convert design JSON to HTML with optional merge tags.
   *
   * @example
   * ```ts
   * const response = await client.emailsV1.renderCreate({
   *   design: { counters: 'bar', body: 'bar' },
   * });
   * ```
   */
  renderCreate(
    body: EmailsV1RenderCreateParams,
    options?: RequestOptions,
  ): APIPromise<EmailsV1RenderCreateResponse> {
    return this._client.post('/emails/v1/render', { body, ...options });
  }

  /**
   * Send email with design JSON or HTML content.
   *
   * @example
   * ```ts
   * const response = await client.emailsV1.sendCreate({
   *   to: 'dev@stainless.com',
   * });
   * ```
   */
  sendCreate(
    body: EmailsV1SendCreateParams,
    options?: RequestOptions,
  ): APIPromise<EmailsV1SendCreateResponse> {
    return this._client.post('/emails/v1/send', { body, ...options });
  }

  /**
   * Send email using an existing template with merge tags.
   *
   * @example
   * ```ts
   * const response = await client.emailsV1.sendTemplateTemplate(
   *   { templateId: 'templateId', to: 'dev@stainless.com' },
   * );
   * ```
   */
  sendTemplateTemplate(
    body: EmailsV1SendTemplateTemplateParams,
    options?: RequestOptions,
  ): APIPromise<EmailsV1SendTemplateTemplateResponse> {
    return this._client.post('/emails/v1/send/template', { body, ...options });
  }
}

export interface EmailsV1EmailsRetrieveResponse {
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

export interface EmailsV1RenderCreateResponse {
  /**
   * Rendered HTML content
   */
  html?: string;
}

export interface EmailsV1SendCreateResponse {
  /**
   * Unique message identifier
   */
  messageId?: string;

  status?: 'sent' | 'queued' | 'failed';
}

export interface EmailsV1SendTemplateTemplateResponse {
  /**
   * Unique message identifier
   */
  messageId?: string;

  status?: 'sent' | 'queued' | 'failed';
}

export interface EmailsV1RenderCreateParams {
  /**
   * Proprietary design format JSON
   */
  design: { [key: string]: unknown };

  /**
   * Optional merge tags for personalization
   */
  mergeTags?: { [key: string]: string };
}

export interface EmailsV1SendCreateParams {
  /**
   * Recipient email address
   */
  to: string;

  /**
   * Proprietary design format JSON
   */
  design?: { [key: string]: unknown };

  /**
   * HTML content to send
   */
  html?: string;

  /**
   * Optional merge tags for personalization
   */
  mergeTags?: { [key: string]: string };

  /**
   * Email subject line
   */
  subject?: string;
}

export interface EmailsV1SendTemplateTemplateParams {
  /**
   * ID of the template to use
   */
  templateId: string;

  /**
   * Recipient email address
   */
  to: string;

  /**
   * Optional merge tags for personalization
   */
  mergeTags?: { [key: string]: string };

  /**
   * Email subject line (optional, uses template default if not provided)
   */
  subject?: string;
}

export declare namespace EmailsV1 {
  export {
    type EmailsV1EmailsRetrieveResponse as EmailsV1EmailsRetrieveResponse,
    type EmailsV1RenderCreateResponse as EmailsV1RenderCreateResponse,
    type EmailsV1SendCreateResponse as EmailsV1SendCreateResponse,
    type EmailsV1SendTemplateTemplateResponse as EmailsV1SendTemplateTemplateResponse,
    type EmailsV1RenderCreateParams as EmailsV1RenderCreateParams,
    type EmailsV1SendCreateParams as EmailsV1SendCreateParams,
    type EmailsV1SendTemplateTemplateParams as EmailsV1SendTemplateTemplateParams,
  };
}

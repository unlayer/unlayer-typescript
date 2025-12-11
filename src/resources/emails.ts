// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Emails extends APIResource {
  /**
   * Retrieve details of a previously sent email.
   *
   * @example
   * ```ts
   * const email = await client.emails.retrieve('id');
   * ```
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<EmailRetrieveResponse> {
    return this._client.get(path`/emails/v1/emails/${id}`, options);
  }

  /**
   * Convert design JSON to HTML with optional merge tags.
   *
   * @example
   * ```ts
   * const response = await client.emails.renderCreate({
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
  renderCreate(
    body: EmailRenderCreateParams,
    options?: RequestOptions,
  ): APIPromise<EmailRenderCreateResponse> {
    return this._client.post('/emails/v1/render', { body, ...options });
  }

  /**
   * Send email with design JSON or HTML content.
   *
   * @example
   * ```ts
   * const response = await client.emails.sendCreate({
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
   *   to: 'test@example.com',
   *   subject: 'Test',
   * });
   * ```
   */
  sendCreate(body: EmailSendCreateParams, options?: RequestOptions): APIPromise<EmailSendCreateResponse> {
    return this._client.post('/emails/v1/send', { body, ...options });
  }

  /**
   * Send email using an existing template with merge tags.
   *
   * @example
   * ```ts
   * const response = await client.emails.sendTemplateTemplate({
   *   templateId: 'templateId',
   *   to: 'dev@stainless.com',
   * });
   * ```
   */
  sendTemplateTemplate(
    body: EmailSendTemplateTemplateParams,
    options?: RequestOptions,
  ): APIPromise<EmailSendTemplateTemplateResponse> {
    return this._client.post('/emails/v1/send/template', { body, ...options });
  }
}

export interface EmailRetrieveResponse {
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

export interface EmailRenderCreateResponse {
  /**
   * Rendered HTML content
   */
  html?: string;
}

export interface EmailSendCreateResponse {
  /**
   * Unique message identifier
   */
  messageId?: string;

  status?: 'sent' | 'queued' | 'failed';
}

export interface EmailSendTemplateTemplateResponse {
  /**
   * Unique message identifier
   */
  messageId?: string;

  status?: 'sent' | 'queued' | 'failed';
}

export interface EmailRenderCreateParams {
  /**
   * Proprietary design format JSON
   */
  design: { [key: string]: unknown };

  /**
   * Optional merge tags for personalization
   */
  mergeTags?: { [key: string]: string };
}

export interface EmailSendCreateParams {
  /**
   * Proprietary design format JSON
   */
  design: { [key: string]: unknown };

  /**
   * Recipient email address
   */
  to: string;

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

export interface EmailSendTemplateTemplateParams {
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

export declare namespace Emails {
  export {
    type EmailRetrieveResponse as EmailRetrieveResponse,
    type EmailRenderCreateResponse as EmailRenderCreateResponse,
    type EmailSendCreateResponse as EmailSendCreateResponse,
    type EmailSendTemplateTemplateResponse as EmailSendTemplateTemplateResponse,
    type EmailRenderCreateParams as EmailRenderCreateParams,
    type EmailSendCreateParams as EmailSendCreateParams,
    type EmailSendTemplateTemplateParams as EmailSendTemplateTemplateParams,
  };
}

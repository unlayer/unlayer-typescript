// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';

/**
 * Send and manage transactional email.
 */
export class Template extends APIResource {
  /**
   * Send a transactional email by rendering a saved template with optional merge
   * variables. The template must have rendered HTML (saved at least once in the
   * editor). The sender domain must be verified in the project workspace; verified
   * sender domains are shared by every Developer Email API project in that
   * workspace.
   */
  create(params: TemplateCreateParams, options?: RequestOptions): APIPromise<TemplateCreateResponse> {
    const { 'idempotency-key': idempotencyKey, ...body } = params;
    return this._client.post('/v3/emails/template', {
      body,
      ...options,
      headers: buildHeaders([
        { ...(idempotencyKey != null ? { 'idempotency-key': idempotencyKey } : undefined) },
        options?.headers,
      ]),
    });
  }
}

/**
 * Email accepted and queued for delivery
 */
export interface TemplateCreateResponse {
  data: TemplateCreateResponse.Data;
}

export namespace TemplateCreateResponse {
  export interface Data {
    /**
     * Unique email ID (UUID). Use this with GET /v3/emails/:id to retrieve delivery
     * status and events.
     */
    id?: string;

    /**
     * When the email was accepted and queued for delivery (ISO-8601).
     */
    createdAt?: string;

    /**
     * The sender address the email was sent from.
     */
    from?: string;

    /**
     * Usually "queued" for a fresh send. An idempotent replay of a previously accepted
     * request returns that email's current status instead. Use webhooks or GET
     * /v3/emails/:id for live delivery status.
     */
    status?: 'queued' | 'sending' | 'sent' | 'delivered' | 'bounced' | 'complained' | 'failed';

    /**
     * The resolved subject line after merge variables were applied.
     */
    subject?: string;

    /**
     * The single accepted recipient address.
     */
    to?: Array<string>;
  }
}

export interface TemplateCreateParams {
  /**
   * Body param: Sender email address or "Name <email>" format. Domain must be
   * verified.
   */
  from: string;

  /**
   * Body param: Template ID to use for the email body
   */
  templateId: string;

  /**
   * Body param: Exactly one recipient. Each request creates one independently
   * tracked delivery.
   */
  to: Array<string>;

  /**
   * Body param: File attachments. Max 10 files per email, max 5 MB total payload
   * size.
   */
  attachments?: Array<TemplateCreateParams.Attachment>;

  /**
   * Body param: BCC is not supported by this endpoint.
   */
  bcc?: Array<unknown>;

  /**
   * Body param: CC is not supported by this endpoint.
   */
  cc?: Array<unknown>;

  /**
   * Body param: Custom email headers. Up to 9 printable-ASCII X-\* headers are
   * allowed. Header names may contain up to 126 characters and each name plus value
   * may contain up to 996 characters.
   */
  headers?: { [key: string]: string };

  /**
   * Body param: Reply-To email address
   */
  replyTo?: string;

  /**
   * Body param: Email subject line. Supports {{variable}} merge syntax. Defaults to
   * template name if omitted.
   */
  subject?: string;

  /**
   * Body param: Key-value tags for categorizing the email (e.g. {"campaign":
   * "welcome"}). Max 10 tags. Keys (1-64 chars) and values (up to 256 chars) may
   * only contain letters, numbers, underscores, and hyphens (the Amazon SES
   * message-tag character set).
   */
  tags?: { [key: string]: string };

  /**
   * Body param: Plain text version of the email. Supports {{variable}} merge syntax.
   */
  text?: string;

  /**
   * Body param: Merge variables to substitute in the template and subject. Use
   * {{key}} syntax in your template.
   */
  variables?: { [key: string]: string };

  /**
   * Header param: Unique key for idempotent sends (max 255 characters). Duplicate
   * requests within 24 hours return the cached response.
   */
  'idempotency-key'?: string;
}

export namespace TemplateCreateParams {
  export interface Attachment {
    /**
     * Base64-encoded file content. Whitespace and MIME line wrapping are removed
     * before validation; invalid base64 is rejected with a 400 error.
     */
    content: string;

    /**
     * MIME type of the attachment. Required; must be one of the allowed types.
     */
    contentType:
      | 'application/pdf'
      | 'application/zip'
      | 'application/json'
      | 'application/xml'
      | 'application/csv'
      | 'application/msword'
      | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      | 'application/vnd.ms-excel'
      | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      | 'application/vnd.ms-powerpoint'
      | 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
      | 'text/plain'
      | 'text/html'
      | 'text/csv'
      | 'text/xml'
      | 'text/calendar'
      | 'image/png'
      | 'image/jpeg'
      | 'image/gif'
      | 'image/webp'
      | 'image/svg+xml'
      | 'audio/mpeg'
      | 'audio/wav'
      | 'video/mp4';

    /**
     * The filename as it will appear to the recipient. Line breaks are rejected;
     * quotes are stripped before it is written into the message.
     */
    filename: string;
  }
}

export declare namespace Template {
  export {
    type TemplateCreateResponse as TemplateCreateResponse,
    type TemplateCreateParams as TemplateCreateParams,
  };
}

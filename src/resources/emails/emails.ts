// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as EventsAPI from './events';
import { EventRetrieveResponse, Events } from './events';
import * as RenderAPI from './render';
import { Render, RenderCreateParams, RenderCreateResponse } from './render';
import * as SettingsAPI from './settings';
import { SettingRetrieveResponse, SettingUpdateParams, SettingUpdateResponse, Settings } from './settings';
import * as StatsAPI from './stats';
import { StatRetrieveParams, StatRetrieveResponse, Stats } from './stats';
import * as SuppressionsAPI from './suppressions';
import {
  SuppressionCreateParams,
  SuppressionCreateResponse,
  SuppressionDeleteParams,
  SuppressionDeleteResponse,
  SuppressionRetrieveParams,
  SuppressionRetrieveResponse,
  Suppressions,
} from './suppressions';
import * as SuppressionsCheckAPI from './suppressions-check';
import {
  SuppressionsCheck,
  SuppressionsCheckRetrieveParams,
  SuppressionsCheckRetrieveResponse,
} from './suppressions-check';
import * as TemplateAPI from './template';
import { Template, TemplateCreateParams, TemplateCreateResponse } from './template';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Send and manage transactional email.
 */
export class Emails extends APIResource {
  events: EventsAPI.Events = new EventsAPI.Events(this._client);
  render: RenderAPI.Render = new RenderAPI.Render(this._client);
  settings: SettingsAPI.Settings = new SettingsAPI.Settings(this._client);
  stats: StatsAPI.Stats = new StatsAPI.Stats(this._client);
  suppressions: SuppressionsAPI.Suppressions = new SuppressionsAPI.Suppressions(this._client);
  suppressionsCheck: SuppressionsCheckAPI.SuppressionsCheck = new SuppressionsCheckAPI.SuppressionsCheck(
    this._client,
  );
  template: TemplateAPI.Template = new TemplateAPI.Template(this._client);

  /**
   * Send a transactional email with raw HTML content. The sender domain must be
   * verified in the project workspace; verified sender domains are shared by every
   * Developer Email API project in that workspace.
   */
  create(params: EmailCreateParams, options?: RequestOptions): APIPromise<EmailCreateResponse> {
    const { 'idempotency-key': idempotencyKey, ...body } = params;
    return this._client.post('/v3/emails', {
      body,
      ...options,
      headers: buildHeaders([
        { ...(idempotencyKey != null ? { 'idempotency-key': idempotencyKey } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Retrieve details of a sent email, including its current delivery status, during
   * the rolling 90-day history window. Expired emails return 404.
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<EmailRetrieveResponse> {
    return this._client.get(path`/v3/emails/${id}`, options);
  }

  /**
   * List emails sent from this project within the rolling 90-day history window.
   * Without a status filter, results and date bounds use acceptance time. With a
   * status filter, results and date bounds use the time each email entered that
   * status.
   */
  list(
    query: EmailListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<EmailListResponse> {
    return this._client.get('/v3/emails', { query, ...options });
  }
}

/**
 * Email accepted and queued for delivery
 */
export interface EmailCreateResponse {
  data: EmailCreateResponse.Data;
}

export namespace EmailCreateResponse {
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
     * The sender address the email was sent from, either a plain email or "Name
     * <email>" format.
     */
    from?: string;

    /**
     * Usually "queued" for a fresh send. An idempotent replay of a previously accepted
     * request returns that email's current status instead. Use webhooks or GET
     * /v3/emails/:id for live delivery status.
     */
    status?: 'queued' | 'sending' | 'sent' | 'delivered' | 'bounced' | 'complained' | 'failed';

    /**
     * The subject line of the email that was sent.
     */
    subject?: string;

    /**
     * The single accepted recipient address.
     */
    to?: Array<string>;
  }
}

export interface EmailRetrieveResponse {
  data: EmailRetrieveResponse.Data;
}

export namespace EmailRetrieveResponse {
  export interface Data {
    id?: string;

    bcc?: Array<string> | null;

    cc?: Array<string> | null;

    createdAt?: string;

    failureReason?: string | null;

    from?: string;

    status?: string;

    subject?: string | null;

    tags?: { [key: string]: string } | null;

    to?: unknown;
  }
}

export interface EmailListResponse {
  data: Array<EmailListResponse.Data>;

  /**
   * Whether there are more results after this page
   */
  has_more: boolean;

  /**
   * Cursor for the next page. Null if no more results.
   */
  next_cursor?: string | null;
}

export namespace EmailListResponse {
  export interface Data {
    id?: string;

    createdAt?: string;

    from?: string;

    status?: string;

    /**
     * When the email entered its current status. For a newly queued email, this equals
     * createdAt.
     */
    statusUpdatedAt?: string;

    subject?: string | null;

    to?: unknown;
  }
}

export interface EmailCreateParams {
  /**
   * Body param: Sender email address or "Name <email>" format. Domain must be
   * verified.
   */
  from: string;

  /**
   * Body param: HTML content of the email
   */
  html: string;

  /**
   * Body param: Email subject line
   */
  subject: string;

  /**
   * Body param: Exactly one recipient. Each request creates one independently
   * tracked delivery.
   */
  to: Array<string>;

  /**
   * Body param: File attachments. Max 10 files per email, max 5 MB total payload
   * size (including headers and base64 overhead).
   */
  attachments?: Array<EmailCreateParams.Attachment>;

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
   * allowed (e.g. {"X-Entity-Ref-ID": "abc123"}). Header names may contain up to 126
   * characters and each name plus value may contain up to 996 characters.
   */
  headers?: { [key: string]: string };

  /**
   * Body param: Reply-To email address
   */
  replyTo?: string;

  /**
   * Body param: Key-value tags for categorizing the email (e.g. {"campaign":
   * "welcome"}). Max 10 tags. Keys (1-64 chars) and values (up to 256 chars) may
   * only contain letters, numbers, underscores, and hyphens (the Amazon SES
   * message-tag character set).
   */
  tags?: { [key: string]: string };

  /**
   * Body param: Plain text version of the email. If provided, a
   * multipart/alternative message is sent.
   */
  text?: string;

  /**
   * Header param: Unique key for idempotent sends (max 255 characters). If provided,
   * duplicate requests within 24 hours return the cached response.
   */
  'idempotency-key'?: string;
}

export namespace EmailCreateParams {
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

export interface EmailListParams {
  /**
   * Pagination cursor from previous response
   */
  cursor?: string;

  /**
   * Start date (ISO date). Bounds acceptance time normally, or status transition
   * time when status is supplied.
   */
  from?: string;

  /**
   * Number of emails to return (1-100)
   */
  limit?: number;

  /**
   * Project ID (auto-resolved for API key auth)
   */
  projectId?: string;

  /**
   * Search recipient addresses and subjects by case-sensitive substring
   */
  search?: string;

  /**
   * Filter by email delivery status
   */
  status?: 'queued' | 'sending' | 'sent' | 'delivered' | 'bounced' | 'complained' | 'failed';

  /**
   * Filter by tag in "key=value" format (e.g. "campaign=welcome")
   */
  tag?: string;

  /**
   * End date (ISO date). Bounds acceptance time normally, or status transition time
   * when status is supplied.
   */
  to?: string;
}

Emails.Events = Events;
Emails.Render = Render;
Emails.Settings = Settings;
Emails.Stats = Stats;
Emails.Suppressions = Suppressions;
Emails.SuppressionsCheck = SuppressionsCheck;
Emails.Template = Template;

export declare namespace Emails {
  export {
    type EmailCreateResponse as EmailCreateResponse,
    type EmailRetrieveResponse as EmailRetrieveResponse,
    type EmailListResponse as EmailListResponse,
    type EmailCreateParams as EmailCreateParams,
    type EmailListParams as EmailListParams,
  };

  export { Events as Events, type EventRetrieveResponse as EventRetrieveResponse };

  export {
    Render as Render,
    type RenderCreateResponse as RenderCreateResponse,
    type RenderCreateParams as RenderCreateParams,
  };

  export {
    Settings as Settings,
    type SettingRetrieveResponse as SettingRetrieveResponse,
    type SettingUpdateResponse as SettingUpdateResponse,
    type SettingUpdateParams as SettingUpdateParams,
  };

  export {
    Stats as Stats,
    type StatRetrieveResponse as StatRetrieveResponse,
    type StatRetrieveParams as StatRetrieveParams,
  };

  export {
    Suppressions as Suppressions,
    type SuppressionCreateResponse as SuppressionCreateResponse,
    type SuppressionRetrieveResponse as SuppressionRetrieveResponse,
    type SuppressionDeleteResponse as SuppressionDeleteResponse,
    type SuppressionCreateParams as SuppressionCreateParams,
    type SuppressionRetrieveParams as SuppressionRetrieveParams,
    type SuppressionDeleteParams as SuppressionDeleteParams,
  };

  export {
    SuppressionsCheck as SuppressionsCheck,
    type SuppressionsCheckRetrieveResponse as SuppressionsCheckRetrieveResponse,
    type SuppressionsCheckRetrieveParams as SuppressionsCheckRetrieveParams,
  };

  export {
    Template as Template,
    type TemplateCreateResponse as TemplateCreateResponse,
    type TemplateCreateParams as TemplateCreateParams,
  };
}

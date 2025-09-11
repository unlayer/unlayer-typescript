// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';

export class Send extends APIResource {
  /**
   * Send email with design JSON or HTML content.
   */
  send(body: SendSendParams, options?: RequestOptions): APIPromise<SendSendResponse> {
    return this._client.post('/emails/v1/send/', { body, ...options });
  }

  /**
   * Send email using an existing template with merge tags.
   */
  sendFromTemplate(
    body: SendSendFromTemplateParams,
    options?: RequestOptions,
  ): APIPromise<SendSendFromTemplateResponse> {
    return this._client.post('/emails/v1/send/template/', { body, ...options });
  }
}

export interface SendSendResponse {
  /**
   * Unique message identifier
   */
  messageId?: string;

  status?: 'sent' | 'queued' | 'failed';
}

export interface SendSendFromTemplateResponse {
  /**
   * Unique message identifier
   */
  messageId?: string;

  status?: 'sent' | 'queued' | 'failed';
}

export interface SendSendParams {
  /**
   * Recipient email address
   */
  to: string;

  /**
   * Proprietary design format JSON
   */
  design?: unknown;

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

export interface SendSendFromTemplateParams {
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

export declare namespace Send {
  export {
    type SendSendResponse as SendSendResponse,
    type SendSendFromTemplateResponse as SendSendFromTemplateResponse,
    type SendSendParams as SendSendParams,
    type SendSendFromTemplateParams as SendSendFromTemplateParams,
  };
}

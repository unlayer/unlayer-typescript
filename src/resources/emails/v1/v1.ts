// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as SendAPI from './send';
import {
  Send,
  SendSendFromTemplateParams,
  SendSendFromTemplateResponse,
  SendSendParams,
  SendSendResponse,
} from './send';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class V1 extends APIResource {
  send: SendAPI.Send = new SendAPI.Send(this._client);

  /**
   * Retrieve details of a previously sent email.
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<V1RetrieveResponse> {
    return this._client.get(path`/emails/v1/emails/${id}/`, options);
  }

  /**
   * Convert design JSON to HTML with optional merge tags.
   */
  render(body: V1RenderParams, options?: RequestOptions): APIPromise<V1RenderResponse> {
    return this._client.post('/emails/v1/render/', { body, ...options });
  }
}

export interface V1RetrieveResponse {
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

export interface V1RenderResponse {
  /**
   * Rendered HTML content
   */
  html?: string;
}

export interface V1RenderParams {
  /**
   * Proprietary design format JSON
   */
  design: unknown;

  /**
   * Optional merge tags for personalization
   */
  mergeTags?: { [key: string]: string };
}

V1.Send = Send;

export declare namespace V1 {
  export {
    type V1RetrieveResponse as V1RetrieveResponse,
    type V1RenderResponse as V1RenderResponse,
    type V1RenderParams as V1RenderParams,
  };

  export {
    Send as Send,
    type SendSendResponse as SendSendResponse,
    type SendSendFromTemplateResponse as SendSendFromTemplateResponse,
    type SendSendParams as SendSendParams,
    type SendSendFromTemplateParams as SendSendFromTemplateParams,
  };
}

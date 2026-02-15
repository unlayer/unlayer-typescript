// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as RenderAPI from './render';
import { Render, RenderCreateParams, RenderCreateResponse } from './render';
import * as SendAPI from './send';
import { Send, SendCreateParams, SendCreateResponse } from './send';
import * as SendTemplateAPI from './send-template';
import { SendTemplate, SendTemplateCreateParams, SendTemplateCreateResponse } from './send-template';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Emails extends APIResource {
  render: RenderAPI.Render = new RenderAPI.Render(this._client);
  send: SendAPI.Send = new SendAPI.Send(this._client);
  sendTemplate: SendTemplateAPI.SendTemplate = new SendTemplateAPI.SendTemplate(this._client);

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

export interface EmailRetrieveParams {
  /**
   * The project ID
   */
  projectId: string;
}

Emails.Render = Render;
Emails.Send = Send;
Emails.SendTemplate = SendTemplate;

export declare namespace Emails {
  export {
    type EmailRetrieveResponse as EmailRetrieveResponse,
    type EmailRetrieveParams as EmailRetrieveParams,
  };

  export {
    Render as Render,
    type RenderCreateResponse as RenderCreateResponse,
    type RenderCreateParams as RenderCreateParams,
  };

  export {
    Send as Send,
    type SendCreateResponse as SendCreateResponse,
    type SendCreateParams as SendCreateParams,
  };

  export {
    SendTemplate as SendTemplate,
    type SendTemplateCreateResponse as SendTemplateCreateResponse,
    type SendTemplateCreateParams as SendTemplateCreateParams,
  };
}

// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as RotateSecretAPI from './rotate-secret';
import { RotateSecret, RotateSecretCreateResponse } from './rotate-secret';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Webhooks extends APIResource {
  rotateSecret: RotateSecretAPI.RotateSecret = new RotateSecretAPI.RotateSecret(this._client);

  /**
   * Create a new webhook endpoint. A signing secret is auto-generated and returned
   * once. Use it to verify webhook signatures.
   */
  create(body: WebhookCreateParams, options?: RequestOptions): APIPromise<WebhookCreateResponse> {
    return this._client.post('/v3/webhooks', { body, ...options });
  }

  /**
   * Get details of a specific webhook endpoint.
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<WebhookRetrieveResponse> {
    return this._client.get(path`/v3/webhooks/${id}`, options);
  }

  /**
   * Update a webhook endpoint URL, events, or active status.
   */
  update(
    id: string,
    body: WebhookUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<WebhookUpdateResponse> {
    return this._client.patch(path`/v3/webhooks/${id}`, { body, ...options });
  }

  /**
   * List all webhook endpoints configured for a project.
   */
  list(options?: RequestOptions): APIPromise<WebhookListResponse> {
    return this._client.get('/v3/webhooks', options);
  }

  /**
   * Delete a webhook endpoint. It will no longer receive events.
   */
  delete(id: string, options?: RequestOptions): APIPromise<WebhookDeleteResponse> {
    return this._client.delete(path`/v3/webhooks/${id}`, options);
  }
}

export interface WebhookCreateResponse {
  data: WebhookCreateResponse.Data;
}

export namespace WebhookCreateResponse {
  export interface Data {
    /**
     * Webhook ID
     */
    id?: number;

    /**
     * Whether the webhook is actively receiving events
     */
    active?: boolean;

    /**
     * When the webhook was created
     */
    createdAt?: string;

    /**
     * Event types this webhook is subscribed to
     */
    events?: Array<'email.sent' | 'email.delivered' | 'email.bounced' | 'email.complained'>;

    /**
     * Signing secret — only returned on creation. Store it securely; you will not be
     * able to retrieve it again.
     */
    secret?: string;

    /**
     * The HTTPS URL receiving webhook events
     */
    url?: string;
  }
}

export interface WebhookRetrieveResponse {
  data: WebhookRetrieveResponse.Data;
}

export namespace WebhookRetrieveResponse {
  export interface Data {
    /**
     * Webhook ID
     */
    id?: number;

    /**
     * Whether the webhook is actively receiving events
     */
    active?: boolean;

    /**
     * When the webhook was created
     */
    createdAt?: string;

    /**
     * Event types this webhook is subscribed to
     */
    events?: Array<'email.sent' | 'email.delivered' | 'email.bounced' | 'email.complained'>;

    /**
     * When the webhook was last updated
     */
    updatedAt?: string;

    /**
     * The HTTPS URL receiving webhook events
     */
    url?: string;
  }
}

export interface WebhookUpdateResponse {
  data: WebhookUpdateResponse.Data;
}

export namespace WebhookUpdateResponse {
  export interface Data {
    /**
     * Webhook ID
     */
    id?: number;

    /**
     * Whether the webhook is actively receiving events
     */
    active?: boolean;

    /**
     * Event types this webhook is subscribed to
     */
    events?: Array<'email.sent' | 'email.delivered' | 'email.bounced' | 'email.complained'>;

    /**
     * When the webhook was last updated
     */
    updatedAt?: string;

    /**
     * The HTTPS URL receiving webhook events
     */
    url?: string;
  }
}

export interface WebhookListResponse {
  data: Array<WebhookListResponse.Data>;
}

export namespace WebhookListResponse {
  export interface Data {
    /**
     * Webhook ID
     */
    id?: number;

    /**
     * Whether the webhook is actively receiving events
     */
    active?: boolean;

    /**
     * When the webhook was created
     */
    createdAt?: string;

    /**
     * Event types this webhook is subscribed to
     */
    events?: Array<'email.sent' | 'email.delivered' | 'email.bounced' | 'email.complained'>;

    /**
     * The HTTPS URL receiving webhook events
     */
    url?: string;
  }
}

export interface WebhookDeleteResponse {
  data?: WebhookDeleteResponse.Data;
}

export namespace WebhookDeleteResponse {
  export interface Data {
    success?: boolean;
  }
}

export interface WebhookCreateParams {
  /**
   * The HTTPS URL to receive webhook events
   */
  url: string;

  /**
   * Whether the webhook is active
   */
  active?: boolean;

  /**
   * Event types to subscribe to. If omitted or empty, all events are sent.
   */
  events?: Array<'email.sent' | 'email.delivered' | 'email.bounced' | 'email.complained'>;
}

export interface WebhookUpdateParams {
  /**
   * Whether the webhook is actively receiving events
   */
  active?: boolean;

  /**
   * Event types to subscribe to. If omitted or empty, all events are sent.
   */
  events?: Array<'email.sent' | 'email.delivered' | 'email.bounced' | 'email.complained'>;

  /**
   * The HTTPS URL to receive webhook events
   */
  url?: string;
}

Webhooks.RotateSecret = RotateSecret;

export declare namespace Webhooks {
  export {
    type WebhookCreateResponse as WebhookCreateResponse,
    type WebhookRetrieveResponse as WebhookRetrieveResponse,
    type WebhookUpdateResponse as WebhookUpdateResponse,
    type WebhookListResponse as WebhookListResponse,
    type WebhookDeleteResponse as WebhookDeleteResponse,
    type WebhookCreateParams as WebhookCreateParams,
    type WebhookUpdateParams as WebhookUpdateParams,
  };

  export { RotateSecret as RotateSecret, type RotateSecretCreateResponse as RotateSecretCreateResponse };
}

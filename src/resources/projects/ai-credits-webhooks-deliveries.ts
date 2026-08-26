// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * AI credit balance, usage breakdown, and webhook/alert settings. Credits are pooled per workspace; settings are per project.
 */
export class AICreditsWebhooksDeliveries extends APIResource {
  /**
   * Returns the webhook delivery history for the project, newest first — the event,
   * delivery status, attempt count, and last response code for each. Use it to spot
   * failed deliveries and drive the retry endpoint. Payloads expose credits only.
   */
  retrieve(
    id: string,
    query: AICreditsWebhooksDeliveryRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<AICreditsWebhooksDeliveryRetrieveResponse> {
    return this._client.get(path`/v3/projects/${id}/ai-credits/webhooks/deliveries`, { query, ...options });
  }
}

export interface AICreditsWebhooksDeliveryRetrieveResponse {
  deliveries: Array<AICreditsWebhooksDeliveryRetrieveResponse.Delivery>;

  /**
   * Total deliveries matching the filter (ignores limit/offset).
   */
  total: number;
}

export namespace AICreditsWebhooksDeliveryRetrieveResponse {
  export interface Delivery {
    id: string;

    attempts: number;

    created_at: string;

    delivered_at: string | null;

    end_user_id: string | null;

    event: 'ai.credits.usage_recorded' | 'ai.credits.threshold_reached' | 'ai.credits.exhausted';

    last_status_code: number | null;

    payload: { [key: string]: unknown };

    status: 'pending' | 'delivered' | 'failed';
  }
}

export interface AICreditsWebhooksDeliveryRetrieveParams {
  /**
   * Filter to a single event type.
   */
  event?: 'ai.credits.usage_recorded' | 'ai.credits.threshold_reached' | 'ai.credits.exhausted';

  /**
   * Max deliveries to return (1-100).
   */
  limit?: number;

  /**
   * Number of deliveries to skip (pagination).
   */
  offset?: number;

  /**
   * Filter to a single delivery status.
   */
  status?: 'pending' | 'delivered' | 'failed';
}

export declare namespace AICreditsWebhooksDeliveries {
  export {
    type AICreditsWebhooksDeliveryRetrieveResponse as AICreditsWebhooksDeliveryRetrieveResponse,
    type AICreditsWebhooksDeliveryRetrieveParams as AICreditsWebhooksDeliveryRetrieveParams,
  };
}

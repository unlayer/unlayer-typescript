// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * AI credit balance, usage breakdown, and webhook/alert settings. Credits are pooled per workspace; settings are per project.
 */
export class AICreditsWebhooksDeliveriesattempts extends APIResource {
  /**
   * Returns the per-attempt history for a single delivery, newest attempt first —
   * the response code, error, and time of each POST (including automatic retries).
   * Returns 404 if the delivery is not found for this project.
   */
  retrieve(
    deliveryID: string,
    params: AICreditsWebhooksDeliveriesattemptRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<AICreditsWebhooksDeliveriesattemptRetrieveResponse> {
    const { id, ...query } = params;
    return this._client.get(path`/v3/projects/${id}/ai-credits/webhooks/deliveries/${deliveryID}/attempts`, {
      query,
      ...options,
    });
  }
}

export interface AICreditsWebhooksDeliveriesattemptRetrieveResponse {
  attempts?: Array<AICreditsWebhooksDeliveriesattemptRetrieveResponse.Attempt>;

  /**
   * Total attempts for the delivery (ignores limit/offset).
   */
  total?: number;
}

export namespace AICreditsWebhooksDeliveriesattemptRetrieveResponse {
  export interface Attempt {
    attempt?: number;

    attempted_at?: string;

    error?: string | null;

    status_code?: number | null;
  }
}

export interface AICreditsWebhooksDeliveriesattemptRetrieveParams {
  /**
   * Path param: The project ID
   */
  id: string;

  /**
   * Query param: Max attempts to return (1-100).
   */
  limit?: number;

  /**
   * Query param: Number of attempts to skip (pagination).
   */
  offset?: number;
}

export declare namespace AICreditsWebhooksDeliveriesattempts {
  export {
    type AICreditsWebhooksDeliveriesattemptRetrieveResponse as AICreditsWebhooksDeliveriesattemptRetrieveResponse,
    type AICreditsWebhooksDeliveriesattemptRetrieveParams as AICreditsWebhooksDeliveriesattemptRetrieveParams,
  };
}

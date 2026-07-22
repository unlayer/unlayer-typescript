// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * AI credit balance, usage breakdown, and webhook/alert settings. Credits are pooled per workspace; settings are per project.
 */
export class AICreditsWebhooksDeliveriesretry extends APIResource {
  /**
   * Re-queues a single previously-failed (or pending) webhook delivery for another
   * attempt. Returns 404 if the delivery is not found for this project, and 409 if
   * it was already delivered.
   */
  create(
    deliveryID: string,
    params: AICreditsWebhooksDeliveriesretryCreateParams,
    options?: RequestOptions,
  ): APIPromise<AICreditsWebhooksDeliveriesretryCreateResponse> {
    const { id } = params;
    return this._client.post(
      path`/v3/projects/${id}/ai-credits/webhooks/deliveries/${deliveryID}/retry`,
      options,
    );
  }
}

export interface AICreditsWebhooksDeliveriesretryCreateResponse {
  status?: 'requeued';
}

export interface AICreditsWebhooksDeliveriesretryCreateParams {
  /**
   * The project ID
   */
  id: string;
}

export declare namespace AICreditsWebhooksDeliveriesretry {
  export {
    type AICreditsWebhooksDeliveriesretryCreateResponse as AICreditsWebhooksDeliveriesretryCreateResponse,
    type AICreditsWebhooksDeliveriesretryCreateParams as AICreditsWebhooksDeliveriesretryCreateParams,
  };
}

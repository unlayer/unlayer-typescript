// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * AI credit balance, usage breakdown, and webhook/alert settings. Credits are pooled per workspace; settings are per project.
 */
export class AICredits extends APIResource {
  /**
   * Returns the current AI credit balance for the project. Credits are pooled per
   * workspace — every project in a workspace shares one balance. Only credit counts
   * are returned; token counts, model names, and costs are never exposed.
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<AICreditRetrieveResponse> {
    return this._client.get(path`/v3/projects/${id}/ai-credits`, options);
  }
}

export interface AICreditRetrieveResponse {
  /**
   * AI credits remaining in the current period.
   */
  credits_remaining?: number;

  /**
   * Total AI credits available for the current period.
   */
  credits_total?: number;

  /**
   * AI credits consumed so far in the current period.
   */
  credits_used?: number;

  /**
   * When the current credit period resets, or null if there is no active billing
   * period — including once a subscription is cancelled or its term has ended.
   */
  reset_date?: string | null;
}

export declare namespace AICredits {
  export { type AICreditRetrieveResponse as AICreditRetrieveResponse };
}

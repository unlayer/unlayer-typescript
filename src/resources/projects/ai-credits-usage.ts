// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * AI credit balance, usage breakdown, and webhook/alert settings. Credits are pooled per workspace; settings are per project.
 */
export class AICreditsUsage extends APIResource {
  /**
   * Returns AI credit consumption for the project, broken down by end user and
   * feature type. Filterable by date range, end user, and feature type. Usage is
   * updated near real time and grouped by the UTC date when the AI activity
   * occurred. Recent activity may take a short time to appear. Defaults to the
   * current billing period. Only credit counts are returned; token counts, model
   * names, and costs are never exposed. Per-end-user attribution requires the
   * partner to pass `endUserId` on editor initialization.
   */
  retrieve(
    id: string,
    query: AICreditsUsageRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<AICreditsUsageRetrieveResponse> {
    return this._client.get(path`/v3/projects/${id}/ai-credits/usage`, { query, ...options });
  }
}

export interface AICreditsUsageRetrieveResponse {
  breakdown: Array<AICreditsUsageRetrieveResponse.Breakdown>;

  /**
   * Number of breakdown rows matching the filter (ignores paging).
   */
  total: number;

  /**
   * Total AI credits used across the full filtered range (not just the returned
   * page).
   */
  total_credits_used: number;
}

export namespace AICreditsUsageRetrieveResponse {
  export interface Breakdown {
    /**
     * AI credits used by this end user and feature type.
     */
    credits: number;

    /**
     * The end user id, or null for unattributed usage.
     */
    end_user_id: string | null;

    /**
     * The partner-facing feature type.
     */
    feature_type: 'full_template_gen' | 'block_edit' | 'html_import' | 'image_import' | 'image_generation';
  }
}

export interface AICreditsUsageRetrieveParams {
  /**
   * End date (inclusive), YYYY-MM-DD.
   */
  end?: string;

  /**
   * Filter to a single end user id.
   */
  end_user_id?: string;

  /**
   * Filter to a single feature type.
   */
  feature_type?: 'full_template_gen' | 'block_edit' | 'html_import' | 'image_import' | 'image_generation';

  /**
   * Max breakdown rows to return (1-1000).
   */
  limit?: number;

  /**
   * Number of breakdown rows to skip (pagination).
   */
  offset?: number;

  /**
   * Sort direction. Defaults to desc (highest credits first).
   */
  order?: 'asc' | 'desc';

  /**
   * Field the breakdown is ordered by. Defaults to credits.
   */
  sort?: 'credits' | 'end_user_id' | 'feature_type';

  /**
   * Start date (inclusive), YYYY-MM-DD.
   */
  start?: string;
}

export declare namespace AICreditsUsage {
  export {
    type AICreditsUsageRetrieveResponse as AICreditsUsageRetrieveResponse,
    type AICreditsUsageRetrieveParams as AICreditsUsageRetrieveParams,
  };
}

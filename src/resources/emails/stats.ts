// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

/**
 * Send and manage transactional email.
 */
export class Stats extends APIResource {
  /**
   * Get aggregated email delivery statistics for a project. Returns totals or daily
   * breakdown for the specified period. Statistics are asynchronous and may lag by
   * about one hour.
   */
  retrieve(
    query: StatRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<StatRetrieveResponse> {
    return this._client.get('/v3/emails/stats', { query, ...options });
  }
}

/**
 * Email statistics. Shape depends on the `groupBy` query parameter: an aggregated
 * totals object by default, or a daily breakdown array when groupBy=day.
 */
export interface StatRetrieveResponse {
  /**
   * Aggregated totals for the requested period (default response).
   */
  data: StatRetrieveResponse.UnionMember0 | Array<StatRetrieveResponse.UnionMember1>;
}

export namespace StatRetrieveResponse {
  /**
   * Aggregated totals for the requested period (default response).
   */
  export interface UnionMember0 {
    /**
     * Number of emails that were bounced by the recipient mail server.
     */
    bounced?: number;

    /**
     * Bounced / sent as a percentage (0-100, 2 decimal places).
     */
    bounceRate?: number;

    /**
     * Number of spam complaint events received.
     */
    complained?: number;

    /**
     * Number of successfully delivered emails.
     */
    delivered?: number;

    /**
     * Delivered / sent as a percentage (0-100, 2 decimal places).
     */
    deliveryRate?: number;

    /**
     * The period these stats cover.
     */
    period?: '7d' | '30d' | '90d';

    /**
     * Total emails sent (one per recipient).
     */
    sent?: number;
  }

  export interface UnionMember1 {
    /**
     * Emails bounced on this day.
     */
    bounced?: number;

    /**
     * Spam complaints received for this send cohort.
     */
    complained?: number;

    /**
     * The email send-cohort day in YYYY-MM-DD format.
     */
    date?: string;

    /**
     * Emails from this send cohort that were delivered.
     */
    delivered?: number;

    /**
     * Emails sent on this day.
     */
    sent?: number;
  }
}

export interface StatRetrieveParams {
  /**
   * Group results by day for chart data
   */
  groupBy?: 'day';

  /**
   * Time period for stats
   */
  period?: '7d' | '30d' | '90d';

  /**
   * Project ID (auto-resolved for API key auth)
   */
  projectId?: string;
}

export declare namespace Stats {
  export { type StatRetrieveResponse as StatRetrieveResponse, type StatRetrieveParams as StatRetrieveParams };
}

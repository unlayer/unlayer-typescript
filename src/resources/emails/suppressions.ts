// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

/**
 * Send and manage transactional email.
 */
export class Suppressions extends APIResource {
  /**
   * Manually add an email address to the suppression list. Future sends to this
   * address will be blocked.
   */
  create(body: SuppressionCreateParams, options?: RequestOptions): APIPromise<SuppressionCreateResponse> {
    return this._client.post('/v3/emails/suppressions', { body, ...options });
  }

  /**
   * List all email addresses suppressed for this project due to bounces, complaints,
   * or manual suppression. Cursor-paginated.
   */
  retrieve(
    query: SuppressionRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SuppressionRetrieveResponse> {
    return this._client.get('/v3/emails/suppressions', { query, ...options });
  }

  /**
   * Remove an email address from the suppression list so it can receive emails
   * again.
   */
  delete(params: SuppressionDeleteParams, options?: RequestOptions): APIPromise<SuppressionDeleteResponse> {
    const { email, projectId } = params;
    return this._client.delete('/v3/emails/suppressions', { query: { email, projectId }, ...options });
  }
}

export interface SuppressionCreateResponse {
  data: SuppressionCreateResponse.Data;
}

export namespace SuppressionCreateResponse {
  export interface Data {
    createdAt?: string;

    email?: string;

    reason?: string;
  }
}

export interface SuppressionRetrieveResponse {
  data: Array<SuppressionRetrieveResponse.Data>;

  has_more: boolean;

  next_cursor?: string | null;
}

export namespace SuppressionRetrieveResponse {
  export interface Data {
    createdAt?: string;

    email?: string;

    reason?: 'hard_bounce' | 'complaint' | 'manual' | 'unsubscribe';
  }
}

export interface SuppressionDeleteResponse {
  data: SuppressionDeleteResponse.Data;
}

export namespace SuppressionDeleteResponse {
  export interface Data {
    email?: string;

    removed?: boolean;
  }
}

export interface SuppressionCreateParams {
  /**
   * Email address to suppress
   */
  email: string;
}

export interface SuppressionRetrieveParams {
  /**
   * Pagination cursor from a previous response. Omit to start from the beginning.
   */
  cursor?: string;

  /**
   * Max number of results (1-200)
   */
  limit?: number;

  /**
   * Project ID (auto-resolved for API key auth)
   */
  projectId?: string;
}

export interface SuppressionDeleteParams {
  /**
   * Email address to unsuppress
   */
  email: string;

  /**
   * Project ID (auto-resolved for API key auth)
   */
  projectId?: string;
}

export declare namespace Suppressions {
  export {
    type SuppressionCreateResponse as SuppressionCreateResponse,
    type SuppressionRetrieveResponse as SuppressionRetrieveResponse,
    type SuppressionDeleteResponse as SuppressionDeleteResponse,
    type SuppressionCreateParams as SuppressionCreateParams,
    type SuppressionRetrieveParams as SuppressionRetrieveParams,
    type SuppressionDeleteParams as SuppressionDeleteParams,
  };
}

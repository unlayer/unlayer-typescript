// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

/**
 * Send and manage transactional email.
 */
export class SuppressionsCheck extends APIResource {
  /**
   * Look up a specific email address to see if it is currently on the suppression
   * list.
   */
  retrieve(
    query: SuppressionsCheckRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<SuppressionsCheckRetrieveResponse> {
    return this._client.get('/v3/emails/suppressions/check', { query, ...options });
  }
}

export interface SuppressionsCheckRetrieveResponse {
  data: SuppressionsCheckRetrieveResponse.Data;
}

export namespace SuppressionsCheckRetrieveResponse {
  export interface Data {
    email?: string;

    suppressed?: boolean;
  }
}

export interface SuppressionsCheckRetrieveParams {
  /**
   * Email address to check
   */
  email: string;

  /**
   * Project ID (auto-resolved for API key auth)
   */
  projectId?: string;
}

export declare namespace SuppressionsCheck {
  export {
    type SuppressionsCheckRetrieveResponse as SuppressionsCheckRetrieveResponse,
    type SuppressionsCheckRetrieveParams as SuppressionsCheckRetrieveParams,
  };
}

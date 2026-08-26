// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

/**
 * Current user and token context.
 */
export class Subscription extends APIResource {
  /**
   * Get the current plan, feature availability, and limits for a project. Used to
   * answer "can I do X" / "what plan do I need" questions with ground-truth data
   * instead of guessing.
   */
  retrieve(
    query: SubscriptionRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SubscriptionRetrieveResponse> {
    return this._client.get('/v3/me/subscription', { query, ...options });
  }
}

export interface SubscriptionRetrieveResponse {
  data?: SubscriptionRetrieveResponse.Data;
}

export namespace SubscriptionRetrieveResponse {
  export interface Data {
    expiresAt?: string | null;

    features?: Array<Data.Feature>;

    limits?: Array<Data.Limit>;

    planName?: string | null;

    status?: string | null;
  }

  export namespace Data {
    export interface Feature {
      available?: boolean;

      name?: string;
    }

    export interface Limit {
      name?: string;

      unit?: string;

      value?: number;
    }
  }
}

export interface SubscriptionRetrieveParams {
  /**
   * The project ID (required for PAT auth, auto-resolved for API key auth)
   */
  projectId?: string;
}

export declare namespace Subscription {
  export {
    type SubscriptionRetrieveResponse as SubscriptionRetrieveResponse,
    type SubscriptionRetrieveParams as SubscriptionRetrieveParams,
  };
}

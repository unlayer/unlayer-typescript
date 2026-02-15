// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class FullToSimple extends APIResource {
  /**
   * Convert design json from Full to Simple schema.
   */
  create(body: FullToSimpleCreateParams, options?: RequestOptions): APIPromise<FullToSimpleCreateResponse> {
    return this._client.post('/v3/convert/full-to-simple', { body, ...options });
  }
}

export interface FullToSimpleCreateResponse {
  data?: FullToSimpleCreateResponse.Data;

  success?: true;
}

export namespace FullToSimpleCreateResponse {
  export interface Data {
    design?: { [key: string]: unknown };
  }
}

export interface FullToSimpleCreateParams {
  design: FullToSimpleCreateParams.Design;

  displayMode?: 'email' | 'web' | 'popup' | 'document';

  /**
   * When true, includes \_conversion metadata in the response. This metadata can be
   * passed to simple-to-full to restore original values without data loss.
   */
  includeConversion?: boolean;

  includeDefaultValues?: boolean;
}

export namespace FullToSimpleCreateParams {
  export interface Design {
    body: { [key: string]: unknown };

    counters?: { [key: string]: unknown };

    schemaVersion?: number;

    [k: string]: unknown;
  }
}

export declare namespace FullToSimple {
  export {
    type FullToSimpleCreateResponse as FullToSimpleCreateResponse,
    type FullToSimpleCreateParams as FullToSimpleCreateParams,
  };
}

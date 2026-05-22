// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

/**
 * Template management — list, retrieve, generate, import, export, and convert designs.
 */
export class ConvertFullToSimple extends APIResource {
  /**
   * Convert design json from Full to Simple schema.
   */
  create(
    body: ConvertFullToSimpleCreateParams,
    options?: RequestOptions,
  ): APIPromise<ConvertFullToSimpleCreateResponse> {
    return this._client.post('/v3/templates/convert/full-to-simple', { body, ...options });
  }
}

export interface ConvertFullToSimpleCreateResponse {
  data?: ConvertFullToSimpleCreateResponse.Data;

  success?: true;
}

export namespace ConvertFullToSimpleCreateResponse {
  export interface Data {
    design?: { [key: string]: unknown };
  }
}

export interface ConvertFullToSimpleCreateParams {
  design: ConvertFullToSimpleCreateParams.Design;

  displayMode?: 'email' | 'web' | 'popup' | 'document';

  /**
   * When true, includes \_conversion metadata in the response. This metadata can be
   * passed to simple-to-full to restore original values without data loss.
   */
  includeConversion?: boolean;

  includeDefaultValues?: boolean;
}

export namespace ConvertFullToSimpleCreateParams {
  export interface Design {
    body: { [key: string]: unknown };

    counters?: { [key: string]: unknown };

    schemaVersion?: number;

    [k: string]: unknown;
  }
}

export declare namespace ConvertFullToSimple {
  export {
    type ConvertFullToSimpleCreateResponse as ConvertFullToSimpleCreateResponse,
    type ConvertFullToSimpleCreateParams as ConvertFullToSimpleCreateParams,
  };
}

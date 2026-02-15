// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class SimpleToFull extends APIResource {
  /**
   * Convert design json from Simple to Full schema.
   */
  create(body: SimpleToFullCreateParams, options?: RequestOptions): APIPromise<SimpleToFullCreateResponse> {
    return this._client.post('/convert/simple-to-full', { body, ...options });
  }
}

export interface SimpleToFullCreateResponse {
  data?: SimpleToFullCreateResponse.Data;

  success?: true;
}

export namespace SimpleToFullCreateResponse {
  export interface Data {
    design?: { [key: string]: unknown };
  }
}

export interface SimpleToFullCreateParams {
  design: SimpleToFullCreateParams.Design;

  displayMode?: 'email' | 'web' | 'popup' | 'document';

  includeDefaultValues?: boolean;
}

export namespace SimpleToFullCreateParams {
  export interface Design {
    body: unknown;

    _conversion?: Design._Conversion;

    counters?: unknown;

    schemaVersion?: number;

    [k: string]: unknown;
  }

  export namespace Design {
    export interface _Conversion {
      data?: string;

      version?: number;
    }
  }
}

export declare namespace SimpleToFull {
  export {
    type SimpleToFullCreateResponse as SimpleToFullCreateResponse,
    type SimpleToFullCreateParams as SimpleToFullCreateParams,
  };
}

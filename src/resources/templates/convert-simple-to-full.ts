// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

/**
 * Template management — list, retrieve, generate, import, export, and convert designs.
 */
export class ConvertSimpleToFull extends APIResource {
  /**
   * Convert design json from Simple to Full schema.
   */
  create(
    body: ConvertSimpleToFullCreateParams,
    options?: RequestOptions,
  ): APIPromise<ConvertSimpleToFullCreateResponse> {
    return this._client.post('/v3/templates/convert/simple-to-full', { body, ...options });
  }
}

export interface ConvertSimpleToFullCreateResponse {
  data?: ConvertSimpleToFullCreateResponse.Data;

  success?: true;
}

export namespace ConvertSimpleToFullCreateResponse {
  export interface Data {
    design?: { [key: string]: unknown };
  }
}

export interface ConvertSimpleToFullCreateParams {
  design: ConvertSimpleToFullCreateParams.Design;

  displayMode?: 'email' | 'web' | 'popup' | 'document';

  includeDefaultValues?: boolean;
}

export namespace ConvertSimpleToFullCreateParams {
  export interface Design {
    body: { [key: string]: unknown };

    _conversion?: Design._Conversion;

    counters?: { [key: string]: unknown };

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

export declare namespace ConvertSimpleToFull {
  export {
    type ConvertSimpleToFullCreateResponse as ConvertSimpleToFullCreateResponse,
    type ConvertSimpleToFullCreateParams as ConvertSimpleToFullCreateParams,
  };
}

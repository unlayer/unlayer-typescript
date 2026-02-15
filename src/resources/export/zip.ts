// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Zip extends APIResource {
  /**
   * Export design to ZIP archive.
   */
  retrieve(query: ZipRetrieveParams, options?: RequestOptions): APIPromise<ZipRetrieveResponse> {
    return this._client.get('/export/v3/zip', { query, ...options });
  }
}

export interface ZipRetrieveResponse {
  data?: ZipRetrieveResponse.Data;
}

export namespace ZipRetrieveResponse {
  export interface Data {
    success?: boolean;
  }
}

export interface ZipRetrieveParams {
  /**
   * The project ID
   */
  projectId: string;
}

export declare namespace Zip {
  export { type ZipRetrieveResponse as ZipRetrieveResponse, type ZipRetrieveParams as ZipRetrieveParams };
}

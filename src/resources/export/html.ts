// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class HTML extends APIResource {
  /**
   * Export design to HTML.
   */
  retrieve(query: HTMLRetrieveParams, options?: RequestOptions): APIPromise<HTMLRetrieveResponse> {
    return this._client.get('/export/v3/html', { query, ...options });
  }
}

export interface HTMLRetrieveResponse {
  data?: HTMLRetrieveResponse.Data;
}

export namespace HTMLRetrieveResponse {
  export interface Data {
    success?: boolean;
  }
}

export interface HTMLRetrieveParams {
  /**
   * The project ID
   */
  projectId: string;
}

export declare namespace HTML {
  export { type HTMLRetrieveResponse as HTMLRetrieveResponse, type HTMLRetrieveParams as HTMLRetrieveParams };
}

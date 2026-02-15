// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Image extends APIResource {
  /**
   * Export design to image.
   */
  retrieve(query: ImageRetrieveParams, options?: RequestOptions): APIPromise<ImageRetrieveResponse> {
    return this._client.get('/export/v3/image', { query, ...options });
  }
}

export interface ImageRetrieveResponse {
  data?: ImageRetrieveResponse.Data;
}

export namespace ImageRetrieveResponse {
  export interface Data {
    success?: boolean;
  }
}

export interface ImageRetrieveParams {
  /**
   * The project ID
   */
  projectId: string;
}

export declare namespace Image {
  export {
    type ImageRetrieveResponse as ImageRetrieveResponse,
    type ImageRetrieveParams as ImageRetrieveParams,
  };
}

// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Pdf extends APIResource {
  /**
   * Export design to PDF.
   */
  retrieve(query: PdfRetrieveParams, options?: RequestOptions): APIPromise<PdfRetrieveResponse> {
    return this._client.get('/export/v3/pdf', { query, ...options });
  }
}

export interface PdfRetrieveResponse {
  data?: PdfRetrieveResponse.Data;
}

export namespace PdfRetrieveResponse {
  export interface Data {
    success?: boolean;
  }
}

export interface PdfRetrieveParams {
  /**
   * The project ID
   */
  projectId: string;
}

export declare namespace Pdf {
  export { type PdfRetrieveResponse as PdfRetrieveResponse, type PdfRetrieveParams as PdfRetrieveParams };
}

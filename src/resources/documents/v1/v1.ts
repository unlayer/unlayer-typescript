// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as GenerateAPI from './generate';
import {
  Generate,
  GenerateCreateFromTemplateParams,
  GenerateCreateFromTemplateResponse,
  GenerateCreateParams,
  GenerateCreateResponse,
} from './generate';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class V1 extends APIResource {
  generate: GenerateAPI.Generate = new GenerateAPI.Generate(this._client);

  /**
   * Retrieve details of a previously generated document.
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<V1RetrieveResponse> {
    return this._client.get(path`/documents/v1/documents/${id}/`, options);
  }
}

export interface V1RetrieveResponse {
  /**
   * Document ID
   */
  id?: string;

  /**
   * When the document generation was completed
   */
  completedAt?: string;

  /**
   * When the document was created
   */
  createdAt?: string;

  /**
   * Generated filename
   */
  filename?: string;

  /**
   * File size in bytes
   */
  fileSize?: number;

  /**
   * Number of pages in the PDF
   */
  pageCount?: number;

  /**
   * URL to download the PDF
   */
  pdfUrl?: string;

  /**
   * Current document status
   */
  status?: 'generating' | 'completed' | 'failed';
}

V1.Generate = Generate;

export declare namespace V1 {
  export { type V1RetrieveResponse as V1RetrieveResponse };

  export {
    Generate as Generate,
    type GenerateCreateResponse as GenerateCreateResponse,
    type GenerateCreateFromTemplateResponse as GenerateCreateFromTemplateResponse,
    type GenerateCreateParams as GenerateCreateParams,
    type GenerateCreateFromTemplateParams as GenerateCreateFromTemplateParams,
  };
}

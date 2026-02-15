// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as GenerateAPI from './generate';
import { Generate, GenerateCreateParams, GenerateCreateResponse } from './generate';
import * as GenerateTemplateAPI from './generate-template';
import {
  GenerateTemplate,
  GenerateTemplateCreateParams,
  GenerateTemplateCreateResponse,
} from './generate-template';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Documents extends APIResource {
  generate: GenerateAPI.Generate = new GenerateAPI.Generate(this._client);
  generateTemplate: GenerateTemplateAPI.GenerateTemplate = new GenerateTemplateAPI.GenerateTemplate(
    this._client,
  );

  /**
   * Retrieve details of a previously generated document.
   */
  retrieve(
    id: string,
    query: DocumentRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<DocumentRetrieveResponse> {
    return this._client.get(path`/documents/v1/documents/${id}`, { query, ...options });
  }
}

export interface DocumentRetrieveResponse {
  data?: DocumentRetrieveResponse.Data;
}

export namespace DocumentRetrieveResponse {
  export interface Data {
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
}

export interface DocumentRetrieveParams {
  /**
   * The project ID
   */
  projectId: string;
}

Documents.Generate = Generate;
Documents.GenerateTemplate = GenerateTemplate;

export declare namespace Documents {
  export {
    type DocumentRetrieveResponse as DocumentRetrieveResponse,
    type DocumentRetrieveParams as DocumentRetrieveParams,
  };

  export {
    Generate as Generate,
    type GenerateCreateResponse as GenerateCreateResponse,
    type GenerateCreateParams as GenerateCreateParams,
  };

  export {
    GenerateTemplate as GenerateTemplate,
    type GenerateTemplateCreateResponse as GenerateTemplateCreateResponse,
    type GenerateTemplateCreateParams as GenerateTemplateCreateParams,
  };
}

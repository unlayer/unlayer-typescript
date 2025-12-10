// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as V1API from './v1';
import {
  V1,
  V1DocumentsRetrieveResponse,
  V1GenerateCreateParams,
  V1GenerateCreateResponse,
  V1GenerateTemplateTemplateParams,
  V1GenerateTemplateTemplateResponse,
} from './v1';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Documents extends APIResource {
  v1: V1API.V1 = new V1API.V1(this._client);

  /**
   * Retrieve details of a previously generated document.
   *
   * @example
   * ```ts
   * const response = await client.documents.documentsRetrieve(
   *   'id',
   * );
   * ```
   */
  documentsRetrieve(id: string, options?: RequestOptions): APIPromise<DocumentDocumentsRetrieveResponse> {
    return this._client.get(path`/documents/v1/documents/${id}`, options);
  }

  /**
   * Generate PDF document from JSON design, HTML content, or URL.
   *
   * @example
   * ```ts
   * const response = await client.documents.generateCreate({
   *   design: {
   *     counters: { u_row: 1, u_column: 1, u_content_text: 1 },
   *     body: {
   *       rows: [
   *         {
   *           cells: [1],
   *           columns: [
   *             {
   *               contents: [
   *                 {
   *                   type: 'text',
   *                   values: { text: 'Hello World' },
   *                 },
   *               ],
   *             },
   *           ],
   *         },
   *       ],
   *     },
   *   },
   * });
   * ```
   */
  generateCreate(
    body: DocumentGenerateCreateParams,
    options?: RequestOptions,
  ): APIPromise<DocumentGenerateCreateResponse> {
    return this._client.post('/documents/v1/generate', { body, ...options });
  }

  /**
   * Generate PDF document from an existing template with merge tags.
   *
   * @example
   * ```ts
   * const response =
   *   await client.documents.generateTemplateTemplate({
   *     templateId: 'templateId',
   *   });
   * ```
   */
  generateTemplateTemplate(
    body: DocumentGenerateTemplateTemplateParams,
    options?: RequestOptions,
  ): APIPromise<DocumentGenerateTemplateTemplateResponse> {
    return this._client.post('/documents/v1/generate/template', { body, ...options });
  }
}

export interface DocumentDocumentsRetrieveResponse {
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

export interface DocumentGenerateCreateResponse {
  /**
   * Unique document identifier
   */
  documentId?: string;

  /**
   * Generated filename
   */
  filename?: string;

  /**
   * URL to download the generated PDF
   */
  pdfUrl?: string;

  status?: 'generating' | 'completed' | 'failed';
}

export interface DocumentGenerateTemplateTemplateResponse {
  /**
   * Unique document identifier
   */
  documentId?: string;

  /**
   * Generated filename
   */
  filename?: string;

  /**
   * URL to download the generated PDF
   */
  pdfUrl?: string;

  status?: 'generating' | 'completed' | 'failed';
}

export interface DocumentGenerateCreateParams {
  /**
   * Proprietary design format JSON
   */
  design: { [key: string]: unknown };

  /**
   * Optional filename for the generated PDF
   */
  filename?: string;

  /**
   * HTML content to convert to PDF
   */
  html?: string;

  /**
   * Optional merge tags for personalization
   */
  mergeTags?: { [key: string]: string };

  /**
   * URL to convert to PDF
   */
  url?: string;
}

export interface DocumentGenerateTemplateTemplateParams {
  /**
   * ID of the template to use for generation
   */
  templateId: string;

  /**
   * Optional filename for the generated PDF
   */
  filename?: string;

  /**
   * Optional merge tags for personalization
   */
  mergeTags?: { [key: string]: string };
}

Documents.V1 = V1;

export declare namespace Documents {
  export {
    type DocumentDocumentsRetrieveResponse as DocumentDocumentsRetrieveResponse,
    type DocumentGenerateCreateResponse as DocumentGenerateCreateResponse,
    type DocumentGenerateTemplateTemplateResponse as DocumentGenerateTemplateTemplateResponse,
    type DocumentGenerateCreateParams as DocumentGenerateCreateParams,
    type DocumentGenerateTemplateTemplateParams as DocumentGenerateTemplateTemplateParams,
  };

  export {
    V1 as V1,
    type V1DocumentsRetrieveResponse as V1DocumentsRetrieveResponse,
    type V1GenerateCreateResponse as V1GenerateCreateResponse,
    type V1GenerateTemplateTemplateResponse as V1GenerateTemplateTemplateResponse,
    type V1GenerateCreateParams as V1GenerateCreateParams,
    type V1GenerateTemplateTemplateParams as V1GenerateTemplateTemplateParams,
  };
}

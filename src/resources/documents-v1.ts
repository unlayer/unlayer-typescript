// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class DocumentsV1 extends APIResource {
  /**
   * Retrieve details of a previously generated document.
   *
   * @example
   * ```ts
   * const response = await client.documentsV1.documentsRetrieve(
   *   'id',
   * );
   * ```
   */
  documentsRetrieve(id: string, options?: RequestOptions): APIPromise<DocumentsV1DocumentsRetrieveResponse> {
    return this._client.get(path`/documents/v1/documents/${id}`, options);
  }

  /**
   * Generate PDF document from JSON design, HTML content, or URL.
   *
   * @example
   * ```ts
   * const response = await client.documentsV1.generateCreate({
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
    body: DocumentsV1GenerateCreateParams,
    options?: RequestOptions,
  ): APIPromise<DocumentsV1GenerateCreateResponse> {
    return this._client.post('/documents/v1/generate', { body, ...options });
  }

  /**
   * Generate PDF document from an existing template with merge tags.
   *
   * @example
   * ```ts
   * const response =
   *   await client.documentsV1.generateTemplateTemplate({
   *     templateId: 'templateId',
   *   });
   * ```
   */
  generateTemplateTemplate(
    body: DocumentsV1GenerateTemplateTemplateParams,
    options?: RequestOptions,
  ): APIPromise<DocumentsV1GenerateTemplateTemplateResponse> {
    return this._client.post('/documents/v1/generate/template', { body, ...options });
  }
}

export interface DocumentsV1DocumentsRetrieveResponse {
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

export interface DocumentsV1GenerateCreateResponse {
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

export interface DocumentsV1GenerateTemplateTemplateResponse {
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

export interface DocumentsV1GenerateCreateParams {
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

export interface DocumentsV1GenerateTemplateTemplateParams {
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

export declare namespace DocumentsV1 {
  export {
    type DocumentsV1DocumentsRetrieveResponse as DocumentsV1DocumentsRetrieveResponse,
    type DocumentsV1GenerateCreateResponse as DocumentsV1GenerateCreateResponse,
    type DocumentsV1GenerateTemplateTemplateResponse as DocumentsV1GenerateTemplateTemplateResponse,
    type DocumentsV1GenerateCreateParams as DocumentsV1GenerateCreateParams,
    type DocumentsV1GenerateTemplateTemplateParams as DocumentsV1GenerateTemplateTemplateParams,
  };
}

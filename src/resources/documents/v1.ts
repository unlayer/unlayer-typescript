// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class V1 extends APIResource {
  /**
   * Retrieve details of a previously generated document.
   *
   * @example
   * ```ts
   * const response =
   *   await client.documents.v1.documentsRetrieve('id');
   * ```
   */
  documentsRetrieve(id: string, options?: RequestOptions): APIPromise<V1DocumentsRetrieveResponse> {
    return this._client.get(path`/documents/v1/documents/${id}`, options);
  }

  /**
   * Generate PDF document from JSON design, HTML content, or URL.
   *
   * @example
   * ```ts
   * const response = await client.documents.v1.generateCreate({
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
    body: V1GenerateCreateParams,
    options?: RequestOptions,
  ): APIPromise<V1GenerateCreateResponse> {
    return this._client.post('/documents/v1/generate', { body, ...options });
  }

  /**
   * Generate PDF document from an existing template with merge tags.
   *
   * @example
   * ```ts
   * const response =
   *   await client.documents.v1.generateTemplateTemplate({
   *     templateId: 'templateId',
   *   });
   * ```
   */
  generateTemplateTemplate(
    body: V1GenerateTemplateTemplateParams,
    options?: RequestOptions,
  ): APIPromise<V1GenerateTemplateTemplateResponse> {
    return this._client.post('/documents/v1/generate/template', { body, ...options });
  }
}

export interface V1DocumentsRetrieveResponse {
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

export interface V1GenerateCreateResponse {
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

export interface V1GenerateTemplateTemplateResponse {
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

export interface V1GenerateCreateParams {
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

export interface V1GenerateTemplateTemplateParams {
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

export declare namespace V1 {
  export {
    type V1DocumentsRetrieveResponse as V1DocumentsRetrieveResponse,
    type V1GenerateCreateResponse as V1GenerateCreateResponse,
    type V1GenerateTemplateTemplateResponse as V1GenerateTemplateTemplateResponse,
    type V1GenerateCreateParams as V1GenerateCreateParams,
    type V1GenerateTemplateTemplateParams as V1GenerateTemplateTemplateParams,
  };
}

// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Documents extends APIResource {
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
  documentsRetrieve(
    id: string,
    query: DocumentDocumentsRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<DocumentDocumentsRetrieveResponse> {
    return this._client.get(path`/documents/v1/documents/${id}`, { query, ...options });
  }

  /**
   * Generate PDF document from JSON design, HTML content, or URL.
   *
   * @example
   * ```ts
   * const response = await client.documents.generateCreate({
   *   design: {
   *     counters: {
   *       u_row: 1,
   *       u_column: 1,
   *       u_content_text: 1,
   *     },
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
    params: DocumentGenerateCreateParams,
    options?: RequestOptions,
  ): APIPromise<DocumentGenerateCreateResponse> {
    const { projectId, ...body } = params;
    return this._client.post('/documents/v1/generate', { query: { projectId }, body, ...options });
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
    params: DocumentGenerateTemplateTemplateParams,
    options?: RequestOptions,
  ): APIPromise<DocumentGenerateTemplateTemplateResponse> {
    const { projectId, ...body } = params;
    return this._client.post('/documents/v1/generate/template', { query: { projectId }, body, ...options });
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

export interface DocumentDocumentsRetrieveParams {
  /**
   * The project ID (required for PAT auth, not needed for API Key auth)
   */
  projectId?: string;
}

export interface DocumentGenerateCreateParams {
  /**
   * Body param: Proprietary design format JSON
   */
  design: { [key: string]: unknown };

  /**
   * Query param: The project ID (required for PAT auth, not needed for API Key auth)
   */
  projectId?: string;

  /**
   * Body param: Optional filename for the generated PDF
   */
  filename?: string;

  /**
   * Body param: HTML content to convert to PDF
   */
  html?: string;

  /**
   * Body param: Optional merge tags for personalization
   */
  mergeTags?: { [key: string]: string };

  /**
   * Body param: URL to convert to PDF
   */
  url?: string;
}

export interface DocumentGenerateTemplateTemplateParams {
  /**
   * Body param: ID of the template to use for generation
   */
  templateId: string;

  /**
   * Query param: The project ID (required for PAT auth, not needed for API Key auth)
   */
  projectId?: string;

  /**
   * Body param: Optional filename for the generated PDF
   */
  filename?: string;

  /**
   * Body param: Optional merge tags for personalization
   */
  mergeTags?: { [key: string]: string };
}

export declare namespace Documents {
  export {
    type DocumentDocumentsRetrieveResponse as DocumentDocumentsRetrieveResponse,
    type DocumentGenerateCreateResponse as DocumentGenerateCreateResponse,
    type DocumentGenerateTemplateTemplateResponse as DocumentGenerateTemplateTemplateResponse,
    type DocumentDocumentsRetrieveParams as DocumentDocumentsRetrieveParams,
    type DocumentGenerateCreateParams as DocumentGenerateCreateParams,
    type DocumentGenerateTemplateTemplateParams as DocumentGenerateTemplateTemplateParams,
  };
}

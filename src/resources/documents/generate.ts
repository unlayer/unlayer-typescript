// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Generate extends APIResource {
  /**
   * Generate PDF document from JSON design, HTML content, or URL.
   */
  create(params: GenerateCreateParams, options?: RequestOptions): APIPromise<GenerateCreateResponse> {
    const { projectId, ...body } = params;
    return this._client.post('/documents/v1/generate', { query: { projectId }, body, ...options });
  }
}

export interface GenerateCreateResponse {
  data?: GenerateCreateResponse.Data;
}

export namespace GenerateCreateResponse {
  export interface Data {
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
}

export interface GenerateCreateParams {
  /**
   * Query param: The project ID
   */
  projectId: string;

  /**
   * Body param: Proprietary design format JSON
   */
  design?: { [key: string]: unknown };

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

export declare namespace Generate {
  export {
    type GenerateCreateResponse as GenerateCreateResponse,
    type GenerateCreateParams as GenerateCreateParams,
  };
}

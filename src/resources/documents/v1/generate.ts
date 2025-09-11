// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';

export class Generate extends APIResource {
  /**
   * Generate PDF document from JSON design, HTML content, or URL.
   */
  create(
    body: GenerateCreateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<GenerateCreateResponse> {
    return this._client.post('/documents/v1/generate/', { body, ...options });
  }

  /**
   * Generate PDF document from an existing template with merge tags.
   */
  createFromTemplate(
    body: GenerateCreateFromTemplateParams,
    options?: RequestOptions,
  ): APIPromise<GenerateCreateFromTemplateResponse> {
    return this._client.post('/documents/v1/generate/template/', { body, ...options });
  }
}

export interface GenerateCreateResponse {
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

export interface GenerateCreateFromTemplateResponse {
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

export interface GenerateCreateParams {
  /**
   * Proprietary design format JSON
   */
  design?: unknown;

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

export interface GenerateCreateFromTemplateParams {
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

export declare namespace Generate {
  export {
    type GenerateCreateResponse as GenerateCreateResponse,
    type GenerateCreateFromTemplateResponse as GenerateCreateFromTemplateResponse,
    type GenerateCreateParams as GenerateCreateParams,
    type GenerateCreateFromTemplateParams as GenerateCreateFromTemplateParams,
  };
}

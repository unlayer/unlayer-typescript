// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class GenerateTemplate extends APIResource {
  /**
   * Generate PDF document from an existing template with merge tags.
   */
  create(
    params: GenerateTemplateCreateParams,
    options?: RequestOptions,
  ): APIPromise<GenerateTemplateCreateResponse> {
    const { projectId, ...body } = params;
    return this._client.post('/documents/v1/generate/template', { query: { projectId }, body, ...options });
  }
}

export interface GenerateTemplateCreateResponse {
  data?: GenerateTemplateCreateResponse.Data;
}

export namespace GenerateTemplateCreateResponse {
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

export interface GenerateTemplateCreateParams {
  /**
   * Query param: The project ID
   */
  projectId: string;

  /**
   * Body param: ID of the template to use for generation
   */
  templateId: string;

  /**
   * Body param: Optional filename for the generated PDF
   */
  filename?: string;

  /**
   * Body param: Optional merge tags for personalization
   */
  mergeTags?: { [key: string]: string };
}

export declare namespace GenerateTemplate {
  export {
    type GenerateTemplateCreateResponse as GenerateTemplateCreateResponse,
    type GenerateTemplateCreateParams as GenerateTemplateCreateParams,
  };
}

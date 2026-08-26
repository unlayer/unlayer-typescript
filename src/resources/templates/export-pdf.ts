// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

/**
 * Render designs as HTML, images, PDFs, or ZIP files.
 */
export class ExportPdf extends APIResource {
  /**
   * Export a design as a PDF document.
   */
  create(params: ExportPdfCreateParams, options?: RequestOptions): APIPromise<ExportPdfCreateResponse> {
    const { projectId, ...body } = params;
    return this._client.post('/v3/templates/export/pdf', { query: { projectId }, body, ...options });
  }
}

export interface ExportPdfCreateResponse {
  data?: ExportPdfCreateResponse.Data;

  success?: boolean;
}

export namespace ExportPdfCreateResponse {
  export interface Data {
    url?: string;
  }
}

export interface ExportPdfCreateParams {
  /**
   * Body param: Unlayer design JSON
   */
  design: unknown;

  /**
   * Query param: The project ID (required for PAT auth, auto-resolved for API key
   * auth)
   */
  projectId?: string;

  /**
   * Body param
   */
  contentWidth?: number | 'full';

  /**
   * Body param
   */
  customJS?: string | Array<string>;

  /**
   * Body param
   */
  designTags?: unknown;

  /**
   * Body param
   */
  designTagsConfig?: unknown;

  /**
   * Body param
   */
  displayMode?: 'email' | 'web' | 'popup' | 'document';

  /**
   * Body param
   */
  editorVersion?: string;

  /**
   * Body param
   */
  language?: string;

  /**
   * Body param
   */
  languages?: Array<string>;

  /**
   * Body param
   */
  mergeTags?: unknown;

  /**
   * Body param
   */
  mergeTagsSchema?: unknown;

  /**
   * Body param
   */
  pageSize?: 'Letter' | 'Legal' | 'Tabloid' | 'Ledger' | 'A0' | 'A1' | 'A2' | 'A3' | 'A4' | 'A5' | 'A6';

  /**
   * Body param
   */
  safeHtml?: boolean;
}

export declare namespace ExportPdf {
  export {
    type ExportPdfCreateResponse as ExportPdfCreateResponse,
    type ExportPdfCreateParams as ExportPdfCreateParams,
  };
}

// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

/**
 * Render designs as HTML, images, PDFs, or ZIP files.
 */
export class ExportImage extends APIResource {
  /**
   * Export a design as a PNG image.
   */
  create(params: ExportImageCreateParams, options?: RequestOptions): APIPromise<ExportImageCreateResponse> {
    const { projectId, ...body } = params;
    return this._client.post('/v3/templates/export/image', { query: { projectId }, body, ...options });
  }
}

export interface ExportImageCreateResponse {
  data?: ExportImageCreateResponse.Data;

  success?: boolean;
}

export namespace ExportImageCreateResponse {
  export interface Data {
    url?: string;
  }
}

export interface ExportImageCreateParams {
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
  deviceScaleFactor?: number;

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
  fullPage?: boolean;

  /**
   * Body param
   */
  height?: number;

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
  safeHtml?: boolean;

  /**
   * Body param
   */
  width?: number;
}

export declare namespace ExportImage {
  export {
    type ExportImageCreateResponse as ExportImageCreateResponse,
    type ExportImageCreateParams as ExportImageCreateParams,
  };
}

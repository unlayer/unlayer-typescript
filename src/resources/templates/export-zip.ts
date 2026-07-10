// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class ExportZip extends APIResource {
  /**
   * Export a design as a ZIP archive containing HTML and assets.
   */
  create(params: ExportZipCreateParams, options?: RequestOptions): APIPromise<ExportZipCreateResponse> {
    const { projectId, ...body } = params;
    return this._client.post('/v3/templates/export/zip', { query: { projectId }, body, ...options });
  }
}

export interface ExportZipCreateResponse {
  data?: ExportZipCreateResponse.Data;

  success?: boolean;
}

export namespace ExportZipCreateResponse {
  export interface Data {
    url?: string;
  }
}

export interface ExportZipCreateParams {
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
  safeHtml?: boolean;
}

export declare namespace ExportZip {
  export {
    type ExportZipCreateResponse as ExportZipCreateResponse,
    type ExportZipCreateParams as ExportZipCreateParams,
  };
}

// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class ExportHTML extends APIResource {
  /**
   * Export a design as rendered HTML.
   */
  create(params: ExportHTMLCreateParams, options?: RequestOptions): APIPromise<ExportHTMLCreateResponse> {
    const { projectId, ...body } = params;
    return this._client.post('/v3/templates/export/html', { query: { projectId }, body, ...options });
  }
}

export interface ExportHTMLCreateResponse {
  data?: ExportHTMLCreateResponse.Data;

  success?: boolean;
}

export namespace ExportHTMLCreateResponse {
  export interface Data {
    amp?: { [key: string]: unknown };

    chunks?: Data.Chunks;

    design?: { [key: string]: unknown };

    html?: string;
  }

  export namespace Data {
    export interface Chunks {
      body?: string;

      css?: string;

      fonts?: Array<unknown>;

      js?: string;

      tags?: Array<string>;
    }
  }
}

export interface ExportHTMLCreateParams {
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

export declare namespace ExportHTML {
  export {
    type ExportHTMLCreateResponse as ExportHTMLCreateResponse,
    type ExportHTMLCreateParams as ExportHTMLCreateParams,
  };
}

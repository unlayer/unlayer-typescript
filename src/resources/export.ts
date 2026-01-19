// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Export extends APIResource {
  /**
   * Export design to HTML.
   */
  htmlList(query: ExportHTMLListParams, options?: RequestOptions): APIPromise<ExportHTMLListResponse> {
    return this._client.get('/export/v3/html', { query, ...options });
  }

  /**
   * Export design to image.
   */
  imageList(query: ExportImageListParams, options?: RequestOptions): APIPromise<ExportImageListResponse> {
    return this._client.get('/export/v3/image', { query, ...options });
  }

  /**
   * Export design to PDF.
   */
  pdfList(query: ExportPdfListParams, options?: RequestOptions): APIPromise<ExportPdfListResponse> {
    return this._client.get('/export/v3/pdf', { query, ...options });
  }

  /**
   * Export design to ZIP archive.
   */
  zipList(query: ExportZipListParams, options?: RequestOptions): APIPromise<ExportZipListResponse> {
    return this._client.get('/export/v3/zip', { query, ...options });
  }
}

export interface ExportHTMLListResponse {
  data?: ExportHTMLListResponse.Data;
}

export namespace ExportHTMLListResponse {
  export interface Data {
    success?: boolean;
  }
}

export interface ExportImageListResponse {
  data?: ExportImageListResponse.Data;
}

export namespace ExportImageListResponse {
  export interface Data {
    success?: boolean;
  }
}

export interface ExportPdfListResponse {
  data?: ExportPdfListResponse.Data;
}

export namespace ExportPdfListResponse {
  export interface Data {
    success?: boolean;
  }
}

export interface ExportZipListResponse {
  data?: ExportZipListResponse.Data;
}

export namespace ExportZipListResponse {
  export interface Data {
    success?: boolean;
  }
}

export interface ExportHTMLListParams {
  /**
   * The project ID
   */
  projectId: string;
}

export interface ExportImageListParams {
  /**
   * The project ID
   */
  projectId: string;
}

export interface ExportPdfListParams {
  /**
   * The project ID
   */
  projectId: string;
}

export interface ExportZipListParams {
  /**
   * The project ID
   */
  projectId: string;
}

export declare namespace Export {
  export {
    type ExportHTMLListResponse as ExportHTMLListResponse,
    type ExportImageListResponse as ExportImageListResponse,
    type ExportPdfListResponse as ExportPdfListResponse,
    type ExportZipListResponse as ExportZipListResponse,
    type ExportHTMLListParams as ExportHTMLListParams,
    type ExportImageListParams as ExportImageListParams,
    type ExportPdfListParams as ExportPdfListParams,
    type ExportZipListParams as ExportZipListParams,
  };
}

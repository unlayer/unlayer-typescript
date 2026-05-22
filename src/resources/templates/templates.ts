// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ConvertFullToSimpleAPI from './convert-full-to-simple';
import {
  ConvertFullToSimple,
  ConvertFullToSimpleCreateParams,
  ConvertFullToSimpleCreateResponse,
} from './convert-full-to-simple';
import * as ConvertSimpleToFullAPI from './convert-simple-to-full';
import {
  ConvertSimpleToFull,
  ConvertSimpleToFullCreateParams,
  ConvertSimpleToFullCreateResponse,
} from './convert-simple-to-full';
import * as GenerateAPI from './generate';
import { Generate, GenerateCreateParams, GenerateCreateResponse } from './generate';
import * as ImportAPI from './import';
import { Import, ImportCreateParams, ImportCreateResponse } from './import';
import { APIPromise } from '../../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Template management — list, retrieve, generate, import, export, and convert designs.
 */
export class Templates extends APIResource {
  convertFullToSimple: ConvertFullToSimpleAPI.ConvertFullToSimple =
    new ConvertFullToSimpleAPI.ConvertFullToSimple(this._client);
  convertSimpleToFull: ConvertSimpleToFullAPI.ConvertSimpleToFull =
    new ConvertSimpleToFullAPI.ConvertSimpleToFull(this._client);
  generate: GenerateAPI.Generate = new GenerateAPI.Generate(this._client);
  import: ImportAPI.Import = new ImportAPI.Import(this._client);

  /**
   * Get template by ID.
   */
  retrieve(
    id: string,
    query: TemplateRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<TemplateRetrieveResponse> {
    return this._client.get(path`/v3/templates/${id}`, { query, ...options });
  }

  /**
   * List templates with cursor-based pagination. Returns templates in descending
   * order by update time.
   */
  list(
    query: TemplateListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<TemplateListResponsesCursorPage, TemplateListResponse> {
    return this._client.getAPIList('/v3/templates', CursorPage<TemplateListResponse>, { query, ...options });
  }
}

export type TemplateListResponsesCursorPage = CursorPage<TemplateListResponse>;

export interface TemplateRetrieveResponse {
  data?: TemplateRetrieveResponse.Data;
}

export namespace TemplateRetrieveResponse {
  export interface Data {
    id?: string;

    createdAt?: string;

    design?: { [key: string]: unknown };

    displayMode?: 'email' | 'web' | 'document';

    html?: string | null;

    name?: string;

    updatedAt?: string;
  }
}

export interface TemplateListResponse {
  /**
   * Template ID
   */
  id?: string;

  createdAt?: string;

  /**
   * Template type/display mode
   */
  displayMode?: 'email' | 'web' | 'document';

  /**
   * Template name
   */
  name?: string;

  updatedAt?: string;
}

export interface TemplateRetrieveParams {
  /**
   * The project ID (required for PAT auth, auto-resolved for API key auth)
   */
  projectId?: string;
}

export interface TemplateListParams extends CursorPageParams {
  /**
   * Filter by template type
   */
  displayMode?: 'email' | 'web' | 'document';

  /**
   * Filter by name (case-insensitive search)
   */
  name?: string;

  /**
   * The project ID to list templates for
   */
  projectId?: string;
}

Templates.ConvertFullToSimple = ConvertFullToSimple;
Templates.ConvertSimpleToFull = ConvertSimpleToFull;
Templates.Generate = Generate;
Templates.Import = Import;

export declare namespace Templates {
  export {
    type TemplateRetrieveResponse as TemplateRetrieveResponse,
    type TemplateListResponse as TemplateListResponse,
    type TemplateListResponsesCursorPage as TemplateListResponsesCursorPage,
    type TemplateRetrieveParams as TemplateRetrieveParams,
    type TemplateListParams as TemplateListParams,
  };

  export {
    ConvertFullToSimple as ConvertFullToSimple,
    type ConvertFullToSimpleCreateResponse as ConvertFullToSimpleCreateResponse,
    type ConvertFullToSimpleCreateParams as ConvertFullToSimpleCreateParams,
  };

  export {
    ConvertSimpleToFull as ConvertSimpleToFull,
    type ConvertSimpleToFullCreateResponse as ConvertSimpleToFullCreateResponse,
    type ConvertSimpleToFullCreateParams as ConvertSimpleToFullCreateParams,
  };

  export {
    Generate as Generate,
    type GenerateCreateResponse as GenerateCreateResponse,
    type GenerateCreateParams as GenerateCreateParams,
  };

  export {
    Import as Import,
    type ImportCreateResponse as ImportCreateResponse,
    type ImportCreateParams as ImportCreateParams,
  };
}

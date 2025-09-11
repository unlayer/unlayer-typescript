// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Domains extends APIResource {
  /**
   * Add a new domain to the project.
   */
  create(body: DomainCreateParams, options?: RequestOptions): APIPromise<DomainCreateResponse> {
    return this._client.post('/project/v1/domains/', { body, ...options });
  }

  /**
   * Get domain details by ID.
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<DomainRetrieveResponse> {
    return this._client.get(path`/project/v1/domains/${id}/`, options);
  }

  /**
   * Update domain settings.
   */
  update(
    id: string,
    body: DomainUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<DomainUpdateResponse> {
    return this._client.put(path`/project/v1/domains/${id}/`, { body, ...options });
  }

  /**
   * List all domains for the project.
   */
  list(options?: RequestOptions): APIPromise<DomainListResponse> {
    return this._client.get('/project/v1/domains/', options);
  }

  /**
   * Remove domain from project.
   */
  delete(id: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/project/v1/domains/${id}/`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface DomainCreateResponse {
  data?: DomainCreateResponse.Data;
}

export namespace DomainCreateResponse {
  export interface Data {
    id?: string;

    createdAt?: string;

    domain?: string;

    status?: string;

    verified?: boolean;
  }
}

export interface DomainRetrieveResponse {
  data?: DomainRetrieveResponse.Data;
}

export namespace DomainRetrieveResponse {
  export interface Data {
    id?: string;

    createdAt?: string;

    domain?: string;

    status?: string;

    verified?: boolean;
  }
}

export interface DomainUpdateResponse {
  data?: DomainUpdateResponse.Data;
}

export namespace DomainUpdateResponse {
  export interface Data {
    id?: string;

    createdAt?: string;

    domain?: string;

    status?: string;

    verified?: boolean;
  }
}

export interface DomainListResponse {
  data?: Array<DomainListResponse.Data>;
}

export namespace DomainListResponse {
  export interface Data {
    id?: string;

    createdAt?: string;

    domain?: string;

    status?: 'active' | 'pending' | 'failed';

    verified?: boolean;
  }
}

export interface DomainCreateParams {
  /**
   * Domain name to add
   */
  domain: string;
}

export interface DomainUpdateParams {
  /**
   * Updated domain name
   */
  domain?: string;
}

export declare namespace Domains {
  export {
    type DomainCreateResponse as DomainCreateResponse,
    type DomainRetrieveResponse as DomainRetrieveResponse,
    type DomainUpdateResponse as DomainUpdateResponse,
    type DomainListResponse as DomainListResponse,
    type DomainCreateParams as DomainCreateParams,
    type DomainUpdateParams as DomainUpdateParams,
  };
}

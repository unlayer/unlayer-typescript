// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as VerifyAPI from './verify';
import { Verify, VerifyCreateResponse } from './verify';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Manage verified sender domains.
 */
export class Domains extends APIResource {
  verify: VerifyAPI.Verify = new VerifyAPI.Verify(this._client);

  /**
   * Register a sender domain shared by every Developer Email API project in the
   * workspace. Requires a personal access token belonging to a workspace owner or
   * admin. Verification requires the workspace-specific TXT record and the returned
   * SES DKIM records.
   */
  create(body: DomainCreateParams, options?: RequestOptions): APIPromise<DomainCreateResponse> {
    return this._client.post('/v3/domains', { body, ...options });
  }

  /**
   * Get the ownership TXT challenge and SES DKIM records for a sender domain shared
   * by every Developer Email API project in the workspace. Requires a personal
   * access token belonging to a workspace owner or admin.
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<DomainRetrieveResponse> {
    return this._client.get(path`/v3/domains/${id}`, options);
  }

  /**
   * List sender domains shared by every Developer Email API project in the
   * workspace. Requires a personal access token belonging to a workspace owner or
   * admin; project API keys cannot manage domains.
   */
  list(options?: RequestOptions): APIPromise<DomainListResponse> {
    return this._client.get('/v3/domains', options);
  }

  /**
   * Delete a sender domain shared by every Developer Email API project in the
   * workspace. Requires a personal access token belonging to a workspace owner or
   * admin. The SES identity remains so a later reconciler can clean it up safely.
   */
  delete(id: string, options?: RequestOptions): APIPromise<DomainDeleteResponse> {
    return this._client.delete(path`/v3/domains/${id}`, options);
  }
}

export interface DomainCreateResponse {
  data: DomainCreateResponse.Data;
}

export namespace DomainCreateResponse {
  export interface Data {
    id?: number;

    createdAt?: string;

    dkimTokens?: Array<string>;

    dnsRecords?: Array<Data.DNSRecord>;

    domain?: string;

    status?: 'pending' | 'verified' | 'failed';
  }

  export namespace Data {
    export interface DNSRecord {
      name?: string;

      purpose?: string;

      type?: string;

      value?: string;
    }
  }
}

export interface DomainRetrieveResponse {
  data: DomainRetrieveResponse.Data;
}

export namespace DomainRetrieveResponse {
  export interface Data {
    id?: number;

    createdAt?: string;

    dkimTokens?: Array<string>;

    dnsRecords?: Array<Data.DNSRecord>;

    domain?: string;

    status?: string;
  }

  export namespace Data {
    export interface DNSRecord {
      name?: string;

      purpose?: string;

      type?: string;

      value?: string;
    }
  }
}

export interface DomainListResponse {
  data: Array<DomainListResponse.Data>;
}

export namespace DomainListResponse {
  export interface Data {
    id?: number;

    createdAt?: string;

    domain?: string;

    status?: 'pending' | 'verified' | 'failed';
  }
}

export interface DomainDeleteResponse {
  data?: DomainDeleteResponse.Data;
}

export namespace DomainDeleteResponse {
  export interface Data {
    success?: boolean;
  }
}

export interface DomainCreateParams {
  /**
   * Domain name to register, such as example.com.
   */
  domain: string;
}

Domains.Verify = Verify;

export declare namespace Domains {
  export {
    type DomainCreateResponse as DomainCreateResponse,
    type DomainRetrieveResponse as DomainRetrieveResponse,
    type DomainListResponse as DomainListResponse,
    type DomainDeleteResponse as DomainDeleteResponse,
    type DomainCreateParams as DomainCreateParams,
  };

  export { Verify as Verify, type VerifyCreateResponse as VerifyCreateResponse };
}

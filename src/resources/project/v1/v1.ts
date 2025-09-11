// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as APIKeysAPI from './api-keys';
import {
  APIKeyCreateParams,
  APIKeyCreateResponse,
  APIKeyListResponse,
  APIKeyRetrieveResponse,
  APIKeyUpdateParams,
  APIKeyUpdateResponse,
  APIKeys,
} from './api-keys';
import * as DomainsAPI from './domains';
import {
  DomainCreateParams,
  DomainCreateResponse,
  DomainListResponse,
  DomainRetrieveResponse,
  DomainUpdateParams,
  DomainUpdateResponse,
  Domains,
} from './domains';
import * as TemplatesAPI from './templates';
import {
  TemplateCreateParams,
  TemplateCreateResponse,
  TemplateListResponse,
  TemplateRetrieveResponse,
  TemplateUpdateParams,
  TemplateUpdateResponse,
  Templates,
} from './templates';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';

export class V1 extends APIResource {
  apiKeys: APIKeysAPI.APIKeys = new APIKeysAPI.APIKeys(this._client);
  domains: DomainsAPI.Domains = new DomainsAPI.Domains(this._client);
  templates: TemplatesAPI.Templates = new TemplatesAPI.Templates(this._client);

  /**
   * Get project details for the authenticated project.
   */
  getCurrent(options?: RequestOptions): APIPromise<V1GetCurrentResponse> {
    return this._client.get('/project/v1/current/', options);
  }
}

export interface V1GetCurrentResponse {
  data?: V1GetCurrentResponse.Data;
}

export namespace V1GetCurrentResponse {
  export interface Data {
    id?: number;

    createdAt?: string;

    name?: string;

    status?: string;

    workspace?: Data.Workspace;
  }

  export namespace Data {
    export interface Workspace {
      id?: number;

      name?: string;
    }
  }
}

V1.APIKeys = APIKeys;
V1.Domains = Domains;
V1.Templates = Templates;

export declare namespace V1 {
  export { type V1GetCurrentResponse as V1GetCurrentResponse };

  export {
    APIKeys as APIKeys,
    type APIKeyCreateResponse as APIKeyCreateResponse,
    type APIKeyRetrieveResponse as APIKeyRetrieveResponse,
    type APIKeyUpdateResponse as APIKeyUpdateResponse,
    type APIKeyListResponse as APIKeyListResponse,
    type APIKeyCreateParams as APIKeyCreateParams,
    type APIKeyUpdateParams as APIKeyUpdateParams,
  };

  export {
    Domains as Domains,
    type DomainCreateResponse as DomainCreateResponse,
    type DomainRetrieveResponse as DomainRetrieveResponse,
    type DomainUpdateResponse as DomainUpdateResponse,
    type DomainListResponse as DomainListResponse,
    type DomainCreateParams as DomainCreateParams,
    type DomainUpdateParams as DomainUpdateParams,
  };

  export {
    Templates as Templates,
    type TemplateCreateResponse as TemplateCreateResponse,
    type TemplateRetrieveResponse as TemplateRetrieveResponse,
    type TemplateUpdateResponse as TemplateUpdateResponse,
    type TemplateListResponse as TemplateListResponse,
    type TemplateCreateParams as TemplateCreateParams,
    type TemplateUpdateParams as TemplateUpdateParams,
  };
}

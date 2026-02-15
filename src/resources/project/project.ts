// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as CurrentAPI from './current';
import { Current, CurrentRetrieveParams, CurrentRetrieveResponse } from './current';
import * as DomainsAPI from './domains';
import {
  DomainCreateParams,
  DomainCreateResponse,
  DomainListParams,
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
  TemplateListParams,
  TemplateListResponse,
  TemplateRetrieveResponse,
  TemplateUpdateParams,
  TemplateUpdateResponse,
  Templates,
} from './templates';
import * as WorkspacesAPI from './workspaces';
import { WorkspaceListResponse, WorkspaceRetrieveResponse, Workspaces } from './workspaces';

export class Project extends APIResource {
  current: CurrentAPI.Current = new CurrentAPI.Current(this._client);
  domains: DomainsAPI.Domains = new DomainsAPI.Domains(this._client);
  templates: TemplatesAPI.Templates = new TemplatesAPI.Templates(this._client);
  workspaces: WorkspacesAPI.Workspaces = new WorkspacesAPI.Workspaces(this._client);
}

Project.Current = Current;
Project.Domains = Domains;
Project.Templates = Templates;
Project.Workspaces = Workspaces;

export declare namespace Project {
  export {
    Current as Current,
    type CurrentRetrieveResponse as CurrentRetrieveResponse,
    type CurrentRetrieveParams as CurrentRetrieveParams,
  };

  export {
    Domains as Domains,
    type DomainCreateResponse as DomainCreateResponse,
    type DomainRetrieveResponse as DomainRetrieveResponse,
    type DomainUpdateResponse as DomainUpdateResponse,
    type DomainListResponse as DomainListResponse,
    type DomainCreateParams as DomainCreateParams,
    type DomainUpdateParams as DomainUpdateParams,
    type DomainListParams as DomainListParams,
  };

  export {
    Templates as Templates,
    type TemplateCreateResponse as TemplateCreateResponse,
    type TemplateRetrieveResponse as TemplateRetrieveResponse,
    type TemplateUpdateResponse as TemplateUpdateResponse,
    type TemplateListResponse as TemplateListResponse,
    type TemplateCreateParams as TemplateCreateParams,
    type TemplateUpdateParams as TemplateUpdateParams,
    type TemplateListParams as TemplateListParams,
  };

  export {
    Workspaces as Workspaces,
    type WorkspaceRetrieveResponse as WorkspaceRetrieveResponse,
    type WorkspaceListResponse as WorkspaceListResponse,
  };
}

// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Workspaces extends APIResource {
  /**
   * Get a specific workspace by ID with its projects.
   */
  retrieve(workspaceID: string, options?: RequestOptions): APIPromise<WorkspaceRetrieveResponse> {
    return this._client.get(path`/v3/workspaces/${workspaceID}`, options);
  }

  /**
   * Get all workspaces accessible by the current token.
   */
  list(options?: RequestOptions): APIPromise<WorkspaceListResponse> {
    return this._client.get('/v3/workspaces', options);
  }
}

export interface WorkspaceRetrieveResponse {
  data?: WorkspaceRetrieveResponse.Data;
}

export namespace WorkspaceRetrieveResponse {
  export interface Data {
    id?: number;

    name?: string;

    projects?: Array<Data.Project>;
  }

  export namespace Data {
    export interface Project {
      id?: number;

      name?: string;

      status?: string;
    }
  }
}

export interface WorkspaceListResponse {
  data?: Array<WorkspaceListResponse.Data>;
}

export namespace WorkspaceListResponse {
  export interface Data {
    id?: number;

    name?: string;
  }
}

export declare namespace Workspaces {
  export {
    type WorkspaceRetrieveResponse as WorkspaceRetrieveResponse,
    type WorkspaceListResponse as WorkspaceListResponse,
  };
}

// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Project extends APIResource {
  /**
   * Get project details for the specified project.
   */
  retrieve(
    query: ProjectRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ProjectRetrieveResponse> {
    return this._client.get('/v3/project', { query, ...options });
  }
}

export interface ProjectRetrieveResponse {
  data?: ProjectRetrieveResponse.Data;
}

export namespace ProjectRetrieveResponse {
  export interface Data {
    /**
     * The project ID.
     */
    id?: number;

    /**
     * When the project was created.
     */
    createdAt?: string;

    /**
     * The project name.
     */
    name?: string;

    /**
     * The project status.
     */
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

export interface ProjectRetrieveParams {
  /**
   * The project ID (required for PAT auth, auto-resolved for API key auth)
   */
  projectId?: string;
}

export declare namespace Project {
  export {
    type ProjectRetrieveResponse as ProjectRetrieveResponse,
    type ProjectRetrieveParams as ProjectRetrieveParams,
  };
}

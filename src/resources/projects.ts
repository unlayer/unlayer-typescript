// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Projects extends APIResource {
  /**
   * Get project details by ID.
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<ProjectRetrieveResponse> {
    return this._client.get(path`/v3/projects/${id}`, options);
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

export declare namespace Projects {
  export { type ProjectRetrieveResponse as ProjectRetrieveResponse };
}

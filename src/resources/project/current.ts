// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Current extends APIResource {
  /**
   * Get project details for the specified project.
   */
  retrieve(query: CurrentRetrieveParams, options?: RequestOptions): APIPromise<CurrentRetrieveResponse> {
    return this._client.get('/project/v1/current', { query, ...options });
  }
}

export interface CurrentRetrieveResponse {
  data?: CurrentRetrieveResponse.Data;
}

export namespace CurrentRetrieveResponse {
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

export interface CurrentRetrieveParams {
  /**
   * The project ID
   */
  projectId: string;
}

export declare namespace Current {
  export {
    type CurrentRetrieveResponse as CurrentRetrieveResponse,
    type CurrentRetrieveParams as CurrentRetrieveParams,
  };
}

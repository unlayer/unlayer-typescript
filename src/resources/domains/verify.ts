// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Verify extends APIResource {
  /**
   * Verify the ownership TXT challenge and SES DKIM identity for a sender domain
   * shared by every Developer Email API project in the workspace. Requires a
   * personal access token belonging to a workspace owner or admin.
   */
  create(id: string, options?: RequestOptions): APIPromise<VerifyCreateResponse> {
    return this._client.post(path`/v3/domains/${id}/verify`, options);
  }
}

export interface VerifyCreateResponse {
  data: VerifyCreateResponse.Data;
}

export namespace VerifyCreateResponse {
  export interface Data {
    id?: number;

    dkim?: Data.Dkim;

    domain?: string;

    ownership?: Data.Ownership;

    status?: string;
  }

  export namespace Data {
    export interface Dkim {
      status?: string;

      tokens?: Array<string>;
    }

    export interface Ownership {
      verified?: boolean;
    }
  }
}

export declare namespace Verify {
  export { type VerifyCreateResponse as VerifyCreateResponse };
}

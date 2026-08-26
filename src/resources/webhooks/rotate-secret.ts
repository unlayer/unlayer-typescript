// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Manage Developer Email API webhooks.
 */
export class RotateSecret extends APIResource {
  /**
   * Generate a new signing secret for a webhook. The new secret is returned once —
   * store it securely. The old secret is invalidated immediately.
   */
  create(id: string, options?: RequestOptions): APIPromise<RotateSecretCreateResponse> {
    return this._client.post(path`/v3/webhooks/${id}/rotate-secret`, options);
  }
}

export interface RotateSecretCreateResponse {
  data: RotateSecretCreateResponse.Data;
}

export namespace RotateSecretCreateResponse {
  export interface Data {
    id?: number;

    /**
     * New signing secret — only returned once. Store it securely.
     */
    secret?: string;

    updatedAt?: string;
  }
}

export declare namespace RotateSecret {
  export { type RotateSecretCreateResponse as RotateSecretCreateResponse };
}

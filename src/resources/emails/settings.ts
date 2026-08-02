// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Settings extends APIResource {
  /**
   * Get the email sender settings for this project.
   */
  retrieve(options?: RequestOptions): APIPromise<SettingRetrieveResponse> {
    return this._client.get('/v3/emails/settings', options);
  }

  /**
   * Update the email sending configuration for this project. Only include the fields
   * you want to change.
   */
  update(
    body: SettingUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SettingUpdateResponse> {
    return this._client.patch('/v3/emails/settings', { body, ...options });
  }
}

export interface SettingRetrieveResponse {
  data: SettingRetrieveResponse.Data;
}

export namespace SettingRetrieveResponse {
  export interface Data {
    /**
     * When the settings row was first created.
     */
    createdAt?: string;

    /**
     * Default sender display name
     */
    defaultFromName?: string;

    /**
     * When the settings were last updated.
     */
    updatedAt?: string;
  }
}

export interface SettingUpdateResponse {
  data: SettingUpdateResponse.Data;
}

export namespace SettingUpdateResponse {
  export interface Data {
    /**
     * When the settings row was first created.
     */
    createdAt?: string;

    /**
     * Default sender display name
     */
    defaultFromName?: string;

    /**
     * When the settings were last updated.
     */
    updatedAt?: string;
  }
}

export interface SettingUpdateParams {
  /**
   * Default sender display name
   */
  defaultFromName?: string;
}

export declare namespace Settings {
  export {
    type SettingRetrieveResponse as SettingRetrieveResponse,
    type SettingUpdateResponse as SettingUpdateResponse,
    type SettingUpdateParams as SettingUpdateParams,
  };
}

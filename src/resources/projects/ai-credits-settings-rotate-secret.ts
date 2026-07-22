// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * AI credit balance, usage breakdown, and webhook/alert settings. Credits are pooled per workspace; settings are per project.
 */
export class AICreditsSettingsRotateSecret extends APIResource {
  /**
   * Generates a new HMAC signing secret for the project and returns it exactly once.
   * The previous secret stops working immediately, so update your webhook
   * verification before rotating. Requires a webhook URL to be configured first.
   */
  create(id: string, options?: RequestOptions): APIPromise<AICreditsSettingsRotateSecretCreateResponse> {
    return this._client.post(path`/v3/projects/${id}/ai-credits/settings/rotate-secret`, options);
  }
}

export interface AICreditsSettingsRotateSecretCreateResponse {
  /**
   * The new HMAC signing secret. Shown only once.
   */
  signing_secret?: string;
}

export declare namespace AICreditsSettingsRotateSecret {
  export { type AICreditsSettingsRotateSecretCreateResponse as AICreditsSettingsRotateSecretCreateResponse };
}

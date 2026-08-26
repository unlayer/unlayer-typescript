// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * AI credit balance, usage breakdown, and webhook/alert settings. Credits are pooled per workspace; settings are per project.
 */
export class AICreditsSettings extends APIResource {
  /**
   * Returns a project's AI credit exhaustion behavior, alert thresholds, and webhook
   * endpoint. The signing secret is never returned — only whether one exists
   * (`has_signing_secret`).
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<AICreditsSettingRetrieveResponse> {
    return this._client.get(path`/v3/projects/${id}/ai-credits/settings`, options);
  }

  /**
   * Configures AI credit exhaustion behavior, usage alert thresholds, and the
   * webhook endpoint for a project. The HMAC signing secret is generated the first
   * time a webhook URL is set and returned exactly once in the response — store it
   * securely; it is never shown again.
   */
  update(
    id: string,
    body: AICreditsSettingUpdateParams,
    options?: RequestOptions,
  ): APIPromise<AICreditsSettingUpdateResponse> {
    return this._client.put(path`/v3/projects/${id}/ai-credits/settings`, { body, ...options });
  }
}

export interface AICreditsSettingRetrieveResponse {
  exhaustion_behavior: 'disable' | 'show_error';

  has_signing_secret: boolean;

  threshold_alerts: Array<number>;

  webhook_url: string | null;
}

export interface AICreditsSettingUpdateResponse {
  exhaustion_behavior: 'disable' | 'show_error';

  has_signing_secret: boolean;

  threshold_alerts: Array<number>;

  webhook_url: string | null;

  /**
   * The HMAC signing secret. Returned ONLY on the response that first generates it.
   */
  signing_secret?: string;
}

export interface AICreditsSettingUpdateParams {
  /**
   * What the editor does when the credit balance is exhausted.
   */
  exhaustion_behavior?: 'disable' | 'show_error';

  /**
   * Usage percentages (1-100) at which a threshold_reached webhook fires, once per
   * crossing per period.
   */
  threshold_alerts?: Array<number>;

  /**
   * HTTPS endpoint that receives AI credit webhooks.
   */
  webhook_url?: string | null;
}

export declare namespace AICreditsSettings {
  export {
    type AICreditsSettingRetrieveResponse as AICreditsSettingRetrieveResponse,
    type AICreditsSettingUpdateResponse as AICreditsSettingUpdateResponse,
    type AICreditsSettingUpdateParams as AICreditsSettingUpdateParams,
  };
}

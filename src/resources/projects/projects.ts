// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AICreditsAPI from './ai-credits';
import { AICreditRetrieveResponse, AICredits } from './ai-credits';
import * as AICreditsSettingsAPI from './ai-credits-settings';
import {
  AICreditsSettingRetrieveResponse,
  AICreditsSettingUpdateParams,
  AICreditsSettingUpdateResponse,
  AICreditsSettings,
} from './ai-credits-settings';
import * as AICreditsSettingsRotateSecretAPI from './ai-credits-settings-rotate-secret';
import {
  AICreditsSettingsRotateSecret,
  AICreditsSettingsRotateSecretCreateResponse,
} from './ai-credits-settings-rotate-secret';
import * as AICreditsUsageAPI from './ai-credits-usage';
import {
  AICreditsUsage,
  AICreditsUsageRetrieveParams,
  AICreditsUsageRetrieveResponse,
} from './ai-credits-usage';
import * as AICreditsWebhooksDeliveriesAPI from './ai-credits-webhooks-deliveries';
import {
  AICreditsWebhooksDeliveries,
  AICreditsWebhooksDeliveryRetrieveParams,
  AICreditsWebhooksDeliveryRetrieveResponse,
} from './ai-credits-webhooks-deliveries';
import * as AICreditsWebhooksDeliveriesattemptsAPI from './ai-credits-webhooks-deliveriesattempts';
import {
  AICreditsWebhooksDeliveriesattemptRetrieveParams,
  AICreditsWebhooksDeliveriesattemptRetrieveResponse,
  AICreditsWebhooksDeliveriesattempts,
} from './ai-credits-webhooks-deliveriesattempts';
import * as AICreditsWebhooksDeliveriesretryAPI from './ai-credits-webhooks-deliveriesretry';
import {
  AICreditsWebhooksDeliveriesretry,
  AICreditsWebhooksDeliveriesretryCreateParams,
  AICreditsWebhooksDeliveriesretryCreateResponse,
} from './ai-credits-webhooks-deliveriesretry';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Project details and configuration.
 */
export class Projects extends APIResource {
  aiCredits: AICreditsAPI.AICredits = new AICreditsAPI.AICredits(this._client);
  aiCreditsSettings: AICreditsSettingsAPI.AICreditsSettings = new AICreditsSettingsAPI.AICreditsSettings(
    this._client,
  );
  aiCreditsSettingsRotateSecret: AICreditsSettingsRotateSecretAPI.AICreditsSettingsRotateSecret =
    new AICreditsSettingsRotateSecretAPI.AICreditsSettingsRotateSecret(this._client);
  aiCreditsUsage: AICreditsUsageAPI.AICreditsUsage = new AICreditsUsageAPI.AICreditsUsage(this._client);
  aiCreditsWebhooksDeliveries: AICreditsWebhooksDeliveriesAPI.AICreditsWebhooksDeliveries =
    new AICreditsWebhooksDeliveriesAPI.AICreditsWebhooksDeliveries(this._client);
  aiCreditsWebhooksDeliveriesattempts: AICreditsWebhooksDeliveriesattemptsAPI.AICreditsWebhooksDeliveriesattempts =
    new AICreditsWebhooksDeliveriesattemptsAPI.AICreditsWebhooksDeliveriesattempts(this._client);
  aiCreditsWebhooksDeliveriesretry: AICreditsWebhooksDeliveriesretryAPI.AICreditsWebhooksDeliveriesretry =
    new AICreditsWebhooksDeliveriesretryAPI.AICreditsWebhooksDeliveriesretry(this._client);

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

Projects.AICredits = AICredits;
Projects.AICreditsSettings = AICreditsSettings;
Projects.AICreditsSettingsRotateSecret = AICreditsSettingsRotateSecret;
Projects.AICreditsUsage = AICreditsUsage;
Projects.AICreditsWebhooksDeliveries = AICreditsWebhooksDeliveries;
Projects.AICreditsWebhooksDeliveriesattempts = AICreditsWebhooksDeliveriesattempts;
Projects.AICreditsWebhooksDeliveriesretry = AICreditsWebhooksDeliveriesretry;

export declare namespace Projects {
  export { type ProjectRetrieveResponse as ProjectRetrieveResponse };

  export { AICredits as AICredits, type AICreditRetrieveResponse as AICreditRetrieveResponse };

  export {
    AICreditsSettings as AICreditsSettings,
    type AICreditsSettingRetrieveResponse as AICreditsSettingRetrieveResponse,
    type AICreditsSettingUpdateResponse as AICreditsSettingUpdateResponse,
    type AICreditsSettingUpdateParams as AICreditsSettingUpdateParams,
  };

  export {
    AICreditsSettingsRotateSecret as AICreditsSettingsRotateSecret,
    type AICreditsSettingsRotateSecretCreateResponse as AICreditsSettingsRotateSecretCreateResponse,
  };

  export {
    AICreditsUsage as AICreditsUsage,
    type AICreditsUsageRetrieveResponse as AICreditsUsageRetrieveResponse,
    type AICreditsUsageRetrieveParams as AICreditsUsageRetrieveParams,
  };

  export {
    AICreditsWebhooksDeliveries as AICreditsWebhooksDeliveries,
    type AICreditsWebhooksDeliveryRetrieveResponse as AICreditsWebhooksDeliveryRetrieveResponse,
    type AICreditsWebhooksDeliveryRetrieveParams as AICreditsWebhooksDeliveryRetrieveParams,
  };

  export {
    AICreditsWebhooksDeliveriesattempts as AICreditsWebhooksDeliveriesattempts,
    type AICreditsWebhooksDeliveriesattemptRetrieveResponse as AICreditsWebhooksDeliveriesattemptRetrieveResponse,
    type AICreditsWebhooksDeliveriesattemptRetrieveParams as AICreditsWebhooksDeliveriesattemptRetrieveParams,
  };

  export {
    AICreditsWebhooksDeliveriesretry as AICreditsWebhooksDeliveriesretry,
    type AICreditsWebhooksDeliveriesretryCreateResponse as AICreditsWebhooksDeliveriesretryCreateResponse,
    type AICreditsWebhooksDeliveriesretryCreateParams as AICreditsWebhooksDeliveriesretryCreateParams,
  };
}

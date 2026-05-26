// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';

export class Generate extends APIResource {
  /**
   * Generate or modify an Unlayer design using AI. Send the conversation as
   * `messages` (today only the last user message is consumed; earlier turns are
   * accepted as chat history) and describe the target with `output.kind` +
   * `output.displayMode`. Pass the current canvas state in `context` (full design
   * JSON + selection pointer) to modify an existing design. Only `anthropic` and
   * `openai` models are supported. To import existing HTML or an image instead, use
   * POST /v3/templates/import.
   */
  create(params: GenerateCreateParams, options?: RequestOptions): APIPromise<GenerateCreateResponse> {
    const { projectId, ...body } = params;
    return this._client.post('/v3/templates/generate', { query: { projectId }, body, ...options });
  }

  retrieve(options?: RequestOptions): APIPromise<void> {
    return this._client.get('/v3/templates/generate', {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

/**
 * The generated (or modified) design plus model metadata and optional usage
 * metadata.
 */
export interface GenerateCreateResponse {
  /**
   * Provider response id for the generation turn.
   */
  id?: string;

  /**
   * The provider + model that actually produced the output (may differ from the
   * requested model after failover).
   */
  model?: GenerateCreateResponse.Model;

  /**
   * The generated output for the requested block.
   */
  output?: GenerateCreateResponse.Output;

  /**
   * Aggregate token usage for the turn when exposed by the caller. Builder copilot
   * endpoints expose it only in local/dev/QA and omit it in staging/production.
   */
  usage?: GenerateCreateResponse.Usage;
}

export namespace GenerateCreateResponse {
  /**
   * The provider + model that actually produced the output (may differ from the
   * requested model after failover).
   */
  export interface Model {
    /**
     * Resolved model id, e.g. "claude-opus-4-7".
     */
    id?: string;

    /**
     * e.g. "anthropic", "openai".
     */
    provider?: string;
  }

  /**
   * The generated output for the requested block.
   */
  export interface Output {
    /**
     * The generated design JSON, scoped to the requested kind (the full design for
     * template/page/body; the row/column/content/element for narrower kinds).
     */
    data?: { [key: string]: unknown };

    /**
     * Echoes the requested `output.kind`.
     */
    kind?: string;
  }

  /**
   * Aggregate token usage for the turn when exposed by the caller. Builder copilot
   * endpoints expose it only in local/dev/QA and omit it in staging/production.
   */
  export interface Usage {
    cachedInputTokens?: number;

    estimatedCostMicroUsd?: number;

    inputTokens?: number;

    outputTokens?: number;

    reasoningTokens?: number;

    totalTokens?: number;
  }
}

export interface GenerateCreateParams {
  /**
   * Body param: Conversation messages in chronological order, capped at 10 messages.
   * The last `user` message is the prompt for this turn; any earlier
   * `user`/`assistant` text turns are forwarded to the model as prior chat context.
   * A `user` message may carry a predefined prompt action via `metadata.action.id`
   * (e.g. SPELLING, REPHRASE).
   */
  messages: Array<GenerateCreateParams.Message>;

  /**
   * Body param
   */
  output: GenerateCreateParams.Output;

  /**
   * Query param: The project ID (required for PAT auth, auto-resolved for API key
   * auth)
   */
  projectId?: string;

  /**
   * Body param
   */
  context?: GenerateCreateParams.Context;

  /**
   * Body param: Reserved for future server-side conversation memory.
   */
  conversationId?: string;

  /**
   * Body param: BCP-47 fallback locale for AI status messages.
   */
  locale?: string;

  /**
   * Body param: AI model in "provider/id" form, e.g. "anthropic/claude-opus-4-7".
   * Optional — server resolves a default per output kind.
   */
  model?: string;
}

export namespace GenerateCreateParams {
  export interface Message {
    content: Array<Message.Content>;

    role: 'user' | 'assistant' | 'system';

    metadata?: Message.Metadata;
  }

  export namespace Message {
    export interface Content {
      type: 'text' | 'image' | 'file';

      file?: Content.File;

      /**
       * URL or data URL of the image
       */
      image?: string;

      text?: string;
    }

    export namespace Content {
      export interface File {
        url: string;

        mediaType?: string;

        [k: string]: unknown;
      }
    }

    export interface Metadata {
      action?: Metadata.Action;

      [k: string]: unknown;
    }

    export namespace Metadata {
      export interface Action {
        id: string;

        [k: string]: unknown;
      }
    }
  }

  export interface Output {
    displayMode: 'email' | 'web' | 'popup' | 'document';

    kind: 'template' | 'page' | 'body' | 'header' | 'footer' | 'row' | 'column' | 'content' | 'text';

    schemaVersion?: number;
  }

  export interface Context {
    availableTools?: Array<string>;

    customTools?: Array<Context.CustomTool>;

    fullDesign?: { [key: string]: unknown } | null;

    selection?: Context.Selection | null;

    [k: string]: unknown;
  }

  export namespace Context {
    export interface CustomTool {
      options: { [key: string]: unknown };

      slug: string;

      [k: string]: unknown;
    }

    export interface Selection {
      id: string | number;

      collection: 'pages' | 'bodies' | 'rows' | 'columns' | 'contents' | 'headers' | 'footers';

      value?: string;

      [k: string]: unknown;
    }
  }
}

export declare namespace Generate {
  export {
    type GenerateCreateResponse as GenerateCreateResponse,
    type GenerateCreateParams as GenerateCreateParams,
  };
}

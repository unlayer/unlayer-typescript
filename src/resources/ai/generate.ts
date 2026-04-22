// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Generate extends APIResource {
  /**
   * Generate, modify, or import an Unlayer design using AI. Provide typed input
   * parts to describe what to generate.
   */
  create(params: GenerateCreateParams, options?: RequestOptions): APIPromise<GenerateCreateResponse> {
    const { projectId, ...body } = params;
    return this._client.post('/v3/ai/generate', { query: { projectId }, body, ...options });
  }
}

/**
 * Successfully generated design
 */
export interface GenerateCreateResponse {
  /**
   * AI response ID
   */
  id?: string;

  model?: string;

  output?: GenerateCreateResponse.Output;

  provider?: string;

  usage?: GenerateCreateResponse.Usage;
}

export namespace GenerateCreateResponse {
  export interface Output {
    blockType?: string;

    /**
     * Generated design data
     */
    data?: { [key: string]: unknown };

    type?: string;
  }

  export interface Usage {
    cachedInputTokens?: number;

    inputTokens?: number;

    outputTokens?: number;

    reasoningTokens?: number;

    totalTokens?: number;
  }
}

export interface GenerateCreateParams {
  /**
   * Body param: Display mode for the design
   */
  displayMode: 'email' | 'web' | 'popup' | 'document';

  /**
   * Body param: Array of typed input parts (max 50)
   */
  input: Array<GenerateCreateParams.Input>;

  /**
   * Body param: What to generate
   */
  output: GenerateCreateParams.Output;

  /**
   * Query param: The project ID (required for PAT auth, auto-resolved for API key
   * auth)
   */
  projectId?: string;

  /**
   * Body param: Editor environment context
   */
  context?: GenerateCreateParams.Context;

  /**
   * Body param: AI model to use, in provider/model format. Optional — defaults to
   * anthropic/claude-opus-4-6.
   */
  model?: 'anthropic/claude-opus-4-6' | 'openai/gpt-5.2';
}

export namespace GenerateCreateParams {
  export interface Input {
    /**
     * The type of input part
     */
    type: 'text' | 'prompt' | 'json' | 'html' | 'image';

    /**
     * Predefined prompt ID: SPELLING, EXPAND, SUMMARIZE, REPHRASE, FRIENDLY, FORMAL
     * (for type: "prompt")
     */
    id?: string;

    /**
     * Block type of the design data (for type: "json")
     */
    blockType?: string;

    /**
     * Existing design data (object, for type: "json") or base64 image data (string,
     * for type: "image")
     */
    data?: { [key: string]: unknown } | string;

    /**
     * HTML string to import (for type: "html")
     */
    html?: string;

    /**
     * Design schema version (for type: "json")
     */
    schemaVersion?: number;

    /**
     * Natural language prompt (for type: "text")
     */
    text?: string;

    /**
     * Image URL to import (for type: "image")
     */
    url?: string;
  }

  /**
   * What to generate
   */
  export interface Output {
    /**
     * The type of design block to generate
     */
    blockType: 'template' | 'page' | 'body' | 'content' | 'row' | 'column';

    /**
     * Output format — currently only "json" is supported
     */
    type: 'json';
  }

  /**
   * Editor environment context
   */
  export interface Context {
    /**
     * Filter content types available in the generated design
     */
    availableTools?: Array<string>;

    /**
     * Custom tool declarations with their options
     */
    customTools?: Array<Context.CustomTool>;

    [k: string]: unknown;
  }

  export namespace Context {
    export interface CustomTool {
      options: { [key: string]: unknown };

      slug: string;

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

// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

/**
 * Template management — list, retrieve, generate, import, export, and convert designs.
 */
export class Import extends APIResource {
  /**
   * Import an existing template from HTML or an image (URL or base64) and return the
   * resulting Unlayer design JSON. No template DB entry is created.
   */
  create(params: ImportCreateParams, options?: RequestOptions): APIPromise<ImportCreateResponse> {
    const { projectId, ...body } = params;
    return this._client.post('/v3/templates/import', { query: { projectId }, body, ...options });
  }
}

/**
 * Successfully imported template
 */
export interface ImportCreateResponse {
  id?: string;

  model?: string;

  output?: ImportCreateResponse.Output;

  provider?: string;

  usage?: ImportCreateResponse.Usage;
}

export namespace ImportCreateResponse {
  export interface Output {
    blockType?: string;

    /**
     * Imported design data
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

export interface ImportCreateParams {
  /**
   * Body param: Display mode for the imported design
   */
  displayMode: 'email' | 'web' | 'popup' | 'document';

  /**
   * Body param: Array of input parts. Must contain exactly one "html" or "image"
   * part; may also contain one or more "text" parts with optional instructions.
   */
  input: Array<ImportCreateParams.Input>;

  /**
   * Query param: The project ID (required for PAT auth, auto-resolved for API key
   * auth)
   */
  projectId?: string;

  /**
   * Body param: Transient-outage fallback controls. Omit to use Unlayer defaults
   * only when no model is pinned; true always uses Unlayer defaults; false disables
   * the outage tail; an ordered array replaces the default provider/model strings.
   */
  fallbackModels?: boolean | Array<string>;

  /**
   * Body param: Preferred AI model. Accepts a provider/model string (e.g.
   * "anthropic/claude-opus-5", "openai/gpt-5.6-luna"), a bare provider ("anthropic",
   * "openai") which uses that provider's default model, or a bare model id
   * ("claude-opus-5", "gpt-5.6-luna") with the provider inferred from the name.
   * Optional — defaults to anthropic/claude-opus-5.
   */
  model?: string;
}

export namespace ImportCreateParams {
  export interface Input {
    /**
     * The type of input part. "html" or "image" carries the source content; "text"
     * carries optional instructions to apply during import.
     */
    type: 'html' | 'image' | 'text';

    /**
     * Base64 image data URL, e.g. "data:image/png;base64,…" (for type: "image")
     */
    data?: string;

    /**
     * HTML string to import (for type: "html")
     */
    html?: string;

    /**
     * Optional natural-language instructions to apply during import (for type: "text")
     */
    text?: string;

    /**
     * Image URL to import (for type: "image")
     */
    url?: string;
  }
}

export declare namespace Import {
  export { type ImportCreateResponse as ImportCreateResponse, type ImportCreateParams as ImportCreateParams };
}

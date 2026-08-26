// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * Ephemeral editor session creation and access.
 */
export class EditorSessions extends APIResource {
  /**
   * Create an ephemeral, no-DB editor session for a design and return a hosted
   * editor URL the user can open to edit it in the real Unlayer editor.
   */
  create(
    params: EditorSessionCreateParams,
    options?: RequestOptions,
  ): APIPromise<EditorSessionCreateResponse> {
    const { projectId, ...body } = params;
    return this._client.post('/v3/editor-sessions', { query: { projectId }, body, ...options });
  }
}

export interface EditorSessionCreateResponse {
  data?: EditorSessionCreateResponse.Data;
}

export namespace EditorSessionCreateResponse {
  export interface Data {
    token?: string;

    editorUrl?: string;

    expiresAt?: string;
  }
}

export interface EditorSessionCreateParams {
  /**
   * Body param: Design JSON to load into the editor.
   */
  design: { [key: string]: unknown };

  /**
   * Query param: The project ID (required for PAT auth, auto-resolved for API key
   * auth)
   */
  projectId?: string;

  /**
   * Body param: Editor display mode. Defaults to email.
   */
  displayMode?: 'email' | 'web' | 'popup' | 'document';
}

export declare namespace EditorSessions {
  export {
    type EditorSessionCreateResponse as EditorSessionCreateResponse,
    type EditorSessionCreateParams as EditorSessionCreateParams,
  };
}

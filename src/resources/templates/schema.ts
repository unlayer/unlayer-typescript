// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';

/**
 * Template management — list, retrieve, generate, import, export, and convert designs.
 */
export class Schema extends APIResource {
  /**
   * Returns the canonical design schema as a standard JSON Schema document — the
   * exact schema POST /v3/templates/validate checks against, ready to plug into any
   * JSON Schema validator or editor tooling. Serves the Full schema by default; pass
   * simple=true for the compact Simple schema. No authentication required. Responses
   * carry a strong ETag and long-lived cache headers; send If-None-Match to
   * revalidate for free.
   */
  retrieve(query: SchemaRetrieveParams | null | undefined = {}, options?: RequestOptions): APIPromise<void> {
    return this._client.get('/v3/templates/schema', {
      query,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface SchemaRetrieveParams {
  /**
   * Display mode whose rules the schema describes (email, web, document, popup).
   * Defaults to "email".
   */
  displayMode?: 'email' | 'web' | 'popup' | 'document';

  /**
   * When true, returns the Simple schema instead of the Full schema.
   */
  simple?: boolean;
}

export declare namespace Schema {
  export { type SchemaRetrieveParams as SchemaRetrieveParams };
}

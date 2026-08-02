// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

/**
 * Template management — list, retrieve, generate, import, export, and convert designs.
 */
export class Validate extends APIResource {
  /**
   * Validate a design JSON against the Unlayer design schema. Returns { success:
   * true, data: { valid: true } } when the payload conforms; otherwise data is {
   * valid: false, errors: [...] } with descriptive issues. Every checked design gets
   * HTTP 200 — `data.valid` is the source of truth, not the status code. Only
   * malformed requests (e.g. a missing design field or an unknown displayMode) fail
   * request validation with 400 VALIDATION_ERROR.
   */
  create(body: ValidateCreateParams, options?: RequestOptions): APIPromise<ValidateCreateResponse> {
    return this._client.post('/v3/templates/validate', { body, ...options });
  }
}

export interface ValidateCreateResponse {
  data: ValidateCreateResponse.Data;

  success: true;
}

export namespace ValidateCreateResponse {
  export interface Data {
    valid: boolean;

    /**
     * Total number of issues found; greater than errors.length when the list was
     * capped.
     */
    errorCount?: number;

    /**
     * Populated when valid is false, capped at 100 entries. Each issue carries the
     * dotted path to the offending field, a human-readable message, and the underlying
     * Zod issue code.
     */
    errors?: Array<Data.Error>;

    /**
     * Present when the design was upgraded from an older schemaVersion before
     * validation; carries the original version number.
     */
    migratedFrom?: number;
  }

  export namespace Data {
    export interface Error {
      code: string;

      message: string;

      path: string;
    }
  }
}

export interface ValidateCreateParams {
  /**
   * The design JSON to validate.
   */
  design: { [key: string]: unknown };

  /**
   * Custom tool declarations, in the same shape passed to unlayer.registerTool. When
   * provided, blocks matching a declared tool have their values checked against the
   * tool's declared options (wrong types are reported at their exact path). Blocks
   * of undeclared tools keep envelope-only validation.
   */
  customTools?: Array<ValidateCreateParams.CustomTool>;

  /**
   * Display mode for the design (email, web, document, popup). Some validation rules
   * differ per mode. Defaults to "email" — without a default, options from every
   * mode would apply at once, the strictest possible check, and real editor-saved
   * designs could be reported invalid.
   */
  displayMode?: 'email' | 'web' | 'popup' | 'document';

  /**
   * When true (default), a full-form design with an older schemaVersion is upgraded
   * to the current schema before validating — matching how the editor and the
   * convert endpoints treat stored designs. Designs without a schemaVersion predate
   * versioning and are fully migrated the same way. Set to false to check strict
   * conformance with the current schema version. Designs with a newer schemaVersion
   * than this API knows are validated as-if-current.
   */
  migrate?: boolean;

  /**
   * Which form of the schema to validate against. Defaults to "full".
   */
  schema?: 'full' | 'simple';
}

export namespace ValidateCreateParams {
  export interface CustomTool {
    options: { [key: string]: CustomTool.Options };

    slug: string;

    label?: string;

    supportedDisplayModes?: Array<'email' | 'web' | 'popup' | 'document'>;

    type?: string;

    values?: { [key: string]: unknown };

    [k: string]: unknown;
  }

  export namespace CustomTool {
    export interface Options {
      options?: unknown;
    }
  }
}

export declare namespace Validate {
  export {
    type ValidateCreateResponse as ValidateCreateResponse,
    type ValidateCreateParams as ValidateCreateParams,
  };
}

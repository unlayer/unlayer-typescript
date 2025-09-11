// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as V1API from './v1';
import { V1, V1RenderParams, V1RenderResponse } from './v1';

export class Pages extends APIResource {
  v1: V1API.V1 = new V1API.V1(this._client);
}

Pages.V1 = V1;

export declare namespace Pages {
  export { V1 as V1, type V1RenderResponse as V1RenderResponse, type V1RenderParams as V1RenderParams };
}

// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as RenderAPI from './render';
import { Render, RenderCreateParams, RenderCreateResponse } from './render';

export class Pages extends APIResource {
  render: RenderAPI.Render = new RenderAPI.Render(this._client);
}

Pages.Render = Render;

export declare namespace Pages {
  export {
    Render as Render,
    type RenderCreateResponse as RenderCreateResponse,
    type RenderCreateParams as RenderCreateParams,
  };
}

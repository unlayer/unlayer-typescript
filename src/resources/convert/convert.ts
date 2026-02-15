// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as FullToSimpleAPI from './full-to-simple';
import { FullToSimple, FullToSimpleCreateParams, FullToSimpleCreateResponse } from './full-to-simple';
import * as SimpleToFullAPI from './simple-to-full';
import { SimpleToFull, SimpleToFullCreateParams, SimpleToFullCreateResponse } from './simple-to-full';

export class Convert extends APIResource {
  fullToSimple: FullToSimpleAPI.FullToSimple = new FullToSimpleAPI.FullToSimple(this._client);
  simpleToFull: SimpleToFullAPI.SimpleToFull = new SimpleToFullAPI.SimpleToFull(this._client);
}

Convert.FullToSimple = FullToSimple;
Convert.SimpleToFull = SimpleToFull;

export declare namespace Convert {
  export {
    FullToSimple as FullToSimple,
    type FullToSimpleCreateResponse as FullToSimpleCreateResponse,
    type FullToSimpleCreateParams as FullToSimpleCreateParams,
  };

  export {
    SimpleToFull as SimpleToFull,
    type SimpleToFullCreateResponse as SimpleToFullCreateResponse,
    type SimpleToFullCreateParams as SimpleToFullCreateParams,
  };
}

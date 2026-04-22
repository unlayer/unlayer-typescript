// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as GenerateAPI from './generate';
import { Generate, GenerateCreateParams, GenerateCreateResponse } from './generate';

export class AI extends APIResource {
  generate: GenerateAPI.Generate = new GenerateAPI.Generate(this._client);
}

AI.Generate = Generate;

export declare namespace AI {
  export {
    Generate as Generate,
    type GenerateCreateResponse as GenerateCreateResponse,
    type GenerateCreateParams as GenerateCreateParams,
  };
}

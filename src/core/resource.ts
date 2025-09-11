// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Unlayer } from '../client';

export abstract class APIResource {
  protected _client: Unlayer;

  constructor(client: Unlayer) {
    this._client = client;
  }
}

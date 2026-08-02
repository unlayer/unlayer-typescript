// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Events extends APIResource {
  /**
   * Retrieve the operational event timeline for a sent email, showing send,
   * delivery, bounce, and complaint events in chronological order during the rolling
   * 90-day history window. Expired emails return 404.
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<EventRetrieveResponse> {
    return this._client.get(path`/v3/emails/${id}/events`, options);
  }
}

export interface EventRetrieveResponse {
  data: Array<EventRetrieveResponse.Data>;
}

export namespace EventRetrieveResponse {
  export interface Data {
    metadata?: { [key: string]: unknown } | null;

    timestamp?: string;

    /**
     * Event type (send, delivery, bounce, complaint)
     */
    type?: string;
  }
}

export declare namespace Events {
  export { type EventRetrieveResponse as EventRetrieveResponse };
}

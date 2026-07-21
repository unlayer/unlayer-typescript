// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as SubscriptionAPI from './subscription';
import { Subscription, SubscriptionRetrieveParams, SubscriptionRetrieveResponse } from './subscription';

export class Me extends APIResource {
  subscription: SubscriptionAPI.Subscription = new SubscriptionAPI.Subscription(this._client);
}

Me.Subscription = Subscription;

export declare namespace Me {
  export {
    Subscription as Subscription,
    type SubscriptionRetrieveResponse as SubscriptionRetrieveResponse,
    type SubscriptionRetrieveParams as SubscriptionRetrieveParams,
  };
}

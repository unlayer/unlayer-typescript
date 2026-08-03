// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * Reusable design blocks — list shared project blocks and end-user saved blocks for backup, migration, and usage reporting.
 */
export class Blocks extends APIResource {
  /**
   * List blocks with cursor-based pagination. Returns both shared project blocks and
   * blocks saved by end-users; each user-saved block carries the userId it was saved
   * under (null for shared blocks), so usage can be aggregated per end-user without
   * enumerating user IDs. Returns blocks in descending order by creation.
   */
  retrieve(
    query: BlockRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<BlockRetrieveResponse> {
    return this._client.get('/v3/blocks', { query, ...options });
  }
}

export interface BlockRetrieveResponse {
  data: Array<BlockRetrieveResponse.Data>;

  /**
   * Whether there are more results after this page
   */
  has_more: boolean;

  /**
   * Cursor for the next page. Null if no more results.
   */
  next_cursor?: string | null;
}

export namespace BlockRetrieveResponse {
  export interface Data {
    /**
     * Block ID
     */
    id?: string;

    /**
     * Block category
     */
    category?: string;

    createdAt?: string;

    /**
     * The block design JSON. Omitted when includeData=false is passed.
     */
    data?: { [key: string]: unknown };

    /**
     * Display mode the block was saved for: email, web, popup, or document
     */
    displayMode?: string;

    /**
     * Whether the block is currently a synced block
     */
    isSyncEnabled?: boolean;

    /**
     * Synced-block ID referenced by designs using this block. Null when the block has
     * never been synced.
     */
    syncId?: string | null;

    /**
     * Block tags
     */
    tags?: Array<string>;

    /**
     * URL of the auto-generated block thumbnail, if available
     */
    thumbnailUrl?: string | null;

    updatedAt?: string;

    /**
     * End-user ID the block was saved under (the user id your app passes to the
     * editor). Null for shared project blocks.
     */
    userId?: string | null;
  }
}

export interface BlockRetrieveParams {
  /**
   * Filter by category (case-insensitive search)
   */
  category?: string;

  /**
   * Pagination cursor from previous response
   */
  cursor?: string;

  /**
   * Filter by display mode
   */
  displayMode?: 'email' | 'web' | 'popup' | 'document';

  /**
   * Include the block design JSON in each item. Pass false for lightweight sweeps
   * (e.g. usage reports).
   */
  includeData?: boolean;

  /**
   * Number of blocks to return (1-100)
   */
  limit?: number;

  /**
   * The project ID to list blocks for
   */
  projectId?: string;

  /**
   * Filter by block ownership: shared project blocks, end-user saved blocks, or both
   */
  scope?: 'all' | 'shared' | 'user';

  /**
   * Only blocks saved by this end-user (exact match on the user id your app passes
   * to the editor)
   */
  userId?: string;
}

export declare namespace Blocks {
  export {
    type BlockRetrieveResponse as BlockRetrieveResponse,
    type BlockRetrieveParams as BlockRetrieveParams,
  };
}

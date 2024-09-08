/**
 * @description
 * General commands parameters
 */

export type BalanceParams =
  | {
      /**
       * The address for which to show the balance.
       * This field is optional. If not provided, the total balance for all addresses will be shown.
       * Accepts both 0x and Mx format addresses.
       * @example "0x1234567890abcdef"
       * @example "Mx1234567890abcdef"
       */
      address?: string;
      /**
       * The token ID for which to show the balance.
       * This field is optional. If not provided, the balance for all tokens will be shown.
       * The token ID for Minima is 0x00.
       * @example "0x00"  // For Minima
       * @example "0x1234567890abcdef"  // For a specific token
       */
      tokenid?: string;
      /**
       * The number of block confirmations required before a coin is considered confirmed in your balance.
       * This field is optional and defaults to 3.
       * Setting a higher value increases the confidence in the balance.
       * @example 3  // Default value
       * @example 6  // Higher confidence
       */
      confirmations?: number;

      tokendetails?: 'true';
    }
  | undefined; // 🟢

export type CheckAddressParams = {
  /**
   * The address to check. The address can be in 0x or Mx format.
   * This field is required and must be a valid address format.
   * @example "0x1234567890abcdef"
   * @example "Mx1234567890abcdef"
   */
  address: string;
}; // 🟢
export type CoinCheckParams = {
  /**
   * The data of a coin, typically obtained using the 'coinexport' command.
   * This field is required and should be a valid coin data string.
   * @example "coin-data-string"
   */
  data: string;
}; // 🟢

export type CoinImportParams = {
  /**
   * The data of a coin, typically obtained using the 'coinexport' command.
   * This field is required and must contain valid coin data that includes the MMR proof.
   * @example "coin-data-string"
   */
  data: string;
  /**
   * Optionally specify whether to track the coin.
   * If set to true, an MMR entry for the coin will be created and it will be added to your relevant coins list.
   * Defaults to false if not provided.
   * @example true  // Track the coin
   * @example false  // Do not track the coin
   */
  track?: 'true' | 'false';
}; // 🟢
export type CoinExportParams = {
  /**
   * The ID of the coin to export. This ID can be found using the 'coins'
   * command.
   * This field is required and must be a valid coin ID.
   * @example "coin-id-string"
   */
  coinid: string;
};
export type CoinTrackParams = {
  /**
   * Specify whether to enable or disable tracking for the coin.
   * If set to true, the coin will be added to your relevant coins list for
   * tracking.
   * If set to false, the coin will be removed from your relevant coins list.
   */
  enable: 'true' | 'false';
  /**
   * The ID of the coin to track or untrack. This ID can be found using the 'coins' command.
   * This field is required and must be a valid coin ID.
   * @example "coin-id-string"
   */
  coinid: string;
};
type ConsolidateParams = {
  /**
   * The tokenid for Minima or custom token to consolidate coins for.
   * Minima is represented by 0x00.
   * @example "0x00"
   */
  tokenid: string;
  /**
   * The minimum number of blocks deep (confirmations) a coin needs to be.
   * Default is 3 if not provided.
   * @default 3
   */
  coinage?: string;
  /**
   * The maximum number of coins to consolidate.
   * Must be at least 3 and up to 20.
   * Coins are sorted by value (smallest first) before adding to the transaction.
   * @minimum 3
   * @maximum 20
   */
  maxcoins?: string;
  /**
   * The maximum number of signatures for the transaction.
   * Up to 5 signatures can be specified.
   * Coins are sorted by address to minimize the number of signatures required.
   * @maximum 5
   */
  maxsigs?: string;
  /**
   * Amount of Minima to burn with the transaction.
   */
  burn?: string;
  /**
   * Indicates whether to print more detailed logs for debugging purposes.
   * @default false
   */
  debug?: 'true' | 'false';
  /**
   * If true, simulates the consolidate transaction but does not execute it.
   * @default false
   */
  dryrun?: 'true' | 'false';
};
type HashTestParams = {
  /**
   * Number of hashes to execute. Defaults to 1 million if not provided.
   * @default 1000000
   */
  amount?: string;
};
type HistoryParams = {
  /**
   * Maximum number of TxPoW to retrieve.
   * If not provided, retrieves all relevant TxPoW.
   */
  max?: string;
};
type TokenCreateParams = {
  /**
   * The name of the token.
   * Can be a string or JSON object.
   */
  name: string;
  /**
   * The amount of total supply to create for the token.
   * Must be between 1 and 1 trillion.
   */
  amount: string;
  /**
   * The number of decimal places for the token.
   * Default is 8, maximum is 16.
   * Use 0 to create NFTs (non-fungible tokens).
   */
  decimals?: string;
  /**
   * Custom script that must return 'TRUE' when spending any coin of this token.
   * Both the token script and coin script must return 'TRUE' for a coin to be spendable.
   */
  script?: string;
  /**
   * List of state variables, if adding a script.
   * A JSON object in the format {"port":"value",..}
   */
  state?: Record<string, any>;
  /**
   * Public key to sign the token with, proving the creator of the token/NFT.
   */
  signtoken?: string;
  /**
   * URL to a publicly viewable .txt file hosted by the creator.
   * Stores the tokenid for validation purposes after token minting.
   */
  webvalidate?: string;
  /**
   * Amount of Minima to burn with the tokencreate minting transaction.
   */
  burn?: string;
};

type KeysParams = {
  /**
   * list : List your existing public keys. The default.
   * checkkeys : Checks if your Public and Private keys are correct.
   * new : Create a new key pair.
   */
  action?: 'list' | 'checkkeys' | 'new';
  /**
   * Search for a specific public key.
   */
  publickey?: string;
};

type PrintTreeParams = {
  /**
   * Number of blocks back from the tip to show in the txpow tree.
   * Default depth is 32 blocks.
   */
  depth?: string;
  /**
   * Boolean flag to determine whether to show the cascade in the tree
   * representation.
   * Default is false.
   */
  cascade?: 'true' | 'false';
};

type TokenValidateParams = {
  /**
   * The tokenid of the custom token/NFT to validate.
   */
  tokenid: string;
};

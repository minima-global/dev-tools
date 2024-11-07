export type SendParams = {
  /**
   * A Minima 0x or Mx wallet address or custom script address. Must also specify amount.
   */
  address?: string;
  /**
   * The amount of Minima or custom tokens to send to the specified address.
   */
  amount?: string;
  /**
   * JSON Array listing addresses and amounts to send in one transaction. Takes the format ["address:amount","address2:amount2",..], with each set in double quotes.
   */
  multi?: string;
  /**
   * If sending a custom token, you must specify its tokenid. Defaults to Minima (0x00).
   */
  tokenid?: string;
  /**
   * List of state variables, if sending coins to a script. A JSON object in the format {"port":"value",..}
   */
  state?: string;
  /**
   * The amount of Minima to burn with this transaction.
   */
  burn?: string;
  /**
   * If your Wallet is password locked, you can unlock it for this one transaction - then relock it.
   */
  password?: string;
  /**
   * You can set the number of coins the recipient will receive, between 1 and * 20. Default is 1.
   * The amount being sent will be split into multiple coins of equal value.
   * You can split your own coins by sending to your own address.
   * Useful if you want to send multiple transactions without waiting for *change to be confirmed.
   */
  split?: string;
  /**
   * How old must the coins be in blocks.
   */
  coinage?: string;
  /**
   * true or false, true will print more detailed logs.
   */
  debug?: 'true' | 'false';
  /**
   * true or false, true will print more detailed logs.
   */
  dryrun?: 'true' | 'false';
  /**
   * true or false - should you mine the transaction immediately.
   */
  mine?: 'true' | 'false';
  /**
   * Only use this address for input coins.
   */
  fromaddress?: string;
  /**
   * Sign the txn with only this key (use with fromaddress).
   */
  signkey?: string;
  /**
   * true or false - defaults to true. Should the output coins store the state (will still appear in NOTIFYCOIN messages).
   */
  storestate?: 'true' | 'false';
};

export type SendPoll = SendParams & {
  /**
   * The action to perform.
   */
  action: 'list' | 'remove';
  /**
   * The uid of the transaction to remove.
   */
  uid: string;
};

export type SendNoSign = {
  address?: string;
  amount?: string;
  multi?: string;
  tokenid?: string;
  state?: string;
  burn?: string;
  split?: string;
  file?: string;
  debug?: 'true' | 'false';
};

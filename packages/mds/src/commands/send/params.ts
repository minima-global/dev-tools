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

export type SendPollParams = SendParams & {
  /**
   * The action to perform.
   */
  action: 'list' | 'remove';
  /**
   * The uid of the transaction to remove.
   */
  uid: string;
};

export type SendNoSignParams = {
  /**
   * A Minima 0x or Mx wallet address or custom script address.
   */
  address?: string;
  /**
   * The amount of Minima or custom tokens to send to the specified address.
   */
  amount?: string;
  /**
   * JSON Array listing addresses and amounts to send in one transaction.
   */
  multi?: string;
  /**
   * If sending a custom token, you must specify its tokenid.
   */
  tokenid?: string;
  /**
   * List of state variables, if sending coins to a script.
   */
  state?: string;
  /**
   * The amount of Minima to burn with this transaction.
   */
  burn?: string;
  /**
   * Set the number of coins the recipient will receive, between 1 and 20. Default is 1.
   */
  split?: string;
  /**
   * Specify the file to output, otherwise default chosen.
   */
  file?: string;
  /*
   * true or false, true will print more detailed logs.
   */
  debug?: 'true' | 'false';
};

export type SendFileParams = {
  /**
   * Name of the transaction (.txn) file to view, located in the node's base folder. If not in the base folder, specify the full file path.
   */
  file: string;
};

export type SendSignParams = {
  /**
   * Name of the transaction (.txn) file to sign, located in the node's base folder. If not in the base folder, specify the full file path.
   */
  file: string;
  /**
   * The Vault password, if the node is password locked.
   */
  password?: string;
};

export type MultiSigAction =
  | 'create'
  | 'getkey'
  | 'list'
  | 'spend'
  | 'sign'
  | 'post'
  | 'view';

export type MultiSigCreateParams = {
  id: string;
  amount: string;
  publickeys: string;
  required: string;
  root?: string;
  password?: string;
};

export type MultiSigListParams = {
  id?: string;
};

export type MultiSigSpendParams = {
  id?: string;
  coinid?: string;
  file?: string;
  amount: string;
  address: string;
};

export type MultiSigSignParams = {
  file: string;
  password?: string;
};

export type MultiSigViewParams = {
  file: string;
};

export type MultiSigPostParams = {
  file: string;
};

export type MultiSigParams = {
  /**
   * The action to perform.
   */
  action: MultiSigAction;
  /**
   * The id of the multisig coin to search for or create.
   */
  id?: string;
  /**
   * The amount of the multisig coin to create.
   */
  amount?: string;
  /**
   * The public keys to create the multisig coin with.
   */
  publickeys?: string;
  /**
   * The number of public keys required to sign the multisig coin.
   */
  required?: string;
  /**
   * The root public key to create the multisig coin with.
   */
  root?: string;
  /**
   * The coinid of the multisig coin to spend.
   */
  coinid?: string;
  /**
   * The address to send the multisig coin to.
   */
  address?: string;
  /**
   * The file to create, sign or post.
   */
  file?: string;
  /**
   * The password to decrypt the private keys.
   */
  password?: string;
};

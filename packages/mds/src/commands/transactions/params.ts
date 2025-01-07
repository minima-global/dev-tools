export type LogParams = {
  /**
   * (Optional) true or false. Setting it to true turns on detailed logs for *script errors.
   */
  scripts?: 'true' | 'false';
  /**
   *(Optional) true or false. Setting it to true turns on detailed logs for *mining start/end activity.
   */
  mining?: 'true' | 'false';
  /**
   * (Optional) true or false. Setting it to true turns on detailed logs for *maxima start/end activity.
   */
  maxima?: 'true' | 'false';
  /**
   * (Optional) true or false. Setting it to true turns on detailed logs for *networking start/end activity.
   */
  networking?: 'true' | 'false';
  /**
   * (Optional) true or false. Setting it to true turns on detailed logs for *blocks start/end activity.
   */
  blocks?: 'true' | 'false';
  /**
   * (Optional) true or false. Setting it to true turns on detailed logs for *ibd start/end activity.
   */
  ibd?: 'true' | 'false';
};

export type TxnParams = {
  /**
   * The id of the transaction to create.
   */
  id: string;
};

export type TxnExportParams = {
  /**
   * The id of the transaction to export.
   */
  id: string;

  /**
   * The file name/path to export the transaction to.
   */
  file?: string;
};

// TODO: Check and test this and add response type

export type TxnImportParams =
  | {
      data: string;
      id?: string;
    }
  | {
      file: string;
      id?: string;
    };

export type TxnInputParams = {
  /**
   * The id of the transaction to add an input to.
   */
  id: string;
  /**
   * (Optional) true or false, true will add an unspecified, floating ELTOO coin as an input.
   */
  floating?: 'true' | 'false';
  /**
   * (Optional) The address when using floating input
   */
  address?: string;
  /**
   * (Optional) The amount when using floating input
   */
  amount?: string;
  /**
   * (Optional) The tokenid when using floating input
   */
  tokenid?: string;
  /**
   * (Optional) true or false, true will add the scripts and MMR proof for the coin.
   */
  scriptmmr?: 'true' | 'false';
  /**
   * (Optional) The coinid of the coin to add as an input.
   */
  coinid?: string;
  /**
   * (Optional) The coindata to add as input
   */
  coindata?: string;
} & (
  | {
      floating: 'true';
      address: string;
      amount: string;
      tokenid: string;
    }
  | {
      coindata: string;
    }
  | {
      coinid: string;
    }
);

export type TxnDefaultParams1 = {
  id: string;
  scriptmmr?: 'true' | 'false';
  coinid?: string;
};

export type TxnDefaultParams2 = {
  id: string;
  scriptmmr?: 'true' | 'false';
  coindata?: string;
};

export type TxnListParams = {
  id: string;
};

export type TxnOutputParams = {
  id: string;
  amount: string;
  address: string;
  tokenid?: string;
  storestate?: 'true' | 'false';
};

export type TxnSignParams = {
  id: string;
  publickey: string | 'auto';
  txnpostauto?: 'true' | 'false';
  txnpostburn?: string;
  txnpostmine?: 'true' | 'false';
  txndelete?: 'true' | 'false';
};

export type TxnPostParams = {
  id: string;
  auto?: 'true' | 'false';
  burn?: string;
  mine?: 'true' | 'false';
  txndelete?: 'true' | 'false';
};

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
  file: string;
};

// TODO: Check and test this and add response type
export type TxnImportParams = {
  /**
   * (Optional) Choose an ID for the transaction you are importing.
   */
  id: string;
  /**
   * (Optional) File name/path to the previously exported .txn file.
   */
  file: string;
  /**
   * (Optional) HEX data of the previously exported transaction.
   */
  data: string;
};

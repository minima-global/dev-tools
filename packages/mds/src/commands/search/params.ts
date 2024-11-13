export type CoinsParams = {
  relevant?: 'true' | 'false';
  sendable?: 'true' | 'false';
  coinid?: string;
  amount?: number;
  address?: string;
  tokenid?: string;
  checkmempool?: 'true' | 'false';
  coinage?: number;
  order?: 'asc' | 'desc';
};

export type TokenAction = 'import' | 'export';

export type TokenParams = {
  action?: TokenAction;
  tokenid?: string;
  data?: string;
};

export type KeysParamsAction = 'list' | 'checkkeys' | 'new';

export type KeysListParams = {
  action: 'list';
  publickey?: string;
};

type BaseTxPowParams = {
  /**
   * true or false. Only list TxPoWs relevant to this node.
   */
  relevant?: 'true' | 'false';
  /**
   * Max relevant TxPoW to retrieve. Default 100.
   */
  max?: number;
};

type TxPowIdParams = BaseTxPowParams & {
  /**
   * TxPoW id of the TxPoW to search for.
   */
  txpowid: string;
  block?: never;
  address?: never;
  onchain?: never;
};

type BlockParams = BaseTxPowParams & {
  /**
   * Block number to search in. Must be in the unpruned chain.
   */
  block: number;
  txpowid?: never;
  address?: never;
  onchain?: never;
};

type AddressParams = BaseTxPowParams & {
  /**
   * 0x or Mx address. Search for TxPoWs containing this specific address.
   */
  address: string;
  block?: never;
  txpowid?: never;
  onchain?: never;
};

type OnChainParams = BaseTxPowParams & {
  /**
   * TxPoW id to search for on chain. Must be in the unpruned chain.
   */
  onchain: string;
  block?: never;
  txpowid?: never;
  address?: never;
};

export type TxPowParams =
  | TxPowIdParams
  | BlockParams
  | AddressParams
  | OnChainParams;

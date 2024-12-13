import type { MDSResponse } from '../../types.js';
import type { Token } from '../general/response.js';
import type { Transaction, Txn } from '../send/response.js';
import type { TokenParams } from './params.js';

export type TokensReturnType<S> = S extends TokenParams
  ? S['action'] extends 'export'
    ? MDSResponse<TokenExport>
    : S['action'] extends 'import'
      ? MDSResponse<Token>
      : S extends { tokenid: string }
        ? MDSResponse<Token>
        : MDSResponse<Token[]>
  : MDSResponse<Token[]>;

export type TokenExport = {
  tokenid: string;
  data: string;
};

export type KeysReturnType<S> = S extends 'list'
  ? MDSResponse<Key[]>
  : S extends 'checkkeys'
    ? MDSResponse<CheckKeys>
    : S extends 'new'
      ? MDSResponse<Key>
      : MDSResponse<Key[]>;

export type KeysResponse = MDSResponse<Key[]>;

export type CheckKeys = {
  allkeys: number;
  correct: number;
  wrong: number;
};

export type NewKeysResponse = MDSResponse<Key>;

export type TxPowReturnType<S> = S extends {
  params: any;
}
  ? S['params'] extends { address: string }
    ? MDSResponse<Transaction[]>
    : S['params'] extends { onchain: string }
      ? MDSResponse<TxPowOnchain>
      : S['params'] extends { action: 'info' }
        ? MDSResponse<TxPowInfo>
        : MDSResponse<Transaction>
  : never;

export type TxPowOnchain = {
  found: true;
  block: string;
  blockid: string;
  tip: string;
  confirmations: string;
};

export type TxPowInfo = {
  txpowdb: {
    size: number;
  };
  onchaindb: {
    size: number;
    first: {
      found: boolean;
      blockid: string;
      block: number;
      timemilli: string;
      date: string;
    };
    last: {
      found: boolean;
      blockid: string;
      block: number;
      timemilli: string;
      date: string;
    };
  };
};

export type Key = {
  size: number;
  depth: number;
  uses: number;
  maxuses: number;
  modifier: string;
  publickey: string;
};

export type ScanChain = {
  depth: number;
  blocks: ScanChainBlock[];
};

type ScanChainBlock = {
  block: number;
  depth: number;
  timemilli: string;
  date: string;
  txpowid: string;
  transactions: Txn[];
  isburntransaction: boolean;
};

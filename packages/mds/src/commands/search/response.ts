import type { MDSResObj } from '../../types.js';
import type { Token } from '../general/response.js';
import type { Transaction, Txn } from '../send/response.js';
import type { TokenParams } from './params.js';

export type TokensReturnType<S> = S extends TokenParams
  ? S['action'] extends 'export'
    ? MDSResObj<TokenExport>
    : S['action'] extends 'import'
      ? MDSResObj<Token>
      : S extends { tokenid: string }
        ? MDSResObj<Token>
        : MDSResObj<Token[]>
  : MDSResObj<Token[]>;

export type TokenExport = {
  tokenid: string;
  data: string;
};

export type KeysReturnType<S> = S extends 'list'
  ? MDSResObj<Key[]>
  : S extends 'checkkeys'
    ? MDSResObj<CheckKeys>
    : S extends 'new'
      ? MDSResObj<Key>
      : MDSResObj<Key[]>;

export type KeysResponse = MDSResObj<Key[]>;

export type CheckKeys = {
  allkeys: number;
  correct: number;
  wrong: number;
};

export type NewKeysResponse = MDSResObj<Key>;

export type TxPowReturnType<S> = S extends {
  params: any;
}
  ? S['params'] extends { address: string }
    ? MDSResObj<Transaction[]>
    : MDSResObj<Transaction>
  : never;

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

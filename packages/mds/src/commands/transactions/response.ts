import type { MDSResponse } from '../../types.js';
import type { Header, Txn, Witness } from '../send/response.js';
import type { TxnExportParams, TxnSignParams } from './params.js';

export type Burn = {
  '1block': BlockBurn;
  '10block': BlockBurn;
  '50block': BlockBurn;
};

export type BlockBurn = {
  txns: number;
  max: number;
  med: number;
  avg: number;
  min: number;
};

export type Log = {
  scripts: boolean;
  mining: boolean;
  maxima: boolean;
  networking: boolean;
  blocks: boolean;
  ibd: boolean;
  peerschecker: boolean;
};

type Transaction = {
  inputs: any[];
  outputs: any[];
  state: any[];
  linkhash: string;
  transactionid: string;
};

export type TxnCheck = {
  tokens: number;
  inputs: number;
  outputs: number;
  burn: string;
  validamounts: boolean;
  signatures: number;
  valid: Valid;
};

export type Valid = {
  basic: boolean;
  signatures: boolean;
  mmrproofs: boolean;
  scripts: boolean;
};

export type TxnDelete = string;

export type TxnExportReturnType<S> = S extends {
  params: TxnExportParams;
}
  ? S['params'] extends { file: string }
    ? MDSResponse<TxnExport>
    : MDSResponse<TxnExportData>
  : never;

export type TxnExportData = {
  data: string;
};

export type TxnExport = {
  file: string;
  size: string;
};

export type TxnInput = {
  coinid: string;
  amount: string;
  address: string;
  miniaddress: string;
  tokenid: string;
  token: string | null;
  storestate: boolean;
  state: string[];
  spent: boolean;
  mmrentry: string;
};

export type TxnSign = {
  keys: string[];
};

export type TxSignPost = {
  keys: string[];
  txpow: TxPow;
  txnpostauto: boolean;
  txnpostburn: string;
  txnpostmine: boolean;
  delete: boolean;
};

export type TxnPost = {
  txpowid: string;
  isblock: boolean;
  istransaction: boolean;
  superblock: number;
  size: number;
  burn: number;
  header: Header;
  hasbody: boolean;
  body: Body;
};

export type TxnSignReturnType<S> = S extends {
  params: TxnSignParams;
}
  ? S['params'] extends { txnpostauto: 'true' }
    ? MDSResponse<TxSignPost>
    : MDSResponse<TxnSign>
  : MDSResponse<TxnSign>;

export type TxPow = {
  txpowid: string;
  isblock: boolean;
  istransaction: boolean;
  superblock: number;
  size: number;
  burn: number;
  header: Header;
  hasbody: boolean;
  body: Body;
};

//TODO: Add txnstate response
export type TxnArray = [
  MDSResponse<Txn>,
  MDSResponse<TxnInput>,
  MDSResponse<Txn>,
  MDSResponse<Txn>,
  MDSResponse<TxnExportData>,
  MDSResponse<TxnDelete>,
];

import type { MDSResObj } from '../../types.js';
import type { Header, Witness } from '../send/response.js';
import type { TxnExportParams } from './params.js';

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

export type Txn = {
  id: string;
  transaction: Transaction;
  witness: Witness;
  outputcoindata: any[];
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

export type ExportReturnType<S> = S extends {
  params: TxnExportParams;
}
  ? S['params'] extends { file: string }
    ? MDSResObj<TxnExport>
    : MDSResObj<TxnExportData>
  : never;

export type TxnExportData = {
  data: string;
};

export type TxnExport = {
  file: string;
  size: string;
};

export type TxnInputResponse = MDSResObj<{
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
}>;

export type TxnSignResponse = MDSResObj<{
  keys: string[];
}>;

export type TxSignPostResponse = MDSResObj<{
  keys: string[];
  txpow: TxPow;
  txnpostauto: boolean;
  txnpostburn: string;
  txnpostmine: boolean;
  delete: boolean;
}>;

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
  params: any;
}
  ? S['params'] extends { txnpostauto: 'true' }
    ? TxSignPostResponse
    : TxnSignResponse
  : TxnSignResponse;

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
  Txn,
  TxnInputResponse,
  Txn,
  Txn,
  MDSResObj<TxnExportData>,
  TxnDelete,
];

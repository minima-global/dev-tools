import type { MDSResObj } from '../../types.js';
import type { Witness } from '../send/response.js';

export type BurnResponse = MDSResObj<{
  '1block': Burn;
  '10block': Burn;
  '50block': Burn;
}>;

export type Burn = {
  txns: number;
  max: number;
  med: number;
  avg: number;
  min: number;
};

export type LogResponse = MDSResObj<{
  scripts: boolean;
  mining: boolean;
  maxima: boolean;
  networking: boolean;
  blocks: boolean;
  ibd: boolean;
  peerschecker: boolean;
}>;

export type TxnResponse = MDSResObj<{
  id: string;
  transaction: Transaction;
  witness: Witness;
  outputcoindata: any[];
}>;

export type Transaction = {
  inputs: any[];
  outputs: any[];
  state: any[];
  linkhash: string;
  transactionid: string;
};

export type TxnCheckResponse = MDSResObj<{
  tokens: number;
  inputs: number;
  outputs: number;
  burn: string;
  validamounts: boolean;
  signatures: number;
  valid: Valid;
}>;

export type Valid = {
  basic: boolean;
  signatures: boolean;
  mmrproofs: boolean;
  scripts: boolean;
};

export type TxnDeleteResponse = MDSResObj<string>;

export type ExportReturnType<S> = S extends {
  params: any;
}
  ? S['params'] extends { file: string }
    ? TxnExportResponse
    : TxnExportDataResponse
  : never;

export type TxnExportDataResponse = MDSResObj<{
  data: string;
}>;

export type TxnExportResponse = MDSResObj<{
  file: string;
  size: string;
}>;

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

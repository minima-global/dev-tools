import type { MDSResObj } from '../../types.js';
import type { Coin } from '../general/response.js';
import type {
  TxnArray,
  TxnDeleteResponse,
  TxnExportResponse,
  TxnResponse,
  TxnSignResponse,
} from '../transactions/response.js';

export type SendResponse = MDSResObj<Transaction>;

export type SendPollResponse = MDSResObj<{
  command: string;
}>;

export type SendNoSignResponse = MDSResObj<{
  txpow: string;
}>;

export type SendTxPowResponse = MDSResObj<{
  txpow: Transaction;
}>;

export type ReturnTypeMultiSig<S> = S extends {
  params: any;
}
  ? S['params'] extends { action: 'create' }
    ? CreateMultiSigResponse
    : S['params'] extends { action: 'getkey' }
      ? GetKeyMultiSigResponse
      : S['params'] extends { action: 'spend' }
        ? SpendMultiSigResponse
        : S['params'] extends { action: 'sign' }
          ? SignMultiSigResponse
          : S['params'] extends { action: 'view' }
            ? MultiSigViewResponse
            : S['params'] extends { action: 'post' }
              ? PostMultiSigResponse
              : S['params'] extends { action: 'list' }
                ? ListMultiSigResponse
                : never
  : never;

export type CreateMultiSigResponse = MDSResObj<{
  send: Transaction;
  id: string;
}>;

export type GetKeyMultiSigResponse = MDSResObj<{
  publickey: string;
}>;

export type SpendMultiSigResponse = MDSResObj<TxnArray>;

export type SignMultiSigResponse = MDSResObj<
  [TxnSignResponse, TxnExportResponse, TxnDeleteResponse]
>;

export type PostMultiSigResponse = MDSResObj<Transaction>;

export type MultiSigViewResponse = MDSResObj<[TxnResponse, TxnDeleteResponse]>;

export type ListMultiSigResponse = MDSResObj<Coin[]>;

export interface Transaction {
  txpowid: string;
  isblock: boolean;
  istransaction: boolean;
  superblock: number;
  size: number;
  burn: number;
  header: Header;
  hasbody: boolean;
  body: Body;
}

export interface Header {
  chainid: string;
  block: string;
  blkdiff: string;
  cascadelevels: number;
  superparents: Superparent[];
  magic: Magic;
  mmr: string;
  total: string;
  customhash: string;
  txbodyhash: string;
  nonce: string;
  timemilli: string;
  date: string;
}

export interface Superparent {
  difficulty: number;
  count: number;
  parent: string;
}

export interface Magic {
  currentmaxtxpowsize: string;
  currentmaxkissvmops: string;
  currentmaxtxn: string;
  currentmintxpowwork: string;
  desiredmaxtxpowsize: string;
  desiredmaxkissvmops: string;
  desiredmaxtxn: string;
  desiredmintxpowwork: string;
}

export interface Body {
  prng: string;
  txndiff: string;
  txn: Txn;
  witness: Witness;
  burntxn: Burntxn;
  burnwitness: Burnwitness;
  txnlist: any[];
}

export interface Txn {
  inputs: Input[];
  outputs: Output[];
  state: any[];
  linkhash: string;
  transactionid: string;
}

export interface Input {
  coinid: string;
  amount: string;
  address: string;
  miniaddress: string;
  tokenid: string;
  token: any;
  storestate: boolean;
  state: any[];
  spent: boolean;
  mmrentry: string;
  created: string;
}

export interface Output {
  coinid: string;
  amount: string;
  address: string;
  miniaddress: string;
  tokenid: string;
  token: any;
  storestate: boolean;
  state: any[];
  spent: boolean;
  mmrentry: string;
  created: string;
}

export interface Witness {
  signatures: Signature[];
  mmrproofs: Mmrproof[];
  scripts: Script[];
}

export interface Signature {
  signatures: Signature2[];
}

export interface Signature2 {
  publickey: string;
  rootkey: string;
  proof: Proof;
  signature: string;
}

export interface Proof {
  blocktime: string;
  proof: Proof2[];
  prooflength: number;
}

export interface Proof2 {
  left: boolean;
  data: Data;
}

export interface Data {
  data: string;
  value: string;
}

export interface Mmrproof {
  coin: Coin;
  proof: Proof3;
}

export interface Proof3 {
  blocktime: string;
  proof: Proof4[];
  prooflength: number;
}

export interface Proof4 {
  left: boolean;
  data: Data2;
}

export interface Data2 {
  data: string;
  value: string;
}

export interface Script {
  script: string;
  address: string;
  proof: Proof5;
}

export interface Proof5 {
  blocktime: string;
  proof: any[];
  prooflength: number;
}

export interface Burntxn {
  inputs: any[];
  outputs: any[];
  state: any[];
  linkhash: string;
  transactionid: string;
}

export interface Burnwitness {
  signatures: any[];
  mmrproofs: any[];
  scripts: any[];
}

import type { MDSResponse } from '../../types.js';
import type { Coin } from '../general/response.js';
import type {
  TxnArray,
  TxnDelete,
  TxnExport,
  TxnSign,
} from '../transactions/response.js';
import type { MultiSigParams } from './params.js';

export type SendPoll = {
  command: string;
};

export type SendNoSign = {
  txpow: string;
};

export type SendTxPow = {
  txpow: Transaction;
};

export type ReturnTypeMultiSig<S> = S extends MultiSigParams
  ? S['action'] extends 'create'
    ? MDSResponse<CreateMultiSig>
    : S['action'] extends 'getkey'
      ? MDSResponse<GetKeyMultiSig>
      : S['action'] extends 'spend'
        ? MDSResponse<TxnArray>
        : S['action'] extends 'sign'
          ? MDSResponse<SignMultiSig>
          : S['action'] extends 'view'
            ? MDSResponse<MultiSigView>
            : S['action'] extends 'post'
              ? MDSResponse<Transaction>
              : S['action'] extends 'list'
                ? MDSResponse<ListMultiSig>
                : never
  : never;

export type CreateMultiSig = {
  send: Transaction;
  id: string;
};

export type GetKeyMultiSig = {
  publickey: string;
};

export type SignMultiSig = [
  MDSResponse<TxnSign>,
  MDSResponse<TxnExport>,
  MDSResponse<TxnDelete>,
];

export type MultiSigView = [MDSResponse<Txn>, MDSResponse<TxnDelete>];

export type ListMultiSig = Coin[];

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
  scripts: ScriptSend[];
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

export interface ScriptSend {
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

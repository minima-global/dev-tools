import type { MDSResObj } from '../../types.js';
import type { Coin, Key, Token } from '../general/response.js';
import type { Transaction } from '../send/response.js';
import type { TokenParams } from './params.js';

export type CoinsResponse = MDSResObj<Coin[]>;

export module Tokens {
  export type ReturnType<S> = S extends TokenParams
    ? S['action'] extends 'export'
      ? TokenExportResponse
      : S['action'] extends 'import'
        ? TokenResponseSingle
        : S extends { tokenid: string }
          ? TokenResponseSingle
          : TokensResponse
    : TokensResponse;

  export type TokensResponse = MDSResObj<Token[]>;

  export type TokenExportResponse = MDSResObj<{
    tokenid: string;
    data: string;
  }>;

  export type TokenResponseSingle = MDSResObj<Token>;
}

export type KeysReturnType<S> = S extends 'list'
  ? KeysResponse
  : S extends 'checkkeys'
    ? CheckKeysResponse
    : S extends 'new'
      ? NewKeysResponse
      : KeysResponse;

export type KeysResponse = MDSResObj<Key[]>;

export type CheckKeysResponse = MDSResObj<{
  allkeys: number;
  correct: number;
  wrong: number;
}>;

export type NewKeysResponse = MDSResObj<Key>;

export type TxPowReturnType<S> = S extends {
  params: any;
}
  ? S['params'] extends { address: string }
    ? TxPowAddressResponse
    : TxPowResponse
  : never;

export type TxPowAddressResponse = MDSResObj<Transaction[]>;
export type TxPowResponse = MDSResObj<Transaction>;

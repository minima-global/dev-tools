import type { MDSResObj } from '../../types.js';
import type { Coin, Token } from '../general/response.js';

export type CoinsResponse = MDSResObj<Coin[]>;

export module Tokens {
  export type ReturnType<S> = S extends {
    params: any;
  }
    ? S['params'] extends { action: 'export' }
      ? TokenExportResponse
      : S['params'] extends { action: 'import' }
        ? TokenImportResponse
        : TokensResponse
    : TokensResponse;
  export type TokensResponse = MDSResObj<Token[]>;

  export type TokenExportResponse = MDSResObj<{
    tokenid: string;
    data: string;
  }>;

  export type TokenImportResponse = MDSResObj<Token>;
}

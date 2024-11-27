import type { MDSResObj } from '../../types.js';
import type { Coin } from '../general/response.js';
import type {
  CoinsParams,
  KeysListParams,
  KeysParamsAction,
  ScanChainParams,
  TokenExportParams,
  TokenImportParams,
  TokenParams,
  TxPowParams,
} from './params.js';
import type {
  KeysReturnType,
  ScanChain,
  TokensReturnType,
  TxPowReturnType,
} from './response.js';

/**
 * Coins function types
 */

type CoinsCallback = (data: MDSResObj<Coin[]>) => void;

export type CoinsFunc = <T extends CoinsParams | undefined>(
  ...args: T extends undefined
    ? [CoinsCallback?]
    : [{ params: CoinsParams }, CoinsCallback?]
) => Promise<MDSResObj<Coin[]>>;

/**
 * Tokens function types
 */

export type ActionParamMapTokens = {
  readonly import: TokenImportParams;
  readonly export: TokenExportParams;
};

export type TokensParamType<A extends TokenParams | undefined> = A extends {
  action: keyof ActionParamMapTokens;
}
  ? ActionParamMapTokens[A['action']]
  : A;

export type TokensFuncParams<A extends TokenParams | undefined> = [
  { params: TokensParamType<A> },
  TokensCallback<A>?,
];

type TokensCallback<T> = (data: TokensReturnType<T>) => void;

export type TokensFunc = <T extends TokenParams | undefined>(
  ...args: T extends undefined ? [TokensCallback<T>?] : TokensFuncParams<T>
) => Promise<TokensReturnType<T>>;

/**
 * Keys function types
 */

type KeysCallback<T> = (data: KeysReturnType<T>) => void;

export type KeysFunc = <T extends KeysParamsAction | undefined>(
  ...args: T extends undefined
    ? [KeysCallback<T>?]
    : T extends 'list'
      ? [{ params: KeysListParams }, KeysCallback<T>?]
      : [{ params: { action: T } }, KeysCallback<T>?]
) => Promise<KeysReturnType<T>>;

type TxPowCallback<T> = (data: TxPowReturnType<T>) => void;

export type TxPowFunc = <T extends { params: TxPowParams }>(
  ...args: T extends { params: TxPowParams }
    ? [{ params: TxPowParams }, TxPowCallback<T>?]
    : [T, TxPowCallback<T>?]
) => Promise<TxPowReturnType<T>>;

export type ScanChainFunc = (
  args: { params: ScanChainParams },
  callback?: (data: MDSResObj<ScanChain>) => void,
) => Promise<MDSResObj<ScanChain>>;

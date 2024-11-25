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

type CoinsCallback = (data: MDSResObj<Coin[]>) => void;

export type CoinsFunc = <T extends CoinsParams | undefined>(
  ...args: T extends undefined
    ? [CoinsCallback?]
    : [{ params: CoinsParams }, CoinsCallback?]
) => Promise<MDSResObj<Coin[]>>;

type TokensCallback<T> = (data: TokensReturnType<T>) => void;

export type TokensFunc = <T extends TokenParams | undefined>(
  ...args: T extends undefined
    ? [TokensCallback<T>?]
    : T extends { action: 'import' }
      ? [{ params: TokenImportParams }, TokensCallback<T>?]
      : T extends { action: 'export' }
        ? [{ params: TokenExportParams }, TokensCallback<T>?]
        : [{ params: T }, TokensCallback<T>?]
) => Promise<TokensReturnType<T>>;

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

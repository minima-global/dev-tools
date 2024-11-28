import type { MDSResObj } from '../../types.js';
import type { Txn } from '../send/response.js';
import type {
  LogParams,
  TxnExportParams,
  TxnImportParams,
  TxnInputParams,
  TxnListParams,
  TxnOutputParams,
  TxnParams,
  TxnPostParams,
  TxnSignParams,
} from './params.js';
import type {
  Burn,
  Log,
  TxnCheck,
  TxnDelete,
  TxnExportReturnType,
  TxnInput,
  TxnPost,
  TxnSignReturnType,
} from './response.js';

/**
 * Burn function types
 */

type BurnCallback = (data: MDSResObj<Burn>) => void;

export type BurnFunc = (callback?: BurnCallback) => Promise<MDSResObj<Burn>>;

/**
 * Log function types
 */

type LogCallback = (data: MDSResObj<Log>) => void;

export type LogFunc = (
  args: { params: LogParams },
  callback?: LogCallback,
) => Promise<MDSResObj<Log>>;

/**
 * Txn function types
 */

type TxnCallback = (data: MDSResObj<Txn>) => void;

export type TxnFunc = (
  args: { params: TxnParams },
  callback?: TxnCallback,
) => Promise<MDSResObj<Txn>>;

/**
 * TxnCheck function types
 */

type TxnCheckCallback = (data: MDSResObj<TxnCheck>) => void;

export type TxnCheckFunc = (
  args: { params: TxnParams },
  callback?: TxnCheckCallback,
) => Promise<MDSResObj<TxnCheck>>;

/**
 * TxnDelete function types
 */

type TxnDeleteCallback = (data: MDSResObj<TxnDelete>) => void;

export type TxnDeleteFunc = (
  args: { params: TxnParams },
  callback?: TxnDeleteCallback,
) => Promise<MDSResObj<TxnDelete>>;

/**
 * TxnExport function types
 */

type TxnExportCallback<T> = (data: TxnExportReturnType<T>) => void;

export type TxnExportFunc = <T extends { params: TxnExportParams }>(
  ...args: T extends { params: TxnExportParams }
    ? [{ params: TxnExportParams }, TxnExportCallback<T>?]
    : [T, TxnExportCallback<T>?]
) => Promise<TxnExportReturnType<T>>;

/**
 * TxnImport function types
 */

type TxnImportCallback = (data: MDSResObj<Txn>) => void;

export type TxnImportFunc = (
  args: { params: TxnImportParams },
  callback?: TxnImportCallback,
) => Promise<MDSResObj<Txn>>;

/**
 * TxnInput function types
 */

type TxnInputCallback = (data: MDSResObj<TxnInput>) => void;

export type TxnInputFunc = (
  args: { params: TxnInputParams },
  callback?: TxnInputCallback,
) => Promise<MDSResObj<TxnInput>>;

/**
 * TxnList function types
 */

type TxnListCallback = (data: MDSResObj<Txn>) => void;

type TxnListFuncParams<T extends TxnListParams | undefined> =
  T extends undefined
    ? [TxnListCallback?]
    : [{ params: TxnListParams }, TxnListCallback?];

export type TxnListFunc = <T extends TxnListParams | undefined>(
  ...args: TxnListFuncParams<T>
) => Promise<MDSResObj<Txn>>;

/**
 * TxnOutput function types
 */

type TxnOutputCallback = (data: MDSResObj<Txn>) => void;

export type TxnOutputFunc = (
  args: { params: TxnOutputParams },
  callback?: TxnOutputCallback,
) => Promise<MDSResObj<Txn>>;

/**
 * TxnSign function types
 */

type TxnSignCallback<T> = (data: TxnSignReturnType<T>) => void;

export type TxnSignFunc = <T extends { params: TxnSignParams }>(
  ...args: T extends { params: TxnSignParams }
    ? [{ params: TxnSignParams }, TxnSignCallback<T>?]
    : [T, TxnSignCallback<T>?]
) => Promise<TxnSignReturnType<T>>;

/**
 * TxnPost function types
 */

type TxnPostCallback = (data: MDSResObj<TxnPost>) => void;

export type TxnPostFunc = (
  args: { params: TxnPostParams },
  callback?: TxnPostCallback,
) => Promise<MDSResObj<TxnPost>>;

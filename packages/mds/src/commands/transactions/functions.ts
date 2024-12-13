import type { MDSResponse } from '../../types.js';
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

type BurnCallback = (data: MDSResponse<Burn>) => void;

export type BurnFunc = (callback?: BurnCallback) => Promise<MDSResponse<Burn>>;

/**
 * Log function types
 */

type LogCallback = (data: MDSResponse<Log>) => void;

export type LogFunc = (
  args: { params: LogParams },
  callback?: LogCallback,
) => Promise<MDSResponse<Log>>;

/**
 * Txn function types
 */

type TxnCallback = (data: MDSResponse<Txn>) => void;

export type TxnFunc = (
  args: { params: TxnParams },
  callback?: TxnCallback,
) => Promise<MDSResponse<Txn>>;

/**
 * TxnCheck function types
 */

type TxnCheckCallback = (data: MDSResponse<TxnCheck>) => void;

export type TxnCheckFunc = (
  args: { params: TxnParams },
  callback?: TxnCheckCallback,
) => Promise<MDSResponse<TxnCheck>>;

/**
 * TxnDelete function types
 */

type TxnDeleteCallback = (data: MDSResponse<TxnDelete>) => void;

export type TxnDeleteFunc = (
  args: { params: TxnParams },
  callback?: TxnDeleteCallback,
) => Promise<MDSResponse<TxnDelete>>;

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

type TxnImportCallback = (data: MDSResponse<Txn>) => void;

export type TxnImportFunc = (
  args: { params: TxnImportParams },
  callback?: TxnImportCallback,
) => Promise<MDSResponse<Txn>>;

/**
 * TxnInput function types
 */

type TxnInputCallback = (data: MDSResponse<TxnInput>) => void;

export type TxnInputFunc = (
  args: { params: TxnInputParams },
  callback?: TxnInputCallback,
) => Promise<MDSResponse<TxnInput>>;

/**
 * TxnList function types
 */

type TxnListCallback = (data: MDSResponse<Txn>) => void;

type TxnListFuncParams<T extends TxnListParams | undefined> =
  T extends undefined
    ? [TxnListCallback?]
    : [{ params: TxnListParams }, TxnListCallback?];

export type TxnListFunc = <T extends TxnListParams | undefined>(
  ...args: TxnListFuncParams<T>
) => Promise<MDSResponse<Txn>>;

/**
 * TxnOutput function types
 */

type TxnOutputCallback = (data: MDSResponse<Txn>) => void;

export type TxnOutputFunc = (
  args: { params: TxnOutputParams },
  callback?: TxnOutputCallback,
) => Promise<MDSResponse<Txn>>;

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

type TxnPostCallback = (data: MDSResponse<TxnPost>) => void;

export type TxnPostFunc = (
  args: { params: TxnPostParams },
  callback?: TxnPostCallback,
) => Promise<MDSResponse<TxnPost>>;

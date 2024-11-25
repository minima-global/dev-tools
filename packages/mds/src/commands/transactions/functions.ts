import type { MDSResObj } from '../../types.js';
import type { Txn } from '../send/response.js';
import type {
  LogParams,
  TxnExportParams,
  TxnImportParams,
  TxnListParams,
  TxnOutputParams,
  TxnParams,
  TxnPostParams,
  TxnSignParams,
} from './params.js';
import type {
  Burn,
  ExportReturnType,
  Log,
  TxnCheck,
  TxnDelete,
  TxnInput,
  TxnPost,
  TxnSignReturnType,
} from './response.js';

export type BurnFunc = (
  callback?: (data: MDSResObj<Burn>) => void,
) => Promise<MDSResObj<Burn>>;

export type LogFunc = (
  args: { params: LogParams },
  callback?: (data: MDSResObj<Log>) => void,
) => Promise<MDSResObj<Log>>;

export type TxnFunc = (
  args: { params: TxnParams },
  callback?: (data: MDSResObj<Txn>) => void,
) => Promise<MDSResObj<Txn>>;

export type TxnCheckFunc = (
  args: { params: TxnParams },
  callback?: (data: MDSResObj<TxnCheck>) => void,
) => Promise<MDSResObj<TxnCheck>>;

export type TxnDeleteFunc = (
  args: { params: TxnParams },
  callback?: (data: MDSResObj<TxnDelete>) => void,
) => Promise<MDSResObj<TxnDelete>>;

export type TxnExportFunc = <T extends { params: TxnExportParams }>(
  ...args: T extends TxnExportParams
    ? [T, callback?: (data: ExportReturnType<T>) => void]
    : [
        { params: TxnExportParams },
        callback?: (data: ExportReturnType<T>) => void,
      ]
) => Promise<ExportReturnType<T>>;

export type TxnImportFunc = (
  args: { params: TxnImportParams },
  callback?: (data: MDSResObj<Txn>) => void,
) => Promise<MDSResObj<Txn>>;

// TODO: FIX THIS
export type TxnInputFunc = {
  (
    args: {
      params: {
        id: string;
        floating: 'true';
        address: string;
        amount: string;
        tokenid: string;
        scriptmmr?: string; // Optional
      };
    },
    callback?: (data: MDSResObj<TxnInput>) => void,
  ): Promise<MDSResObj<TxnInput>>;

  (
    args: {
      params: {
        id: string;
        coindata: string;
        scriptmmr?: 'true' | 'false';
      };
    },
    callback?: (data: MDSResObj<TxnInput>) => void,
  ): Promise<MDSResObj<TxnInput>>;
  (
    args: {
      params: {
        id: string;
        coinid: string;
        scriptmmr?: 'true' | 'false';
      };
    },
    callback?: (data: MDSResObj<TxnInput>) => void,
  ): Promise<MDSResObj<TxnInput>>;
};

export type TxnList = (
  args: { params: TxnListParams },
  callback?: (data: MDSResObj<Txn>) => void,
) => Promise<MDSResObj<Txn>>;

export type TxnOutputFunc = (
  args: { params: TxnOutputParams },
  callback?: (data: MDSResObj<Txn>) => void,
) => Promise<MDSResObj<Txn>>;

type TxnSignCallback<T> = (data: TxnSignReturnType<T>) => void;

export type TxnSignFunc = <T extends { params: TxnSignParams }>(
  ...args: T extends { params: TxnSignParams }
    ? [{ params: TxnSignParams }, TxnSignCallback<T>?]
    : [T, TxnSignCallback<T>?]
) => Promise<TxnSignReturnType<T>>;

export type TxnPostFunc = (
  args: { params: TxnPostParams },
  callback?: (data: MDSResObj<TxnPost>) => void,
) => Promise<MDSResObj<TxnPost>>;

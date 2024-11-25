import type { MDSResObj } from '../../types.js';
import type {
  BalanceParams,
  CheckAddressParams,
  CoinCheckParams,
  CoinExportParams,
  CoinImportParams,
  CoinTrackParams,
  ConsolidateParams,
  HashTestParams,
  HistoryParams,
  PrintTreeParams,
  QuitParams,
  SeedRandomParams,
  StatusParams,
  TokenCreateParams,
  TokenValidateParams,
  TraceParams,
} from './params.js';
import type {
  BalanceReturnType,
  Block,
  CheckAddress,
  CoinCheck,
  CoinExportResponse,
  CoinImport,
  GetAddress,
  HashTest,
  HistoryResponse,
  NewAddress,
  PrintMmrResponse,
  PrintTree,
  Quit,
  SeedRandom,
  Status,
  TokenCreate,
  TokenValidate,
  Trace,
} from './response.js';

import type { Transaction } from '../send/response.js';

type BalanceCallback<T> = (data: BalanceReturnType<T>) => void;

export type BalanceFunc = <T extends { params: BalanceParams } | undefined>(
  ...args: T extends undefined
    ? [BalanceCallback<T>?]
    : T extends BalanceParams
      ? [T, BalanceCallback<T>?]
      : [{ params: BalanceParams }, BalanceCallback<T>?]
) => Promise<BalanceReturnType<T>>;

export type BlockFunc = (
  callback?: (data: MDSResObj<Block>) => void,
) => Promise<MDSResObj<Block>>;

export type CheckAddressFunc = (
  args: { params: CheckAddressParams },
  callback?: (data: MDSResObj<CheckAddress>) => void,
) => Promise<MDSResObj<CheckAddress>>;

export type CoinCheckFunc = (
  args: { params: CoinCheckParams },
  callback?: (data: MDSResObj<CoinCheck>) => void,
) => Promise<MDSResObj<CoinCheck>>;

type GetAddressCallback = (data: MDSResObj<GetAddress>) => void;

export type GetAddressFunc = (
  callback?: GetAddressCallback,
) => Promise<MDSResObj<GetAddress>>;

type HashTestCallback = (data: MDSResObj<HashTest>) => void;

export type HashTestFunc = <T extends { params: HashTestParams } | undefined>(
  ...args: T extends undefined
    ? [HashTestCallback?]
    : [{ params: HashTestParams }, HashTestCallback?]
) => Promise<MDSResObj<HashTest>>;

type CoinTrackCallback = (data: MDSResObj<string>) => void;

export type CoinTrackFunc = (
  args: { params: CoinTrackParams },
  callback?: CoinTrackCallback,
) => Promise<MDSResObj<string>>;

type NewAddressCallback = (data: MDSResObj<NewAddress>) => void;

export type NewAddressFunc = (
  callback?: NewAddressCallback,
) => Promise<MDSResObj<NewAddress>>;

type ConsolidateCallback = (data: MDSResObj<Transaction>) => void;

export type ConsolidateFunc = (
  args: { params: ConsolidateParams },
  callback?: ConsolidateCallback,
) => Promise<MDSResObj<Transaction>>;

export type TokenValidateFunc = (
  args: { params: TokenValidateParams },
  callback?: (data: MDSResObj<TokenValidate>) => void,
) => Promise<MDSResObj<TokenValidate>>;

export type TokenCreateFunc = (
  args: { params: TokenCreateParams },
  callback?: (data: MDSResObj<TokenCreate>) => void,
) => Promise<MDSResObj<TokenCreate>>;

export type TraceFunc = (
  args: { params: TraceParams },
  callback?: (data: MDSResObj<Trace>) => void,
) => Promise<MDSResObj<Trace>>;

type StatusCallback = (data: MDSResObj<Status>) => void;

export type StatusFunc = <T extends { params: StatusParams } | undefined>(
  ...args: T extends undefined
    ? [StatusCallback?]
    : [{ params: StatusParams }, StatusCallback?]
) => Promise<MDSResObj<Status>>;

export type SeedRandomFunc = (
  args: { params: SeedRandomParams },
  callback?: (data: MDSResObj<SeedRandom>) => void,
) => Promise<MDSResObj<SeedRandom>>;

type QuitCallback = (data: Quit) => void;

export type QuitFunc = <T extends { params: QuitParams } | undefined>(
  ...args: T extends undefined
    ? [QuitCallback?]
    : [{ params: QuitParams }, QuitCallback?]
) => Promise<Quit>;

type PrintTreeCallback = (data: MDSResObj<PrintTree>) => void;

export type PrintTreeFunc = <T extends { params: PrintTreeParams } | undefined>(
  ...args: T extends undefined
    ? [PrintTreeCallback?]
    : [{ params: PrintTreeParams }, PrintTreeCallback?]
) => Promise<MDSResObj<PrintTree>>;

export type PrintMmrFunc = (
  callback?: (data: MDSResObj<PrintMmrResponse>) => void,
) => Promise<MDSResObj<PrintMmrResponse>>;

type HistoryCallback = (data: MDSResObj<HistoryResponse>) => void;

export type HistoryFunc = <T extends { params: HistoryParams } | undefined>(
  ...args: T extends undefined
    ? [HistoryCallback?]
    : [{ params: HistoryParams }, HistoryCallback?]
) => Promise<MDSResObj<HistoryResponse>>;

export type CoinExportFunc = (
  args: { params: CoinExportParams },
  callback?: (data: MDSResObj<CoinExportResponse>) => void,
) => Promise<MDSResObj<CoinExportResponse>>;

export type CoinImportFunc = (
  args: { params: CoinImportParams },
  callback?: (data: MDSResObj<CoinImport>) => void,
) => Promise<MDSResObj<CoinImport>>;

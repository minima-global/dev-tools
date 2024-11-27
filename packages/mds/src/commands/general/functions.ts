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
import type { Prettify } from '../../helpers.js';

/**
 * Balance function types
 */
export type BalanceCallback<T> = (data: BalanceReturnType<T>) => void;

type BalanceFuncParams<T extends BalanceParams | undefined> =
  T extends undefined
    ? [BalanceCallback<T>?]
    : [{ params: BalanceParams }, BalanceCallback<T>?];

export type BalanceFunc = <T extends BalanceParams | undefined>(
  ...args: BalanceFuncParams<T>
) => Promise<BalanceReturnType<T>>;

/**
 * Block function types
 */

export type BlockCallback = (data: MDSResObj<Block>) => void;

export type BlockFunc = (callback?: BlockCallback) => Promise<MDSResObj<Block>>;

/**
 * CheckAddress function types
 */
export type CheckAddressCallback = (data: MDSResObj<CheckAddress>) => void;

export type CheckAddressFunc = (
  args: { params: CheckAddressParams },
  callback?: CheckAddressCallback,
) => Promise<MDSResObj<CheckAddress>>;

/**
 * CoinCheck function types
 */
export type CoinCheckCallback = (data: MDSResObj<CoinCheck>) => void;

export type CoinCheckFunc = (
  args: { params: CoinCheckParams },
  callback?: CoinCheckCallback,
) => Promise<MDSResObj<CoinCheck>>;

/**
 * GetAddress function types
 */

export type GetAddressCallback = (data: MDSResObj<GetAddress>) => void;

export type GetAddressFunc = (
  callback?: GetAddressCallback,
) => Promise<MDSResObj<GetAddress>>;

/**
 * HashTest function types
 */

export type HashTestCallback = (data: MDSResObj<HashTest>) => void;

type HashTestFuncParams<T extends HashTestParams | undefined> =
  T extends undefined
    ? [HashTestCallback?]
    : [{ params: HashTestParams }, HashTestCallback?];

export type HashTestFunc = <T extends HashTestParams | undefined>(
  ...args: HashTestFuncParams<T>
) => Promise<MDSResObj<HashTest>>;

/**
 * CoinTrack function types
 */

export type CoinTrackCallback = (data: MDSResObj<string>) => void;

export type CoinTrackFunc = (
  args: { params: CoinTrackParams },
  callback?: CoinTrackCallback,
) => Promise<MDSResObj<string>>;

/**
 * NewAddress function types
 */

export type NewAddressCallback = (data: MDSResObj<NewAddress>) => void;

export type NewAddressFunc = (
  callback?: NewAddressCallback,
) => Promise<MDSResObj<NewAddress>>;

/**
 * Consolidate function types
 */

export type ConsolidateCallback = (data: MDSResObj<Transaction>) => void;

export type ConsolidateFunc = (
  args: { params: ConsolidateParams },
  callback?: ConsolidateCallback,
) => Promise<MDSResObj<Transaction>>;

/**
 * TokenValidate function types
 */

export type TokenValidateCallback = (data: MDSResObj<TokenValidate>) => void;

export type TokenValidateFunc = (
  args: { params: TokenValidateParams },
  callback?: TokenValidateCallback,
) => Promise<MDSResObj<TokenValidate>>;

/**
 * TokenCreate function types
 */

export type TokenCreateCallback = (data: MDSResObj<TokenCreate>) => void;

export type TokenCreateFunc = (
  args: { params: TokenCreateParams },
  callback?: TokenCreateCallback,
) => Promise<MDSResObj<TokenCreate>>;

/**
 * Trace function types
 */

export type TraceCallback = (data: MDSResObj<Trace>) => void;

export type TraceFunc = (
  args: { params: TraceParams },
  callback?: TraceCallback,
) => Promise<MDSResObj<Trace>>;

/**
 * Status function types
 */

type StatusFuncParams<T extends StatusParams | undefined> = T extends undefined
  ? [StatusCallback?]
  : [{ params: StatusParams }, StatusCallback?];

export type StatusCallback = (data: MDSResObj<Status>) => void;

export type StatusFunc = <T extends StatusParams | undefined>(
  ...args: StatusFuncParams<T>
) => Promise<MDSResObj<Status>>;

/**
 * SeedRandom function types
 */

export type SeedRandomCallback = (data: MDSResObj<SeedRandom>) => void;

export type SeedRandomFunc = (
  args: { params: SeedRandomParams },
  callback?: SeedRandomCallback,
) => Promise<MDSResObj<SeedRandom>>;

/**
 * Quit function types
 */

export type QuitCallback = (data: Prettify<Quit>) => void;

type QuitFuncParams<T extends QuitParams | undefined> = T extends undefined
  ? [QuitCallback?]
  : [{ params: QuitParams }, QuitCallback?];

export type QuitFunc = <T extends QuitParams | undefined>(
  ...args: T extends undefined ? [QuitCallback?] : QuitFuncParams<T>
) => Promise<Prettify<Quit>>;

/**
 * PrintTree function types
 */

export type PrintTreeCallback = (data: MDSResObj<PrintTree>) => void;

type PrintTreeFuncParams<T extends PrintTreeParams | undefined> =
  T extends undefined
    ? [PrintTreeCallback?]
    : [{ params: PrintTreeParams }, PrintTreeCallback?];

export type PrintTreeFunc = <T extends PrintTreeParams | undefined>(
  ...args: T extends undefined ? [PrintTreeCallback?] : PrintTreeFuncParams<T>
) => Promise<MDSResObj<PrintTree>>;

/**
 * PrintMmr function types
 */

export type PrintMmrCallback = (data: MDSResObj<PrintMmrResponse>) => void;

export type PrintMmrFunc = (
  callback?: PrintMmrCallback,
) => Promise<MDSResObj<PrintMmrResponse>>;

/**
 * History function types
 */

export type HistoryCallback = (data: MDSResObj<HistoryResponse>) => void;

type HistoryFuncParams<T extends HistoryParams | undefined> =
  T extends undefined
    ? [HistoryCallback?]
    : [{ params: HistoryParams }, HistoryCallback?];

export type HistoryFunc = <T extends HistoryParams | undefined>(
  ...args: T extends undefined ? [HistoryCallback?] : HistoryFuncParams<T>
) => Promise<MDSResObj<HistoryResponse>>;

/**
 * CoinExport function types
 */

export type CoinExportCallback = (data: MDSResObj<CoinExportResponse>) => void;

export type CoinExportFunc = (
  args: { params: CoinExportParams },
  callback?: CoinExportCallback,
) => Promise<MDSResObj<CoinExportResponse>>;

/**
 * CoinImport function types
 */

export type CoinImportCallback = (data: MDSResObj<CoinImport>) => void;

export type CoinImportFunc = (
  args: { params: CoinImportParams },
  callback?: CoinImportCallback,
) => Promise<MDSResObj<CoinImport>>;

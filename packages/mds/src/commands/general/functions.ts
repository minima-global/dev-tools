import type { MDSResponse } from '../../types.js';
import type {
  BalanceParams,
  CheckAddressParams,
  CoinCheckParams,
  CoinExportParams,
  CoinImportParams,
  CoinTrackParams,
  ConsolidateParams,
  ConvertParams,
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
  Convert,
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

export type BalanceFunc = <T extends { params: BalanceParams } | undefined>(
  ...args: T extends undefined
    ? [BalanceCallback<T>?]
    : T extends BalanceParams
      ? [T, BalanceCallback<T>?]
      : [{ params: BalanceParams }, BalanceCallback<T>?]
) => Promise<BalanceReturnType<T>>;

/**
 * Block function types
 */

export type BlockCallback = (data: MDSResponse<Block>) => void;

export type BlockFunc = (
  callback?: BlockCallback,
) => Promise<MDSResponse<Block>>;

/**
 * CheckAddress function types
 */
export type CheckAddressCallback = (data: MDSResponse<CheckAddress>) => void;

export type CheckAddressFunc = (
  args: { params: CheckAddressParams },
  callback?: CheckAddressCallback,
) => Promise<MDSResponse<CheckAddress>>;

/**
 * CoinCheck function types
 */
export type CoinCheckCallback = (data: MDSResponse<CoinCheck>) => void;

export type CoinCheckFunc = (
  args: { params: CoinCheckParams },
  callback?: CoinCheckCallback,
) => Promise<MDSResponse<CoinCheck>>;

/**
 * GetAddress function types
 */

export type GetAddressCallback = (data: MDSResponse<GetAddress>) => void;

export type GetAddressFunc = (
  callback?: GetAddressCallback,
) => Promise<MDSResponse<GetAddress>>;

/**
 * HashTest function types
 */

export type HashTestCallback = (data: MDSResponse<HashTest>) => void;

type HashTestFuncParams<T extends HashTestParams | undefined> =
  T extends undefined
    ? [HashTestCallback?]
    : [{ params: HashTestParams }, HashTestCallback?];

export type HashTestFunc = <T extends HashTestParams | undefined>(
  ...args: HashTestFuncParams<T>
) => Promise<MDSResponse<HashTest>>;

/**
 * CoinTrack function types
 */

export type CoinTrackCallback = (data: MDSResponse<string>) => void;

export type CoinTrackFunc = (
  args: { params: CoinTrackParams },
  callback?: CoinTrackCallback,
) => Promise<MDSResponse<string>>;

/**
 * NewAddress function types
 */

export type NewAddressCallback = (data: MDSResponse<NewAddress>) => void;

export type NewAddressFunc = (
  callback?: NewAddressCallback,
) => Promise<MDSResponse<NewAddress>>;

/**
 * Consolidate function types
 */

export type ConsolidateCallback = (data: MDSResponse<Transaction>) => void;

export type ConsolidateFunc = (
  args: { params: ConsolidateParams },
  callback?: ConsolidateCallback,
) => Promise<MDSResponse<Transaction>>;

/**
 * TokenValidate function types
 */

export type TokenValidateCallback = (data: MDSResponse<TokenValidate>) => void;

export type TokenValidateFunc = (
  args: { params: TokenValidateParams },
  callback?: TokenValidateCallback,
) => Promise<MDSResponse<TokenValidate>>;

/**
 * TokenCreate function types
 */

export type TokenCreateCallback = (data: MDSResponse<TokenCreate>) => void;

export type TokenCreateFunc = (
  args: { params: TokenCreateParams },
  callback?: TokenCreateCallback,
) => Promise<MDSResponse<TokenCreate>>;

/**
 * Trace function types
 */

export type TraceCallback = (data: MDSResponse<Trace>) => void;

export type TraceFunc = (
  args: { params: TraceParams },
  callback?: TraceCallback,
) => Promise<MDSResponse<Trace>>;

/**
 * Status function types
 */

type StatusFuncParams<T extends StatusParams | undefined> = T extends undefined
  ? [StatusCallback?]
  : [{ params: StatusParams }, StatusCallback?];

export type StatusCallback = (data: MDSResponse<Status>) => void;

export type StatusFunc = <T extends StatusParams | undefined>(
  ...args: StatusFuncParams<T>
) => Promise<MDSResponse<Status>>;

/**
 * SeedRandom function types
 */

export type SeedRandomCallback = (data: MDSResponse<SeedRandom>) => void;

export type SeedRandomFunc = (
  args: { params: SeedRandomParams },
  callback?: SeedRandomCallback,
) => Promise<MDSResponse<SeedRandom>>;

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

export type PrintTreeCallback = (data: MDSResponse<PrintTree>) => void;

type PrintTreeFuncParams<T extends PrintTreeParams | undefined> =
  T extends undefined
    ? [PrintTreeCallback?]
    : [{ params: PrintTreeParams }, PrintTreeCallback?];

export type PrintTreeFunc = <T extends PrintTreeParams | undefined>(
  ...args: T extends undefined ? [PrintTreeCallback?] : PrintTreeFuncParams<T>
) => Promise<MDSResponse<PrintTree>>;

/**
 * PrintMmr function types
 */

export type PrintMmrCallback = (data: MDSResponse<PrintMmrResponse>) => void;

export type PrintMmrFunc = (
  callback?: PrintMmrCallback,
) => Promise<MDSResponse<PrintMmrResponse>>;

/**
 * History function types
 */

export type HistoryCallback = (data: MDSResponse<HistoryResponse>) => void;

type HistoryFuncParams<T extends HistoryParams | undefined> =
  T extends undefined
    ? [HistoryCallback?]
    : [{ params: HistoryParams }, HistoryCallback?];

export type HistoryFunc = <T extends HistoryParams | undefined>(
  ...args: T extends undefined ? [HistoryCallback?] : HistoryFuncParams<T>
) => Promise<MDSResponse<HistoryResponse>>;

/**
 * CoinExport function types
 */

export type CoinExportCallback = (
  data: MDSResponse<CoinExportResponse>,
) => void;

export type CoinExportFunc = (
  args: { params: CoinExportParams },
  callback?: CoinExportCallback,
) => Promise<MDSResponse<CoinExportResponse>>;

/**
 * CoinImport function types
 */

export type CoinImportCallback = (data: MDSResponse<CoinImport>) => void;

export type CoinImportFunc = (
  args: { params: CoinImportParams },
  callback?: CoinImportCallback,
) => Promise<MDSResponse<CoinImport>>;

/**
 * Convert function types
 */

export type ConvertCallback = (data: MDSResponse<Convert>) => void;

export type ConvertFunc = (
  args: { params: ConvertParams },
  callback?: ConvertCallback,
) => Promise<MDSResponse<Convert>>;

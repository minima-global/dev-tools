import type { Prettify } from '../../helpers.js';
import type { MDSResponse } from '../../types.js';
import type {
  ArchiveAddressCheckParams,
  ArchiveExportParams,
  ArchiveImportParams,
  ArchiveInspectParams,
  ArchiveParams,
  ArchiveResyncParams,
  BackupParams,
  MegaMmrFileParams,
  MegaMmrParams,
  MegaMmrResyncParams,
  MegaMmrSyncParams,
  ResetChainsyncParams,
  ResetRestoreParams,
  ResetParams,
  ResetSeedsyncParams,
  RestoreParams,
  RestoreSyncParams,
  VaultParams,
  VaultPasswordLockParams,
  VaultPasswordUnlockParams,
  VaultRestoreKeysParams,
  VaultWipeKeysParams,
  ArchiveIntegrityParams,
  ArchiveExportRawParams,
  MegaMmrInfoParams,
  MegaMmrMyDetailsParams,
  VaultSeedParams,
} from './params.js';
import type {
  ArchiveReturnType,
  Backup,
  BackupResObj,
  MegaMmmrReturnType,
  MegaMmrSyncReturnType,
  ResetReturnType,
  Restore,
  VaultReturnType,
} from './response.js';

/**
 * Archive function types
 */

export type ActionParamMap = {
  readonly resync: ArchiveResyncParams;
  readonly export: ArchiveExportParams;
  readonly import: ArchiveImportParams;
  readonly inspect: ArchiveInspectParams;
  readonly addresscheck: ArchiveAddressCheckParams;
  readonly integrity: ArchiveIntegrityParams;
  readonly exportraw: ArchiveExportRawParams;
};

export type ArchiveCallback<A> = (data: ArchiveReturnType<A>) => void;

export type ArchiveParamType<A extends ArchiveParams> = A extends {
  action: keyof ActionParamMap;
}
  ? ActionParamMap[A['action']]
  : A;

type ArchiveFuncParams<A extends ArchiveParams> = [
  { params: ArchiveParamType<A> },
  ArchiveCallback<A>?,
];

export type ArchiveFunc = <A extends ArchiveParams>(
  ...args: ArchiveFuncParams<A>
) => Promise<ArchiveReturnType<A>>;

/**
 * Backup function types
 */

type BackupCallback = (data: Prettify<BackupResObj<Backup>>) => void;

export type BackupFunc = (
  args: { params: BackupParams },
  callback?: BackupCallback,
) => Promise<Prettify<BackupResObj<Backup>>>;

/**
 * MegaMmr function types
 */

export type ActionParamMapMegaMmr = {
  readonly export: MegaMmrFileParams;
  readonly info: MegaMmrInfoParams;
};

export type ActionParamTypeMegaMmr<A> = A extends {
  action: keyof ActionParamMapMegaMmr;
}
  ? ActionParamMapMegaMmr[A['action']]
  : A;

export type MegaMmrCallback<A> = (data: MegaMmmrReturnType<A>) => void;

type MegaMmrFuncParams<A> = [
  { params: ActionParamTypeMegaMmr<A> },
  MegaMmrCallback<A>?,
];

export type MegaMmrFunc = <A extends MegaMmrParams>(
  ...args: MegaMmrFuncParams<A>
) => Promise<MegaMmmrReturnType<A>>;

/**
 * MegaMmrSync function types
 */

export type ActionParamMapMegaMmrSync = {
  readonly resync: MegaMmrResyncParams;
  readonly myDetails: MegaMmrMyDetailsParams;
};

type MegaMmrSyncCallback<A> = (data: MegaMmrSyncReturnType<A>) => void;

export type ActionParamTypeMegaMmrSync<A> = A extends {
  action: keyof ActionParamMapMegaMmrSync;
}
  ? ActionParamMapMegaMmrSync[A['action']]
  : A;

type MegaMmrSyncFuncParams<A> = [
  { params: ActionParamTypeMegaMmrSync<A> },
  MegaMmrSyncCallback<A>?,
];

export type MegaMmrSyncFunc = <A extends MegaMmrSyncParams>(
  ...args: MegaMmrSyncFuncParams<A>
) => Promise<MegaMmrSyncReturnType<A>>;

/**
 * Restore function types
 */

type RestoreCallback = (data: MDSResponse<Restore>) => void;

export type RestoreFunc = (
  args: { params: RestoreParams },
  callback?: RestoreCallback,
) => Promise<MDSResponse<Restore>>;

export type RestoreSyncFunc = (
  args: { params: RestoreSyncParams },
  callback?: RestoreCallback,
) => Promise<MDSResponse<Restore>>;

/**
 * Vault function types
 */

type VaultParamMap = {
  readonly seed: VaultSeedParams;
  readonly wipekeys: VaultWipeKeysParams;
  readonly restorekeys: VaultRestoreKeysParams;
  readonly passwordlock: VaultPasswordLockParams;
  readonly passwordunlock: VaultPasswordUnlockParams;
};

type VaultCallback<A> = (data: VaultReturnType<A>) => void;

export type ActionParamTypeVault<A> = A extends {
  action: keyof VaultParamMap;
}
  ? VaultParamMap[A['action']]
  : A;

type VaultFuncParams<A> = [
  { params: ActionParamTypeVault<A> },
  VaultCallback<A>?,
];

export type VaultFunc = <A extends VaultParams>(
  ...args: VaultFuncParams<A>
) => Promise<VaultReturnType<A>>;

/**
 * Reset function types
 */

export type ActionParamMapReset = {
  readonly chainsync: ResetChainsyncParams;
  readonly seedsync: ResetSeedsyncParams;
  readonly restore: ResetRestoreParams;
};

type ResetCallback<A> = (data: ResetReturnType<A>) => void;

export type ActionParamTypeReset<A> = A extends {
  action: keyof ActionParamMapReset;
}
  ? ActionParamMapReset[A['action']]
  : A;

type ResetFuncParams<A> = [
  { params: ActionParamTypeReset<A> },
  ResetCallback<A>?,
];

export type ResetFunc = <A extends ResetParams>(
  ...args: ResetFuncParams<A>
) => Promise<ResetReturnType<A>>;

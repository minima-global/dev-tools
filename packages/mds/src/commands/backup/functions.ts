import type { MDSResObj } from '../../types.js';
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

type ArchiveCallback<A> = (data: ArchiveReturnType<A>) => void;

export type ArchiveFunc = <A extends ArchiveParams>(
  ...args: A extends { action: 'resync' }
    ? [{ params: ArchiveResyncParams }, ArchiveCallback<A>?]
    : A extends { action: 'export' }
      ? [{ params: ArchiveExportParams }, ArchiveCallback<A>?]
      : A extends { action: 'import' }
        ? [{ params: ArchiveImportParams }, ArchiveCallback<A>?]
        : A extends { action: 'inspect' }
          ? [{ params: ArchiveInspectParams }, ArchiveCallback<A>?]
          : A extends { action: 'addresscheck' }
            ? [{ params: ArchiveAddressCheckParams }, ArchiveCallback<A>?]
            : [{ params: A }, ArchiveCallback<A>?]
) => Promise<ArchiveReturnType<A>>;

type BackupCallback = (data: BackupResObj<Backup>) => void;

export type BackupFunc = (
  args: { params: BackupParams },
  callback?: BackupCallback,
) => Promise<BackupResObj<Backup>>;

type MegaMmrCallback<A> = (data: MegaMmmrReturnType<A>) => void;
export type MegaMmrFunc = <A extends MegaMmrParams>(
  ...args: A extends { action: 'info' }
    ? [{ params: { action: A['action'] } }, MegaMmrCallback<A>?]
    : A extends { action: 'export' }
      ? [{ params: MegaMmrFileParams }, MegaMmrCallback<A>?]
      : A extends { action: 'import' }
        ? [{ params: MegaMmrFileParams }, MegaMmrCallback<A>?]
        : [{ params: A }, MegaMmrCallback<A>?]
) => Promise<MegaMmmrReturnType<A>>;

type MegaMmrSyncCallback<A> = (data: MegaMmrSyncReturnType<A>) => void;

export type MegaMmrSyncFunc = <A extends MegaMmrSyncParams>(
  ...args: A extends { action: 'myDetails' }
    ? [{ params: { action: A['action'] } }, MegaMmrSyncCallback<A>?]
    : A extends { action: 'resync' }
      ? [{ params: MegaMmrResyncParams }, MegaMmrSyncCallback<A>?]
      : [{ params: A }, MegaMmrSyncCallback<A>?]
) => Promise<MegaMmrSyncReturnType<A>>;

type RestoreCallback = (data: MDSResObj<Restore>) => void;

export type RestoreFunc = (
  args: { params: RestoreParams },
  callback?: RestoreCallback,
) => Promise<MDSResObj<Restore>>;

export type RestoreSyncFunc = (
  args: { params: RestoreSyncParams },
  callback?: RestoreCallback,
) => Promise<MDSResObj<Restore>>;

type VaultCallback<A> = (data: VaultReturnType<A>) => void;

export type VaultFunc = <A extends VaultParams | undefined>(
  ...args: A extends undefined
    ? [VaultCallback<A>?]
    : A extends { action: 'seed' }
      ? [{ params: { action: A['action'] } }, VaultCallback<A>?]
      : A extends { action: 'wipekeys' }
        ? [{ params: VaultWipeKeysParams }, VaultCallback<A>?]
        : A extends { action: 'restorekeys' }
          ? [{ params: VaultRestoreKeysParams }, VaultCallback<A>?]
          : A extends { action: 'passwordlock' }
            ? [{ params: VaultPasswordLockParams }, VaultCallback<A>?]
            : A extends { action: 'passwordunlock' }
              ? [{ params: VaultPasswordUnlockParams }, VaultCallback<A>?]
              : [{ params: A }, VaultCallback<A>?]
) => Promise<VaultReturnType<A>>;

type ResetCallback<A> = (data: ResetReturnType<A>) => void;

export type ResetFunc = <A extends ResetParams>(
  ...args: A extends { action: 'chainsync' }
    ? [{ params: ResetChainsyncParams }, ResetCallback<A>?]
    : A extends { action: 'seedsync' }
      ? [{ params: ResetSeedsyncParams }, ResetCallback<A>?]
      : A extends { action: 'restore' }
        ? [{ params: ResetRestoreParams }, ResetCallback<A>?]
        : [{ params: A }, ResetCallback<A>?]
) => Promise<ResetReturnType<A>>;

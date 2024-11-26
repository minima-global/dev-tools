export type ArchiveAction =
  | 'resync'
  | 'integrity'
  | 'export'
  | 'import'
  | 'inspect'
  | 'addresscheck'
  | 'exportraw';

export type ArchiveParams = {
  action: ArchiveAction;
};

export type ArchiveResyncParams = {
  action: 'resync';
  host: string;
  phrase?: string;
  anyphrase?: string; // TODO: check
  keyuses?: string;
};

export type ArchiveExportParams = {
  action: 'export';
  file?: string;
  maxexport?: string;
};

export type ArchiveExportRawParams = {
  action: 'exportraw';
  file?: string;
  maxexport?: string;
};

export type ArchiveImportParams = {
  action: 'import';
  file: string;
  phrase?: string;
  keyuses?: string;
  anyphrase?: string; // TODO: check
};

export type ArchiveAddressCheckParams = {
  action: 'addresscheck';
  address: string;
  statecheck?: string;
};

export type ArchiveInspectParams = {
  action: 'inspect';
  file: string;
};

export type BackupParams = {
  password: string;
  auto?: 'true' | 'false';
  file?: string;
  confirm?: string;
};

export type MegaMmrAction = 'info' | 'export' | 'import';

export type MegaMmrParams = {
  action: MegaMmrAction;
};

export type MegaMmrFileParams = {
  action: 'export' | 'import';
  file: string;
};

export type MegaMmrSyncAction = 'myDetails' | 'resync';

export type MegaMmrSyncParams = {
  action: MegaMmrSyncAction;
};

export type MegaMmrResyncParams = {
  action: 'resync';
  host: string;
  phrase?: string;
  anyphrase?: 'true' | 'false';
  keys?: string;
  keyuses?: string;
  file?: string;
  password?: string;
};

export type RestoreParams = {
  file: string;
  password?: string;
};

export type RestoreSyncParams = {
  file: string;
  password?: string;
  host?: string;
  keyuses?: string;
};

export type VaultAction =
  | 'seed'
  | 'wipekeys'
  | 'restorekeys'
  | 'passwordlock'
  | 'passwordunlock';

export type VaultParams = {
  action: VaultAction;
};

export type VaultWipeKeysParams = {
  action: 'wipekeys';
  seed: string;
};

export type VaultRestoreKeysParams = {
  action: 'restorekeys';
  phrase: string;
};

export type VaultPasswordLockParams = {
  action: 'passwordlock';
  password: string;
  confirm?: string;
};

export type VaultPasswordUnlockParams = {
  action: 'passwordunlock';
  password: string;
};

export type ResetAction = 'chainsync' | 'seedsync' | 'restore';

export type ResetParams = {
  action: ResetAction;
};

export type ResetChainsyncParams = {
  action: 'chainsync';
  archivefile: string;
};

export type ResetSeedsyncParams = {
  action: 'seedsync';
  phrase: string;
  keyuses?: string;
};

export type ResetRestoreParams = {
  action: 'restore';
  file: string;
  password?: string;
};

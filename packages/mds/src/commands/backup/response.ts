import type { DefaultRes, MDSResObj } from '../../types.js';
import type { Coin } from '../general/response.js';
import type {
  ArchiveParams,
  MegaMmrParams,
  MegaMmrSyncParams,
  ResetParams,
  VaultParams,
} from './params.js';

export type ArchiveIntegrity = {
  message: string;
  cascade: {
    exists: boolean;
    tip: number;
    length: number;
  };
  archive: {
    start: number;
    end: number;
    blocks: number;
  };
  valid: boolean;
  from: number;
  errors: number;
  recommend: string;
};

type AddressCheck = {
  block: number;
  data: string;
  datemilli: string;
  coin: Coin;
};

export type ArchiveReturnType<A> = A extends ArchiveParams
  ? A['action'] extends 'integrity'
    ? ArchiveIntegrityResponse
    : A['action'] extends 'export'
      ? ArchiveExportResponse
      : A['action'] extends 'import'
        ? ArchiveResponse
        : A['action'] extends 'inspect'
          ? ArchiveInspectResponse
          : A['action'] extends 'addresscheck'
            ? ArchiveAddressCheckResponse
            : A['action'] extends 'exportraw'
              ? ArchiveExportResponse
              : A['action'] extends 'resync'
                ? ArchiveResponse
                : never
  : never;

// Archive action: integrity
export type ArchiveIntegrityResponse = MDSResObj<ArchiveIntegrity>;

// action: export
export type ArchiveExportResponse = MDSResObj<{
  message: string;
  rows: number;
  file: string;
  size: string;
}>;

export type ArchiveAddressCheckResponse = MDSResObj<{
  coins: {
    created: AddressCheck[];
    spent: AddressCheck[];
  };
}>;

export type ArchiveResponse = MDSResObj<{
  message: string;
  start: string;
  end: string;
}>;

export type ArchiveInspectResponse = MDSResObj<{
  cascade: {
    exists: boolean;
    start: string;
    length: number;
  };
  archive: {
    first: string;
    last: string;
  };
  size: number;
}>;

export type BackupResObj<T> = DefaultRes & { backup: T };

export type BackupResponse = BackupResObj<{
  block: number;
  files: {
    wallet: string;
    cascade: string;
    chain: string;
    user: string;
    p2p: string;
    txpow: string;
  };
  uncompressed: number;
  file: string;
  size: string;
  auto: boolean;
}>;

export type MegaMmmrReturnType<A> = A extends MegaMmrParams
  ? A['action'] extends 'info'
    ? MegaMmrInfoResponse
    : A['action'] extends 'export'
      ? MegaMmrExportResponse
      : A['action'] extends 'import'
        ? MegaMmrImportResponse
        : never
  : never;

// TODO: check
export type MegaMmrInfoResponse = MDSResObj<{
  enabled: boolean;
  mmr: {
    block: number;
    entrynumber: number;
    size: number;
    maxrow: number;
    maxentries: MaxEntries[];
    root: null | MegaMmmrData;
  };
  coins: number;
}>;

export type MegaMmrExportResponse = MDSResObj<{
  megammrtip: number;
  ibdtip: number;
  backup: string;
  size: string;
}>;

export type MegaMmrImportResponse = MDSResObj<string>;

type MaxEntries = {
  row: number;
  entry: string;
  data: MegaMmmrData;
};

type MegaMmmrData = {
  data: string;
  value: string;
};

export type MegaMmrSyncDetails = {
  publickey: string;
  address: string;
};

export type MegaMmrSyncReturnType<A> = A extends MegaMmrSyncParams
  ? A['action'] extends 'myDetails'
    ? MegaMmrSyncDetailsResponse
    : A['action'] extends 'resync'
      ? MegaMmrResyncResponse
      : never
  : never;

// action: myDetails
export type MegaMmrSyncDetailsResponse = MDSResObj<{
  details: MegaMmrSyncDetails[];
}>;

// action: resync
export type MegaMmrResyncResponse = MDSResObj<{
  message: string;
  coins: number;
}>;

export type RestoreResponse = MDSResObj<{
  restore: {
    file: string;
  };
  message: string;
}>;

export type VaultReturnType<A> = A extends VaultParams
  ? A['action'] extends 'seed'
    ? VaultResponse
    : A['action'] extends 'wipekeys'
      ? VaultStringResponse
      : A['action'] extends 'restorekeys'
        ? VaultRestoreKeysResponse
        : A['action'] extends 'passwordlock'
          ? VaultStringResponse
          : A['action'] extends 'passwordunlock'
            ? VaultStringResponse
            : never
  : VaultResponse;

// default response
export type VaultResponse = MDSResObj<Vault>;

// passwordlock response and passwordunlock response and wipekeys response
export type VaultStringResponse = MDSResObj<string>;

// restorekeys response
export type VaultRestoreKeysResponse = MDSResObj<RestoreKeys>;

export type Vault = {
  phrase: string;
  seed: string;
  locked: boolean;
};

export type RestoreKeys = {
  entered: string;
  cleaned: string;
  same: boolean;
  result: string;
};

export type ResetReturnType<A> = A extends ResetParams
  ? A['action'] extends 'chainsync'
    ? ResetChainSyncResponse
    : A['action'] extends 'seedsync'
      ? ResetSeedsyncResponse
      : A['action'] extends 'restore'
        ? ResetRestoreResponse
        : never
  : never;

// action: chainsync
export type ResetChainSyncResponse = MDSResObj<{
  message: string;
  start: string;
  end: string;
}>;

// action: seedsync
export type ResetSeedsyncResponse = MDSResObj<ArchiveResponse>;

// action: restore
export type ResetRestoreResponse = MDSResObj<{
  restore: RestoreResponse;
  chainsync: {
    command: string;
    params: {
      action: string;
      file: string;
    };
    status: string;
    pending: boolean;
    response: {
      archiveresync: ArchiveResponse;
    };
  };
}>;

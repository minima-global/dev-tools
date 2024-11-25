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
    ? MDSResObj<ArchiveIntegrity>
    : A['action'] extends 'export'
      ? MDSResObj<ArchiveExport>
      : A['action'] extends 'import'
        ? MDSResObj<Archive>
        : A['action'] extends 'inspect'
          ? MDSResObj<ArchiveInspect>
          : A['action'] extends 'addresscheck'
            ? MDSResObj<ArchiveAddressCheck>
            : A['action'] extends 'exportraw'
              ? MDSResObj<ArchiveExport>
              : A['action'] extends 'resync'
                ? MDSResObj<Archive>
                : never
  : never;

export type ArchiveExport = {
  message: string;
  rows: number;
  file: string;
  size: string;
};

export type ArchiveAddressCheck = {
  coins: {
    created: AddressCheck[];
    spent: AddressCheck[];
  };
};

export type Archive = {
  message: string;
  start: string;
  end: string;
};

export type ArchiveInspect = {
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
};

export type BackupResObj<T> = DefaultRes & { backup: T };

export type Backup = {
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
};

export type MegaMmmrReturnType<A> = A extends MegaMmrParams
  ? A['action'] extends 'info'
    ? MDSResObj<MegaMmrInfo>
    : A['action'] extends 'export'
      ? MDSResObj<MegaMmrExport>
      : A['action'] extends 'import'
        ? MDSResObj<MegaMmrImport>
        : never
  : never;

// TODO: check
export type MegaMmrInfo = {
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
};

export type MegaMmrExport = {
  megammrtip: number;
  ibdtip: number;
  backup: string;
  size: string;
};

export type MegaMmrImport = string;

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
    ? MDSResObj<{ details: MegaMmrSyncDetails[] }>
    : A['action'] extends 'resync'
      ? MDSResObj<MegaMmrResync>
      : never
  : never;

export type MegaMmrResync = {
  message: string;
  coins: number;
};

export type Restore = {
  restore: {
    file: string;
  };
  message: string;
};

export type VaultReturnType<A> = A extends VaultParams
  ? A['action'] extends 'seed'
    ? MDSResObj<Vault>
    : A['action'] extends 'wipekeys'
      ? MDSResObj<string>
      : A['action'] extends 'restorekeys'
        ? MDSResObj<RestoreKeys>
        : A['action'] extends 'passwordlock'
          ? MDSResObj<string>
          : A['action'] extends 'passwordunlock'
            ? MDSResObj<string>
            : never
  : MDSResObj<Vault>;

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
    ? MDSResObj<ResetChainSync>
    : A['action'] extends 'seedsync'
      ? MDSResObj<Archive>
      : A['action'] extends 'restore'
        ? MDSResObj<ResetRestore>
        : never
  : never;

export type ResetChainSync = {
  message: string;
  start: string;
  end: string;
};

export type ResetRestore = {
  restore: MDSResObj<Restore>;
  chainsync: {
    command: string;
    params: {
      action: string;
      file: string;
    };
    status: string;
    pending: boolean;
    response: {
      archiveresync: MDSResObj<Archive>;
    };
  };
};

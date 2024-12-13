import type { DefaultRes, MDSResponse } from '../../types.js';
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
    ? MDSResponse<ArchiveIntegrity>
    : A['action'] extends 'export'
      ? MDSResponse<ArchiveExport>
      : A['action'] extends 'import'
        ? MDSResponse<Archive>
        : A['action'] extends 'inspect'
          ? MDSResponse<ArchiveInspect>
          : A['action'] extends 'addresscheck'
            ? MDSResponse<ArchiveAddressCheck>
            : A['action'] extends 'exportraw'
              ? MDSResponse<ArchiveExport>
              : A['action'] extends 'resync'
                ? MDSResponse<Archive>
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
    ? MDSResponse<MegaMmrInfo>
    : A['action'] extends 'export'
      ? MDSResponse<MegaMmrExport>
      : A['action'] extends 'import'
        ? MDSResponse<MegaMmrImport>
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
    ? MDSResponse<{ details: MegaMmrSyncDetails[] }>
    : A['action'] extends 'resync'
      ? MDSResponse<MegaMmrResync>
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
    ? MDSResponse<Vault>
    : A['action'] extends 'wipekeys'
      ? MDSResponse<string>
      : A['action'] extends 'restorekeys'
        ? MDSResponse<RestoreKeys>
        : A['action'] extends 'passwordlock'
          ? MDSResponse<string>
          : A['action'] extends 'passwordunlock'
            ? MDSResponse<string>
            : never
  : MDSResponse<Vault>;

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
    ? MDSResponse<ResetChainSync>
    : A['action'] extends 'seedsync'
      ? MDSResponse<Archive>
      : A['action'] extends 'restore'
        ? MDSResponse<ResetRestore>
        : never
  : never;

export type ResetChainSync = {
  message: string;
  start: string;
  end: string;
};

export type ResetRestore = {
  restore: MDSResponse<Restore>;
  chainsync: {
    command: string;
    params: {
      action: string;
      file: string;
    };
    status: string;
    pending: boolean;
    response: {
      archiveresync: MDSResponse<Archive>;
    };
  };
};

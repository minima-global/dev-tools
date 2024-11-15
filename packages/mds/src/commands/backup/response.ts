import type { DefaultRes, MDSResObj } from '../../types.js';
import type { Coin } from '../general/response.js';
import type { ArchiveParams } from './params.js';

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
        ? ArchiveImportResponse
        : A['action'] extends 'inspect'
          ? ArchiveInspectResponse
          : A['action'] extends 'addresscheck'
            ? ArchiveAddressCheckResponse
            : A['action'] extends 'exportraw'
              ? ArchiveExportResponse
              : A['action'] extends 'resync'
                ? null
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

export type ArchiveImportResponse = MDSResObj<{
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

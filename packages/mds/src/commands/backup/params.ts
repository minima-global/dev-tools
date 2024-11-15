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

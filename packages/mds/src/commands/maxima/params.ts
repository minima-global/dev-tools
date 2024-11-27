export type MaximaAction =
  | 'info'
  | 'setname'
  | 'hosts'
  | 'send'
  | 'sendall'
  | 'refresh'
  | 'seticon';

export type MaximaParams = {
  action: MaximaAction;
};

export type MaximaHostsParams = {
  action: 'hosts';
};

export type MaximaInfoParams = {
  action: 'info';
};

export type MaximaRefreshParams = {
  action: 'refresh';
};

export type MaximaSeticonParams = {
  action: 'seticon';
  icon: string;
};

export type MaximaSendParams = {
  action: 'send';
  data: string;
  to?: string;
  id?: string;
  publickey?: string;
  application: string;
};

export type MaximaSendallParams = {
  action: 'sendall';
  data: string;
  application: string;
};

export type MaximaSetnameParams = {
  action: 'setname';
  name: string;
};

export type MaxContactsAction =
  | 'add'
  | 'remove'
  | 'search'
  | 'import'
  | 'export'
  | 'list';

export type MaxContactsParams = {
  action: MaxContactsAction;
};

export type MaxContactsAddParams = {
  action: 'add';
  contact: string;
};

export type MaxContactsRemoveParams = {
  action: 'remove';
  id?: string;
  publickey?: string;
};

export type MaxContactsSearchParams = {
  action: 'search';
  id?: string;
  publickey?: string;
};

export type MaxContactsImportParams = {
  action: 'import';
  contactlist: string;
};

export type MaxSignParams = {
  data: string;
  privatekey?: string;
};

export type MaxExtraAction =
  | 'staticmls'
  | 'addpermanent'
  | 'removepermanent'
  | 'listpermanent'
  | 'clearpermanent'
  | 'allowallcontacts'
  | 'clearallowed'
  | 'mlsinfo'
  | 'getaddress'
  | 'addallowed';

export type MaxExtraParams = {
  action: MaxExtraAction;
};

export type MaxExtraMLSInfoParams = {
  action: 'mlsinfo';
};

export type MaxExtraClearPermanentParams = {
  action: 'clearpermanent';
};

export type MaxExtraListPermanentParams = {
  action: 'listpermanent';
};

export type MaxExtraClearAllowedParams = {
  action: 'clearallowed';
};

export type MaxExtraStaticMLSParams = {
  action: 'staticmls';
  host: string | 'clear';
};

export type MaxExtraPermanentParams = {
  action: 'addpermanent' | 'removepermanent';
  publickey: string;
};

export type MaxExtraGetAddressParams = {
  action: 'getaddress';
  maxaddress: string;
};

export type MaxExtraAllowAllContactsParams = {
  action: 'allowallcontacts';
  enable: 'true' | 'false';
};

export type MaxExtraAddAllowedParams = {
  action: 'addallowed';
  publickey: string;
};

export type MaxVerifyParams = {
  data: string;
  signature: string;
  publickey: string;
};

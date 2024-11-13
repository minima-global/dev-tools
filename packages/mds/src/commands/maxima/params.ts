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

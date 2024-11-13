import type { MDSResObj } from '../../types.js';
import type { MaxContactsParams, MaximaParams } from './params.js';

export type MaximaInfo = {
  name: string;
  icon: string;
  publickey: string;
  staticmls: boolean;
  mls: string;
  localidentity: string;
  p2pidentity: string;
  contact: string;
  logs: boolean;
  poll: number;
};

export type MaximaSend = {
  from: string;
  to: string;
  time: string;
  timemilli: number;
  random: string;
  application: string;
  data: string;
  msgid: string;
  poll: boolean;
  delay: number;
  delivered: boolean;
  creation: number;
  sending: number;
};

export type MaximaReturnType<A> = A extends MaximaParams
  ? A['action'] extends 'info'
    ? MaximaResponse
    : A['action'] extends 'setname'
      ? MaximaSetnameResponse
      : A['action'] extends 'refresh'
        ? MaximaRefreshResponse
        : A['action'] extends 'send'
          ? MaximaSendResponse
          : A['action'] extends 'sendall'
            ? MaximaSendallResponse
            : never
  : MaximaResponse;

// Default Response and action:info
export type MaximaResponse = MDSResObj<MaximaInfo>;

// action:setname
export type MaximaSetnameResponse = MDSResObj<{
  name: string;
}>;

// action:refresh
export type MaximaRefreshResponse = MDSResObj<string>;

// action:send
export type MaximaSendResponse = MDSResObj<MaximaSend>;

// action:sendall
export type MaximaSendallResponse = MDSResObj<string>;

type MaxContactsExtraData = {
  name: string;
  icon: string;
  minimaaddress: string;
  topblock: string;
  checkblock: string;
  checkhash: string;
  mls: string;
};

type MaxContacts = {
  id: number;
  publickey: string;
  currentaddress: string;
  myaddress: string;
  lastseen: number;
  date: string;
  extradata: MaxContactsExtraData;
  chaintip: string;
  samechain: boolean;
};

type MaxContactsAdd = {
  from: string;
  to: string;
  time: string;
  timemilli: number;
  random: string;
  application: string;
  data: string;
  msgid: string;
  delivered: boolean;
};

type MaxContactsExport = {
  contacts: number;
  contactlist: string;
  message: string;
};

type MaxContactImport = {
  size: number;
  contacts: MaxContactsAddResponse[];
};

export type MaxContactsReturnType<A> = A extends MaxContactsParams
  ? A['action'] extends 'add'
    ? MaxContactsAddResponse
    : A['action'] extends 'remove'
      ? string
      : A['action'] extends 'search'
        ? MaxContactsSearchResponse
        : A['action'] extends 'import'
          ? MaxContactsImportResponse
          : A['action'] extends 'export'
            ? MaxContactsExportResponse
            : A['action'] extends 'list'
              ? MaxContactsResponse
              : never
  : MaxContactsResponse;

// action:add
export type MaxContactsAddResponse = MDSResObj<{
  maxima: MaxContactsAdd;
}>;

// action:list and default
export type MaxContactsResponse = MDSResObj<MaxContacts>;

// action:export
export type MaxContactsExportResponse = MDSResObj<MaxContactsExport>;

// action:import
export type MaxContactsImportResponse = MDSResObj<MaxContactImport>;

// action:search
export type MaxContactsSearchResponse = MDSResObj<{
  contact: Omit<MaxContacts, 'chaintip' | 'samechain'>;
}>;

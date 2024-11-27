import type { MDSResObj } from '../../types.js';
import type {
  MaxContactsParams,
  MaxExtraParams,
  MaximaParams,
} from './params.js';

export type MaximaReturnType<A> = A extends MaximaParams
  ? A['action'] extends 'info'
    ? MDSResObj<MaximaInfo>
    : A['action'] extends 'setname'
      ? MDSResObj<MaximaSetname>
      : A['action'] extends 'refresh'
        ? MDSResObj<MaximaRefresh>
        : A['action'] extends 'send'
          ? MDSResObj<MaximaSend>
          : A['action'] extends 'sendall'
            ? MDSResObj<MaximaSendall>
            : A['action'] extends 'hosts'
              ? MDSResObj<MaximaHosts[]>
              : never
  : MDSResObj<MaximaInfo>;

export type MaximaSetname = {
  name: string;
};

export type MaximaRefresh = string;

export type MaximaSendall = string;

export type MaximaHosts = {
  host: string;
  public: string;
  lastseen: string;
  connected: boolean;
};

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

export type Add = {
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
  contacts: MaxContactsAdd[];
};

export type MaxContactsReturnType<A> = A extends MaxContactsParams
  ? A['action'] extends 'add'
    ? MDSResObj<MaxContactsAdd>
    : A['action'] extends 'remove'
      ? string
      : A['action'] extends 'search'
        ? MDSResObj<MaxContactsSearch>
        : A['action'] extends 'import'
          ? MDSResObj<MaxContactImport>
          : A['action'] extends 'export'
            ? MDSResObj<MaxContactsExport>
            : A['action'] extends 'list'
              ? MDSResObj<MaxContacts>
              : never
  : MDSResObj<MaxContacts>;

export type MaxContactsAdd = {
  maxima: Add;
};

export type MaxContactsSearch = {
  contact: Omit<MaxContacts, 'chaintip' | 'samechain'>;
};

export type MaxCreate = {
  publickey: string;
  privatekey: string;
};

export type MaxSign = {
  signature: string;
};

export type MaxExtraStaticMLS = {
  staticmls: boolean;
  mls: string;
};

export type MaxExtraMLSInfo = {
  publickey: string;
  mlsallowed: {
    maximaidentity: string;
    valid: string[];
  };
};

export type MaxExtraReturnType<A> = A extends MaxExtraParams
  ? A['action'] extends 'staticmls'
    ? MDSResObj<MaxExtraStaticMLS>
    : A['action'] extends 'addpermanent'
      ? MDSResObj<string>
      : A['action'] extends 'removepermanent'
        ? MDSResObj<string>
        : A['action'] extends 'listpermanent'
          ? MDSResObj<string[]>
          : A['action'] extends 'clearpermanent'
            ? MDSResObj<string>
            : A['action'] extends 'allowallcontacts'
              ? MDSResObj<string>
              : A['action'] extends 'clearallowed'
                ? MDSResObj<MaxClearAllowed>
                : A['action'] extends 'mlsinfo'
                  ? MDSResObj<MaxExtraMLSInfo>
                  : A['action'] extends 'getaddress'
                    ? MDSResObj<MaxGetAddress>
                    : A['action'] extends 'addallowed'
                      ? MDSResObj<MaxAddAllowed>
                      : never
  : never;

export type MaxClearAllowed = {
  allowed: string[];
};

export type MaxGetAddress = {
  publickey: string;
  mls: string;
  success: boolean;
  mlsresponse: {};
};

export type MaxAddAllowed = {
  added: string;
};

export type MaxVerify = {
  valid: boolean;
};

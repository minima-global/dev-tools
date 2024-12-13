import type { MDSResponse } from '../../types.js';
import type {
  MaxContactsParams,
  MaxExtraParams,
  MaximaParams,
} from './params.js';

export type MaximaReturnType<A> = A extends MaximaParams
  ? A['action'] extends 'info'
    ? MDSResponse<MaximaInfo>
    : A['action'] extends 'setname'
      ? MDSResponse<MaximaSetname>
      : A['action'] extends 'refresh'
        ? MDSResponse<MaximaRefresh>
        : A['action'] extends 'send'
          ? MDSResponse<MaximaSend>
          : A['action'] extends 'sendall'
            ? MDSResponse<MaximaSendall>
            : A['action'] extends 'hosts'
              ? MDSResponse<MaximaHosts[]>
              : never
  : MDSResponse<MaximaInfo>;

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
    ? MDSResponse<MaxContactsAdd>
    : A['action'] extends 'remove'
      ? string
      : A['action'] extends 'search'
        ? MDSResponse<MaxContactsSearch>
        : A['action'] extends 'import'
          ? MDSResponse<MaxContactImport>
          : A['action'] extends 'export'
            ? MDSResponse<MaxContactsExport>
            : A['action'] extends 'list'
              ? MDSResponse<MaxContacts>
              : never
  : MDSResponse<MaxContacts>;

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
    ? MDSResponse<MaxExtraStaticMLS>
    : A['action'] extends 'addpermanent'
      ? MDSResponse<string>
      : A['action'] extends 'removepermanent'
        ? MDSResponse<string>
        : A['action'] extends 'listpermanent'
          ? MDSResponse<string[]>
          : A['action'] extends 'clearpermanent'
            ? MDSResponse<string>
            : A['action'] extends 'allowallcontacts'
              ? MDSResponse<string>
              : A['action'] extends 'clearallowed'
                ? MDSResponse<MaxClearAllowed>
                : A['action'] extends 'mlsinfo'
                  ? MDSResponse<MaxExtraMLSInfo>
                  : A['action'] extends 'getaddress'
                    ? MDSResponse<MaxGetAddress>
                    : A['action'] extends 'addallowed'
                      ? MDSResponse<MaxAddAllowed>
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

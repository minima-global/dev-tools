import type { MDSResObj } from '../../types.js';
import type {
  MaxContactsParams,
  MaxExtraParams,
  MaximaParams,
} from './params.js';

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

export type MaxCreateResponse = MDSResObj<{
  publickey: string;
  privatekey: string;
}>;

export type MaxSignResponse = MDSResObj<{
  signature: string;
}>;

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
    ? MaxStaticMLSResponse
    : A['action'] extends 'addpermanent'
      ? MaxExtraPermanentResponse
      : A['action'] extends 'removepermanent'
        ? MaxExtraPermanentResponse
        : A['action'] extends 'listpermanent'
          ? MaxListPermanentResponse
          : A['action'] extends 'clearpermanent'
            ? MaxClearPermanentResponse
            : A['action'] extends 'allowallcontacts'
              ? MaxAllowAllContactsResponse
              : A['action'] extends 'clearallowed'
                ? MaxClearAllowedResponse
                : A['action'] extends 'mlsinfo'
                  ? MaxMLSInfoResponse
                  : A['action'] extends 'getaddress'
                    ? MaxGetAddressResponse
                    : A['action'] extends 'addallowed'
                      ? MaxAddAllowedResponse
                      : never
  : never;

// action:staticmls host:
export type MaxStaticMLSResponse = MDSResObj<MaxExtraStaticMLS>;

// action:addpermanent and action:removepermanent
export type MaxExtraPermanentResponse = MDSResObj<string>;

// action:listpermanent
export type MaxListPermanentResponse = MDSResObj<string[]>;

// action:clearpermanent
export type MaxClearPermanentResponse = MDSResObj<string>;

// action:allowallcontacts enable:true/false
export type MaxAllowAllContactsResponse = MDSResObj<string>;

// action:clearallowed
export type MaxClearAllowedResponse = MDSResObj<{
  allowed: string[];
}>;

// action:mlsinfo
export type MaxMLSInfoResponse = MDSResObj<MaxExtraMLSInfo>;

// action:getaddress
export type MaxGetAddressResponse = MDSResObj<{
  publickey: string;
  mls: string;
  success: boolean;
  mlsresponse: {};
}>;

// action:addallowed
export type MaxAddAllowedResponse = MDSResObj<{
  added: string;
}>;

export type MaxVerifyResponse = MDSResObj<{
  valid: boolean;
}>;

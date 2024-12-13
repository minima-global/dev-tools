import type { MDSResponse } from '../../types.js';
import type {
  MaxContactsAddParams,
  MaxContactsImportParams,
  MaxContactsParams,
  MaxContactsRemoveParams,
  MaxContactsSearchParams,
  MaxExtraAddAllowedParams,
  MaxExtraAllowAllContactsParams,
  MaxExtraClearAllowedParams,
  MaxExtraClearPermanentParams,
  MaxExtraGetAddressParams,
  MaxExtraListPermanentParams,
  MaxExtraMLSInfoParams,
  MaxExtraParams,
  MaxExtraPermanentParams,
  MaxExtraStaticMLSParams,
  MaximaHostsParams,
  MaximaInfoParams,
  MaximaParams,
  MaximaRefreshParams,
  MaximaSendallParams,
  MaximaSendParams,
  MaximaSeticonParams,
  MaximaSetnameParams,
  MaxSignParams,
  MaxVerifyParams,
} from './params.js';
import type {
  MaxContactsReturnType,
  MaxCreate,
  MaxExtraReturnType,
  MaximaReturnType,
  MaxSign,
  MaxVerify,
} from './response.js';

/**
 * Maxima function types
 */

export type ActionParamMapMaxima = {
  readonly info: MaximaInfoParams;
  readonly setname: MaximaSetnameParams;
  readonly refresh: MaximaRefreshParams;
  readonly send: MaximaSendParams;
  readonly sendall: MaximaSendallParams;
  readonly seticon: MaximaSeticonParams;
  readonly hosts: MaximaHostsParams;
};

export type MaximaParamType<A extends MaximaParams | undefined> = A extends {
  action: keyof ActionParamMapMaxima;
}
  ? ActionParamMapMaxima[A['action']]
  : A;

type MaximaFuncParams<A extends MaximaParams | undefined> = [
  { params: MaximaParamType<A> },
  MaximaCallback<A>?,
];

type MaximaCallback<A> = (data: MaximaReturnType<A>) => void;

export type MaximaFunc = <A extends MaximaParams | undefined>(
  ...args: A extends undefined ? [MaximaCallback<A>?] : MaximaFuncParams<A>
) => Promise<MaximaReturnType<A>>;

/**
 * MaxContacts function types
 */

export type ActionParamMapContacts = {
  readonly add: MaxContactsAddParams;
  readonly remove: MaxContactsRemoveParams;
  readonly search: MaxContactsSearchParams;
  readonly import: MaxContactsImportParams;
  readonly export: MaxContactsParams;
  readonly list: MaxContactsParams;
};

export type MaxContactsParamType<A extends MaxContactsParams | undefined> =
  A extends {
    action: keyof ActionParamMapContacts;
  }
    ? ActionParamMapContacts[A['action']]
    : A;

type MaxContactsFuncParams<A extends MaxContactsParams | undefined> = [
  { params: MaxContactsParamType<A> },
  MaxContactsCallback<A>?,
];

type MaxContactsCallback<A> = (data: MaxContactsReturnType<A>) => void;

export type MaxContactsFunc = <A extends MaxContactsParams | undefined>(
  ...args: A extends undefined
    ? [MaxContactsCallback<A>?]
    : MaxContactsFuncParams<A>
) => Promise<MaxContactsReturnType<A>>;

/**
 * MaxCreate function types
 */

type MaxCreateCallback = (data: MDSResponse<MaxCreate>) => void;

export type MaxCreateFunc = (
  callback?: MaxCreateCallback,
) => Promise<MDSResponse<MaxCreate>>;

/**
 * MaxSign function types
 */

type MaxSignCallback = (data: MDSResponse<MaxSign>) => void;

export type MaxSignFunc = (
  args: { params: MaxSignParams },
  callback?: MaxSignCallback,
) => Promise<MDSResponse<MaxSign>>;

/**
 * MaxExtra function types
 */

export type ActionParamMapExtra = {
  readonly staticmls: MaxExtraStaticMLSParams;
  readonly addpermanent: MaxExtraPermanentParams;
  readonly removepermanent: MaxExtraPermanentParams;
  readonly listpermanent: MaxExtraListPermanentParams;
  readonly clearpermanent: MaxExtraClearPermanentParams;
  readonly allowallcontacts: MaxExtraAllowAllContactsParams;
  readonly clearallowed: MaxExtraClearAllowedParams;
  readonly mlsinfo: MaxExtraMLSInfoParams;
  readonly getaddress: MaxExtraGetAddressParams;
  readonly addallowed: MaxExtraAddAllowedParams;
};

export type MaxExtraParamType<A extends MaxExtraParams> = A extends {
  action: keyof ActionParamMapExtra;
}
  ? ActionParamMapExtra[A['action']]
  : A;

type MaxExtraFuncParams<A extends MaxExtraParams> = [
  { params: MaxExtraParamType<A> },
  MaxExtraCallback<A>?,
];

type MaxExtraCallback<A> = (data: MaxExtraReturnType<A>) => void;

export type MaxExtraFunc = <A extends MaxExtraParams>(
  ...args: MaxExtraFuncParams<A>
) => Promise<MaxExtraReturnType<A>>;

/**
 * MaxVerify function types
 */

type MaxVerifyCallback = (data: MDSResponse<MaxVerify>) => void;

export type MaxVerifyFunc = (
  args: { params: MaxVerifyParams },
  callback?: MaxVerifyCallback,
) => Promise<MDSResponse<MaxVerify>>;

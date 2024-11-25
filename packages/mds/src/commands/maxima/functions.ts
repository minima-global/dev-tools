import type { MDSResObj } from '../../types.js';
import type {
  MaxContactsAddParams,
  MaxContactsImportParams,
  MaxContactsParams,
  MaxContactsRemoveParams,
  MaxContactsSearchParams,
  MaxExtraAddAllowedParams,
  MaxExtraAllowAllContactsParams,
  MaxExtraGetAddressParams,
  MaxExtraParams,
  MaxExtraPermanentParams,
  MaxExtraStaticMLSParams,
  MaximaParams,
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

type MaximaCallback<A> = (data: MaximaReturnType<A>) => void;

export type MaximaFunc = <A extends MaximaParams | undefined>(
  ...args: A extends undefined
    ? [MaximaCallback<A>?]
    : A extends { action: 'info' }
      ? [{ params: { action: A['action'] } }, MaximaCallback<A>?]
      : A extends { action: 'setname' }
        ? [{ params: MaximaSetnameParams }, MaximaCallback<A>?]
        : A extends { action: 'refresh' }
          ? [{ params: { action: A['action'] } }, MaximaCallback<A>?]
          : A extends { action: 'send' }
            ? [{ params: MaximaSendParams }, MaximaCallback<A>?]
            : A extends { action: 'sendall' }
              ? [{ params: MaximaSendallParams }, MaximaCallback<A>?]
              : A extends { action: 'seticon' }
                ? [{ params: MaximaSeticonParams }, MaximaCallback<A>?]
                : [{ params: A }, MaximaCallback<A>?]
) => Promise<MaximaReturnType<A>>;

type MaxContactsCallback<A> = (data: MaxContactsReturnType<A>) => void;

export type MaxContactsFunc = <A extends MaxContactsParams | undefined>(
  ...args: A extends undefined
    ? [MaxContactsCallback<A>?]
    : A extends { action: 'add' }
      ? [{ params: MaxContactsAddParams }, MaxContactsCallback<A>?]
      : A extends { action: 'remove' }
        ? [{ params: MaxContactsRemoveParams }, MaxContactsCallback<A>?]
        : A extends { action: 'search' }
          ? [{ params: MaxContactsSearchParams }, MaxContactsCallback<A>?]
          : A extends { action: 'import' }
            ? [{ params: MaxContactsImportParams }, MaxContactsCallback<A>?]
            : A extends { action: 'export' | 'list' }
              ? [{ params: { action: A['action'] } }, MaxContactsCallback<A>?]
              : [{ params: A }, MaxContactsCallback<A>?]
) => Promise<MaxContactsReturnType<A>>;

type MaxCreateCallback = (data: MDSResObj<MaxCreate>) => void;

export type MaxCreateFunc = (
  callback?: MaxCreateCallback,
) => Promise<MDSResObj<MaxCreate>>;

type MaxSignCallback = (data: MDSResObj<MaxSign>) => void;

export type MaxSignFunc = (
  args: { params: MaxSignParams },
  callback?: MaxSignCallback,
) => Promise<MDSResObj<MaxSign>>;

type MaxExtraCallback<A> = (data: MaxExtraReturnType<A>) => void;

export type MaxExtraFunc = <A extends MaxExtraParams>(
  ...args: A extends { action: 'staticmls' }
    ? [{ params: MaxExtraStaticMLSParams }, MaxExtraCallback<A>?]
    : A extends { action: 'addpermanent' }
      ? [{ params: MaxExtraPermanentParams }, MaxExtraCallback<A>?]
      : A extends { action: 'removepermanent' }
        ? [{ params: MaxExtraPermanentParams }, MaxExtraCallback<A>?]
        : A extends { action: 'getaddress' }
          ? [{ params: MaxExtraGetAddressParams }, MaxExtraCallback<A>?]
          : A extends { action: 'allowallcontacts' }
            ? [{ params: MaxExtraAllowAllContactsParams }, MaxExtraCallback<A>?]
            : A extends { action: 'addallowed' }
              ? [{ params: MaxExtraAddAllowedParams }, MaxExtraCallback<A>?]
              : [{ params: A }, MaxExtraCallback<A>?]
) => Promise<MaxExtraReturnType<A>>;

type MaxVerifyCallback = (data: MDSResObj<MaxVerify>) => void;

export type MaxVerifyFunc = (
  args: { params: MaxVerifyParams },
  callback?: MaxVerifyCallback,
) => Promise<MDSResObj<MaxVerify>>;

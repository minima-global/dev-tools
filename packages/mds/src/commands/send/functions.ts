import type { MDSResObj } from '../../types.js';
import type {
  SendNoSignParams,
  SendParams,
  SendPollParams,
  SendSignParams,
  SendFileParams,
  MultiSigCreateParams,
  MultiSigListParams,
  MultiSigSpendParams,
  MultiSigSignParams,
  MultiSigViewParams,
  MultiSigPostParams,
  MultiSigParams,
} from './params.js';
import type {
  ReturnTypeMultiSig,
  SendNoSign,
  SendPoll,
  SendTxPow,
  Transaction,
} from './response.js';

export type SendFunc = (
  args: { params: SendParams },
  callback?: (data: MDSResObj<Transaction>) => void,
) => Promise<MDSResObj<Transaction>>;

export type SendPollFunc = (
  args: { params: SendPollParams },
  callback?: (data: MDSResObj<SendPoll>) => void,
) => Promise<MDSResObj<SendPoll>>;

export type SendNoSignFunc = (
  args: { params: SendNoSignParams },
  callback?: (data: MDSResObj<SendNoSign>) => void,
) => Promise<MDSResObj<SendNoSign>>;

export type SendViewFunc = (
  args: { params: SendFileParams },
  callback?: (data: MDSResObj<SendTxPow>) => void,
) => Promise<MDSResObj<SendTxPow>>;

export type SendSignFunc = (
  args: { params: SendSignParams },
  callback?: (data: MDSResObj<SendNoSign>) => void,
) => Promise<MDSResObj<SendNoSign>>;

export type SendPostFunc = (
  args: { params: SendFileParams },
  callback?: (data: MDSResObj<SendTxPow>) => void,
) => Promise<MDSResObj<SendTxPow>>;

type MultiSigCallback<T> = (data: ReturnTypeMultiSig<T>) => void;

export type MultiSigFunc = <T extends MultiSigParams>(
  ...args: T extends { action: 'create' }
    ? [{ params: MultiSigCreateParams }, MultiSigCallback<T>?]
    : T extends { action: 'list' }
      ? [{ params: MultiSigListParams }, MultiSigCallback<T>?]
      : T extends { action: 'spend' }
        ? [{ params: MultiSigSpendParams }, MultiSigCallback<T>?]
        : T extends { action: 'sign' }
          ? [{ params: MultiSigSignParams }, MultiSigCallback<T>?]
          : T extends { action: 'view' }
            ? [{ params: MultiSigViewParams }, MultiSigCallback<T>?]
            : T extends { action: 'post' }
              ? [{ params: MultiSigPostParams }, MultiSigCallback<T>?]
              : T extends { action: 'getkey' }
                ? [{ params: T }, MultiSigCallback<T>?]
                : [{ params: T }, MultiSigCallback<T>?]
) => Promise<ReturnTypeMultiSig<T>>;

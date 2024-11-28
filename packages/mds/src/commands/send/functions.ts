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
  MultiSigGetKeyParams,
} from './params.js';
import type {
  ReturnTypeMultiSig,
  SendNoSign,
  SendPoll,
  SendTxPow,
  Transaction,
} from './response.js';

/**
 * Send function types
 */

type SendCallback<T> = (data: MDSResObj<T>) => void;

export type SendFunc = (
  args: { params: SendParams },
  callback?: SendCallback<Transaction>,
) => Promise<MDSResObj<Transaction>>;

/**
 * SendPoll function types
 */

type SendPollCallback = (data: MDSResObj<SendPoll>) => void;

export type SendPollFunc = (
  args: { params: SendPollParams },
  callback?: SendPollCallback,
) => Promise<MDSResObj<SendPoll>>;

/**
 * SendNoSign function types
 */

type SendNoSignCallback = (data: MDSResObj<SendNoSign>) => void;

export type SendNoSignFunc = (
  args: { params: SendNoSignParams },
  callback?: SendNoSignCallback,
) => Promise<MDSResObj<SendNoSign>>;

/**
 * SendView function types
 */

type SendViewCallback = (data: MDSResObj<SendTxPow>) => void;

export type SendViewFunc = (
  args: { params: SendFileParams },
  callback?: SendViewCallback,
) => Promise<MDSResObj<SendTxPow>>;

/**
 * SendSign function types
 */

type SendSignCallback = (data: MDSResObj<SendNoSign>) => void;

export type SendSignFunc = (
  args: { params: SendSignParams },
  callback?: SendSignCallback,
) => Promise<MDSResObj<SendNoSign>>;

/**
 * SendPost function types
 */

type SendPostCallback = (data: MDSResObj<SendTxPow>) => void;

export type SendPostFunc = (
  args: { params: SendFileParams },
  callback?: SendPostCallback,
) => Promise<MDSResObj<SendTxPow>>;

/**
 * MultiSig function types
 */

type ActionParamMapMultiSig = {
  readonly create: MultiSigCreateParams;
  readonly list: MultiSigListParams;
  readonly spend: MultiSigSpendParams;
  readonly sign: MultiSigSignParams;
  readonly view: MultiSigViewParams;
  readonly post: MultiSigPostParams;
  readonly getkey: MultiSigGetKeyParams;
};

type MultiSigParamType<T> = T extends { action: keyof ActionParamMapMultiSig }
  ? ActionParamMapMultiSig[T['action']]
  : T;

type MultiSigFuncParams<T> = [
  { params: MultiSigParamType<T> },
  MultiSigCallback<T>?,
];

type MultiSigCallback<T> = (data: ReturnTypeMultiSig<T>) => void;

export type MultiSigFunc = <T extends MultiSigParams>(
  ...args: MultiSigFuncParams<T>
) => Promise<ReturnTypeMultiSig<T>>;

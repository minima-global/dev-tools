import type { MDSResponse } from '../../types.js';
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

type SendCallback<T> = (data: MDSResponse<T>) => void;

export type SendFunc = (
  args: { params: SendParams },
  callback?: SendCallback<Transaction>,
) => Promise<MDSResponse<Transaction>>;

/**
 * SendPoll function types
 */

type SendPollCallback = (data: MDSResponse<SendPoll>) => void;

export type SendPollFunc = (
  args: { params: SendPollParams },
  callback?: SendPollCallback,
) => Promise<MDSResponse<SendPoll>>;

/**
 * SendNoSign function types
 */

type SendNoSignCallback = (data: MDSResponse<SendNoSign>) => void;

export type SendNoSignFunc = (
  args: { params: SendNoSignParams },
  callback?: SendNoSignCallback,
) => Promise<MDSResponse<SendNoSign>>;

/**
 * SendView function types
 */

type SendViewCallback = (data: MDSResponse<SendTxPow>) => void;

export type SendViewFunc = (
  args: { params: SendFileParams },
  callback?: SendViewCallback,
) => Promise<MDSResponse<SendTxPow>>;

/**
 * SendSign function types
 */

type SendSignCallback = (data: MDSResponse<SendNoSign>) => void;

export type SendSignFunc = (
  args: { params: SendSignParams },
  callback?: SendSignCallback,
) => Promise<MDSResponse<SendNoSign>>;

/**
 * SendPost function types
 */

type SendPostCallback = (data: MDSResponse<SendTxPow>) => void;

export type SendPostFunc = (
  args: { params: SendFileParams },
  callback?: SendPostCallback,
) => Promise<MDSResponse<SendTxPow>>;

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

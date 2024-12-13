import type { MDSResponse } from '../../types.js';
import type {
  AddPeersParams,
  ConnectParams,
  DisconnectParams,
  ListPeersParams,
  NetworkListParams,
  PeersParams,
  RPCEnableParams,
  RPCParams,
} from './params.js';
import type {
  Message,
  NetworkReturnType,
  PeersReturnType,
  Ping,
  RPC,
} from './response.js';

/**
 * Connect function types
 */

export type ConnectFunc = (
  args: { params: ConnectParams },
  callback?: (data: MDSResponse<Message>) => void,
) => Promise<MDSResponse<Message>>;

/**
 * Disconnect function types
 */

export type DisconnectFunc = (
  args: { params: DisconnectParams },
  callback?: (data: MDSResponse<Message>) => void,
) => Promise<MDSResponse<Message>>;

/**
 * Network list function types
 */

type NetworkCallback<T> = (data: NetworkReturnType<T>) => void;
export type NetworkFunc = <T extends NetworkListParams['action']>(
  args: { params: { action: T } },
  callback?: NetworkCallback<T>,
) => Promise<NetworkReturnType<T>>;

/**
 * Peers function types
 */

export type ActionParamMapPeers = {
  readonly list: ListPeersParams;
  readonly addpeers: AddPeersParams;
};

type PeersCallback<T> = (data: PeersReturnType<T>) => void;

export type PeersParamType<A extends PeersParams | undefined> = A extends {
  action: keyof ActionParamMapPeers;
}
  ? ActionParamMapPeers[A['action']]
  : A;

export type PeersFuncParams<A extends PeersParams | undefined> = [
  { params: PeersParamType<A> },
  PeersCallback<A>?,
];

export type PeersFunc = <T extends PeersParams | undefined>(
  ...args: T extends undefined ? [PeersCallback<T>?] : PeersFuncParams<T>
) => Promise<PeersReturnType<T>>;

/**
 * Ping function types
 */

export type PingFunc = (
  callback?: (data: MDSResponse<Ping>) => void,
) => Promise<MDSResponse<Ping>>;

/**
 * RPC function types
 */

type RPCCallback = (data: MDSResponse<RPC>) => void;

export type ActionParamMapRPC = {
  readonly enable: RPCEnableParams;
};

export type RPCParamType<A extends RPCParams | undefined> = A extends {
  enable: 'true';
}
  ? RPCEnableParams
  : A;

export type RPCFuncParams<A extends RPCParams | undefined> = [
  { params: RPCParamType<A> },
  RPCCallback?,
];

export type RPCFunc = <T extends RPCParams | undefined>(
  ...args: T extends undefined ? [RPCCallback?] : RPCFuncParams<T>
) => Promise<MDSResponse<RPC>>;

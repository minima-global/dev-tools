import type { MDSResObj } from '../../types.js';
import type {
  AddPeersParams,
  ConnectParams,
  DisconnectParams,
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

export type ConnectFunc = (
  args: { params: ConnectParams },
  callback?: (data: MDSResObj<Message>) => void,
) => Promise<MDSResObj<Message>>;

export type DisconnectFunc = (
  args: { params: DisconnectParams },
  callback?: (data: MDSResObj<Message>) => void,
) => Promise<MDSResObj<Message>>;

type NetworkCallback<T> = (data: NetworkReturnType<T>) => void;
export type NetworkFunc = <T extends NetworkListParams['action']>(
  args: { params: { action: T } },
  callback?: NetworkCallback<T>,
) => Promise<NetworkReturnType<T>>;

type PeersCallback<T> = (data: PeersReturnType<T>) => void;
export type PeersFunc = <T extends PeersParams | undefined>(
  ...args: T extends undefined
    ? [PeersCallback<T>?]
    : T extends { action: 'addpeers' }
      ? [{ params: AddPeersParams }, PeersCallback<T>?]
      : [{ params: PeersParams }, PeersCallback<T>?]
) => Promise<PeersReturnType<T>>;

export type PingFunc = (
  callback?: (data: MDSResObj<Ping>) => void,
) => Promise<MDSResObj<Ping>>;

type RPCCallback = (data: MDSResObj<RPC>) => void;

export type RPCFunc = <T extends RPCParams | undefined>(
  ...args: T extends undefined
    ? [RPCCallback?]
    : T extends { enable: 'true' }
      ? [
          {
            params: RPCEnableParams;
          },
          RPCCallback?,
        ]
      : [{ params: T }, RPCCallback?]
) => Promise<MDSResObj<RPC>>;

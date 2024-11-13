import type { MDSResObj } from '../../types.js';
import type { PeersParams } from './params.js';

export type MessageResponse = MDSResObj<{
  message: string;
}>;

export type NetworkReturnType<T> = T extends 'list'
  ? NetworkListResponse
  : T extends 'reset'
    ? NetworkResetResponse
    : T extends 'recalculateip'
      ? NetworkRecalculateIPResponse
      : never;

export type NetworkListResponse = MDSResObj<{
  welcome: string;
  uid: string;
  incoming: boolean;
  host: string;
  port: number;
  minimaport: number;
  isconnected: boolean;
  valid: boolean;
  connected: string;
}>;

export type NetworkResetResponse = MDSResObj<string>;

export type NetworkRecalculateIPResponse = MDSResObj<{
  ip: string;
}>;

export type PeersReturnType<A> = A extends PeersParams
  ? A['action'] extends 'list'
    ? PeersListResponse
    : A['action'] extends 'addpeers'
      ? PeersAddResponse
      : never
  : PeersListResponse;

export type PeersListResponse = MDSResObj<{
  peerslist: string;
  size: number;
  havepeers: boolean;
  p2penabled: boolean;
}>;

export type PeersAddResponse = MDSResObj<{
  valid: string[];
  invalid: string[];
  message: string;
}>;

export type PingResponse = MDSResObj<Ping>;

export type Ping = {
  host: string;
  port: number;
  valid: boolean;
  version: string;
  extradata: {
    welcome: string;
    topblock: string;
    tophash: string;
    '50block': string;
    '50hash': string;
    'peers-list': string[];
    clients: number;
  };
};

export type RPCResponse = MDSResObj<{
  enabled: boolean;
  port: number;
  ssl: boolean;
  sslpubkey: string;
  authenticate: boolean;
  password: string;
}>;

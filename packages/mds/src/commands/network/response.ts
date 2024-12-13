import type { MDSResponse } from '../../types.js';
import type { PeersParams } from './params.js';

export type Message = {
  message: string;
};

export type NetworkReturnType<T> = T extends 'list'
  ? MDSResponse<NetworkList>
  : T extends 'reset'
    ? MDSResponse<NetworkReset>
    : T extends 'recalculateip'
      ? MDSResponse<NetworkRecalculateIP>
      : never;

export type NetworkList = {
  welcome: string;
  uid: string;
  incoming: boolean;
  host: string;
  port: number;
  minimaport: number;
  isconnected: boolean;
  valid: boolean;
  connected: string;
};

export type NetworkReset = string;

export type NetworkRecalculateIP = {
  ip: string;
};

export type PeersReturnType<A> = A extends PeersParams
  ? A['action'] extends 'list'
    ? MDSResponse<PeersList>
    : A['action'] extends 'addpeers'
      ? MDSResponse<PeersAdd>
      : never
  : MDSResponse<PeersList>;

export type PeersList = {
  peerslist: string;
  size: number;
  havepeers: boolean;
  p2penabled: boolean;
};

export type PeersAdd = {
  valid: string[];
  invalid: string[];
  message: string;
};

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

export type RPC = {
  enabled: boolean;
  port: number;
  ssl: boolean;
  sslpubkey: string;
  authenticate: boolean;
  password: string;
};

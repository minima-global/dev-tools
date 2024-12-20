export type ConnectParams = {
  host: string;
};

export type DisconnectParams = {
  uid: 'all' | string;
};

export type NetworkAction = 'list' | 'reset' | 'recalculateip';

export type NetworkListParams = {
  action: NetworkAction;
};

export type PeersAction = 'list' | 'addpeers';

export type PeersParams = {
  action: PeersAction;
};

export type ListPeersParams = {
  action: 'list';
};

export type AddPeersParams = {
  action: 'addpeers';
  peerslist: string;
};

export type RPCParams = {
  enable: 'true' | 'false';
};

export type RPCEnableParams = {
  enable: 'true';
  password?: string;
  ssl?: boolean;
};

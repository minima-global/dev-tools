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

export type NetworkActionParams = {
  params:
    | {
        action: 'list';
      }
    | {
        params: {
          action: 'reset';
        };
      }
    | {
        params: {
          action: 'recalculateip';
        };
      }
    | {
        params: {
          action: 'list';
        };
      };
};

export type PeersAction = 'list' | 'addpeers';

export type PeersListParams = {
  action: 'list';
};

export type PeersAddParams = {
  action: 'addpeers';
  peerslist: string;
};

export type PeersParams = {
  action: 'list' | 'addpeers';
};

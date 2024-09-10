export type MDSParams = {
  /**
   * The action to perform.
   * @default 'list'
   */
  action:
    | 'list'
    | 'install'
    | 'update'
    | 'uninstall'
    | 'pending'
    | 'accept'
    | 'deny'
    | 'permission'
    | 'publicmds';
};

export type MDSParamsActionInstall = {
  action: 'install';
  file: string;
  trust?: 'read' | 'write';
};

export type MDSParamsActionUpdate = {
  action: 'update';
  uid: string;
  file: string;
};

export type MDSParamsActionUninstall = {
  action: 'uninstall';
  uid: string;
};

export type MDSParamsActionAcceptOrDeny = {
  action: 'accept' | 'deny';
  uid: string;
};

export type MDSParamsActionPermission = {
  action: 'permission';
  uid: string;
  trust: 'read' | 'write';
};

export type MDSParamsActionPending = {
  action: 'pending';
};

export type CheckPendingParams = {
  uid: string;
};

export type MDSParams = {
  action: MDSAction;
};

export type CheckPendingParams = {
  uid: string;
};

export type MDSAction =
  | 'list'
  | 'install'
  | 'update'
  | 'uninstall'
  | 'pending'
  | 'accept'
  | 'deny'
  | 'permission'
  | 'publicmds';

export type TestParams = {
  action: MDSAction;
};

export type MDSPendingParams = {
  action: 'pending';
};

export type MDSListParams = {
  action: 'list';
};

export type MDSInstallParams = {
  action: 'install';
  file: string;
  trust?: 'read' | 'write';
};

export type MDSUninstallParams = {
  action: 'uninstall';
  uid: string;
};

export type MDSPermissionParams = {
  action: 'permission';
  uid: string;
  trust: 'read' | 'write';
};

export type MDSAcceptOrDenyParams = {
  action: 'accept' | 'deny';
  uid: string;
};

export type MDSUpdateParams = {
  action: 'update';
  uid: string;
  file: string;
};

export type MDSPublicParams = {
  action: 'publicmds';
  enable: 'true' | 'false';
};

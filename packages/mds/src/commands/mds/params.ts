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
  file?: string;
  uid?: string;
  trust?: 'read' | 'write';
};

export type CheckPendingParams = {
  uid: string;
};

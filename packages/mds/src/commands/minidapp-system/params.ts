export type MiniDappSystemCommands =
  | { command: "mds"; payload: MDSParams }
  | { command: "checkmode"; payload?: null }
  | { command: "checkmode"; payload?: null }
  | { command: "checkrestore"; payload?: null }
  | { command: "checkpending"; payload: CheckPendingParams }

type MDSParams = {
  /**
   * The action to perform for MiniDAPP management.
   * Default action is 'list' to list installed MiniDAPPs.
   * @default 'list'
   * - `list`: Lists installed MiniDAPPs.
   * - `install`: Installs a new MiniDAPP and optionally sets its permission.
   *   Must specify 'file'.
   * - `update`: Updates and replaces an existing MiniDAPP. Must specify
   *    MiniDAPP 'uid' and 'file' of new MiniDAPP.
   * - `uninstall`: Uninstalls a MiniDAPP. Must specify MiniDAPP 'uid'.
   * - `pending`: Lists all pending commands waiting to be accepted or denied.
   * - `accept`: Accepts a pending command. Must specify 'uid' of the pending 8 * command.
   * - `deny`: Denies a pending command. Must specify 'uid' of the pending
   *   command.
   * - `permission`: Sets permission for a MiniDAPP to READ or WRITE. Must
   *   specify existing MiniDAPP 'uid' and 'trust'.
   */
  action?:
    | "list"
    | "install"
    | "update"
    | "uninstall"
    | "pending"
    | "accept"
    | "deny"
    | "permission"

  /**
   * The file name or path of the MiniDAPP to install.
   * Required for 'install' action.
   */
  file?: string

  /**
   * The UID of the MiniDAPP to update or uninstall.
   * Required for 'update' and 'uninstall' actions.
   */
  uid?: string

  /**
   * Set permission for a MiniDAPP to READ or WRITE.
   * Required for 'permission' action.
   */
  trust?: "READ" | "WRITE"
}

type CheckPendingParams = {
  /**
   * The UID of the MiniDAPP to check for pending status.
   */
  uid: string
}

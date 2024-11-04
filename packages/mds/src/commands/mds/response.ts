import type { MDSResObj } from '../../types.js';
import type { SendResponse } from '../send/response.js';

export module MDSCommand {
  export type ReturnType<S> = S extends {
    params: any;
  }
    ? S['params'] extends { action: 'list' }
      ? ListResponse
      : S['params'] extends { action: 'install' }
        ? InstallResponse
        : S['params'] extends { action: 'uninstall' }
          ? UninstallResponse
          : S['params'] extends { action: 'permission' }
            ? PermissionResponse
            : S['params'] extends { action: 'pending' }
              ? PendingResponse
              : S['params'] extends { action: 'deny' }
                ? MDSResObj<string>
                : S['params'] extends { action: 'accept' }
                  ? SendResponse
                  : ListResponse
    : never;

  export type ListResponse = MDSResObj<{
    enabled: boolean;
    connect: string;
    password: string;
    publicmds: boolean;
    minidapps: Minidapp[];
  }>;

  export type InstallResponse = MDSResObj<{
    installed: Omit<Minidapp, 'sessionid'>;
  }>;

  export type UninstallResponse = MDSResObj<{
    uninstalled: string;
  }>;

  export type PermissionResponse = MDSResObj<Omit<Minidapp, 'sessionid'>>;

  export type PendingResponse = MDSResObj<{
    pending: {
      minidapp: Omit<Minidapp, 'sessionid'>;
      timemilli: number;
      date: string;
      command: string;
    }[];
  }>;
}

export type CheckModeResponse = MDSResObj<{
  name: string;
  mode: 'WRITE' | 'READ';
  writemode: boolean;
  dblocked: boolean;
}>;

export type CheckPendingResponse = MDSResObj<{
  pending: boolean;
}>;

export type CheckRestoreResponse = MDSResObj<{
  restoring: boolean;
  shuttingdown: boolean;
  complete: boolean;
}>;

export type Minidapp = {
  uid: string;
  conf: Conf;
  sessionid: string;
};

export type Conf = {
  name: string;
  icon: string;
  version: string;
  description: string;
  permission: string;
  browser: string;
  category: string;
};

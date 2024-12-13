import type { MDSResponse } from '../../types.js';
import type { Transaction } from '../send/response.js';
import type { MDSParams } from './params.js';

export type MDSReturnType<A> = A extends MDSParams
  ? A['action'] extends 'list'
    ? MDSResponse<MDSList>
    : A['action'] extends 'install'
      ? MDSResponse<MDSInstall>
      : A['action'] extends 'uninstall'
        ? MDSResponse<MDSUninstall>
        : A['action'] extends 'permission'
          ? MDSResponse<MDSPermission>
          : A['action'] extends 'pending'
            ? MDSResponse<MDSPending>
            : A['action'] extends 'deny'
              ? MDSResponse<string>
              : A['action'] extends 'accept'
                ? MDSResponse<Transaction>
                : A['action'] extends 'publicmds'
                  ? MDSResponse<PublicMDS>
                  : MDSResponse<MDSList>
  : never;

export type PublicMDS = {
  enabled: boolean;
};

export type MDSList = {
  enabled: boolean;
  connect: string;
  password: string;
  publicmds: boolean;
  minidapps: Minidapp[];
};

export type MDSInstall = {
  installed: Omit<Minidapp, 'sessionid'>;
};

export type MDSUninstall = {
  uninstalled: string;
};

export type MDSPermission = Omit<Minidapp, 'sessionid'>;

export type MDSPending = {
  pending: {
    minidapp: Omit<Minidapp, 'sessionid'>;
    timemilli: number;
    date: string;
    command: string;
  }[];
};

export type CheckMode = {
  name: string;
  mode: 'WRITE' | 'READ';
  writemode: boolean;
  dblocked: boolean;
};

export type CheckPending = {
  pending: boolean;
};

export type CheckRestore = {
  restoring: boolean;
  shuttingdown: boolean;
  complete: boolean;
};

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

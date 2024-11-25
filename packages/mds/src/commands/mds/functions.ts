import type { MDSResObj } from '../../types.js';
import type {
  CheckPendingParams,
  MDSAcceptOrDenyParams,
  MDSInstallParams,
  MDSParams,
  MDSPermissionParams,
  MDSPublicParams,
  MDSUninstallParams,
  MDSUpdateParams,
} from './params.js';

import type {
  CheckMode,
  CheckPending,
  CheckRestore,
  MDSCommand,
} from './response.js';

type MDSCallback<T> = (data: MDSCommand.ReturnType<T>) => void;

export type MDSFunc = <T extends MDSParams | undefined>(
  ...args: T extends undefined
    ? [MDSCallback<T>?]
    : T extends { action: 'install' }
      ? [{ params: MDSInstallParams }, MDSCallback<T>?]
      : T extends { action: 'uninstall' }
        ? [{ params: MDSUninstallParams }, MDSCallback<T>?]
        : T extends { action: 'permission' }
          ? [{ params: MDSPermissionParams }, MDSCallback<T>?]
          : T extends { action: 'accept' | 'deny' }
            ? [{ params: MDSAcceptOrDenyParams }, MDSCallback<T>?]
            : T extends { action: 'update' }
              ? [{ params: MDSUpdateParams }, MDSCallback<T>?]
              : T extends { action: 'list' }
                ? [{ params: MDSParams }, MDSCallback<T>?]
                : T extends { action: 'publicmds' }
                  ? [{ params: MDSPublicParams }, MDSCallback<T>?]
                  : [{ params: T }, MDSCallback<T>?]
) => Promise<MDSCommand.ReturnType<T>>;

export type CheckModeFunc = (
  callback?: (data: MDSResObj<CheckMode>) => void,
) => Promise<MDSResObj<CheckMode>>;

export type CheckPendingFunc = (
  args: { params: CheckPendingParams },
  callback?: (data: MDSResObj<CheckPending>) => void,
) => Promise<MDSResObj<CheckPending>>;

export type CheckRestoreFunc = (
  callback?: (data: MDSResObj<CheckRestore>) => void,
) => Promise<MDSResObj<CheckRestore>>;

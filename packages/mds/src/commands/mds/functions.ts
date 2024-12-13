import type { MDSResponse } from '../../types.js';
import type {
  CheckPendingParams,
  MDSAcceptOrDenyParams,
  MDSInstallParams,
  MDSListParams,
  MDSParams,
  MDSPendingParams,
  MDSPermissionParams,
  MDSPublicParams,
  MDSUninstallParams,
  MDSUpdateParams,
} from './params.js';
import type {
  CheckMode,
  CheckPending,
  CheckRestore,
  MDSReturnType,
} from './response.js';

/**
 * MDS function types
 */

export type ActionParamMapMDS = {
  readonly list: MDSListParams;
  readonly install: MDSInstallParams;
  readonly update: MDSUpdateParams;
  readonly uninstall: MDSUninstallParams;
  readonly pending: MDSPendingParams;
  readonly accept: MDSAcceptOrDenyParams;
  readonly deny: MDSAcceptOrDenyParams;
  readonly permission: MDSPermissionParams;
  readonly publicmds: MDSPublicParams;
};

type MDSCallback<T> = (data: MDSReturnType<T>) => void;

export type MDSParamType<A extends MDSParams | undefined> = A extends {
  action: keyof ActionParamMapMDS;
}
  ? ActionParamMapMDS[A['action']]
  : A;

type MDSFuncParams<A extends MDSParams | undefined> = [
  { params: MDSParamType<A> },
  MDSCallback<A>?,
];

export type MDSFunc = <T extends MDSParams | undefined>(
  ...args: T extends undefined ? [MDSCallback<T>?] : MDSFuncParams<T>
) => Promise<MDSReturnType<T>>;

/**
 * Check mode function types
 */

export type CheckModeFunc = (
  callback?: (data: MDSResponse<CheckMode>) => void,
) => Promise<MDSResponse<CheckMode>>;

/**
 * Check pending function types
 */

export type CheckPendingFunc = (
  args: { params: CheckPendingParams },
  callback?: (data: MDSResponse<CheckPending>) => void,
) => Promise<MDSResponse<CheckPending>>;

/**
 * Check restore function types
 */

export type CheckRestoreFunc = (
  callback?: (data: MDSResponse<CheckRestore>) => void,
) => Promise<MDSResponse<CheckRestore>>;

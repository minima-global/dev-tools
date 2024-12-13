import type { RemoveScript, RunScript, Script, Tutorial } from './response.js';
import type { ScriptsReturnType } from './response.js';
import type { MDSResponse } from '../../types.js';
import type {
  NewScriptParams,
  RemoveScriptParams,
  RunScriptParams,
  ScriptsParams,
} from './params.js';

/**
 * Scripts function types
 */

type ScriptsCallback<T> = (data: ScriptsReturnType<T>) => void;

export type ScriptsFunc = <T extends { params: ScriptsParams } | undefined>(
  ...args: T extends undefined
    ? [ScriptsCallback<T>?]
    : T extends { params: ScriptsParams }
      ? [{ params: ScriptsParams }, ScriptsCallback<T>?]
      : [T, ScriptsCallback<T>?]
) => Promise<ScriptsReturnType<T>>;

/**
 * Tutorial function types
 */

export type TutorialFunc = (
  callback?: (data: MDSResponse<Tutorial>) => void,
) => Promise<MDSResponse<Tutorial>>;

/**
 * New script function types
 */

export type NewScriptFunc = (
  args: { params: NewScriptParams },
  callback?: (data: MDSResponse<Script>) => void,
) => Promise<MDSResponse<Script>>;

/**
 * Run script function types
 */

export type RunScriptFunc = (
  args: { params: RunScriptParams },
  callback?: (data: MDSResponse<RunScript>) => void,
) => Promise<MDSResponse<RunScript>>;

/**
 * Remove script function types
 */

export type RemoveScriptFunc = (
  args: { params: RemoveScriptParams },
  callback?: (data: MDSResponse<RemoveScript>) => void,
) => Promise<MDSResponse<RemoveScript>>;

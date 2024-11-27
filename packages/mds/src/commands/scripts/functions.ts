import type { RemoveScript, RunScript, Script, Tutorial } from './response.js';
import type { ScriptsReturnType } from './response.js';
import type { MDSResObj } from '../../types.js';
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
  callback?: (data: MDSResObj<Tutorial>) => void,
) => Promise<MDSResObj<Tutorial>>;

/**
 * New script function types
 */

export type NewScriptFunc = (
  args: { params: NewScriptParams },
  callback?: (data: MDSResObj<Script>) => void,
) => Promise<MDSResObj<Script>>;

/**
 * Run script function types
 */

export type RunScriptFunc = (
  args: { params: RunScriptParams },
  callback?: (data: MDSResObj<RunScript>) => void,
) => Promise<MDSResObj<RunScript>>;

/**
 * Remove script function types
 */

export type RemoveScriptFunc = (
  args: { params: RemoveScriptParams },
  callback?: (data: MDSResObj<RemoveScript>) => void,
) => Promise<MDSResObj<RemoveScript>>;

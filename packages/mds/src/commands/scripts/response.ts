import type { MDSResObj } from '../../types.js';

export module ScriptsCommand {
  export type ReturnType<S> = S extends {
    params: any;
  }
    ? S['params'] extends { address: string }
      ? ScriptResponseSingle
      : ScriptsResponse
    : ScriptsResponse;

  export type ScriptsResponse = MDSResObj<Script[]>;

  export type ScriptResponseSingle = MDSResObj<Script>;
}

export type Script = {
  script: string;
  address: string;
  miniaddress: string;
  simple: boolean;
  default: boolean;
  publickey: string;
  track: boolean;
};

export type TutorialResponse = MDSResObj<string>;

export type NewScriptResponse = MDSResObj<Script>;

type RunScript = {
  script: RunScript;
  clean: RunScript;
  trace: string;
  variables: Record<string, unknown>;
  parseok: boolean;
  monotonic: boolean;
  success: boolean;
};

export type RunScriptResponse = MDSResObj<RunScript>;

export type RemoveScriptResponse = MDSResObj<string>;

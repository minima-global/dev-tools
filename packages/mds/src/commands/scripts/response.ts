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

import type { MDSResponse } from '../../types.js';

export type ScriptsReturnType<S> = S extends {
  params: any;
}
  ? S['params'] extends { address: string }
    ? MDSResponse<Script>
    : MDSResponse<Script[]>
  : MDSResponse<Script[]>;

export type Script = {
  script: string;
  address: string;
  miniaddress: string;
  simple: boolean;
  default: boolean;
  publickey: string;
  track: boolean;
};

export type Tutorial = string;

export type RunScript = {
  script: RunScript;
  clean: RunScript;
  trace: string;
  variables: Record<string, unknown>;
  parseok: boolean;
  monotonic: boolean;
  success: boolean;
};

export type RemoveScript = string;

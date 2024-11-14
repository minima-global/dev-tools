/**
 * Parameters for the scripts command.
 * List all scripts or search for a script / basic address your node is *tracking.
 */
export type ScriptsParams = {
  /**
   * The address to search for.
   */
  address?: string;
};

export type NewScriptParams = {
  script: string;
  trackall: 'true' | 'false';
  clean?: 'true' | 'false';
};

export type RunScriptParams = {
  script: string;
  state?: string;
  prevstate?: string;
  globals?: string;
  signatures?: string;
  extrascripts?: string;
};

export type RemoveScriptParams = {
  address: string;
};

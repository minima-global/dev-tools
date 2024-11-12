import type { MDSResObj } from '../../types.js';
import type { NetworkActionParams } from './params.js';

export type MessageResponse = MDSResObj<{
  message: string;
}>;

export type NetworkReturnType<T> = T extends 'list'
  ? NetworkListResponse
  : T extends 'reset'
    ? NetworkResetResponse
    : T extends 'recalculateip'
      ? NetworkRecalculateIPResponse
      : never;

export type NetworkListResponse = MDSResObj<{
  welcome: string;
  uid: string;
  incoming: boolean;
  host: string;
  port: number;
  minimaport: number;
  isconnected: boolean;
  valid: boolean;
  connected: string;
}>;

export type NetworkResetResponse = MDSResObj<string>;

export type NetworkRecalculateIPResponse = MDSResObj<{
  ip: string;
}>;

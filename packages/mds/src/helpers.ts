/**
 * Helper function to handle command arguments and return the command string, callback, and payload.
 * @param command - The command to be executed.
 * @param args - The arguments to be passed to the command.
 * @returns An object containing the command string and callback.
 */

import { httpPostAsync } from './mds.js';

export function commandHandler<T, U>(command: string) {
  return (...args: any[]): Promise<U> => {
    const callback =
      typeof args[args.length - 1] === 'function' ? args.pop() : undefined;
    const payload =
      args[0] && typeof args[0] === 'object' ? args[0] : undefined;
    let commandString = command;

    if (payload) {
      const params = new URLSearchParams(payload).toString();
      commandString += ` ${params}`;
    } else if (args.length > 0) {
      commandString += ` ${args.join(' ')}`;
    }

    commandString = commandString.trim();

    return new Promise((resolve, reject) => {
      httpPostAsync(
        'cmd',
        commandString,
        (data: U) => {
          if (
            data &&
            typeof data === 'object' &&
            'status' in data &&
            !data.status
          ) {
            reject(data);
          } else {
            resolve(data);
            if (callback) {
              callback(data);
            }
          }
        },
        payload,
      );
    });
  };
}

export type Prettify<T> = {
  [P in keyof T]: T[P];
} & {};

export type PrettifyNested<T> = {
  [K in keyof T]: T[K] extends object ? Prettify<T[K]> : T[K];
} & unknown;

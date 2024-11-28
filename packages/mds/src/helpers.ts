import { httpPostAsync } from './mds.js';

/**
 * Helper function to handle command arguments and return the command string, callback, and payload.
 * @param command - The command to be executed.
 * @param args - The arguments to be passed to the command.
 * @returns An object containing the command string and callback.
 */
export function commandHandler(command: string, args: any[]) {
  let commandString: string = command;
  let callback: any;
  let payload: any;

  // Handle different argument patterns
  if (args.length > 0) {
    // If last argument is a function, it's a callback
    if (typeof args[args.length - 1] === 'function') {
      callback = args.pop();
      if (args.length > 0) {
        payload = args[0];
      }
    } else {
      // No callback, just parameters
      payload = args[0];
    }
  }

  // Build command string with parameters
  if (payload) {
    if (typeof payload === 'string') {
      // Handle direct string parameters
      commandString += ` ${payload}`;
    } else if (typeof payload === 'object') {
      // Handle object parameters
      if (payload.params) {
        const payloadString = Object.entries(payload.params)
          .map(([key, value]) => {
            // Stringify all objects (including arrays)
            if (typeof value === 'object' && value !== null) {
              return `${key}:${JSON.stringify(value)}`;
            }
            return `${key}:${value}`;
          })
          .join(' ');
        commandString += ` ${payloadString}`;
      } else {
        // Handle direct object parameters
        const payloadString = Object.entries(payload)
          .map(([key, value]) => {
            // Stringify all objects (including arrays)
            if (typeof value === 'object' && value !== null) {
              return `${key}:${JSON.stringify(value)}`;
            }
            return `${key}:${value}`;
          })
          .join(' ');
        commandString += ` ${payloadString}`;
      }
    }
  }

  return { commandString, callback };
}

export function createCommandFunction(command: string) {
  return (...args: any[]) => {
    const { commandString, callback } = commandHandler(command, args);
    return new Promise((resolve) => {
      httpPostAsync('cmd', commandString, (data: any) => {
        resolve(data);
        if (callback && typeof callback === 'function') {
          callback(data);
        }
      });
    });
  };
}

export type Prettify<T> = {
  [P in keyof T]: T[P];
} & {};

export type PrettifyNested<T> = {
  [K in keyof T]: T[K] extends object ? Prettify<T[K]> : T[K];
} & unknown;

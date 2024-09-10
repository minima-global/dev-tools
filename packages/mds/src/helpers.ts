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

  if (
    args.length === 2 &&
    typeof args[1] === 'function' &&
    typeof args[0] === 'object'
  ) {
    [payload, callback] = args;
  } else if (args.length === 1 && typeof args[0] === 'function') {
    [callback] = args;
  }

  if (typeof payload === 'object' && payload.params) {
    const payloadString = Object.entries(payload.params)
      .map(([key, value]) => `${key}:${value}`)
      .join(' ');
    commandString += ` ${payloadString}`;
  }

  return { commandString, callback };
}

export type Prettify<T> = {
  [P in keyof T]: T[P];
} & {};

export type PrettifyNested<T> = {
  // [K in keyof T]: T[K];
  [K in keyof T]: T[K] extends object ? Prettify<T[K]> : T[K];
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
} & unknown;

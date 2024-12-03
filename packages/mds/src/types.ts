import type {
  BackupCommands,
  GeneralCommands,
  MaximaCommands,
  MDSCommands,
  NetworkCommands,
  ScriptsCommands,
  SearchCommands,
  SendCommands,
  TransactionCommands,
} from './commands/commands.js';
import type { Header } from './commands/send/response.js';
import type { Prettify } from './helpers.js';

/**
 * Event constants for the MDS Object
 */
export const MinimaEvents = {
  INITED: 'inited',
  NEWBLOCK: 'NEWBLOCK',
  MINING: 'MINING',
  MINIMALOG: 'MINIMALOG',
  MAXIMA: 'MAXIMA',
  TIMER_10SECONDS: 'MDS_TIMER_10SECONDS',
  TIMER_1HOUR: 'MDS_TIMER_1HOUR',
  SHUTDOWN: 'MDS_SHUTDOWN',
  PENDING: 'MDS_PENDING',
  NEWCOIN: 'NEWCOIN',
  NOTIFYCOIN: 'NOTIFYCOIN',
  NOTIFYCASCADECOIN: 'NOTIFYCASCADECOIN',
} as const;

/**
 * Types for the MDS Object
 */
export type MinimaEvents = (typeof MinimaEvents)[keyof typeof MinimaEvents];

export type BaseEvent<T extends MinimaEvents, D = unknown> = {
  event: T;
  data: D;
};

export type NewBlockEvent = BaseEvent<'NEWBLOCK', NEWBLOCKRES>;

export type TimerEvent10Seconds = BaseEvent<'MDS_TIMER_10SECONDS', TIMERES>;

export type TimerEvent1Hour = BaseEvent<'MDS_TIMER_1HOUR', TIMERES>;

export type MiningEvent = BaseEvent<'MINING', MININGRES>;

export type MinimalogEvent = BaseEvent<'MINIMALOG', MINIMALOGRES>;

export type OtherEvent = BaseEvent<
  Exclude<
    MinimaEvents,
    | 'NEWBLOCK'
    | 'MDS_TIMER_10SECONDS'
    | 'MDS_TIMER_1HOUR'
    | 'MINING'
    | 'MINIMALOG'
  >,
  any
>;

export type MinimaEvent =
  | NewBlockEvent
  | TimerEvent10Seconds
  | TimerEvent1Hour
  | MiningEvent
  | MinimalogEvent
  | OtherEvent;

export type EventCallback = (msg: MinimaEvent) => void;

export type MDS_MAIN_CALLBACK = EventCallback | null;

export type DefaultRes = {
  command: string;
  params?: Record<string, string>;
  pending: boolean;
  status: boolean;
  error?: string;
  pendinguid?: string;
};

export type NEWBLOCKRES = {
  txpow: RAW_NEWBLOCKRES;
};

export type TIMERES = {
  timemilli: string;
};

export type MININGRES = {
  txpow: RAW_NEWBLOCKRES;
  mining: boolean;
};

export type MINIMALOGRES = {
  message: string;
};

export type RAW_NEWBLOCKRES = {
  txpowid: string;
  isblock: boolean;
  istransaction: boolean;
  superblock: number;
  size: number;
  burn: number;
  header: Header;
  hasbody: boolean;
  body: Body;
};

export type DappLink = {
  status: boolean;
  uid: string;
  sessionid: string;
  base: string;
};

export type MDSResObj<T> = Prettify<DefaultRes & { response: T }>;

type FileAccessParams = (
  opt: string,
  opts2: string,
  callback: (msg: string) => void,
) => void;

interface MDSFileAccess {
  list: FileAccessParams;
  save: FileAccessParams;
  savebinary: FileAccessParams;
  load: FileAccessParams;
  loadbinary: FileAccessParams;
  delete: FileAccessParams;
  getpath: FileAccessParams;
  makedir: FileAccessParams;
  copy: FileAccessParams;
  move: FileAccessParams;
  download: FileAccessParams;
  upload: FileAccessParams;
  listweb: FileAccessParams;
  copytoweb: FileAccessParams;
  deletefromweb: FileAccessParams;
}

type CommandFunction = (...args: any[]) => Promise<any>;

export interface MDSObj {
  filehost: string;
  mainhost: string;
  testhost: string;
  minidappuid: string | null;
  logging: boolean;
  DEBUG_HOST: string | null;
  DEBUG_PORT: number;
  DEBUG_MINIDAPPID: string;
  TEST_MODE: boolean;
  /**
   * Initialize the MDS object
   * @param callback The callback function to be called when an event is triggered with the event object
   */
  init: (callback: EventCallback) => void;
  /**
   * Log a message to the console
   * @param data The message to log
   */
  log: (data: string) => void;
  /**
   * Notify the user
   * @param output The message to notify the user with,
   * on Phone it pops up in status bar. On desktop it appears in Logs
   */
  notify: (output: string) => void;
  /**
   * Cancel this MiniDAPPs notification
   */
  notifycancel: () => void;
  /**
   * Runs a function on the Minima Command Line - same format as MInima
   * @param args The arguments to pass to the command, command, payload, callback
   * @example using callback
   * MDS.cmd.balance({ params: { address: '0x00' } }, (data) => {
   * console.log(data)
   * })
   * @example using promise
   * const data = await MDS.cmd.balance({ params: { address: '0x00' } })
   */
  cmd: {
    [K in string]: CommandFunction;
  } & GeneralCommands &
    MDSCommands &
    TransactionCommands &
    ScriptsCommands &
    SearchCommands &
    SendCommands &
    NetworkCommands &
    MaximaCommands &
    BackupCommands;
  /**
   * Run a SQL command
   * @param command The SQL command to run
   * @param callback The callback function to be called with the data
   */
  sql: (command: string, callback?: (data: string) => any) => Promise<any>;
  /**
   * Get a link to a different Dapp. READ dapps can only get  * READ DAPPS. WRITE can get all dapps.
   */
  dapplink: (
    dappname: string,
    callback?: (data: DappLink) => void,
  ) => Promise<DappLink>;

  api: {
    call: (
      dappname: string,
      data: string,
      callback: (data: string) => void,
    ) => void;

    reply: (
      dappname: string,
      id: string,
      data: string,
      callback: (data: string) => void,
    ) => void;
  };

  net: {
    /**
     * Network Commands
     */
    GET: (url: string, callback: (data: string) => void) => void;
    /**
     * Make a POST request
     */
    POST: (url: string, data: string, callback: (data: string) => void) => void;
  };
  keypair: {
    get: (key: string, callback: (data: string) => void) => void;
    set: (key: string, value: string, callback: (data: string) => void) => void;
  };

  /**
   * COMMS - send a message to ALL minidapps or JUST your own service.js
   */
  comms: {
    /**
     * PUBLIC message broadcast to ALL (callback is optional)
     */
    broadcast: (msg: string, callback: (data: string) => void) => void;
    /**
     * PRIVATE message send just to this MiniDAPP (callback is optional)
     */
    solo: (msg: string, callback: (data: string) => void) => void;
  };

  /**
   * File access
   */
  file: {
    /**
     * List file in a folder .. start at /
     */
    list: MDSFileAccess['list'];
    /**
     * Save text - can be text, a JSON in string format or hex encoded data
     */
    save: MDSFileAccess['save'];
    /**
     * Save Binary Data - supply as a HEX string
     */
    savebinary: MDSFileAccess['savebinary'];
    /**
     * Load text - can be text, a JSON in string format or hex encoded data
     */
    load: MDSFileAccess['load'];
    /**
     * Load Binary data - returns the HEX data
     */
    loadbinary: MDSFileAccess['loadbinary'];
    /**
     * Delete a file
     */
    delete: MDSFileAccess['delete'];
    /**
     * Get the full path - if you want to run a command on the file / import a txn / unsigned txn etc
     */
    getpath: MDSFileAccess['getpath'];
    /**
     * Make a directory
     */
    makedir: MDSFileAccess['makedir'];
    /**
     * Copy a file
     */
    copy: MDSFileAccess['copy'];
    /**
     * Move a file
     */
    move: MDSFileAccess['move'];
    /**
     * Download a File from the InterWeb
     * - Will be put in Downloads folder
     */
    download: MDSFileAccess['download'];
    /**
     * Upload a file in chunks to the /fileupload folder
     */
    upload: MDSFileAccess['upload'];
    /**
     * List file in a folder .. start at /
     */
    listweb: MDSFileAccess['listweb'];
    /**
     * Copy a file to your web folder
     */
    copytoweb: MDSFileAccess['copytoweb'];
    /**
     * Delete a file or folder from web folder
     */
    deletefromweb: MDSFileAccess['deletefromweb'];
  };

  form: {
    /**
     * Get the value of a form parameter
     * @param parameterName The name of the parameter to get
     */
    getParams: (parameterName: string) => string | null;
  };
  /**
   * UTILITY functions
   */
  util: {
    /**
     * Convert a HEX string to a Base64 string
     * @param hex The HEX string to convert
     */
    hexToBase64: (hex: string) => string;
    /**
     * Convert a Base64 string to a HEX string
     * @param base64 The Base64 string to convert
     */
    base64ToHex: (base64: string) => string;
    /**
     * Convert a HEX string to an ArrayBuffer
     * @param hex The HEX string to convert
     */
    base64ToArrayBuffer: (base64: string) => ArrayBuffer;
  };
}

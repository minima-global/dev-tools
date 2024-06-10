import { Event, SendEventParams } from "./cmd"

/**
 * Types for the MDS Object
 */
type MinimaEvents =
  | "inited"
  | "NEWBALANCE"
  | "NEWBLOCK"
  | "MINING"
  | "MINIMALOG"
  | "MAXIMA"
  | "MINING"
  | "MINIMALOG"
  | "MAXIMA"
  | "MDS_TIMER_1HOUR"
  | "MDS_TIMER_10SECONDS"
  | "MDS_SHUTDOWN"

type BaseEvent<T extends MinimaEvents> = { event: T }

export type EventCallback<T extends BaseEvent<MinimaEvents>> = (msg: T) => void

export type MDS_MAIN_CALLBACK = EventCallback<BaseEvent<MinimaEvents>> | null

type FileAccessParams = (
  opt: string,
  opts2: string,
  callback: () => void
) => void

interface MDSFileAccess {
  list: FileAccessParams
  save: FileAccessParams
  savebinary: FileAccessParams
  load: FileAccessParams
  loadbinary: FileAccessParams
  delete: FileAccessParams
  getpath: FileAccessParams
  makedir: FileAccessParams
  copy: FileAccessParams
  move: FileAccessParams
  download: FileAccessParams
  upload: FileAccessParams
  listweb: FileAccessParams
  copytoweb: FileAccessParams
  deletefromweb: FileAccessParams
}

export interface MDSObj {
  filehost: string
  mainhost: string
  minidappuid: string | null
  logging: boolean
  DEBUG_HOST: string | null
  DEBUG_PORT: number
  DEBUG_MINIDAPPID: string
  /**
   * Initialize the MDS object
   * @param callback The callback function to be called when an event is triggered with the event object
   */
  init: (callback: (event: BaseEvent<MinimaEvents>) => void) => void
  /**
   * Log a message to the console
   * @param data The message to log
   */
  log: (data: string) => void
  /**
   * Notify the user
   * @param output The message to notify the user with,
   * on Phone it pops up in status bar. On desktop it appears in Logs
   */
  notify: (output: string) => void
  /**
   * Cancel this MiniDAPPs notification
   */
  notifycancel: () => void
  /**
   * Runs a function on the Minima Command Line - same format as MInima
   * @param args The arguments to pass to the command, command, payload, callback
   * @example
   * MDS.CMD("balance", { address: "0x00" }, (data) => {
   * console.log(data)
   * })
   */
  CMD: <Type extends Event["command"]>(...args: SendEventParams<Type>) => void
  /**
   * File access
   */
  file: {
    /**
     * List file in a folder .. start at /
     */
    list: MDSFileAccess["list"]
    /**
     * Save text - can be text, a JSON in string format or hex encoded data
     */
    save: MDSFileAccess["save"]
    /**
     * Save Binary Data - supply as a HEX string
     */
    savebinary: MDSFileAccess["savebinary"]
    /**
     * Load text - can be text, a JSON in string format or hex encoded data
     */
    load: MDSFileAccess["load"]
    /**
     * Load Binary data - returns the HEX data
     */
    loadbinary: MDSFileAccess["loadbinary"]
    /**
     * Delete a file
     */
    delete: MDSFileAccess["delete"]
    /**
     * Get the full path - if you want to run a command on the file / import a txn / unsigned txn etc
     */
    getpath: MDSFileAccess["getpath"]
    /**
     * Make a directory
     */
    makedir: MDSFileAccess["makedir"]
    /**
     * Copy a file
     */
    copy: MDSFileAccess["copy"]
    /**
     * Move a file
     */
    move: MDSFileAccess["move"]
    /**
     * Download a File from the InterWeb
     * - Will be put in Downloads folder
     */
    download: MDSFileAccess["download"]
    /**
     * Upload a file in chunks to the /fileupload folder
     */
    upload: MDSFileAccess["upload"]
    /**
     * List file in a folder .. start at /
     */
    listweb: MDSFileAccess["listweb"]
    /**
     * Copy a file to your web folder
     */
    copytoweb: MDSFileAccess["copytoweb"]
    /**
     * Delete a file or folder from web folder
     */
    deletefromweb: MDSFileAccess["deletefromweb"]
  }

  form: {
    /**
     * Get the value of a form parameter
     * @param parameterName The name of the parameter to get
     */
    getParams: (parameterName: string) => string | null
  }
}

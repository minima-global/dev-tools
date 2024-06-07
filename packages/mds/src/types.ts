/**
 * Types for the MDS Object
 *
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

  form: {
    /**
     * Get the value of a form parameter
     * @param parameterName The name of the parameter to get
     */
    getParams: (parameterName: string) => string | null
  }
}

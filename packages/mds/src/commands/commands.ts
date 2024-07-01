import { MDS } from "../mds"
import { BackupCommands } from "./backup/params"
import { BackupRes } from "./backup/response"
import { GeneralCommands } from "./general/params"
import { GenralRes } from "./general/response"

type DefaultRes = {
  command: string
  pending: boolean
  status: boolean
  error?: string
}

export type DefaultResObj<T extends Object> = DefaultRes & { response: T }

export type Commands = BackupCommands | GeneralCommands

export interface Response extends GenralRes, BackupRes {}

/**
 * Extract the response type of a command
 *
 */
type CMDResponse<C extends Commands["command"]> = C extends keyof Response
  ? Response[C]
  : never

/**
 * Extract the payload type of a command
 *
 */
type ExtractPayload<T extends Commands["command"]> = Extract<
  Commands,
  { command: T }
>["payload"]

/**
 * Check if the payload is optional
 *
 */
type IsPayloadOptional<T extends Commands["command"]> =
  undefined extends ExtractPayload<T> ? true : false

/**
 * Main function type to send an event
 * - If the payload is optional, the second parameter is optional
 * - If the payload is required, the second parameter is required
 * - The third parameter is optional callback function change maybe?
 */

export type SendEventParams<T extends Commands["command"]> =
  IsPayloadOptional<T> extends true
    ?
        | [
            command: T,
            param?: ExtractPayload<T>,
            callback?: (data: CMDResponse<T>) => void,
          ]
        | [command: T, callback?: (data: CMDResponse<T>) => void]
    : [
        command: T,
        param: ExtractPayload<T>,
        callback?: (data: CMDResponse<T>) => void,
      ]

MDS.cmd("backup", { file: "" })

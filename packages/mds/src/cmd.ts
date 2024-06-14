import { Event, GenralRes } from "./events"

/**
 * Extract the response type of a command
 *
 */
type CMDResponse<C extends Event["command"]> = C extends keyof GenralRes
  ? GenralRes[C]
  : never

/**
 * Extract the payload type of a command
 *
 */
type ExtractPayload<T extends Event["command"]> = Extract<
  Event,
  { command: T }
>["payload"]

/**
 * Check if the payload is optional
 *
 */
type IsPayloadOptional<T extends Event["command"]> =
  undefined extends ExtractPayload<T> ? true : false

/**
 * Main function type to send an event
 * - If the payload is optional, the second parameter is optional
 * - If the payload is required, the second parameter is required
 * - The third parameter is optional callback function change maybe?
 */

export type SendEventParams<T extends Event["command"]> =
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

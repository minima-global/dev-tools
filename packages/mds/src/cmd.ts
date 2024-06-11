type BalanceParams = {
  address?: string
  tokenid?: string
  confirmations?: string
}
type CheckAddressParams = { address: string }
type CoinCheckParams = { data: string }
type CoinCheckParmas = { data: string }
type CoinImportParams = { coinid: string; track?: "true" | "false" }
type CoinExportParams = { coinid: string }
type CoinTrackParams = { enable: "true" | "false"; coinid: string }

export type Event =
  | { command: "balance"; payload?: BalanceParams }
  | { command: "checkaddress"; payload: CheckAddressParams }
  | { command: "coincheck"; payload: CoinCheckParams }
  | { command: "coincheck"; payload: CoinCheckParmas }
  | { command: "coinimport"; payload: CoinImportParams }
  | { command: "coinexport"; payload: CoinExportParams }
  | { command: "cointrack"; payload: CoinTrackParams }
  | { command: "block" }

type DefaultRes = {
  command: string
  pending: boolean
  status: boolean
  error?: string
}

type DefaultResObj<T extends Object> = DefaultRes & {
  response: T
}

type BalanceRes = DefaultResObj<
  {
    token: string
    tokenid: string
    confirmed: string
    unconfirmed: string
    sendable: string
    coins: string
    total: string
  }[]
>

interface GenralRes {
  balance: BalanceRes
}

type CMDResponse<C extends Event["command"]> = C extends keyof GenralRes
  ? GenralRes[C]
  : never

type ExtractPayload<T extends Event["command"]> =
  Extract<Event, { command: T }> extends { payload: infer P } ? P : never

type IsPayloadOptional<T extends Event["command"]> =
  undefined extends ExtractPayload<T> ? true : false

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

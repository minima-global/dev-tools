type BalanceParams = {
  address?: string
  tokenid?: string
  confirmations?: string
}
type CheckAddressParams = { address: string }
type CoinCheckParams = { data: string }
type CoinCheckParmas = { data: string }
type CoinImportParams = { coinid: string }
type CoinImportProofParams = { coinid: string; track: string }

export type Event =
  | { command: "balance"; payload?: BalanceParams }
  | { command: "checkaddress"; payload: CheckAddressParams }
  | { command: "coincheck"; payload: CoinCheckParams }
  | { command: "coincheck"; payload: CoinCheckParmas }
  | { command: "coinimport"; payload: CoinImportParams }
  | { command: "coinimportproof"; payload: CoinImportProofParams }

type ExtractPayload<T extends Event["command"]> = Extract<
  Event,
  { command: T }
>["payload"]

type IsPayloadOptional<T extends Event["command"]> =
  undefined extends ExtractPayload<T> ? true : false

export type SendEventParams<T extends Event["command"]> =
  IsPayloadOptional<T> extends true
    ? [command: T, param?: ExtractPayload<T>, callback?: (data: string) => void]
    : [command: T, param: ExtractPayload<T>, callback?: (data: string) => void]

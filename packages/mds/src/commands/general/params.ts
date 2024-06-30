/**
 * @file events.ts
 * @description This file contains the types for the events
 * that can be sent with the cmd function and the response types
 * for the different events that can be accessed in the callback function
 */

/**
 * Event union type that can be sent with the cmd function
 */
export type Events =
  | { command: "balance"; payload?: BalanceParams } // 🟢
  | { command: "checkaddress"; payload: CheckAddressParams } // 🟢
  | { command: "coincheck"; payload: CoinCheckParams } // 🟢
  | { command: "coinimport"; payload: CoinImportParams } // 🟢
  | { command: "coinexport"; payload: CoinExportParams } // 🟢
  | { command: "cointrack"; payload: CoinTrackParams } // 🟢
  | { command: "consolidate"; payload: ConsolidateParams } // 🟢
  | { command: "hashTest"; payload?: HashTestParams } // 🟢
  | { command: "block"; payload?: null } // 🟢
  | { command: "getaddress"; payload?: null } // 🟢
  | { command: "history"; payload?: HistoryParams } // 🔴 no response type yet
  | { command: "tokencreate"; payload: TokenCreateParams } // 🟢
  | { command: "status"; payload?: null } // 🟢
  | { command: "keys"; payload?: KeysParams } // 🟢
  | { command: "newaddress"; payload?: null } // 🟢
  | { command: "printmmr"; payload?: null } // 🟢
  | { command: "printtree"; payload?: PrintTreeParams } // 🟢
  | { command: "tokenvalidate"; payload?: TokenValidateParams } // 🔴 no response type yet

/**
 * Parameters for the different events
 * these are the payloads that can be sent with the events
 */

type BalanceParams = {
  address?: string
  tokenid?: string
  confirmations?: string
}
type CheckAddressParams = { address: string }
type CoinCheckParams = { data: string }
type CoinImportParams = { coinid: string; track?: "true" | "false" }
type CoinExportParams = { coinid: string }
type CoinTrackParams = { enable: "true" | "false"; coinid: string }
type ConsolidateParams = {
  tokenid: string
  coinage?: string
  maxcoins?: string
  maxsigs?: string
  burn?: string
  debug?: "true" | "false"
  dryrun?: "true" | "false"
}
type HashTestParams = { amount?: string }
type HistoryParams = { max?: string }
type TokenCreateParams = {
  name: string // can also be a json object
  amount: string
  decimals?: string
  script?: string
  state?: string
  signtoken?: string
  webvalidate?: string
  burn?: string
}

type KeysParams = {
  /**
   * list : List your existing public keys. The default.
   * checkkeys : Checks if your Public and Private keys are correct.
   * new : Create a new key pair.
   */
  action?: "list" | "checkkeys" | "new"
  /**
   * Search for a specific public key.
   */
  publickey?: string
}

type PrintTreeParams = {
  depth?: string
  cascade?: "true" | "false"
}

type TokenValidateParams = {
  tokenid: string
}

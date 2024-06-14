/**
 * @file events.ts
 * @description This file contains the types for the events
 * that can be sent with the cmd function and the response types
 * for the different events that can be accessed in the callback function
 */

import { MDS } from "./mds"

/**
 * Event types that can be sent with the cmd function
 */
export type Event =
  | { command: "balance"; payload?: BalanceParams } // 🟢
  | { command: "checkaddress"; payload: CheckAddressParams } // 🟢
  | { command: "coincheck"; payload: CoinCheckParams } // 🟢
  | { command: "coinimport"; payload: CoinImportParams }
  | { command: "coinexport"; payload: CoinExportParams } // 🟢
  | { command: "cointrack"; payload: CoinTrackParams }
  | { command: "consolidate"; payload: ConsolidateParams }
  | { command: "hashText"; payload?: HashTextParams } // 🟢
  | { command: "block"; payload?: null } // 🟢
  | { command: "getaddress"; payload?: null } // 🟢
  | { command: "history"; payload?: HistoryParams }
  | { command: "tokencreate"; payload: TokenCreateParams } // 🟢

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
type HashTextParams = { amount?: string }
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

/**
 * Response types for the different events
 */

export interface GenralRes {
  balance: Balance
  block: Block
  checkaddress: CheckAddress
  hashtest: HashTest
  coincheck: CoinCheck
  coinexport: CoinExport
  tokencreate: TokenCreate
}

type DefaultRes = {
  command: string
  pending: boolean
  status: boolean
  error?: string
}
type DefaultResObj<T extends Object> = DefaultRes & { response: T }

type Balance = DefaultResObj<
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

type Block = DefaultResObj<{
  block: string
  date: string
  hash: string
  timemilli: string
}>

type CheckAddress = DefaultResObj<{
  "0x": string
  Mx: string
  original: string
  relevant: boolean
  simple: boolean
}>

type HashTest = DefaultResObj<{
  hashes: string
  millitime: string
  speed: string
}>

type History = DefaultResObj<{
  txpows: TxPow[]
  //details: Details[]
  size: string
}>

// Big ass object incoming
type TxPow = {
  txpowid: string
  isblock: boolean
  istransaction: true
}

type CoinCheck = DefaultResObj<
  {
    proofblock: number
    coin: Coin
  } & { valid: boolean }
>

// TODO : Check types
type Coin = {
  coinid: string
  amount: string
  address: string
  miniaddress: string
  tokenid: string
  token: Token | null
  storestate: boolean
  state: string[]
  spent: boolean
  mmrentry: string
  created: string
}

type CoinExport = DefaultResObj<{
  response: string
}>

//TODO: Check return type
type CoinImport = DefaultResObj<{}>

type TokenCreate = DefaultResObj<
  {
    inputs: [Coin]
    outputs: [
      Coin & {
        tokenamount?: string
      },
    ]
  } & {
    state: []
    linkhash: string
    transactionid: string
  }
>

type Token = {
  name: string | Record<string, unknown>
  coinid: string
  total: string
  decimals: number
  script: string
  totalamount: string
  scale: string
  created: string
  tokenid: string
}

MDS.cmd(
  "tokencreate",
  {
    name: "test",
    amount: "1000",
  },
  (data) => {
    data.response.outputs[0].tokenid
  }
)

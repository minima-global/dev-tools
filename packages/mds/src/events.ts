/**
 * @file events.ts
 * @description This file contains the types for the events
 * that can be sent with the cmd function and the response types
 * for the different events that can be accessed in the callback function
 */

import { MDS } from "./mds"

/**
 * Event union type that can be sent with the cmd function
 */
export type Event =
  | { command: "balance"; payload?: BalanceParams } // 🟢
  | { command: "checkaddress"; payload: CheckAddressParams } // 🟢
  | { command: "coincheck"; payload: CoinCheckParams } // 🟢
  | { command: "coinimport"; payload: CoinImportParams } // 🟢
  | { command: "coinexport"; payload: CoinExportParams } // 🟢
  | { command: "cointrack"; payload: CoinTrackParams } // 🟢
  | { command: "consolidate"; payload: ConsolidateParams } // 🔴 no response type yet
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

/**
 * Response types for the different events
 */

export interface GenralRes {
  balance: Balance
  block: Block
  checkaddress: CheckAddress
  hashtest: HashTest
  coincheck: CoinCheck
  coinexport: SimpleCoinResponse
  coinimport: SimpleCoinResponse
  cointrack: SimpleCoinResponse
  tokencreate: TokenCreate
  status: Status
  getaddress: GetAddress
  keys: Keys
  newaddress: NewAddress
  printmmr: PrintMmr
  printtree: PrintTree
  consolidate: Colnsolidate
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

type SimpleCoinResponse = DefaultResObj<string>

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

type GetAddress = DefaultResObj<{
  script: string
  address: string
  miniaddress: string
  simple: boolean
  default: boolean
  publickey: string
  track: boolean
}>

type Keys = DefaultResObj<{
  keys: {
    size: number
    depth: number
    uses: number
    maxuses: number
    modifier: string
    publickey: string
  }[]
  total: number
  maxuses: number
}>

type PrintMmr = DefaultResObj<{
  block: string
  entrynumber: number
  size: number
  entries: {
    row: number
    entry: string
    data: {
      data: string
      value: string
    }
  }[]
  root: {
    data: string
    value: string
  }
}>

type PrintTree = DefaultResObj<{
  chain: string
}>

type NewAddress = DefaultResObj<{
  script: string
  address: string
  miniaddress: string
  simple: boolean
  default: boolean
  publickey: string
  track: boolean
}>

type Colnsolidate = DefaultResObj<{
  txpowid: string
  isblock: boolean
  istransaction: boolean
  superblock: number
  size: number
  burn: number
  header: Header
  hasbody: boolean
  body: Body
}>

type Header = {
  chainid: string
  block: string
  blockdiff: string
  cascadelevels: number
  superparents: {
    difficulty: string
    count: number
    parent: string
  }[]
  magic: {
    currentmaxtxpowsize: string
    currentmaxkissvmops: string
    currentmaxtxn: string
    currentmintxpowwork: string
    desiredmaxtxpowsize: string
    desiredmaxkissvmops: string
    desiredmaxtxn: string
    desiredmintxpowwork: string
  }
  mmr: string
  total: string
  customhash: string
  txnbodyhash: string
  nonce: string
  timemilli: string
  date: string
}

type Body = {
  prng: string
  txndiff: string
  txn: {
    inputs: Inputs[]
    outputs: Inputs[]
    state: string[]
    linkhash: string
    transactionid: string
  }
  witness: {
    signatures: {
      signatures: Signiture[]
    }[]
    mmrproofs: {
      coin: Coin
    }[]
  }
  burntxn: null
  burnwitness: null
  txnlist: null
}

type Signiture = {
  publicKey: string
  rootkey: string
  proof: {
    blocktime: string
    proof: Proof[]
    prooflenght: string
  }
  signature: string
}

type Proof = {
  left: boolean
  data: {
    data: string
    value: string
  }
}

type Inputs = {
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

type Status = DefaultResObj<{
  version: string
  uptime: string
  locked: boolean
  length: number
  weight: string
  minima: string
  coins: string
  data: string
  memory: Memory
  chain: Chain
  txpow: TxPow
  network: Network
}>

type Memory = {
  ram: string
  disk: string
  files: Files
}

type Files = {
  txpowdb: string
  archivedb: string
  cascade: string
  chaintree: string
  wallet: string
  userdb: string
  p2pdb: string
}

type Chain = {
  block: string
  time: string
  hash: string
  speed: string
  difficulty: string
  size: number
  length: number
  branches: number
  weight: string
  cascade: Cascade
}

type Cascade = {
  start: string
  length: number
  weight: string
}

type TxPow = {
  mempool: number
  ramdb: number
  txpowdb: number
  archivedb: number
}

type Network = {
  host: string
  hostset: string
  port: number
  connecting: number
  connected: number
  rpc: Rpc
  p2p: string
  traffic: Traffic
}

type Rpc = {
  enabled: boolean
  port: number
}

type Traffic = {
  from: string
  totalread: string
  totalwrite: string
  //breakdown: Breakdown
  read: string
  write: string
}

MDS.cmd("consolidate", { tokenid: "" }, (data) => {
  data.response.body.witness.signatures.map((sig) => {
    sig.signatures.map((signature) => {
      signature
    })
  })
})

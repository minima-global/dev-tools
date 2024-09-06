import { MDSResObj } from "../../types"
export module Balance {
  export type ReturnType<S> = S extends {
    params: any
  }
    ? S["params"] extends { tokendetails: string }
      ? BalanceWithTokenDetails
      : Balance
    : Balance

  export type RawBalance = {
    token: string
    tokenid: string
    confirmed: string
    unconfirmed: string
    sendable: string
    coins: string
    total: string
  }

  export type RawBalanceWithDetails = RawBalance & {
    details: {
      decimals?: string
      script?: string
      totalamount?: string
      scale?: string
      created?: string
    }
  }
}

export type Balance = MDSResObj<Balance.RawBalance[]>

export type BalanceWithTokenDetails = MDSResObj<Balance.RawBalanceWithDetails[]>

export type Block = MDSResObj<{
  block: string
  date: string
  hash: string
  timemilli: string
}>

export type CheckAddress = MDSResObj<{
  "0x": string
  Mx: string
  original: string
  relevant: boolean
  simple: boolean
}>

export type HashTest = MDSResObj<{
  hashes: string
  millitime: string
  speed: string
}>

export type CoinCheck = MDSResObj<
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

export type SimpleCoinResponse = MDSResObj<string>

export type TokenCreate = MDSResObj<
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

export type GetAddress = MDSResObj<{
  script: string
  address: string
  miniaddress: string
  simple: boolean
  default: boolean
  publickey: string
  track: boolean
}>

export type Keys = MDSResObj<{
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

export type PrintMmr = MDSResObj<{
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

export type PrintTree = MDSResObj<{
  chain: string
}>

export type NewAddress = MDSResObj<{
  script: string
  address: string
  miniaddress: string
  simple: boolean
  default: boolean
  publickey: string
  track: boolean
}>

export type TokenValidate = MDSResObj<{
  signature: {
    signed: boolean
  }
  web: {
    webvalidate: boolean
  }
}>

export type Colnsolidate = MDSResObj<{
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

type Status = MDSResObj<{
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
  txpow: StatusTxPow
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

type StatusTxPow = {
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

export type History = MDSResObj<{
  txpows: HistoryTxpow[]
  details: Details
  size: number
}>

type HistoryTxpow = {
  txpowid: string
  isblock: boolean
  istransaction: boolean
  superblock: number
  size: number
  burn: number
  header: Header
  hasbody: boolean
  body: Body
}

type Details = {
  inputs: Record<string, any> // adjust based on actual content
  outputs: Record<string, any> // adjust based on actual content
  difference: Record<string, any> // adjust based on actual content
}

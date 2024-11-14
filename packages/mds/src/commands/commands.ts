import type {
  BalanceParams,
  CheckAddressParams,
  CoinCheckParams,
  CoinTrackParams,
  ConsolidateParams,
  HashTestParams,
} from './general/params.js';
import type {
  Balance,
  Block,
  CheckAddress,
  CoinCheck,
  CoinTrack,
  GetAddress,
  HashTest,
  NewAddress,
} from './general/response.js';
import type {
  MaxContactsAddParams,
  MaxContactsImportParams,
  MaxContactsParams,
  MaxContactsRemoveParams,
  MaxContactsSearchParams,
  MaxExtraAddAllowedParams,
  MaxExtraAllowAllContactsParams,
  MaxExtraGetAddressParams,
  MaxExtraParams,
  MaxExtraPermanentParams,
  MaxExtraStaticMLSParams,
  MaximaParams,
  MaximaSendallParams,
  MaximaSendParams,
  MaximaSeticonParams,
  MaximaSetnameParams,
  MaxSignParams,
  MaxVerifyParams,
} from './maxima/params.js';
import type {
  MaxContactsReturnType,
  MaxCreateResponse,
  MaxExtraReturnType,
  MaximaReturnType,
  MaxSignResponse,
  MaxVerifyResponse,
} from './maxima/response.js';
import type { CheckPendingParams, MDSParams } from './mds/params.js';
import type {
  CheckModeResponse,
  CheckPendingResponse,
  CheckRestoreResponse,
  MDSCommand,
} from './mds/response.js';
import type {
  ConnectParams,
  DisconnectParams,
  NetworkListParams,
  PeersParams,
  RPCParams,
} from './network/params.js';
import type {
  MessageResponse,
  NetworkReturnType,
  PeersReturnType,
  PingResponse,
  RPCResponse,
} from './network/response.js';
import type {
  NewScriptParams,
  RemoveScriptParams,
  RunScriptParams,
  ScriptsParams,
} from './scripts/params.js';
import type {
  NewScriptResponse,
  RemoveScriptResponse,
  RunScriptResponse,
  ScriptsCommand,
  TutorialResponse,
} from './scripts/response.js';
import type {
  CoinsParams,
  KeysListParams,
  KeysParamsAction,
  TokenParams,
  TxPowParams,
} from './search/params.js';
import type {
  CoinsResponse,
  KeysReturnType,
  Tokens,
  TxPowReturnType,
} from './search/response.js';
import type {
  SendNoSignParams,
  SendParams,
  SendPollParams,
  SendSignParams,
  SendFileParams,
  MultiSigAction,
  MultiSigCreateParams,
  MultiSigListParams,
  MultiSigSpendParams,
  MultiSigSignParams,
  MultiSigViewParams,
  MultiSigPostParams,
} from './send/params.js';
import type {
  ReturnTypeMultiSig,
  SendNoSignResponse,
  SendPollResponse,
  SendResponse,
  SendTxPowResponse,
} from './send/response.js';
import type {
  LogParams,
  TxnExportParams,
  TxnImportParams,
  TxnListParams,
  TxnOutputParams,
  TxnParams,
  TxnPostParams,
  TxnSignParams,
} from './transactions/params.js';
import type {
  BurnResponse,
  ExportReturnType,
  LogResponse,
  TxnCheckResponse,
  TxnDeleteResponse,
  TxnInputResponse,
  TxnPostResponse,
  TxnResponse,
  TxnSignReturnType,
} from './transactions/response.js';

/**
 * General Command Functions
 */
export module GeneralCommands {
  /**
   * Function for the balance command.
   * @param args - The arguments for the balance command.
   * @param callback - The callback function for the balance command.
   * @returns A promise that resolves to the data returned from the balance command.
   */
  type BalanceCallback<T> = (data: Balance.ReturnType<T>) => void;

  export type BalanceFunc = <T extends { params: BalanceParams } | undefined>(
    ...args: T extends undefined
      ? [BalanceCallback<T>?]
      : [T, BalanceCallback<T>?]
  ) => Promise<Balance.ReturnType<T>>;

  /**
   * Function for the block command.
   * @param callback - The callback function for the block command.
   * @returns A promise that resolves to the data returned from the block command.
   */
  export type BlockFunc = (callback?: (data: Block) => void) => Promise<Block>;

  /**
   * Function for the checkaddress command.
   * @param args - The arguments for the checkaddress command.
   * @param callback - The callback function for the checkaddress command.
   * @returns A promise that resolves to the data returned from the checkaddress command.
   */
  export type CheckAddressFunc = <T extends { params: CheckAddressParams }>(
    args: T,
    callback?: (data: CheckAddress) => void,
  ) => Promise<CheckAddress>;

  /**
   * Function for the coinchck command.
   * @param args - The arguments for the coinchck command.
   * @param callback - The callback function for the coinchck command.
   * @returns A promise that resolves to the data returned from the coinchck command.
   */
  export type CoinCheckFunc = <T extends { params: CoinCheckParams }>(
    args: T,
    callback?: (data: CoinCheck) => void,
  ) => Promise<CoinCheck>;

  /**
   * Function for the getaddress command.
   * @param callback - The callback function for the getaddress command.
   * @returns A promise that resolves to the data returned from the getaddress command.
   */
  export type GetAddressFunc = (
    callback?: (data: GetAddress) => void,
  ) => Promise<GetAddress>;

  /**
   * Function for the hash test command.
   * @param args - The arguments for the hash test command.
   * @param callback - The callback function for the hash test command.
   * @returns A promise that resolves to the data returned from the hash test command.
   */
  type HashTestCallback = (data: HashTest) => void;

  export type HashTestFunc = <T extends { params: HashTestParams } | undefined>(
    ...args: T extends undefined ? [HashTestCallback?] : [T, HashTestCallback?]
  ) => Promise<HashTest>;

  /**
   * Function for the hash command.
   * @param callback - The callback function for the hash command.
   * @returns A promise that resolves to the data returned from the hash command.
   */
  export type CoinTrackFunc = <T extends { params: CoinTrackParams }>(
    args: T,
    callback?: (data: CoinTrack) => void,
  ) => Promise<CoinTrack>;

  /**
   * Function for the newaddress command.
   * @param callback - The callback function for the newaddress command.
   * @returns A promise that resolves to the data returned from the newaddress command.
   */
  export type NewAddressFunc = (
    callback?: (data: NewAddress) => void,
  ) => Promise<NewAddress>;

  /**
   * Function for the consolidate command.
   * @param callback - The callback function for the consolidate command.
   * @returns A promise that resolves to the data returned from the consolidate command.
   */
  export type ConsolidateFunc = <T extends { params: ConsolidateParams }>(
    args: T,
  ) => Promise<SendResponse>;
}

export interface SendCommands {
  /**
   * Function for the send command.
   * @param callback - The callback function for the send command.
   * @returns A promise that resolves to the data returned from the send command.
   */
  send: SendCommands.SendFunc;

  /**
   * Function for the sendpoll command.
   * @param callback - The callback function for the sendpoll command.
   * @returns A promise that resolves to the data returned from the sendpoll command.
   */
  sendpoll: SendCommands.SendPollFunc;

  /**
   * Function for the sendnosign command.
   * @param callback - The callback function for the sendnosign command.
   * @returns A promise that resolves to the data returned from the sendnosign command.
   */
  sendnosign: SendCommands.SendNoSignFunc;
  sendview: SendCommands.SendViewFunc;
  sendsign: SendCommands.SendSignFunc;
  sendpost: SendCommands.SendPostFunc;
  multisig: SendCommands.MultiSigFunc;
}

export module SendCommands {
  export type SendFunc = <T extends { params: SendParams }>(
    args: T,
    callback?: (data: SendResponse) => void,
  ) => Promise<SendResponse>;

  export type SendPollFunc = <T extends { params: SendPollParams }>(
    args: T,
    callback?: (data: SendPollResponse) => void,
  ) => Promise<SendPollResponse>;

  export type SendNoSignFunc = <T extends { params: SendNoSignParams }>(
    args: T,
    callback?: (data: SendNoSignResponse) => void,
  ) => Promise<SendNoSignResponse>;

  export type SendViewFunc = <T extends { params: SendFileParams }>(
    args: T,
    callback?: (data: SendTxPowResponse) => void,
  ) => Promise<SendTxPowResponse>;

  export type SendSignFunc = <T extends { params: SendSignParams }>(
    args: T,
    callback?: (data: SendNoSignResponse) => void,
  ) => Promise<SendNoSignResponse>;

  export type SendPostFunc = <T extends { params: SendFileParams }>(
    args: T,
    callback?: (data: SendTxPowResponse) => void,
  ) => Promise<SendTxPowResponse>;

  type MultiSigCallback<T> = (data: ReturnTypeMultiSig<T>) => void;

  type Params = {
    params: {
      action: MultiSigAction;
    };
  };

  // TODO: FIX THIS
  export type MultiSigFunc = <T extends Params | undefined>(
    ...args: T extends undefined
      ? [MultiSigCallback<T>?]
      : T extends { params: { action: 'create' } }
        ? [
            T & {
              params: MultiSigCreateParams;
            },
            MultiSigCallback<T>?,
          ]
        : T extends { params: { action: 'list' } }
          ? [T & { params: MultiSigListParams }, MultiSigCallback<T>?]
          : T extends { params: { action: 'spend' } }
            ? [T & { params: MultiSigSpendParams }, MultiSigCallback<T>?]
            : T extends { params: { action: 'sign' } }
              ? [T & { params: MultiSigSignParams }, MultiSigCallback<T>?]
              : T extends { params: { action: 'view' } }
                ? [T & { params: MultiSigViewParams }, MultiSigCallback<T>?]
                : T extends { params: { action: 'post' } }
                  ? [T & { params: MultiSigPostParams }, MultiSigCallback<T>?]
                  : T extends { params: { action: 'getkey' } }
                    ? [T, MultiSigCallback<T>?]
                    : never
  ) => Promise<ReturnTypeMultiSig<T>>;
}

export module MDSCommands {
  type MDSCallback<T> = (data: MDSCommand.ReturnType<T>) => void;

  export type MDSFunc = <T extends { params: MDSParams } | undefined>(
    ...args: T extends undefined
      ? [MDSCallback<T>?]
      : T extends { params: { action: 'install' } }
        ? [
            T & { params: { file: string; trust?: 'read' | 'write' } },
            MDSCallback<T>?,
          ]
        : T extends { params: { action: 'uninstall' } }
          ? [T & { params: { uid: string } }, MDSCallback<T>?]
          : T extends { params: { action: 'permission' } }
            ? [
                T & { params: { uid: string; trust: 'read' | 'write' } },
                MDSCallback<T>?,
              ]
            : T extends { params: { action: 'pending' } }
              ? [T, MDSCallback<T>?]
              : T extends { params: { action: 'accept' | 'deny' } }
                ? [T & { params: { uid: string } }, MDSCallback<T>?]
                : T extends { params: { action: 'update' } }
                  ? [
                      T & { params: { uid: string; file: string } },
                      MDSCallback<T>?,
                    ]
                  : [T, MDSCallback<T>?]
  ) => Promise<MDSCommand.ReturnType<T>>;

  /**
   * Function for the checkmode command.
   * @param callback - The callback function for the checkmode command.
   * @returns A promise that resolves to the data returned from the checkmode command.
   */
  export type CheckModeFunc = (
    callback?: (data: CheckModeResponse) => void,
  ) => Promise<CheckModeResponse>;

  /**
   * Function for the checkpending command.
   * @param callback - The callback function for the checkpending command.
   * @returns A promise that resolves to the data returned from the checkpending command.
   */
  export type CheckPendingFunc = <T extends { params: CheckPendingParams }>(
    args: T,
    callback?: (data: CheckPendingResponse) => void,
  ) => Promise<CheckPendingResponse>;

  /**
   * Function for the checkrestore command.
   * @param callback - The callback function for the checkrestore command.
   * @returns A promise that resolves to the data returned from the checkrestore command.
   */
  export type CheckRestoreFunc = (
    callback?: (data: CheckRestoreResponse) => void,
  ) => Promise<CheckRestoreResponse>;
}

export interface GeneralCommands {
  /**
   * Function for the block command.
   * @param callback - The callback function for the block command.
   * @returns A promise that resolves to the data returned from the block command.
   */
  block: GeneralCommands.BlockFunc;

  /**
   * Function for the balance command.
   * @param callback - The callback function for the balance command.
   * @returns A promise that resolves to the data returned from the balance command.
   */
  balance: GeneralCommands.BalanceFunc;

  /**
   * Function for the checkaddress command.
   * @param callback - The callback function for the checkaddress command.
   * @returns A promise that resolves to the data returned from the checkaddress command.
   */
  checkaddress: GeneralCommands.CheckAddressFunc;

  /**
   * Function for the coinchck command.
   * @param callback - The callback function for the coinchck command.
   * @returns A promise that resolves to the data returned from the coinchck command.
   */
  coincheck: GeneralCommands.CoinCheckFunc;

  /**
   * Function for the getaddress command.
   * @param callback - The callback function for the getaddress command.
   * @returns A promise that resolves to the data returned from the getaddress command.
   */
  getaddress: GeneralCommands.GetAddressFunc;

  /**
   * Function for the hash test command.
   * @param callback - The callback function for the hash test command.
   * @returns A promise that resolves to the data returned from the hash test command.
   */
  hashtest: GeneralCommands.HashTestFunc;

  /**
   * Function for the cointrack command.
   * @param callback - The callback function for the cointrack command.
   * @returns A promise that resolves to the data returned from the cointrack command.
   */
  cointrack: GeneralCommands.CoinTrackFunc;

  /**
   * Function for the newaddress command.
   * @param callback - The callback function for the newaddress command.
   * @returns A promise that resolves to the data returned from the newaddress command.
   */
  newaddress: GeneralCommands.NewAddressFunc;

  /**
   * Function for the consolidate command.
   * @param callback - The callback function for the consolidate command.
   * @returns A promise that resolves to the data returned from the consolidate command.
   */
  consolidate: GeneralCommands.ConsolidateFunc;
}

export interface MDSCommands {
  /**
   * Install, update or uninstall MiniDapps and set their permissions to READ/*WRITE. Default permission is READ.
   * DO NOT give WRITE permissions to MiniDapps you do not trust! Accept/deny *pending commands from MiniDapps with READ permissions
   * @param callback - The callback function for the mds command.
   * @returns A promise that resolves to the data returned from the mds command.
   */
  mds: MDSCommands.MDSFunc; // TODO: See over this function!! //

  /**
   * Can be called from a MiniDapp to check whether it is in READ or WRITE mode.
   * @param callback - The callback function for the checkmode command.
   * @returns A promise that resolves to the data returned from the checkmode command.
   */
  checkmode: MDSCommands.CheckModeFunc;

  /**
   * Can be called from a MiniDapp to check whether it is in READ or WRITE mode.
   * @param callback - The callback function for the checkmode command.
   * @returns A promise that resolves to the data returned from the checkmode command.
   */
  checkpending: MDSCommands.CheckPendingFunc;

  /**
   * Can be called from a MiniDapp to check whether it is in READ or WRITE mode.
   * @param callback - The callback function for the checkmode command.
   * @returns A promise that resolves to the data returned from the checkmode command.
   */
  checkrestore: MDSCommands.CheckRestoreFunc;
}

export module TransactionCommands {
  export type BurnFunc = (
    callback?: (data: BurnResponse) => void,
  ) => Promise<BurnResponse>;

  export type LogFunc = <T extends { params: LogParams }>(
    args: T,
    callback?: (data: LogResponse) => void,
  ) => Promise<LogResponse>;

  export type TxnFunc = <T extends { params: TxnParams }>(
    args: T,
    callback?: (data: TxnResponse) => void,
  ) => Promise<TxnResponse>;

  export type TxnCheckFunc = <T extends { params: TxnParams }>(
    args: T,
    callback?: (data: TxnCheckResponse) => void,
  ) => Promise<TxnCheckResponse>;

  export type TxnDeleteFunc = <T extends { params: TxnParams }>(
    args: T,
    callback?: (data: TxnDeleteResponse) => void,
  ) => Promise<TxnDeleteResponse>;

  export type TxnExportFunc = <T extends { params: TxnExportParams }>(
    args: T,
    callback?: (data: ExportReturnType<T>) => void,
  ) => Promise<ExportReturnType<T>>;

  // TODO: Make only file or data be accepted
  export type TxnImportFunc = <T extends { params: TxnImportParams }>(
    args: T,
    callback?: (data: TxnResponse) => void,
  ) => Promise<TxnResponse>;

  // TODO: FIX THIS
  export type TxnInputFunc = {
    (
      args: {
        params: {
          id: string;
          floating: 'true';
          address: string;
          amount: string;
          tokenid: string;
          scriptmmr?: string; // Optional
        };
      },
      callback?: (data: TxnInputResponse) => void,
    ): Promise<TxnInputResponse>;

    (
      args: {
        params: {
          id: string;
          coindata: string;
          scriptmmr?: 'true' | 'false';
        };
      },
      callback?: (data: TxnInputResponse) => void,
    ): Promise<TxnInputResponse>;
    (
      args: {
        params: {
          id: string;
          coinid: string;
          scriptmmr?: 'true' | 'false';
        };
      },
      callback?: (data: TxnInputResponse) => void,
    ): Promise<TxnInputResponse>;
  };

  export type TxnList = <T extends { params: TxnListParams }>(
    args: T,
    callback?: (data: TxnResponse) => void,
  ) => Promise<TxnResponse>;

  export type TxnOutputFunc = <T extends { params: TxnOutputParams }>(
    args: T,
    callback?: (data: TxnResponse) => void,
  ) => Promise<TxnResponse>;

  export type TxnSignFunc = <T extends { params: TxnSignParams }>(
    args: T,
    callback?: (data: TxnSignReturnType<T>) => void,
  ) => Promise<TxnSignReturnType<T>>;

  export type TxnPostFunc = <T extends { params: TxnPostParams }>(
    args: T,
    callback?: (data: TxnPostResponse) => void,
  ) => Promise<TxnPostResponse>;
}

export interface TransactionCommands {
  burn: TransactionCommands.BurnFunc;
  log: TransactionCommands.LogFunc;
  txncreate: TransactionCommands.TxnFunc;
  txnbasics: TransactionCommands.TxnFunc;
  txnclear: TransactionCommands.TxnFunc;
  txncheck: TransactionCommands.TxnCheckFunc;
  txndelete: TransactionCommands.TxnDeleteFunc;
  txnexport: TransactionCommands.TxnExportFunc;
  txnimport: TransactionCommands.TxnImportFunc;
  txninput: TransactionCommands.TxnInputFunc;
  txnlist: TransactionCommands.TxnList;
  txnoutput: TransactionCommands.TxnOutputFunc;
  txnsign: TransactionCommands.TxnSignFunc;
  txnpost: TransactionCommands.TxnPostFunc;
  // TODO: Add txnstate command
}

export module ScriptsCommands {
  type ScriptsCallback<T> = (data: ScriptsCommand.ReturnType<T>) => void;

  export type ScriptsFunc = <T extends { params: ScriptsParams } | undefined>(
    ...args: T extends undefined
      ? [ScriptsCallback<T>?]
      : [T, ScriptsCallback<T>?]
  ) => Promise<ScriptsCommand.ReturnType<T>>;

  export type TutorialFunc = (
    callback?: (data: TutorialResponse) => void,
  ) => Promise<TutorialResponse>;

  export type NewScriptFunc = (
    args: { params: NewScriptParams },
    callback?: (data: NewScriptResponse) => void,
  ) => Promise<NewScriptResponse>;

  export type RunScriptFunc = (
    args: { params: RunScriptParams },
    callback?: (data: RunScriptResponse) => void,
  ) => Promise<RunScriptResponse>;

  export type RemoveScriptFunc = (
    args: { params: RemoveScriptParams },
    callback?: (data: RemoveScriptResponse) => void,
  ) => Promise<RemoveScriptResponse>;
}

export interface ScriptsCommands {
  scripts: ScriptsCommands.ScriptsFunc;
  tutorial: ScriptsCommands.TutorialFunc;
  newscript: ScriptsCommands.NewScriptFunc;
  runscript: ScriptsCommands.RunScriptFunc;
  removescript: ScriptsCommands.RemoveScriptFunc;
}

export module SearchCommands {
  type CoinsCallback = (data: CoinsResponse) => void;

  export type CoinsFunc = {
    (callback?: CoinsCallback): Promise<CoinsResponse>;
    (
      args: { params: CoinsParams },
      callback?: CoinsCallback,
    ): Promise<CoinsResponse>;
  };

  type TokensCallback<T> = (data: Tokens.ReturnType<T>) => void;

  export type TokensFunc = <T extends TokenParams | undefined>(
    ...args: T extends undefined
      ? [TokensCallback<T>?]
      : T extends { action: 'import' }
        ? [
            { params: { action?: T['action']; data: string } },
            TokensCallback<T>?,
          ]
        : T extends { action: 'export' }
          ? [
              { params: { action?: T['action']; tokenid: string } },
              TokensCallback<T>?,
            ]
          : [{ params: T }, TokensCallback<T>?]
  ) => Promise<Tokens.ReturnType<T>>;

  type KeysCallback<T> = (data: KeysReturnType<T>) => void;

  export type KeysFunc = <T extends KeysParamsAction | undefined>(
    ...args: T extends undefined
      ? [KeysCallback<T>?]
      : T extends 'list'
        ? [{ params: KeysListParams }, KeysCallback<T>?]
        : [{ params: { action: T } }, KeysCallback<T>?]
  ) => Promise<KeysReturnType<T>>;

  type TxPowCallback<T> = (data: TxPowReturnType<T>) => void;

  export type TxPowFunc = <T extends { params: TxPowParams }>(
    args: { params: TxPowParams },
    callback?: TxPowCallback<T>,
  ) => Promise<TxPowReturnType<T>>;
}

export interface SearchCommands {
  /**
   * Search for coins that are relevant to you or in the unpruned chain.
   * @param args - Coins parameters
   * @param args.params - Coins parameters object
   * @param args.params.relevant - (Optional) true or false, true will only return coins you are tracking. False will search all coins in the unpruned chain. Default is false unless no other parameters are provided.
   * @param args.params.sendable - (Optional) true only, filter out coins that are not sendable, they might be locked in a contract. Default is to return sendable and unsendable coins.
   * @param args.params.coinid - (Optional) A coinid, to search for a single coin.
   * @param args.params.amount - (Optional) The coin value to search for.
   * @param args.params.address - (Optional) Address of a coin to search for, could be a script address. Can be a 0x or Mx address.
   * @param args.params.tokenid - (Optional) A tokenid, to search for coins of a specific token. Minima is 0x00.
   * @param args.params.checkmempool - (Optional) Check if the coin is in the mempool.
   * @param args.params.coinage - (Optional) How old does the coin have to be.
   * @param args.params.order - (Optional) Order asc or desc (Ascending or Descending).
   * @param callback - Optional callback function
   * @returns Promise that resolves with coins response
   */
  coins: SearchCommands.CoinsFunc;
  /**
   * List all tokens in the unpruned chain.
   * @param args - Tokens parameters
   * @param args.params - Tokens parameters object
   * @param args.params.tokenid - (Optional) The tokenid of the token to search for or export
   * @param args.params.action - (Optional) The action to perform - 'import' or 'export'
   * @param args.params.data - (Optional) The data of the token to import, generated from the export
   * @param callback - Optional callback function
   * @returns Promise that resolves with tokens response
   */
  tokens: SearchCommands.TokensFunc;
  /**
   * List all keys in the unpruned chain.
   * @param args - Keys parameters
   * @param args.params - Keys parameters object
   * @param callback - Optional callback function
   * @returns Promise that resolves with keys response
   */
  keys: SearchCommands.KeysFunc;
  /**
   * Check the proof of work for a transaction.
   * @param args - TxPow parameters
   * @param args.params - TxPow parameters object
   * @param callback - Optional callback function
   * @returns Promise that resolves with txpow response
   */
  txpow: SearchCommands.TxPowFunc;
}

/**
 * ------- Network Commands -------
 */

export module NetworkCommands {
  // Connect Function Types
  export type ConnectFunc = (
    args: { params: ConnectParams },
    callback?: (data: MessageResponse) => void,
  ) => Promise<MessageResponse>;

  // Disconnect Function Types
  export type DisconnectFunc = (
    args: { params: DisconnectParams },
    callback?: (data: MessageResponse) => void,
  ) => Promise<MessageResponse>;

  // Network Function Types
  type NetworkCallback<T> = (data: NetworkReturnType<T>) => void;
  export type NetworkFunc = <T extends NetworkListParams['action']>(
    args: { params: { action: T } },
    callback?: NetworkCallback<T>,
  ) => Promise<NetworkReturnType<T>>;

  // Peers Function Types
  type PeersCallback<T> = (data: PeersReturnType<T>) => void;
  export type PeersFunc = <T extends PeersParams | undefined>(
    ...args: T extends undefined
      ? [PeersCallback<T>?]
      : T extends { action: 'list' }
        ? [{ params: { action: T['action'] } }, PeersCallback<T>?]
        : T extends { action: 'addpeers' }
          ? [
              { params: { action: T['action']; peerslist: string } },
              PeersCallback<T>?,
            ]
          : [{ params: T }, PeersCallback<T>?]
  ) => Promise<PeersReturnType<T>>;

  // Ping Function Types
  export type PingFunc = (
    callback?: (data: PingResponse) => void,
  ) => Promise<PingResponse>;

  // RPC Function Types
  type RPCCallback<T> = (data: RPCResponse) => void;
  export type RPCFunc = <T extends RPCParams | undefined>(
    ...args: T extends undefined
      ? [RPCCallback<T>?]
      : T extends { enable: 'true' }
        ? [
            {
              params: { enable: T['enable']; password?: string; ssl?: boolean };
            },
            RPCCallback<T>?,
          ]
        : [{ params: T }, RPCCallback<T>?]
  ) => Promise<RPCResponse>;
}

export interface NetworkCommands {
  /**
   * Connect to a network Minima instance.
   *
   * Connect to another node to join the main network or to create a private test network.
   *
   * Set your own host using the -host parameter at start up.
   *
   * @param args - Connection parameters
   * @param args.params - Connection parameters object
   * @param args.params.host - Host address to connect to
   * @param callback - Optional callback function
   * @returns Promise that resolves with connection message response
   */
  connect: NetworkCommands.ConnectFunc;

  /**
   * Disconnect from a network Minima instance.
   *
   * @param args - Disconnection parameters
   * @param args.params - Disconnection parameters object
   * @param args.params.uid - Unique identifier for the connection to disconnect
   * @param callback - Optional callback function
   * @returns Promise that resolves with disconnection message response
   */
  disconnect: NetworkCommands.DisconnectFunc;
  /**
   * Show network status or reset traffic counter.
   *
   * @param args - Network parameters
   * @param args.params - Network parameters object
   * @param args.params.action - Optional action to perform:
   *   - 'list': List direct peer connections
   *   - 'reset': Restart traffic counter from 0
   *   - 'recalculateip': Reset IP when changing networks
   * @param callback - Optional callback function
   * @returns Promise that resolves with network status or action response
   */
  network: NetworkCommands.NetworkFunc;
  /**
   * List or add peers.
   *
   * @param args - Peers parameters
   * @param args.params - Peers parameters object
   * @param args.params.action - Optional action to perform:
   *   - 'list': List direct peer connections
   *   - 'addpeers': Add peers from a list
   * @param callback - Optional callback function
   * @returns Promise that resolves with peers list or action response
   */
  peers: NetworkCommands.PeersFunc;
  /**
   * Ping a Minima instance.
   *
   * @param callback - Optional callback function
   * @returns Promise that resolves with ping response
   */
  ping: NetworkCommands.PingFunc;
  /**
   * Enable or disable RPC.
   *
   * @param args - RPC parameters
   * @param args.params - RPC parameters object
   * @param args.params.enable - Enable or disable RPC
   * @param callback - Optional callback function
   * @returns Promise that resolves with RPC status response
   */
  rpc: NetworkCommands.RPCFunc;
  // TODO: Add webhooks command
}

/**
 * ------- Maxima Commands -------
 */

export module MaximaCommands {
  type MaximaCallback<A> = (data: MaximaReturnType<A>) => void;
  export type MaximaFunc = <A extends MaximaParams | undefined>(
    ...args: A extends undefined
      ? [MaximaCallback<A>?]
      : A extends { action: 'info' }
        ? [{ params: { action: A['action'] } }, MaximaCallback<A>?]
        : A extends { action: 'setname' }
          ? [{ params: MaximaSetnameParams }, MaximaCallback<A>?]
          : A extends { action: 'refresh' }
            ? [{ params: { action: A['action'] } }, MaximaCallback<A>?]
            : A extends { action: 'send' }
              ? [{ params: MaximaSendParams }, MaximaCallback<A>?]
              : A extends { action: 'sendall' }
                ? [{ params: MaximaSendallParams }, MaximaCallback<A>?]
                : A extends { action: 'seticon' }
                  ? [{ params: MaximaSeticonParams }, MaximaCallback<A>?]
                  : [{ params: A }, MaximaCallback<A>?]
  ) => Promise<MaximaReturnType<A>>;

  type MaxContactsCallback<A> = (data: MaxContactsReturnType<A>) => void;

  export type MaxContactsFunc = <A extends MaxContactsParams | undefined>(
    ...args: A extends undefined
      ? [MaxContactsCallback<A>?]
      : A extends { action: 'add' }
        ? [{ params: MaxContactsAddParams }, MaxContactsCallback<A>?]
        : A extends { action: 'remove' }
          ? [{ params: MaxContactsRemoveParams }, MaxContactsCallback<A>?]
          : A extends { action: 'search' }
            ? [{ params: MaxContactsSearchParams }, MaxContactsCallback<A>?]
            : A extends { action: 'import' }
              ? [{ params: MaxContactsImportParams }, MaxContactsCallback<A>?]
              : A extends { action: 'export' | 'list' }
                ? [{ params: { action: A['action'] } }, MaxContactsCallback<A>?]
                : [{ params: A }, MaxContactsCallback<A>?]
  ) => Promise<MaxContactsReturnType<A>>;

  type MaxCreateCallback = (data: MaxCreateResponse) => void;

  export type MaxCreateFunc = (
    callback?: MaxCreateCallback,
  ) => Promise<MaxCreateResponse>;

  type MaxSignCallback = (data: MaxSignResponse) => void;

  export type MaxSignFunc = (
    args: { params: MaxSignParams },
    callback?: MaxSignCallback,
  ) => Promise<MaxSignResponse>;

  type MaxExtraCallback<A> = (data: MaxExtraReturnType<A>) => void;

  export type MaxExtraFunc = <A extends MaxExtraParams>(
    ...args: A extends { action: 'staticmls' }
      ? [{ params: MaxExtraStaticMLSParams }, MaxExtraCallback<A>?]
      : A extends { action: 'addpermanent' }
        ? [{ params: MaxExtraPermanentParams }, MaxExtraCallback<A>?]
        : A extends { action: 'removepermanent' }
          ? [{ params: MaxExtraPermanentParams }, MaxExtraCallback<A>?]
          : A extends { action: 'getaddress' }
            ? [{ params: MaxExtraGetAddressParams }, MaxExtraCallback<A>?]
            : A extends { action: 'allowallcontacts' }
              ? [
                  { params: MaxExtraAllowAllContactsParams },
                  MaxExtraCallback<A>?,
                ]
              : A extends { action: 'addallowed' }
                ? [{ params: MaxExtraAddAllowedParams }, MaxExtraCallback<A>?]
                : [{ params: A }, MaxExtraCallback<A>?]
  ) => Promise<MaxExtraReturnType<A>>;

  type MaxVerifyCallback = (data: MaxVerifyResponse) => void;

  export type MaxVerifyFunc = (
    args: { params: MaxVerifyParams },
    callback?: MaxVerifyCallback,
  ) => Promise<MaxVerifyResponse>;
}

export interface MaximaCommands {
  maxima: MaximaCommands.MaximaFunc;
  maxcontacts: MaximaCommands.MaxContactsFunc;
  maxcreate: MaximaCommands.MaxCreateFunc;
  maxsign: MaximaCommands.MaxSignFunc;
  maxextra: MaximaCommands.MaxExtraFunc;
  maxverify: MaximaCommands.MaxVerifyFunc;
}

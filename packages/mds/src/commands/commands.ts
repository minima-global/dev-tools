import { MDS } from '../mds';
import type {
  BalanceParams,
  CheckAddressParams,
  CoinCheckParams,
  CoinTrackParams,
  HashTestParams,
} from './general/params';
import type {
  Balance,
  Block,
  CheckAddress,
  CoinCheck,
  CoinTrack,
  GetAddress,
  HashTest,
} from './general/response';
import type {
  CheckPendingParams,
  MDSParams,
  MDSParamsActionAcceptOrDeny,
  MDSParamsActionInstall,
  MDSParamsActionPending,
  MDSParamsActionPermission,
  MDSParamsActionUninstall,
  MDSParamsActionUpdate,
} from './mds/params';
import type {
  CheckModeResponse,
  CheckPendingResponse,
  CheckRestoreResponse,
  MDSCommand,
} from './mds/response';
import type { SendParams } from './send/params';
import type { SendResponse } from './send/response';
import type {
  LogParams,
  TxnExportParams,
  TxnImportParams,
  TxnParams,
} from './transactions/params';
import type {
  BurnResponse,
  ExportReturnType,
  LogResponse,
  TxnCheckResponse,
  TxnDeleteResponse,
  TxnInputResponse,
  TxnResponse,
} from './transactions/response';

/**
 * General Command Functions
 */
export module GeneralCommands {
  /**
   * Callback function for the balance command.
   * @param data - The data returned from the balance command.
   */
  type BalanceCallback<T extends { params: BalanceParams } | undefined> = (
    data: Balance.ReturnType<T>,
  ) => Promise<Balance.ReturnType<T>>;

  /**
   * Function for the balance command.
   * @param args - The arguments for the balance command.
   * @param callback - The callback function for the balance command.
   * @returns A promise that resolves to the data returned from the balance command.
   */
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
}

export module SendCommands {
  export type SendFunc = <T extends { params: SendParams }>(
    args: T,
    callback?: (data: SendResponse) => void,
  ) => Promise<SendResponse>;
}

export module MDSCommands {
  /**
   * Callback function for the mds command.
   * @param data - The data returned from the mds command.
   * @returns void
   */
  type MDSCallback<T extends { params: MDSParams } | undefined> = (
    data: MDSCommand.ReturnType<T>,
  ) => void;
  /**
   * Function for the mds command.
   * @param args - The arguments for the mds command.
   * @param callback - The callback function for the mds command.
   * @returns A promise that resolves to the data returned from the mds command.
   */

  //TODO: Change this its disgusting
  export type MDSFunc = <T extends { params: MDSParams }>(
    ...args: T extends { params: { action: 'install' } }
      ? [
          Omit<T, 'params'> & {
            params: MDSParamsActionInstall;
          },
          MDSCallback<T>?,
        ]
      : T extends { params: { action: 'update' } }
        ? [
            Omit<T, 'params'> & {
              params: MDSParamsActionUpdate;
            },
            MDSCallback<T>?,
          ]
        : T extends { params: { action: 'uninstall' } }
          ? [
              Omit<T, 'params'> & {
                params: MDSParamsActionUninstall;
              },
              MDSCallback<T>?,
            ]
          : T extends { params: { action: 'accept' | 'deny' } }
            ? [
                Omit<T, 'params'> & {
                  params: MDSParamsActionAcceptOrDeny;
                },
                MDSCallback<T>?,
              ]
            : T extends { params: { action: 'permission' } }
              ? [
                  Omit<T, 'params'> & {
                    params: MDSParamsActionPermission;
                  },
                  MDSCallback<T>?,
                ]
              : T extends { params: { action: 'pending' } }
                ? [
                    Omit<T, 'params'> & {
                      params: MDSParamsActionPending;
                    },
                    MDSCallback<T>?,
                  ]
                : [T?, MDSCallback<T>?]
  ) => Promise<MDSCommand.ReturnType<T>>;

  export type CheckModeFunc = (
    callback?: (data: CheckModeResponse) => void,
  ) => Promise<CheckModeResponse>;

  export type CheckPendingFunc = <T extends { params: CheckPendingParams }>(
    args: T,
    callback?: (data: CheckPendingResponse) => void,
  ) => Promise<CheckPendingResponse>;

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
   * Function for the send command.
   * @param callback - The callback function for the send command.
   * @returns A promise that resolves to the data returned from the send command.
   */
  send: SendCommands.SendFunc;
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

  // Function overload for txninput command
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
}

MDS.cmd.txninput({
  params: {
    id: '123',
    floating: 'true',
    address: '123',
    amount: '123',
    tokenid: '123',
  },
});

import {
  BalanceParams,
  CheckAddressParams,
  CoinCheckParams,
} from './general/params';
import { Balance, Block, CheckAddress, CoinCheck } from './general/response';

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
  ) => void;

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

  export type GetAddress = (
    callback?: (data: GetAddress) => void,
  ) => Promise<GetAddress>;
}

export interface GeneralCommands {
  block: GeneralCommands.BlockFunc;

  balance: GeneralCommands.BalanceFunc;

  checkaddress: GeneralCommands.CheckAddressFunc;

  coincheck: GeneralCommands.CoinCheckFunc;

  getaddress: GeneralCommands.GetAddress;
}

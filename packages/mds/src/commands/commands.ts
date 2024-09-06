import { MDS } from "../mds"
import { BalanceParams, CheckAddressParams } from "./general/params"
import { Balance, Block, CheckAddress } from "./general/response"

/**
 * General Command Functions
 */

type BalanceCallback<T extends { params: BalanceParams } | undefined> = (
  data: Balance.ReturnType<T>
) => void

type BalanceFunction = <T extends { params: BalanceParams } | undefined>(
  ...args: T extends undefined
    ? [BalanceCallback<T>?]
    : [T, BalanceCallback<T>?]
) => Promise<Balance.ReturnType<T>>

MDS.cmd.balance()

export interface GeneralCommands {
  block: (callback?: (data: Block) => void) => Promise<Block>

  balance: BalanceFunction

  checkaddress: <T extends { params: CheckAddressParams }>(
    args: T,
    callback?: (data: CheckAddress) => void
  ) => void
}

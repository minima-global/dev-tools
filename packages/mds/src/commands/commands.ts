import { MDS } from "../mds"
import { BalanceParams } from "./general/params"
import { Balance, Block } from "./general/response"

/**
 * General Command Functions
 */
/**
 * declare function balance <T extends {payload: BalanceParams } >(args: T, callback?: (data: BalanceGetPayload<T>) => void) : BalanceGetPayload<T>
 */
export interface GeneralCommands {

  block: (callback: (data: Block) => void) => void

  balance: <T extends { payload: BalanceParams }>(args?: T, callback?: (data: Balance.GetPayload<T>) => void) => void

}



MDS.cmd.balance({payload: {tokendetails: "true"}}, (data) => {
  console.log(data.map((d) => d))
})
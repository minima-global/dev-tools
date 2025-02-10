import Decimal from "decimal.js";
import { Coin, MDS } from "@minima-global/mds"

/** The Events API
 *  Soul-bound token management on Minima
 * by Elias
 * */

interface Account {
  publicKey: string;
  mxAddress: string;
  address: string;
}

const EVENTS_DEX_CONTRACT_v1 = "0xB2C0DF1C7B33120B34902173515E454ACD356CA92EB50FCA80558FB26681F5A0";
const COIN_NOTIFY_FEE = 0.0001;
const COIN_NOTIFY_ADDRESS = "0xFFEEDD8888"

/**
 * Send some Minima to the Events Dex Contract and wait for seller to complete the order
 * @param tokenid
 * @param amount
 */
const requestEventToken = async (tokenid: string, amount: string) => {
  try {
    const sendResp = await MDS.cmd.send({ params: {
      address: EVENTS_DEX_CONTRACT_v1,
        tokenid: tokenid,
        amount: amount
      }});

    MDS.log(JSON.stringify(sendResp, null, 2));

    return true;
  } catch (err) {
    console.error(err);

    return false;
  }
}

/**
 * Send some Minima to the Events Dex Contract and wait for seller to complete the order
 * @param coin
 * @param account - user dex account
 */
const acceptPurchaseRequest = async (coin: Coin, account: Account, type: string) => {
  try {
    // send the amount requested to the events soul-bound contract and send the Minima back to self
    const id = "nft_confirm_bid_" + randomInteger(1, 1000000000);
    const spendableAmount = new Decimal(coin.amount).minus(COIN_NOTIFY_FEE).toString();
    const myMinima = coin.coinid;
    const ownerKey = MDS.util.getStateVariable(coin, 0);
    const tokenId = MDS.util.getStateVariable(coin, 2);
    const tokenAmount = MDS.util.getStateVariable(coin, 3);

    /**
     * input 0 -> the dex coin
     * output 0 -> notify coin
     * output 1 -> send myself the dex coin money
     * output 2 -> send token to events soul-bound contract and set the owner as buyer
     */
    const rawTxn = `
      txncreate id:${id};
      txninput id:${id} coinid:${myMinima};
      txnoutput id:${id} address:${COIN_NOTIFY_ADDRESS} tokenid:0x00 amount:${COIN_NOTIFY_FEE} storestate:true;
      txnoutput id:${id} address:${account.address} tokenid:0x00 amount:${spendableAmount} storestate:false;
      txnaddamount id:${id} fromaddress:${account.address}  address:${EVENTS_DEX_CONTRACT_v1} tokenid:${tokenId} amount:${tokenAmount} storestate:true;
      txnstate id:${id} port:0 value:${ownerKey};
      txnstate id:${id} port:204 value:[${type}];
      txnsign id:${id} publickey:auto;
      txnsign id:${id} publickey:${account.publicKey};
      txnpost id:${id} auto:true mine:true
    `;

    const sendResp = await MDS.executeRaw(rawTxn);

    MDS.log(JSON.stringify(sendResp, null, 2));

    return true;
  } catch (err) {
    console.error(err);

    return false;
  }
}


function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

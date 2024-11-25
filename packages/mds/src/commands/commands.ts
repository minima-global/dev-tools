import * as GeneralCommandFunctions from './general/functions.js';
import * as SendCommandFunctions from './send/functions.js';
import * as MDSCommandFunctions from './mds/functions.js';
import * as TransactionsCommandFunctions from './transactions/functions.js';
import * as ScriptsCommandFunctions from './scripts/functions.js';
import * as SearchCommandFunctions from './search/functions.js';
import * as NetworkCommandFunctions from './network/functions.js';
import * as MaximaCommandFunctions from './maxima/functions.js';
import * as BackupCommandFunctions from './backup/functions.js';
/**
 * ------- General Commands -------
 */
export interface GeneralCommands {
  /**
   * Returns information about the current top block in the chain.
   * @param callback - Optional callback function that receives the block data
   * @returns A promise resolving to the block data containing block number, timestamp, hash and time in milliseconds
   * @example
   * // Get current block info
   * block()
   */
  block: GeneralCommandFunctions.BlockFunc;
  /**
   * Shows your total balance of Minima and tokens.
   * @param args - Optional parameters for filtering the balance
   * @param args.params.address - Optional address to show balance for (0x or Mx format)
   * @param args.params.tokenid - Optional tokenid to show balance for (e.g. 0x00 for Minima)
   * @param args.params.confirmations - Optional number of block confirmations required (default: 3)
   * @param callback - Optional callback function that receives the balance data
   * @returns A promise resolving to the balance data
   * @example
   * // Get total balance
   * balance()
   *
   * // Get balance for specific token with 10 confirmations
   * balance({ params: { tokenid: "0xFED5..", confirmations: 10 }})
   *
   * // Get balance for specific address
   * balance({ params: { address: "0xFF.." }})
   */
  balance: GeneralCommandFunctions.BalanceFunc;
  /**
   * Check the validity of an address and whether it belongs to your node.
   * @param args - Parameters for checking an address
   * @param args.params.address - The 0x or Mx address to check
   * @param callback - Optional callback function that receives the address check data
   * @returns A promise resolving to the address check data containing 0x/Mx formats and relevance
   * @example
   * // Check if address is valid and belongs to node
   * checkaddress({ params: { address: "0xFED..." }})
   */
  checkaddress: GeneralCommandFunctions.CheckAddressFunc;
  /**
   * Check a coin exists and is valid. Can only check unspent coins.
   * @param args - Parameters for checking a coin
   * @param args.params.data - The data of a coin. Can be found using the `coinexport` command
   * @param callback - Optional callback function that receives the coin check data
   * @returns A promise resolving to the coin check data containing validity and proof information
   * @example
   * // Check if coin data is valid
   * coincheck({ params: { data: "0x00000.." }})
   */
  coincheck: GeneralCommandFunctions.CoinCheckFunc;
  /**
   * Export a coin including its MMR proof.
   * A coin can then be imported and tracked on another node using the 'coinimport' command.
   * This does not allow the spending of a coin - just the knowledge of its existence.
   * @param args - Parameters for exporting a coin
   * @param args.params.coinid - The ID of the coin to export. Can be found using the `coins` command
   * @param callback - Optional callback function that receives the coin export data
   * @returns A promise resolving to the coin export data containing the coin proof and export data
   * @example
   * // Export a coin with its MMR proof
   * coinexport({ params: { coinid: "0xCD34.." }})
   */
  coinexport: GeneralCommandFunctions.CoinExportFunc;
  /**
   * Returns an existing default Minima address to receive funds, use as a change address etc.
   * Each address can be used securely 262144 (64^3) times.
   * Then you can wipe the private keys from your online node using the 'vault' command.
   * @param callback - Optional callback function that receives the address data
   * @returns A promise resolving to the address data
   * @example
   * // Get default address
   * getaddress()
   */
  getaddress: GeneralCommandFunctions.GetAddressFunc;
  /**
   * Check the speed of hashing of this device.
   * @param args - Optional parameters for the hash test
   * @param args.params.amount - Optional number of hashes to execute (defaults to 1 million)
   * @param callback - Optional callback function that receives the hash test data
   * @returns A promise resolving to the hash test data containing time taken and speed in MH/s
   * @example
   * // Test with default 1 million hashes
   * hashtest()
   *
   * // Test with custom number of hashes
   * hashtest({ params: { amount: 1000000 }})
   */
  hashtest: GeneralCommandFunctions.HashTestFunc;
  /**
   * Check a coin exists and is valid. Can only check unspent coins.
   * @param args - Parameters for checking a coin
   * @param args.params.data - The data of a coin. Can be found using the `coinexport` command
   * @param callback - Optional callback function that receives the coin check data
   * @returns A promise resolving to the coin check data containing validity and proof information
   * @example
   * // Check if coin data is valid
   * coincheck({ params: { data: "0x00000.." }})
   */
  cointrack: GeneralCommandFunctions.CoinTrackFunc;

  /**
   * Creates a new unique Minima address that is separate from the default 64 change addresses.
   * This address can be used for specific purposes or to improve privacy by having a dedicated
   * address that won't be reused for change.
   * @param callback - Optional callback function that receives the new address data
   * @returns A promise resolving to the new address data
   * @example
   * // Generate a new unique address
   * newaddress()
   */
  newaddress: GeneralCommandFunctions.NewAddressFunc;

  /**
   * Consolidate multiple coins (UTxOs) into one by sending them back to yourself.
   * Must have at least 3 coins.
   * Useful to prevent having many coins of tiny value and to manage the number of coins you are tracking.
   * @param args - Parameters for consolidating coins
   * @param args.params.tokenid - The tokenid for Minima or custom token to consolidate coins for. Minima is 0x00
   * @param args.params.coinage - Optional minimum number of blocks deep (confirmations) a coin needs to be. Default is 3
   * @param args.params.maxcoins - Optional maximum number of coins to consolidate (3-20). Coins sorted by value (smallest first). Default is 20
   * @param args.params.maxsigs - Optional maximum number of signatures for the transaction (up to 5). Coins sorted by address to minimize signatures. Default is 5
   * @param args.params.burn - Optional amount of Minima to burn with the transaction. Default is 0
   * @param args.params.debug - Optional true/false to print more detailed logs. Default is false
   * @param args.params.dryrun - Optional true/false to simulate but not execute the transaction. Default is false
   * @param callback - Optional callback function that receives the consolidate data
   * @returns A promise resolving to the consolidate data
   * @example
   * // Basic consolidate of Minima coins
   * consolidate({ params: { tokenid: "0x00" }})
   *
   * // Consolidate with minimum coin age
   * consolidate({ params: { tokenid: "0x00", coinage: 10 }})
   *
   * // Consolidate with max coins limit
   * consolidate({ params: { tokenid: "0x00", maxcoins: 5 }})
   *
   * // Consolidate with multiple parameters
   * consolidate({ params: { tokenid: "0x00", coinage: 10, maxcoins: 8, burn: 1 }})
   *
   * // Dry run consolidate with all parameters
   * consolidate({ params: { tokenid: "0x00", coinage: 10, maxcoins: 8, maxsigs: 3, burn: 1, dryrun: true }})
   */
  consolidate: GeneralCommandFunctions.ConsolidateFunc;
  /**
   * Validate the signature and webvalidate link in a token.
   * @param args - Parameters for validating a token
   * @param args.params.tokenid - The tokenid of the custom token/NFT to validate
   * @param callback - Optional callback function that receives the token validation data
   * @returns A promise resolving to the token validation data
   * @example
   * // Validate a token's signature and webvalidate link
   * tokenvalidate({ params: { tokenid: "0xFED5.." }})
   */
  tokenvalidate: GeneralCommandFunctions.TokenValidateFunc;

  /**
   * Create (mint) custom tokens or NFTs.
   * You must have some sendable Minima in your wallet as tokens are 'colored coins', a fraction of 1 Minima.
   * @param args - Parameters for creating a token
   * @param args.params.name - The name of the token. Can be a string or JSON Object
   * @param args.params.amount - The amount of total supply to create (between 1 and 1 Trillion)
   * @param args.params.decimals - Optional number of decimal places (default: 8, max: 16)
   * @param args.params.script - Optional custom script that must return 'TRUE' when spending any coin of this token
   * @param args.params.state - Optional list of state variables, if adding a script
   * @param args.params.signtoken - Optional public key to sign the token with. Useful for proving you are the creator
   * @param args.params.webvalidate - Optional URL to a publicly viewable .txt file storing the tokenid for validation
   * @param args.params.burn - Optional amount to burn with the tokencreate minting transaction
   * @param callback - Optional callback function that receives the token creation data
   * @returns A promise resolving to the token creation data
   * @example
   * // Create basic token
   * tokencreate({ params: { name: "newtoken", amount: 1000000 }})
   *
   * // Create token with JSON metadata
   * tokencreate({ params: {
   *   name: { name: "newcoin", link: "http:mysite.com", description: "A very cool token" },
   *   amount: 10
   * }})
   *
   * // Create NFT with validation
   * tokencreate({ params: {
   *   name: "mynft",
   *   amount: 10,
   *   decimals: 0,
   *   webvalidate: "https://www.mysite.com/nftvalidation.txt",
   *   signtoken: "0xFF..",
   *   burn: 0.1
   * }})
   *
   * // Create token with custom script
   * tokencreate({ params: {
   *   name: "charitycoin",
   *   amount: 1000,
   *   script: "ASSERT VERIFYOUT(@TOTOUT-1 0xMyAddress 1 0x00 TRUE)"
   * }})
   */
  tokencreate: GeneralCommandFunctions.TokenCreateFunc;
  /**
   * Show the message stacks of the internal Minima Engine with optional filter string.
   * @param args - Parameters for tracing messages
   * @param args.params.enable - Enable or disable tracing (true/false)
   * @param args.params.filter - Optional case-sensitive string to filter messages by
   * @param callback - Optional callback function that receives the trace data
   * @returns A promise resolving to the trace data
   * @example
   * // Enable tracing
   * trace({ params: { enable: true }})
   *
   * // Enable tracing with MAIN filter
   * trace({ params: { enable: true, filter: "MAIN" }})
   *
   * // Enable tracing with MINER filter
   * trace({ params: { enable: true, filter: "MINER" }})
   *
   * // Enable tracing with MDS filter
   * trace({ params: { enable: true, filter: "MDS" }})
   *
   * // Enable tracing with NOTIFYMANAGER filter
   * trace({ params: { enable: true, filter: "NOTIFYMANAGER" }})
   *
   * // Enable tracing with TXPOWPROCESSOR filter
   * trace({ params: { enable: true, filter: "TXPOWPROCESSOR" }})
   *
   * // Disable tracing
   * trace({ params: { enable: false }})
   */
  trace: GeneralCommandFunctions.TraceFunc;
  /**
   * Show the general status for Minima and your node. Optionally clean the RAM.
   * Prints details for general status, memory used, chain info, stored txpow units, network connections, p2p connections and traffic.
   * @param args - Optional parameters for cleaning RAM
   * @param args.params.clean - Optional flag to clear the RAM (true only)
   * @param callback - Optional callback function that receives the status data
   * @returns A promise resolving to the status data containing node details and metrics
   * @example
   * // Get general status
   * status()
   *
   * // Get status and clean RAM
   * status({ params: { clean: true }})
   */
  status: GeneralCommandFunctions.StatusFunc;
  /**
   * Generate a random value based on your SEED and a modifier.
   * @param args - Parameters for generating random value
   * @param args.params.modifier - The modifier string added to seed before hashing
   * @param callback - Optional callback function that receives the random value data
   * @returns A promise resolving to the random value data
   * @example
   * // Generate random value with modifier
   * seedrandom({ params: { modifier: "Hello you" }})
   */
  seedrandom: GeneralCommandFunctions.SeedRandomFunc;
  /**
   * Shutdown Minima safely. Ensure you have a backup before shutting down.
   * @param args - Optional parameters for compacting databases
   * @param args.params.compact - Optional flag to compact node databases before shutdown (true or false)
   * @param callback - Optional callback function that receives the quit data
   * @returns A promise resolving to the quit data
   * @example
   * // Shutdown Minima
   * quit()
   *
   * // Shutdown and compact databases
   * quit({ params: { compact: true }})
   */
  quit: GeneralCommandFunctions.QuitFunc;
  /**
   * Print a tree representation of the blockchain.
   * Default depth 32 blocks, can be increased to see more of the txpow tree.
   * @param args - Optional parameters for the tree view
   * @param args.params.depth - Optional number of blocks back from the tip to show in the txpow tree
   * @param args.params.cascade - Optional flag to show the cascade (true or false)
   * @param callback - Optional callback function that receives the tree data
   * @returns A promise resolving to the tree data
   * @example
   * // Print default tree view (32 blocks)
   * printtree()
   *
   * // Print tree with custom depth
   * printtree({ params: { depth: 500 }})
   *
   * // Print tree showing cascade
   * printtree({ params: { cascade: true }})
   */
  printtree: GeneralCommandFunctions.PrintTreeFunc;
  /**
   * Print the MMR set of the tip block and the total number of entries in the MMR.
   * Returns the tip block number, latest entry number and latest set of MMR entries.
   * For each entry, shows details of its row, entry number, data and value of all new and updated MMR entries for the tip block.
   * Row 1 represents the leaf nodes, entry 0 represents the first entry on a row.
   * @param callback - Optional callback function that receives the MMR data
   * @returns A promise resolving to the MMR data containing tip block info and MMR entries
   * @example
   * // Print MMR set for tip block
   * printmmr()
   */
  printmmr: GeneralCommandFunctions.PrintMmrFunc;
  /**
   * Function for the history command.
   * @param callback - The callback function for the history command.
   * @returns A promise that resolves to the data returned from the history command.
   */
  history: GeneralCommandFunctions.HistoryFunc;
}
/**
 * ------- Send Commands -------
 */
export interface SendCommands {
  /**
   * Send Minima or custom tokens to a wallet or custom script address.
   * Optionally, send to multiple addresses in one transaction; split UTxOs; add state variables or include a burn.
   * @param args - Parameters for sending tokens
   * @param args.params.address - (Optional) A Minima 0x or Mx wallet address or custom script address
   * @param args.params.amount - (Optional) The amount of Minima or custom tokens to send to the specified address
   * @param args.params.multi - (Optional) JSON Array listing addresses and amounts to send in one transaction. Format: ["address:amount","address2:amount2",..]
   * @param args.params.tokenid - (Optional) If sending a custom token, specify its tokenid. Defaults to Minima (0x00)
   * @param args.params.state - (Optional) List of state variables for sending to scripts. JSON format: {"port":"value",..}
   * @param args.params.burn - (Optional) The amount of Minima to burn with this transaction
   * @param args.params.password - (Optional) Unlock password-protected wallet for one transaction
   * @param args.params.split - (Optional) Number of output coins (1-20, default 1). Splits amount into equal value coins
   * @param args.params.coinage - (Optional) Minimum age of input coins in blocks
   * @param args.params.debug - (Optional) Enable detailed logging
   * @param args.params.dryrun - (Optional) Simulate transaction without executing
   * @param args.params.mine - (Optional) Mine transaction immediately
   * @param args.params.fromaddress - (Optional) Use only this address for input coins
   * @param args.params.signkey - (Optional) Sign transaction with only this key (use with fromaddress)
   * @param args.params.storestate - (Optional) Store state in output coins (default true)
   * @param callback - Optional callback function that receives the send response
   * @returns A promise resolving to the send response
   * @example
   * // Basic send
   * send({ params: { address: "0xFF..", amount: 10 }})
   *
   * // Send custom token with burn
   * send({ params: { address: "0xFF..", amount: 10, tokenid: "0xFED5..", burn: 0.1 }})
   *
   * // Send with split outputs
   * send({ params: { address: "0xFF..", amount: 10, split: 5, burn: 0.1 }})
   *
   * // Multi-address send
   * send({ params: { multi: ["0xFF..:10","0xEE..:10","0xDD..:10"], split: 10 }})
   *
   * // Send with state variables
   * send({ params: { amount: 1, address: "0xFF..", state: {"0":"0xEE..","1":"0xDD.."} }})
   */
  send: SendCommandFunctions.SendFunc;
  /**
   * Send function that adds 'send' commands to a list and polls every 30 seconds until the return status is 'true'.
   * @param args - Parameters for sending and polling tokens
   * @param args.params.action - (Optional) 'list' to show all commands in polling list, 'remove' to remove a command
   * @param args.params.uid - (Optional) The uid of a "send" command to remove from polling list. Use with action:remove
   * @param args.params.address - (Optional) A Minima 0x or Mx wallet address or custom script address
   * @param args.params.amount - (Optional) The amount of Minima or custom tokens to send
   * @param args.params.tokenid - (Optional) If sending a custom token, specify its tokenid. Defaults to Minima (0x00)
   * @param args.params.burn - (Optional) The amount of Minima to burn with this transaction
   * @param callback - Optional callback function that receives the sendpoll response
   * @returns A promise resolving to the sendpoll response
   * @example
   * // Basic send with polling
   * sendpoll({ params: { address: "0xFF..", amount: 10 }})
   *
   * // Send custom token with burn and polling
   * sendpoll({ params: { address: "0xFF..", amount: 10, tokenid: "0xFED5..", burn: 0.1 }})
   *
   * // List all polling commands
   * sendpoll({ params: { action: "list" }})
   *
   * // Remove command from polling
   * sendpoll({ params: { action: "remove", uid: "0x.." }})
   */
  sendpoll: SendCommandFunctions.SendPollFunc;
  /**
   * Create a transaction but don't sign it. Constructs and outputs an unsigned transaction to a file in the base folder.
   * The output .txn file can then be imported to an offline node for signing. Must be done from an online node as the MMR proofs for the input coins are added.
   * Useful when the keys on an online node are wiped or password locked.
   * @param args - Parameters for creating an unsigned transaction
   * @param args.params.address - (Optional) A Minima 0x or Mx wallet address or custom script address
   * @param args.params.amount - (Optional) The amount of Minima or custom tokens to send
   * @param args.params.multi - (Optional) JSON Array listing addresses and amounts to send in one transaction
   * @param args.params.tokenid - (Optional) If sending a custom token, specify its tokenid
   * @param args.params.state - (Optional) List of state variables, if sending coins to a script
   * @param args.params.burn - (Optional) The amount of Minima to burn with this transaction
   * @param args.params.split - (Optional) Set number of output coins (1-20). Default 1. Splits amount into equal coins
   * @param args.params.file - (Optional) Specify output file, otherwise default chosen
   * @param args.params.debug - (Optional) true/false for detailed logs
   * @param callback - Optional callback function that receives the sendnosign response
   * @returns A promise resolving to the sendnosign response
   * @example
   * // Basic unsigned transaction
   * sendnosign({ params: { address: "0xFF..", amount: 10 }})
   *
   * // Send custom token with burn
   * sendnosign({ params: { address: "0xFF..", amount: 10, tokenid: "0xFED5..", burn: 0.1 }})
   *
   * // Send with split outputs
   * sendnosign({ params: { address: "0xFF..", amount: 10, split: 5, burn: 0.1 }})
   *
   * // Multi-address send
   * sendnosign({ params: { multi: ["0xFF..:10","0xEE..:10","0xDD..:10"], split: 10 }})
   *
   * // Send with state variables
   * sendnosign({ params: { amount: 1, address: "0xFF..", state: {"0":"0xEE..","1":"0xDD.."} }})
   */
  sendnosign: SendCommandFunctions.SendNoSignFunc;
  /**
   * View a transaction (signed or unsigned).
   * View the details of a transaction created by the 'sendnosign' command by specifying its .txn file.
   * @param args - Parameters for viewing a transaction
   * @param args.params.file - Name of the transaction (.txn) file to view, located in the node's base folder. If not in the base folder, specify the full file path.
   * @param callback - Optional callback function that receives the sendview response
   * @returns A promise resolving to the sendview response
   * @example
   * // View transaction from base folder
   * sendview({ params: { file: "unsignedtransaction-1674907380057.txn" }})
   *
   * // View transaction with full file path
   * sendview({ params: { file: "C:\\Users\\unsignedtransaction-1674907380057.txn" }})
   */
  sendview: SendCommandFunctions.SendViewFunc;
  /**
   * Sign a transaction previously created by the 'sendnosign' command, by specifying its .txn file.
   * Can be signed on an offline node, then posted from an online node.
   * @param args - Parameters for signing a transaction
   * @param args.params.file - Name of the unsigned transaction (.txn) file to sign, located in the node's base folder. If not in the base folder, specify the full file path.
   * @param args.params.password - Optional Vault password, if the node is password locked. Keys will be automatically re-encrypted after signing.
   * @param callback - Optional callback function that receives the sendsign response
   * @returns A promise resolving to the sendsign response
   * @example
   * // Sign transaction from base folder
   * sendsign({ params: { file: "unsignedtransaction-1674907380057.txn" }})
   *
   * // Sign transaction with full file path and vault password
   * sendsign({ params: { file: "C:\\Users\\unsignedtransaction-1674907380057.txn", password: "your_vaultpassword" }})
   */
  sendsign: SendCommandFunctions.SendSignFunc;
  /**
   * Post a transaction previously created and signed using the 'sendnosign' and 'sendsign' commands.
   * Must be posted from an online node within approximately 24 hours of creation to ensure MMR proofs are valid.
   * @param args - Parameters for posting a transaction
   * @param args.params.file - Name of the signed transaction (.txn) file to post, located in the node's base folder. If not in the base folder, specify the full file path.
   * @param callback - Optional callback function that receives the sendpost response
   * @returns A promise resolving to the sendpost response
   * @example
   * // Post transaction from base folder
   * sendpost({ params: { file: "signedtransaction-1674907380057.txn" }})
   *
   * // Post transaction with full file path
   * sendpost({ params: { file: "C:\\Users\\signedtransaction-1674907380057.txn" }})
   */
  sendpost: SendCommandFunctions.SendPostFunc;
  /**
   * Create and manage multi-signature coins that require multiple signatures to spend.
   * @param args - Parameters for multisig operations
   * @param args.params.action - The action to perform: 'create', 'getkey', 'list', 'spend', 'sign', 'post', 'view'
   * @param args.params.id - Optional ID to identify the multisig coin
   * @param args.params.amount - Amount for creating or spending a multisig coin
   * @param args.params.publickeys - Array of public keys for creating the multisig coin
   * @param args.params.required - Number of required signatures
   * @param args.params.root - Optional root public key that can sign alone
   * @param args.params.coinid - CoinID of the multisig coin to spend
   * @param args.params.address - Address to send funds to when spending
   * @param args.params.file - Transaction file name for sign/post/view operations
   * @param args.params.password - Optional Vault password to decrypt private keys
   * @param callback - Optional callback function that receives the multisig response
   * @returns A promise resolving to the multisig operation response
   * @example
   * // Create a 2-of-3 multisig coin
   * multisig({ params: {
   *   action: "create",
   *   id: "2of3multisig",
   *   amount: 100,
   *   publickeys: ["0xFED5..","0xABD6..","0xFD8B.."],
   *   required: 2,
   *   password: "your_password"
   * }})
   *
   * // Create a 3-of-3 multisig coin with root key
   * multisig({ params: {
   *   action: "create",
   *   id: "3of3multisigroot",
   *   amount: 100,
   *   publickeys: ["0xFED5..","0xABD6..","0xFD8B.."],
   *   required: 3,
   *   root: "0xFFE.."
   * }})
   *
   * // List all multisig coins
   * multisig({ params: { action: "list" }})
   *
   * // List specific multisig coin
   * multisig({ params: { action: "list", id: "2of3multisig" }})
   *
   * // Create unsigned spend transaction
   * multisig({ params: {
   *   action: "spend",
   *   coinid: "0x17EA..",
   *   amount: 5,
   *   address: "0xFF..",
   *   file: "multisig.txn"
   * }})
   *
   * // Sign transaction with vault password
   * multisig({ params: {
   *   action: "sign",
   *   file: "multisig.txn",
   *   password: "your_password"
   * }})
   *
   * // View transaction details
   * multisig({ params: { action: "view", file: "multisig.txn" }})
   *
   * // Post signed transaction
   * multisig({ params: { action: "post", file: "signed_multisig.txn" }})
   */
  multisig: SendCommandFunctions.MultiSigFunc;
}
/**
 * ------- MDS Commands -------
 */
export interface MDSCommands {
  /**
   * MiniDAPP System management.
   * Install, update or uninstall MiniDapps and set their permissions to READ/WRITE. Default permission is READ.
   * DO NOT give WRITE permissions to MiniDapps you do not trust! Accept/deny pending commands from MiniDapps with READ permissions.
   * @param args.params.action - (Optional) list, install, update, uninstall, pending, accept, deny, permission, publicmds
   * @param args.params.file - (Optional) The file name of the MiniDapp to install. Can be in Minima folder or specify file path
   * @param args.params.uid - (Optional) The uid of the MiniDapp to update, uninstall
   * @param args.params.trust - (Optional) Set permission to 'read' or 'write'
   * @param args.params.enable - (Optional) true/false, default false. Enable public wallet on https://nodeip:port/publicmds/
   * @param callback - Optional callback function that receives the MDS command response
   * @returns A promise resolving to the MDS command response
   * @example
   * // List installed MiniDapps
   * mds action:list
   * // Install new MiniDapp
   * mds action:install file:wallet_1.0.mds.zip
   * // Install with write permission
   * mds action:install file:/path/to/wallet.mds.zip trust:write
   * // Update existing MiniDapp
   * mds action:update uid:0xABA3.. file:wallet_2.0.mds.zip
   * // Uninstall MiniDapp
   * mds action:uninstall uid:0xABA3..
   * // List pending commands
   * mds action:pending
   * // Accept/deny pending command
   * mds action:accept uid:0xCDF6..
   * mds action:deny uid:0xCDF6..
   * // Change permission
   * mds action:permission uid:0xABA3.. trust:write
   */
  mds: MDSCommandFunctions.MDSFunc;
  /**
   * Show if this MiniDAPP is READ or WRITE mode.
   * Can be called from a MiniDapp to check whether it is in READ or WRITE mode.
   * @param callback - Optional callback function that receives the checkmode response
   * @returns A promise resolving to the checkmode response containing mode details
   * @example
   * // Check MiniDapp mode
   * checkmode
   */
  checkmode: MDSCommandFunctions.CheckModeFunc;
  /**
   * Show if a pending command UID is in the pending list.
   * Can be called from a MiniDapp to check if a command is still pending.
   * @param callback - Optional callback function that receives the checkpending response
   * @returns A promise resolving to the checkpending response indicating if command is pending
   * @example
   * // Check if command is pending
   * checkpending
   */
  checkpending: MDSCommandFunctions.CheckPendingFunc;
  /**
   * Check whether Minima is currently being restored, is shutting down and if shutdown is complete.
   * @param callback - Optional callback function that receives the checkrestore response
   * @returns A promise resolving to the checkrestore response indicating restore/shutdown status
   * @example
   * // Check restore status
   * checkrestore
   */
  checkrestore: MDSCommandFunctions.CheckRestoreFunc;
}
/**
 * ------- Transaction Commands -------
 */
export interface TransactionCommands {
  /**
   * Signs a transaction with the specified parameters.
   * @param args - Parameters for signing the transaction
   * @param args.params.id - Transaction ID to sign
   * @param args.params.publickey - Public key to sign with
   * @param args.params.txnpostauto - Whether to automatically post the transaction after signing ('true' or 'false')
   * @param callback - Optional callback function that receives the signature data
   * @returns A promise resolving to either TxnSignResponse or TxSignPostResponse depending on txnpostauto parameter
   * @example
   * // Sign transaction without auto-posting
   * txnsign({ params: { id: "0x123", publickey: "0xABC" }})
   *
   * // Sign and auto-post transaction
   * txnsign({ params: { id: "0x123", publickey: "0xABC", txnpostauto: "true" }})
   */
  burn: TransactionsCommandFunctions.BurnFunc;
  /**
   * Enable detailed logs for script errors, mining activity, Maxima, network messages, blocks, or IBD processing.
   * @param args - Parameters for configuring logging
   * @param args.params.scripts - Optional boolean to enable/disable detailed logs for script errors
   * @param args.params.mining - Optional boolean to enable/disable detailed logs for mining activity
   * @param args.params.maxima - Optional boolean to enable/disable detailed logs for Maxima
   * @param args.params.networking - Optional boolean to enable/disable detailed logs for network messages
   * @param args.params.blocks - Optional boolean to enable/disable detailed logs for blocks
   * @param args.params.ibd - Optional boolean to enable/disable detailed logs for IBD processing
   * @param callback - Optional callback function that receives the log configuration response
   * @returns A promise resolving to the log configuration status
   * @example
   * // Enable script error logging
   * logs({ params: { scripts: true }})
   *
   * // Enable mining logs and disable script logs
   * logs({ params: { scripts: false, mining: true }})
   */
  logs: TransactionsCommandFunctions.LogFunc;
  /**
   * Create a custom transaction.
   * @param args - Parameters for creating the transaction
   * @param args.params.id - The ID of the transaction
   * @param callback - Optional callback function that receives the transaction data
   * @returns A promise resolving to the transaction data
   * @example
   * // Create a new transaction with ID
   * txncreate({ params: { id: "multisig" }})
   */
  txncreate: TransactionsCommandFunctions.TxnFunc;
  /**
   * Automatically set the MMR proofs and scripts for a transaction.
   * Only run this command when a transaction is ready to be posted.
   * @param args - Parameters for setting transaction basics
   * @param args.params.id - The ID of the transaction
   * @param callback - Optional callback function that receives the transaction data
   * @returns A promise resolving to the transaction data
   * @example
   * // Set MMR proofs and scripts for transaction
   * txnbasics({ params: { id: "simpletxn" }})
   */
  txnbasics: TransactionsCommandFunctions.TxnFunc;
  /**
   * Clear ALL the Witness data for a transaction - signatures, MMR proofs and script proofs.
   * @param args - Parameters for clearing transaction witness data
   * @param args.params.id - The ID of the transaction
   * @param callback - Optional callback function that receives the transaction data
   * @returns A promise resolving to the transaction data
   * @example
   * // Clear witness data for transaction
   * txnclear({ params: { id: "multisig" }})
   */
  txnclear: TransactionsCommandFunctions.TxnFunc;
  /**
   * Show details about the transaction and verify its validity.
   * Checks if inputs, outputs, signatures, proofs, and scripts are valid.
   * @param args - Parameters for checking the transaction
   * @param args.params.id - The ID of the transaction to check
   * @param callback - Optional callback function that receives the transaction check data
   * @returns A promise resolving to the transaction check data
   * @example
   * // Check validity of transaction
   * txncheck({ params: { id: "multisig" }})
   */
  txncheck: TransactionsCommandFunctions.TxnCheckFunc;
  /**
   * Delete a previously created custom transaction.
   * @param args - Parameters for deleting the transaction
   * @param args.params.id - The ID of the transaction to delete
   * @param callback - Optional callback function that receives the deletion confirmation
   * @returns A promise resolving to the deletion confirmation
   * @example
   * // Delete transaction with ID
   * txndelete({ params: { id: "multisig" }})
   */
  txndelete: TransactionsCommandFunctions.TxnDeleteFunc;
  /**
   * Export a transaction as HEX or to a file.
   * @param args - Parameters for exporting the transaction
   * @param args.params.id - The ID of the transaction
   * @param args.params.file - Optional file name/path to export the transaction to (must use .txn extension)
   * @param callback - Optional callback function that receives the export data
   * @returns A promise resolving to either the transaction HEX data or file export details
   * @example
   * // Export transaction as HEX
   * txnexport({ params: { id: "simpletxn" }})
   *
   * // Export transaction to file
   * txnexport({ params: { id: "multisig", file: "multisig.txn" }})
   */
  txnexport: TransactionsCommandFunctions.TxnExportFunc;
  /**
   * Import a transaction from previously exported HEX data or a .txn file.
   * @param args - Parameters for importing the transaction
   * @param args.params.id - Optional ID to assign to the imported transaction
   * @param args.params.file - Optional file name/path of the .txn file to import
   * @param args.params.data - Optional HEX data of the previously exported transaction
   * @param callback - Optional callback function that receives the import result
   * @returns A promise resolving to the import result
   * @example
   * // Import transaction from HEX data
   * txnimport({ params: { data: "0x0000.." }})
   *
   * // Import transaction from HEX data with custom ID
   * txnimport({ params: { id: "simpletxn", data: "0x0000.." }})
   *
   * // Import transaction from file
   * txnimport({ params: { id: "multisig", file: "multisig.txn" }})
   */
  txnimport: TransactionsCommandFunctions.TxnImportFunc;
  /**
   * Add a coin as an input to a transaction.
   * @param args - Parameters for adding the input
   * @param args.params.id - The ID of the transaction to add an input to
   * @param args.params.coinid - Optional ID of the coin to add as input
   * @param args.params.coindata - Optional data of the coin to add (from coinexport or outputcoindata)
   * @param args.params.floating - Optional boolean, true adds unspecified floating ELTOO coin input
   * @param args.params.address - Coin address for floating input (0x or Mx format)
   * @param args.params.amount - Amount for floating input coin
   * @param args.params.tokenid - Token ID for floating input coin
   * @param args.params.scriptmmr - Optional boolean, true adds scripts and MMR proof for the coin
   * @param callback - Optional callback function that receives the input result
   * @returns A promise resolving to the input result
   * @example
   * // Add coin input by ID
   * txninput({ params: { id: "simpletxn", coinid: "0xD0BF.." }})
   *
   * // Add coin input with scripts and MMR proof
   * txninput({ params: { id: "multisig", coinid: "0xD0BF..", scriptmmr: true }})
   *
   * // Add coin input using coin data
   * txninput({ params: { id: "posttxn", coindata: "0x000.." }})
   *
   * // Add floating ELTOO coin input
   * txninput({ params: { id: "eltootxn", floating: true, address: "0xFED5..", amount: 10, tokenid: "0x00" }})
   */
  txninput: TransactionsCommandFunctions.TxnInputFunc;
  /**
   * List your custom transactions. Includes previously posted transactions.
   * @param args - Parameters for listing transactions
   * @param args.params.id - Optional ID of a specific transaction to list
   * @param callback - Optional callback function that receives the transaction list
   * @returns A promise resolving to the transaction list data
   * @example
   * // List all transactions
   * txnlist()
   *
   * // List specific transaction by ID
   * txnlist({ params: { id: "multisig" }})
   */
  txnlist: TransactionsCommandFunctions.TxnList;
  /**
   * Create a transaction output.
   * @param args - Parameters for creating the output
   * @param args.params.id - The ID of the transaction to add an output to
   * @param args.params.amount - The amount for the output to send to the specified address
   * @param args.params.address - Address of the recipient/script (0x or Mx format)
   * @param args.params.tokenid - Optional token ID of the output (default: 0x00 for Minima)
   * @param args.params.storestate - Optional boolean, true keeps state variables in output coin (default: true)
   * @param callback - Optional callback function that receives the output result
   * @returns A promise resolving to the output result
   * @example
   * // Create simple output
   * txnoutput({ params: { id: "simpletxn", amount: 10, address: "0xFED5.." }})
   *
   * // Create output with custom token and no state storage
   * txnoutput({ params: { id: "multisig", amount: 10, address: "0xFED5..", tokenid: "0xCEF5..", storestate: false }})
   *
   * // Create ELTOO output
   * txnoutput({ params: { id: "eltootxn", amount: 10, address: "0xFED5.." }})
   */
  txnoutput: TransactionsCommandFunctions.TxnOutputFunc;
  /**
   * Signs a transaction with the specified parameters.
   * @param args - Parameters for signing the transaction
   * @param args.params.id - The ID of the transaction to sign
   * @param args.params.publickey - The public key specified in a custom script, or 'auto' for transactions with simple inputs
   * @param args.params.txnpostauto - Optional boolean to automatically post the transaction after signing
   * @param args.params.txnpostburn - Optional amount to burn if auto-posting
   * @param args.params.txnpostmine - Optional boolean to mine transaction immediately if auto-posting
   * @param args.params.txndelete - Optional boolean to delete transaction after signing and posting
   * @param callback - Optional callback function that receives the signature data
   * @returns A promise resolving to either TxnSignResponse or TxSignPostResponse depending on txnpostauto parameter
   * @example
   * // Sign transaction with auto public key
   * txnsign({ params: { id: "simpletxn", publickey: "auto" }})
   *
   * // Sign transaction with specific public key
   * txnsign({ params: { id: "multisig", publickey: "0xFD8B.." }})
   *
   * // Sign and auto-post transaction
   * txnsign({ params: { id: "simpletxn", publickey: "auto", txnpostauto: "true" }})
   */
  txnsign: TransactionsCommandFunctions.TxnSignFunc;
  /**
   * Post a transaction. Automatically set the Scripts and MMR proofs.
   * @param args - Parameters for posting the transaction
   * @param args.params.id - The ID of the transaction to post
   * @param args.params.auto - Optional boolean to automatically set scripts and MMR proofs
   * @param args.params.burn - Optional amount in Minima to burn with the transaction
   * @param args.params.mine - Optional boolean to mine transaction immediately
   * @param args.params.txndelete - Optional boolean to delete transaction after posting
   * @param callback - Optional callback function that receives the post result
   * @returns A promise resolving to the post result
   * @example
   * // Post transaction
   * txnpost({ params: { id: "simpletxn" }})
   *
   * // Post with auto scripts and burn
   * txnpost({ params: { id: "simpletxn", auto: "true", burn: "0.1" }})
   *
   * // Post multisig transaction with burn
   * txnpost({ params: { id: "multisig", burn: "0.1" }})
   */
  txnpost: TransactionsCommandFunctions.TxnPostFunc;

  // TODO: Add txnstate command
}
/**
 * ------- Scripts Commands -------
 */
export interface ScriptsCommands {
  /**
   * Add a new custom script to your node.
   * @param args - Parameters for adding the new script
   * @param args.params.script - The script to add to your node
   * @param args.params.trackall - If true, track all coins with this script address. If false, only track relevant coins
   * @param args.params.clean - Optional boolean to clean script to minimal representation. Default is false
   * @param callback - Optional callback function that receives the script data
   * @returns A promise resolving to the script data
   * @example
   * // Add multisig script tracking all coins
   * newscript({ params: { script: "RETURN SIGNEDBY(0x1539..) AND SIGNEDBY(0xAD25..)", trackall: true }})
   *
   * // Add script with state variables tracking only relevant coins
   * newscript({ params: {
   *   script: "RETURN (@BLOCK GTE PREVSTATE(1) OR @COINAGE GTE PREVSTATE(4)) AND VERIFYOUT(@INPUT PREVSTATE(2) @AMOUNT @TOKENID FALSE)",
   *   trackall: false
   * }})
   */
  scripts: ScriptsCommandFunctions.ScriptsFunc;
  /**
   * Show the complete Grammar for Minima KISSVM scripting.
   * @param callback - Optional callback function that receives the tutorial text
   * @returns A promise resolving to the tutorial text containing KISSVM grammar
   * @example
   * // Get KISSVM grammar tutorial
   * tutorial()
   */
  tutorial: ScriptsCommandFunctions.TutorialFunc;
  /**
   * Add a new custom script to your node.
   * @param args - Parameters for adding the new script
   * @param args.params.script - The script to add to your node. Your node will then know about coins with this script address
   * @param args.params.trackall - If true, track all coins with this script address. If false, only track coins with this script address that are relevant to you
   * @param args.params.clean - Optional boolean to clean script to minimal representation. Default is false
   * @param callback - Optional callback function that receives the script data
   * @returns A promise resolving to the script data
   * @example
   * // Add multisig script tracking all coins
   * newscript({ params: { script: "RETURN SIGNEDBY(0x1539..) AND SIGNEDBY(0xAD25..)", trackall: true }})
   *
   * // Add script with state variables tracking only relevant coins
   * newscript({ params: {
   *   script: "RETURN (@BLOCK GTE PREVSTATE(1) OR @COINAGE GTE PREVSTATE(4)) AND VERIFYOUT(@INPUT PREVSTATE(2) @AMOUNT @TOKENID FALSE)",
   *   trackall: false
   * }})
   */
  newscript: ScriptsCommandFunctions.NewScriptFunc;
  /**
   * Test run a script with predefined parameters without executing on chain.
   * Scripts will be auto cleaned for you.
   * @param args - Parameters for running the script
   * @param args.params.script - The script to run, surrounded by double quotes
   * @param args.params.state - Optional state variable values to use when running the script. JSON object in format {0:value,1:value,..}
   * @param args.params.prevstate - Optional previous state variable values for the input coin. JSON object in format {0:value,1:value,..}
   * @param args.params.globals - Optional Global variable values to use when running the script. JSON object in format {0:value,1:value,..}
   * @param args.params.signatures - Optional signatures required for the script. JSON array
   * @param args.params.extrascripts - Optional extra scripts required for MAST contracts. JSON object in format {script:proof,..}
   * @param callback - Optional callback function that receives the script execution results
   * @returns A promise resolving to the script execution results
   * @example
   * // Run script with signature and block height check
   * runscript({ params: {
   *   script: "RETURN SIGNEDBY(0xFF..) AND @BLOCK GT 100",
   *   globals: {"@BLOCK":"101"},
   *   signatures: ["0xFF"]
   * }})
   *
   * // Run script with state variables and coinage check
   * runscript({ params: {
   *   script: "LET st=STATE(99) LET ps=PREVSTATE(99) IF st EQ ps AND @COINAGE GT 20 AND SIGNEDBY(0xFF) THEN RETURN TRUE ELSEIF st GT ps AND SIGNEDBY(0xEE) THEN RETURN TRUE ENDIF",
   *   globals: {"@COINAGE":"23"},
   *   state: {"99":"0"},
   *   prevstate: {"99":"0"},
   *   signatures: ["0xFF"]
   * }})
   *
   * // Run MAST script with extra scripts
   * runscript({ params: {
   *   script: "MAST 0x0E3..",
   *   extrascripts: {"RETURN TRUE":"0x000.."}
   * }})
   */
  runscript: ScriptsCommandFunctions.RunScriptFunc;
  /**
   * Remove a custom script. BE CAREFUL not to remove a script you need.
   * @param args - Parameters for removing the script
   * @param args.params.address - The address of the script to remove (can be in 0x or Mx format)
   * @param callback - Optional callback function that receives the removal confirmation
   * @returns A promise resolving to the removal confirmation
   * @example
   * // Remove script at specific address
   * removescript({ params: { address: "0xFFE678768CDE.." }})
   *
   * // Remove script with Mx address format
   * removescript({ params: { address: "MxFFE678768CDE.." }})
   */
  removescript: ScriptsCommandFunctions.RemoveScriptFunc;
}
/**
 * ------- Search Commands -------
 */
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
  coins: SearchCommandFunctions.CoinsFunc;
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
  tokens: SearchCommandFunctions.TokensFunc;
  /**
   * List all keys in the unpruned chain.
   * @param args - Keys parameters
   * @param args.params - Keys parameters object
   * @param callback - Optional callback function
   * @returns Promise that resolves with keys response
   */
  keys: SearchCommandFunctions.KeysFunc;
  /**
   * Check the proof of work for a transaction.
   * @param args - TxPow parameters
   * @param args.params - TxPow parameters object
   * @param callback - Optional callback function
   * @returns Promise that resolves with txpow response
   */
  txpow: SearchCommandFunctions.TxPowFunc;
}
/**
 * ------- Network Commands -------
 */
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
  connect: NetworkCommandFunctions.ConnectFunc;

  /**
   * Disconnect from a network Minima instance.
   *
   * @param args - Disconnection parameters
   * @param args.params - Disconnection parameters object
   * @param args.params.uid - Unique identifier for the connection to disconnect
   * @param callback - Optional callback function
   * @returns Promise that resolves with disconnection message response
   */
  disconnect: NetworkCommandFunctions.DisconnectFunc;
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
  network: NetworkCommandFunctions.NetworkFunc;
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
  peers: NetworkCommandFunctions.PeersFunc;
  /**
   * Ping a Minima instance.
   *
   * @param callback - Optional callback function
   * @returns Promise that resolves with ping response
   */
  ping: NetworkCommandFunctions.PingFunc;
  /**
   * Enable or disable RPC.
   *
   * @param args - RPC parameters
   * @param args.params - RPC parameters object
   * @param args.params.enable - Enable or disable RPC
   * @param callback - Optional callback function
   * @returns Promise that resolves with RPC status response
   */
  rpc: NetworkCommandFunctions.RPCFunc;
  // TODO: Add webhooks command
}
/**
 * ------- Maxima Commands -------
 */
export interface MaximaCommands {
  /**
   * Check your Maxima details, send a message/data.
   *
   * @param args - Optional parameters for Maxima operations
   * @param args.params.action - Action to perform:
   *   - 'info': Show your Maxima details (name, publickey, etc)
   *   - 'setname': Set your Maxima name (default "noname")
   *   - 'hosts': List your Maxima hosts and details
   *   - 'send': Send a message to a contact
   *   - 'sendall': Send a message to ALL contacts
   *   - 'refresh': Refresh contacts with network message
   * @param args.params.name - Optional name when using setname action
   * @param args.params.id - Optional contact ID when sending message
   * @param args.params.to - Optional contact address when sending message
   * @param args.params.publickey - Optional public key when sending message
   * @param args.params.application - Optional application name for messages
   * @param args.params.data - Optional data payload for messages
   * @param args.params.poll - Optional boolean to poll send until successful
   * @param args.params.delay - Optional delay in ms for send/sendall
   * @param callback - Optional callback function
   * @returns Promise resolving to Maxima response based on action
   * @example
   * // Get Maxima info
   * maxima({ params: { action: 'info' }})
   *
   * // Set name
   * maxima({ params: { action: 'setname', name: 'myname' }})
   *
   * // Send message by ID
   * maxima({ params: {
   *   action: 'send',
   *   id: 1,
   *   application: 'appname',
   *   data: '0xFED5..'
   * }})
   *
   * // Send to all contacts
   * maxima({ params: {
   *   action: 'sendall',
   *   application: 'appname',
   *   data: '0xFED5..'
   * }})
   */
  maxima: MaximaCommandFunctions.MaximaFunc;
  /**
   * Manage your Maxima contacts. List, refresh, add, remove or search contacts.
   *
   * @param args - Optional parameters for managing contacts
   * @param args.params.action - Action to perform:
   *   - 'list': List existing contacts
   *   - 'add': Add a new contact
   *   - 'remove': Remove an existing contact
   *   - 'search': Search for a contact
   * @param args.params.contact - Optional Maxima contact address when adding a contact
   * @param args.params.id - Optional contact ID when removing/searching
   * @param args.params.publickey - Optional public key when removing/searching
   * @param callback - Optional callback function
   * @returns Promise resolving to contacts data based on action
   * @example
   * // List all contacts
   * maxcontacts()
   * // or
   * maxcontacts({ params: { action: 'list' }})
   *
   * // Add new contact
   * maxcontacts({ params: { action: 'add', contact: 'MxG18H..' }})
   *
   * // Remove contact by ID
   * maxcontacts({ params: { action: 'remove', id: 1 }})
   *
   * // Search by public key
   * maxcontacts({ params: { action: 'search', publickey: '0x3081..' }})
   */
  maxcontacts: MaximaCommandFunctions.MaxContactsFunc;
  /**
   * Create a 128 bit RSA public/private key pair that can be used with maxsign and maxverify.
   * @param callback - Optional callback function that receives the key pair data
   * @returns A promise resolving to an object containing the public and private keys
   * @example
   * // Generate new key pair
   * maxcreate()
   */
  maxcreate: MaximaCommandFunctions.MaxCreateFunc;
  /**
   * Sign data with your Maxima ID or a specified private key.
   * @param args - Parameters for signing data
   * @param args.params.data - The 0x HEX data to sign
   * @param args.params.privatekey - Optional private key from maxcreate (uses Maxima ID if not specified)
   * @param callback - Optional callback function that receives the signature data
   * @returns A promise resolving to an object containing the signature
   * @example
   * // Sign with Maxima ID
   * maxsign({ params: { data: "0xCD34.." }})
   *
   * // Sign with specific private key
   * maxsign({ params: { data: "0xCD34..", privatekey: "0x3081.." }})
   */
  maxsign: MaximaCommandFunctions.MaxSignFunc;
  /**
   * Perform extra functions on Maxima.
   * @param args - Parameters for extra Maxima functions
   * @param args.params.action - Action to perform:
   *   - 'staticmls': Set an unchanging Maxima Location Service (mls) host
   *   - 'addpermanent': Add public key to allow getaddress requests
   *   - 'removepermanent': Remove public key to stop allowing requests
   *   - 'listpermanent': List all public keys allowing requests
   *   - 'clearpermanent': Remove all public keys allowing requests
   *   - 'getaddress': Request contact address of permanent user
   *   - 'mlsinfo': List info about users using you as their mls
   *   - 'allowallcontacts': Enable/disable users adding you as contact
   *   - 'addallowed': Authorize specific users to add you as contact
   *   - 'listallowed': List allowed public keys
   *   - 'clearallowed': Remove all allowed public keys
   * @param args.params.publickey - Optional Maxima public key for permanent address sharing
   * @param args.params.maxaddress - Optional Maxima address for permanent address sharing
   * @param args.params.enable - Optional boolean for allowallcontacts action
   * @param args.params.host - Optional p2pidentity of always-online server node
   * @param callback - Optional callback function
   * @returns Promise resolving to response data based on action
   * @example
   * // Set static MLS host
   * maxextra({ params: { action: 'staticmls', host: 'Mx...@34.190.784.3:9001' }})
   *
   * // Clear static MLS host
   * maxextra({ params: { action: 'staticmls', host: 'clear' }})
   *
   * // Add permanent public key
   * maxextra({ params: { action: 'addpermanent', publickey: '0x3081..' }})
   *
   * // Get address for permanent user
   * maxextra({ params: { action: 'getaddress', maxaddress: 'MAX#0x3081..#Mx..@34.190.784.3:9001' }})
   *
   * // Disable allowing all contacts
   * maxextra({ params: { action: 'allowallcontacts', enable: false }})
   *
   * // Add allowed public key
   * maxextra({ params: { action: 'addallowed', publickey: '0x2451..' }})
   */
  maxextra: MaximaCommandFunctions.MaxExtraFunc;
  /**
   * Verify data with a Maxima public key.
   * @param args - Parameters for verifying data
   * @param args.params.data - The 0x HEX data to verify the signature for
   * @param args.params.publickey - The Maxima public key of the signer
   * @param args.params.signature - The signature of the data
   * @param callback - Optional callback function that receives the verification result
   * @returns A promise resolving to an object containing valid true/false
   * @example
   * // Verify data signature
   * maxverify({ params: { data: "0xCD34..", publickey: "0xFED5..", signature: "0x4827.." }})
   */
  maxverify: MaximaCommandFunctions.MaxVerifyFunc;
}
/**
 * ------- Backup Commands -------
 */
export interface BackupCommands {
  /**
   * Perform a chain or seed re-sync from an archive node.
   * A chain re-sync will put your node on the correct chain so you are in sync with the latest tip block.
   * A seed re-sync will wipe the wallet and re-generate your keys from your seed phrase.
   * @param args - Parameters for archive operations
   * @param args.params.action - The archive action to perform:
   *   - 'resync': Do a chain or seed re-sync
   *   - 'integrity': Check archive db integrity
   *   - 'export': Export archive db to gzip
   *   - 'import': Import from archive gzip
   *   - 'inspect': Inspect archive export file
   *   - 'addresscheck': Check address coins in archive
   * @param args.params.host - Optional ip:port of archive node
   * @param args.params.file - Optional archive export gzip filename
   * @param args.params.phrase - Optional 24 word seed phrase for seed re-sync
   * @param args.params.keys - Optional number of keys to create for seed re-sync
   * @param args.params.keyuses - Optional max key usage count for seed re-sync
   * @param args.params.address - Optional wallet address to check
   * @param callback - Optional callback function
   * @returns Promise resolving to response data based on action
   * @example
   * // Chain re-sync from auto-selected archive node
   * archive({ params: { action: 'resync', host: 'auto' }})
   *
   * // Seed re-sync with phrase
   * archive({ params: {
   *   action: 'resync',
   *   host: '89.98.89.98:8888',
   *   phrase: 'YOUR 24 WORD SEED PHRASE',
   *   keys: 90,
   *   keyuses: 2000
   * }})
   *
   * // Check archive integrity
   * archive({ params: { action: 'integrity' }})
   *
   * // Export archive to file
   * archive({ params: { action: 'export', file: 'archiveexport-ddmmyy.gzip' }})
   *
   * // Import from archive file
   * archive({ params: { action: 'import', file: 'archiveexport-ddmmyy.gzip' }})
   *
   * // Inspect archive file
   * archive({ params: { action: 'inspect', file: 'archiveexport-ddmmyy.gzip' }})
   *
   * // Check address in archive
   * archive({ params: { action: 'addresscheck', address: 'Mx...' }})
   */
  archive: BackupCommandFunctions.ArchiveFunc;
  /**
   * Create a backup of your node data.
   * @param args - Optional parameters for backup
   * @param args.params.password - Optional password to encrypt backup (letters and numbers only)
   * @param args.params.file - Optional filename ending in .bak, can include local path
   * @param args.params.auto - Optional boolean to schedule daily non-password backups
   * @param args.params.maxhistory - Optional max number of relevant TxPoW history to include
   * @param callback - Optional callback function that receives the backup data
   * @returns A promise resolving to backup data containing file details and size
   * @example
   * // Basic backup with default timestamped name
   * backup()
   *
   * // Password protected backup
   * backup({ params: { password: "Longsecurepassword456" }})
   *
   * // Custom filename with password and max history
   * backup({ params: {
   *   password: "Longsecurepassword456",
   *   file: "my-backup-01-Jan-22.bak",
   *   maxhistory: 100
   * }})
   *
   * // Enable daily auto backups
   * backup({ params: { auto: true }})
   */
  backup: BackupCommandFunctions.BackupFunc;
  /**
   * From Minima Version 1.0.41
   * View information about your MegaMMR. Export and Import complete MegaMMR data.
   * Note: You must be running with the -megammr start up parameter.
   * @param args - Optional parameters for MegaMMR operations
   * @param args.params.action - Optional action: 'info', 'export', or 'import'
   * @param args.params.file - Optional .mmr file to use with export and import actions
   * @param callback - Optional callback function that receives the MegaMMR data
   * @returns A promise resolving to MegaMMR data based on the action
   * @example
   * // Get basic MegaMMR info
   * megammr()
   *
   * // Explicitly request MegaMMR info
   * megammr({ params: { action: 'info' }})
   *
   * // Export MegaMMR data to file
   * megammr({ params: { action: 'export', file: 'mmrfile.mmr' }})
   *
   * // Import MegaMMR data from file
   * megammr({ params: { action: 'import', file: 'mmrfile.mmr' }})
   */
  megammr: BackupCommandFunctions.MegaMmrFunc;
  /**
   * From Minima Version 1.0.41
   * Perform a quick chain sync, seed re-sync or restore a backup from a MegaMMR node.
   * The host node must be running with -megammr enabled.
   * @param args - Parameters for MegaMMR sync operations
   * @param args.params.action - Optional action: 'mydetails' or 'resync'
   * @param args.params.host - Required for resync: ip:port of the node to sync from
   * @param args.params.phrase - Optional seed phrase for wallet re-sync
   * @param args.params.anyphrase - Optional boolean if using custom seed phrase (default: false)
   * @param args.params.keys - Optional number of keys to create for seed re-sync (default: 64)
   * @param args.params.keyuses - Optional max key usage count for re-sync (default: 1000, max: 262144)
   * @param args.params.file - Optional backup file to restore during resync
   * @param args.params.password - Optional password for backup file
   * @param callback - Optional callback function that receives the sync data
   * @returns A promise resolving to sync data based on the action
   * @example
   * // Show sync details for current node
   * megammrsync({ params: { action: 'mydetails' }})
   *
   * // Quick sync from MegaMMR node
   * megammrsync({ params: { action: 'resync', host: '34.32.59.133:9001' }})
   *
   * // Restore backup during resync
   * megammrsync({ params: {
   *   action: 'resync',
   *   host: '34.32.59.133:9001',
   *   file: 'myoldbackup.bak',
   *   password: 'backup_password'
   * }})
   *
   * // Seed re-sync with increased key usage
   * megammrsync({ params: {
   *   action: 'resync',
   *   host: '34.32.59.133:9001',
   *   phrase: 'YOUR 24 WORD SEED PHRASE',
   *   keyuses: 2000
   * }})
   */
  megammrsync: BackupCommandFunctions.MegaMmrSyncFunc;
  /**
   * Restore your node from a backup.
   * You MUST wait until all your original keys are created before this is allowed.
   * @param args - Parameters for restoring from backup
   * @param args.params.file - Specify the filename or local path of the backup to restore
   * @param args.params.password - Optional password of the backup
   * @param callback - Optional callback function that receives the restore data
   * @returns A promise resolving to the restore data
   * @example
   * // Restore from backup file
   * restore({ params: { file: "my-full-backup-01-Jan-22" }})
   *
   * // Restore from password-protected backup
   * restore({ params: {
   *   file: "my-full-backup-01-Jan-22",
   *   password: "Longsecurepassword456"
   * }})
   */
  restore: BackupCommandFunctions.RestoreFunc;
  /**
   * Restore the entire system AND perform an archive chain sync. Use when the backup is old.
   * The node will be restored and an archive chain sync will commence from the last block in the backup.
   * You MUST wait until all your original keys are created before this is allowed.
   * @param args - Parameters for restoring and syncing
   * @param args.params.file - Specify the filename or local path of the backup to restore
   * @param args.params.password - Optional password of the backup
   * @param args.params.host - Optional ip:port of the archive node to sync from
   * @param args.params.keyuses - Optional increment (not set) the number of key uses per key
   * @param callback - Optional callback function that receives the restore data
   * @returns A promise resolving to the restore data
   * @example
   * // Restore from backup and sync from archive node
   * restoresync({ params: {
   *   file: "my-full-backup-01-Jan-22",
   *   password: "Longsecurepassword456",
   *   host: "89.98.89.98:9001"
   * }})
   *
   * // Restore and sync with increased key usage
   * restoresync({ params: {
   *   file: "my-full-backup-01-Jan-22",
   *   password: "Longsecurepassword456",
   *   keyuses: 1000,
   *   host: "89.98.89.98:9001"
   * }})
   */
  restoresync: BackupCommandFunctions.RestoreSyncFunc;
  /**
   * View, encrypt/decrypt or wipe/restore your seed phrase and private keys.
   *
   * @warning
   * DO NOT SHARE YOUR SEED PHRASE WITH ANYONE.
   * BE CAREFUL. ENSURE YOU HAVE A BACKUP AND SECURE RECORD OF YOUR PASSPHRASE BEFORE LOCKING.
   * You must have your passphrase to unlock your private keys.
   *
   * @param args - Optional parameters for vault operations
   * @param args.params.action - Optional action to perform: 'seed', 'wipekeys', 'restorekeys', 'passwordlock', 'passwordunlock'
   * @param args.params.seed - Optional seed phrase to lock your node (will delete private keys)
   * @param args.params.phrase - Optional passphrase to restore your node (will reinstate private keys)
   * @param args.params.password - Optional password for locking/unlocking node
   * @param args.params.confirm - Optional password confirmation when locking
   * @param callback - Optional callback function that receives the vault operation data
   * @returns A promise resolving to the vault operation data
   * @example
   * // View seed phrase (default action)
   * vault()
   *
   * // Wipe private keys using seed
   * vault({ params: { action: "wipekeys", seed: "0xDD4E.." }})
   *
   * // Restore private keys using phrase
   * vault({ params: { action: "restorekeys", phrase: "SPRAY LAMP.." }})
   *
   * // Lock node with password
   * vault({ params: {
   *   action: "passwordlock",
   *   password: "your_password",
   *   confirm: "your_password"
   * }})
   *
   * // Unlock node with password
   * vault({ params: {
   *   action: "passwordunlock",
   *   password: "your_password"
   * }})
   */
  vault: BackupCommandFunctions.VaultFunc;
  /**
   * Reset your node in various ways.
   * You MUST wait until all your original keys are created before this is allowed.
   *
   * @param args - Parameters for resetting the node
   * @param args.params.archivefile - The archive .dat or .gzip file exported from an archive node
   * @param args.params.action - Action to perform: 'chainsync', 'seedsync', or 'restore'
   * @param args.params.file - Optional filename/path of backup to restore
   * @param args.params.password - Optional password of the backup
   * @param args.params.phrase - Optional 24 word seed phrase for importing and syncing chain
   * @param args.params.keys - Optional number of keys to create for seed re-sync
   * @param args.params.keyuses - Optional maximum number of times keys were used
   * @param callback - Optional callback function that receives the reset operation data
   * @returns A promise resolving to the reset operation data
   * @example
   * // Re-sync blocks from archive file
   * reset({ params: {
   *   archivefile: "archiveexport-jul23.gz",
   *   action: "chainsync"
   * }})
   *
   * // Re-sync from seed phrase
   * reset({ params: {
   *   archivefile: "archiveexport-jul23.gz",
   *   action: "seedsync",
   *   keyuses: 1000,
   *   phrase: "ENTER 24 WORDS HERE"
   * }})
   *
   * // Restore from backup
   * reset({ params: {
   *   archivefile: "archiveexport-jul23.gz",
   *   action: "restore",
   *   file: "backup-jul23.bak",
   *   password: "Longsecurepass"
   * }})
   */
  reset: BackupCommandFunctions.ResetFunc;
  // TODO: mysql
  // TODO: mysqlcoins
}

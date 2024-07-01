export type BackupCommands =
  | { command: "backup"; payload: BackupParams } // TODO: Add response type
  | { command: "archive"; payload: ArchiveParams } // TODO: Add response type
  | { command: "mysql"; payload: MYSqlParams } // TODO: Add response type
  | { command: "mysqlcoins"; payload: MySqlCoinsParams } // TODO: Add response type
  | { command: "reset"; payload: ResetParams } // TODO: Add response type
  | { command: "restore"; payload: RestoreParams } // TODO: Add response type
  | { command: "restoresync"; payload: RestoreSyncParams } // TODO: Add response type
  | { command: "vault"; payload: ValutParams } // TODO: Add response type

type ArchiveParams = {
  /**
   * The action to perform on the archive node.
   * - `resync`: Perform a resync. Do not provide your 24-word seed phrase for chain re-sync only.
   * - `integrity`: Check the integrity of your archive database. No host required.
   * - `export`: Export your archive database to a gzip file.
   * - `import`: Perform a chain or seed re-sync using an archive gzip file. Use with `file`.
   * - `inspect`: Inspect an archive export gzip file. If 'last:1', the file can re-sync any node from genesis.
   * - `addresscheck`: Check your archive database for spent and unspent coins at a specific address.
   */
  action:
    | "resync"
    | "integrity"
    | "export"
    | "import"
    | "inspect"
    | "addresscheck"

  /**
   * The IP and port of the archive node to sync from or check the integrity of.
   * Use 'auto' to connect to a default archive node.
   * @example "192.168.1.1:8080"
   */
  host?: string

  /**
   * The name or path of the archive export gzip file to export, import, or inspect.
   * @example "/path/to/archive.gz"
   */
  file?: string

  /**
   * Your 24-word seed phrase for performing a seed re-sync. Enclose the phrase in double quotes.
   * This will wipe the wallet of this node. Do not provide if you still have access to your wallet and just need a re-sync.
   * @example "\"word1 word2 ... word24\""
   */
  phrase?: string

  /**
   * The number of keys to create if performing a seed re-sync. Defaults to 64.
   * @example 64
   */
  keys?: string

  /**
   * The maximum number of times you used your keys. Increase this if re-syncing with a seed phrase and you've used the keys more than before.
   * Defaults to 1000, maximum is 262144 for normal keys.
   * @example 1000
   */
  keyuses?: string

  /**
   * The wallet address to check for spent and unspent coins.
   * Use this with `action: addresscheck`.
   * @example "0x1234...abcd"
   */
  address?: string
}

type BackupParams = {
  /**
   * Optional password for the backup.
   * The password should contain only letters and numbers.
   * @example "mySecurePassword123"
   */
  password?: string

  /**
   * Optional filename for the backup.
   * Should end with `.bak`, and you can specify a local path.
   * If not specified, the default location is the Minima data folder.
   * @example "/path/to/backup/backupfile.bak"
   */
  file?: string

  /**
   * Optional setting to schedule an automatic backup every 24 hours.
   * If `true`, the backup is not password protected.
   * @example true
   */
  auto?: boolean

  /**
   * Optional maximum number of relevant TxPoW (Transaction Proof of Work) to  * include in the backup. This parameter helps manage the history included in * the backup. @example 100
   */
  maxhistory?: number
}

type MYSqlParams = {
  /**
   * The action to perform on the MySQL database.
   * - `info`: Show the blocks stored in the archive DB and compare to the MySQL DB.
   * - `integrity`: Check if the block order and block parents are correct in the MySQL DB.
   * - `update`: Update the MySQL DB with the latest sync blocks from the node's archive DB.
   * - `addresscheck`: Check the history of all the spent and unspent coins from an address.
   * - `autobackup`: Automatically save archive data to the MySQL DB. Use with `enable`.
   * - `resync`: Perform a chain or seed re-sync from the specified MySQL DB. This will shut down the node, requiring a restart once complete.
   * - `wipe`: Wipe the MySQL DB (use with caution).
   * - `h2export`: Export the MySQL DB to an archive gzip file for node resyncing.
   * - `h2import`: Import an archive gzip file to the MySQL DB.
   * - `rawexport`: Export the MySQL DB to an archive .dat file for node resyncing.
   */
  action:
    | "info"
    | "integrity"
    | "update"
    | "addresscheck"
    | "autobackup"
    | "resync"
    | "wipe"
    | "h2export"
    | "h2import"
    | "rawexport"

  /**
   * The IP:port or Docker container name running the MySQL database.
   * @example "127.0.0.1:3306"
   */
  host: string

  /**
   * The name of the MySQL database used to store the archive DB data.
   * @example "minima_archive"
   */
  database: string

  /**
   * The MySQL user to log in as.
   * @example "root"
   */
  user: string

  /**
   * The MySQL password for the provided user.
   * @example "password123"
   */
  password: string

  /**
   * Connect to the MySQL database in read-only mode if true.
   * @example true
   */
  readonly?: boolean

  /**
   * The BIP39 seed phrase of the node to re-sync. Required for `resync` action to restore lost funds.
   * Providing this will wipe the node and perform a re-sync.
   * @example "word1 word2 ... word24"
   */
  phrase?: string

  /**
   * The number of keys to create if a seed phrase is provided for the `resync` action. Default is 80.
   * @example 80
   */
  keys?: number

  /**
   * The number of previous uses for each key if a seed phrase is provided for the `resync` action. Default is 1000.
   * @example 1000
   */
  keyuses?: number

  /**
   * The address to check the history of spent and unspent coins for. Used with `addresscheck` action.
   * @example "0x1234...abcd"
   */
  address?: string

  /**
   * Used with `autobackup` action to enable or disable automatic backups.
   * @example true
   */
  enable?: boolean
}

type MySqlCoinsParams = {
  /**
   * The action to perform on the MySQL coins database.
   * - `info`: Get information about the Coins DB.
   * - `update`: Update the coins DB with the latest coins from MySQL data.
   * - `wipe`: Wipe the Coins DB.
   * - `search`: Perform a search on the coins data with specified query parameters.
   */
  action: "info" | "update" | "wipe" | "search"

  /**
   * The IP:port or Docker container name running the MySQL database.
   * @example "127.0.0.1:3306"
   */
  host: string

  /**
   * The name of the MySQL database used to store the archive DB data.
   * @example "minima_archive"
   */
  database: string

  /**
   * The MySQL user to log in as.
   * @example "root"
   */
  user: string

  /**
   * The MySQL password for the provided user.
   * @example "password123"
   */
  password: string

  /**
   * Connect to the MySQL database in read-only mode if true.
   * @example true
   */
  readonly?: boolean

  /**
   * Show detailed logs if true. Defaults to true.
   * @example true
   */
  logs?: boolean

  /**
   * The maximum number of coins to add. Helps limit the update process which can be lengthy.
   * @example 1000
   */
  maxcoins?: number

  /**
   * The search criteria for the `search` action.
   * String data must be enclosed in single quotes. Multiple parameters can be used.
   * @example "address = '0x1234...abcd' AND spent = false"
   */
  where?: string

  /**
   * The full SQL query to perform on the coins database for the `search` action.
   * @example "SELECT * FROM coins WHERE spent = false AND address = '0x1234...abcd'"
   */
  query?: string

  /**
   * The address to check for in the coins database.
   * Used with the `search` action.
   * @example "0x1234...abcd"
   */
  address?: string

  /**
   * Indicates if the coin is spent or unspent. Used with the `search` action.
   * @example true
   */
  spent?: boolean

  /**
   * Limit the number of rows returned by the `search` action.
   * @example 50
   */
  limit?: number
}

type ResetParams = {
  /**
   * The action to perform for resetting the node.
   * - `chainsync`: Re-sync all blocks from the archive file to get back onto the correct chain. No seed phrase required, private keys remain unchanged.
   * - `seedsync`: Wipe the wallet and regenerate keys from the seed phrase. Coins will be restored.
   * - `restore`: Restore a backup and re-sync the entire chain from the archive file.
   */
  action: "chainsync" | "seedsync" | "restore"

  /**
   * The archive file (.dat or .gzip) to use for the reset action. It should be a recent export from an archive node.
   * @example "/path/to/archivefile.dat"
   */
  archivefile: string

  /**
   * The filename or local path of the backup to restore. This is optional and is used with the `restore` action.
   * @example "/path/to/backupfile.bak"
   */
  file?: string

  /**
   * The password for the backup to be restored. This is optional and is used with the `restore` action.
   * @example "backupPassword123"
   */
  password?: string

  /**
   * The 24-word seed phrase in double quotes, used to import a seed phrase and sync the entire chain. Required for the `seedsync` action.
   * This will wipe the wallet of the node.
   * @example "word1 word2 word3 ... word24"
   */
  phrase?: string

  /**
   * The number of keys to create during a seed re-sync. The default is 64. This is optional and is used with the `seedsync` action.
   * @example 64
   */
  keys?: number

  /**
   * The maximum number of times the keys have been used. Required to be higher each time you re-sync with the seed phrase, as Minima Signatures are stateful.
   * The default is 1000, and the maximum is 262144 for normal keys. This is optional and is used with the `seedsync` action.
   * @example 1000
   */
  keyuses?: number
}

type RestoreParams = {
  /**
   * The filename or local path of the backup to restore.
   * This field is required and should specify the full path to the backup file.
   * @example "/path/to/backupfile.bak"
   */
  file: string

  /**
   * The password for the backup to be restored.
   * This is optional and used to unlock the backup file if it is password protected.
   * @example "backupPassword123"
   */
  password?: string
}

type RestoreSyncParams = {
  /**
   * The filename or local path of the backup to restore.
   * This field is required and should specify the full path to the backup file.
   * @example "/path/to/backupfile.bak"
   */
  file: string

  /**
   * The password for the backup to be restored.
   * This is optional and used to unlock the backup file if it is password protected.
   * @example "backupPassword123"
   */
  password?: string

  /**
   * The IP address and port of the archive node to sync from, in the format "ip:port".
   * This field is optional and defaults to syncing from a local or default node.
   * @example "192.168.1.100:8080"
   */
  host?: string

  /**
   * Increment the number of key uses per key. This is optional and is not setting a value directly.
   * Every time you perform a restore sync, this value should be incremented due to the stateful nature of Minima signatures.
   * @example 100
   */
  keyuses?: number
}

type ValutParams = {
  /**
   * The action to perform in the vault.
   * DO NOT SHARE YOUR SEED PHRASE WITH ANYONE.
   * BE CAREFUL. ENSURE YOU HAVE A BACKUP AND SECURE RECORD OF YOUR PASSPHRASE
   * BEFORE LOCKING.
   * - `seed`: Show your seed phrase. This is the default action.
   * - `wipekeys`: Wipe your private keys but keep the public keys.
   * - `restorekeys`: Restore your private keys.
   * - `passwordlock`: Lock your node by password encrypting private keys.
   * - `passwordunlock`: Unlock your node by reinstating your private keys.
   */
  action?:
    | "seed"
    | "wipekeys"
    | "restorekeys"
    | "passwordlock"
    | "passwordunlock"

  /**
   * Your seed phrase used to lock your node. This will delete your private keys.
   * Providing this is optional and required only for certain actions.
   * @example "word1 word2 word3 ... word24"
   */
  seed?: string

  /**
   * Your passphrase used to restore or unlock your node. This will reinstate your private keys.
   * Providing this is optional and required only for certain actions.
   * @example "yourPassphrase"
   */
  phrase?: string
}

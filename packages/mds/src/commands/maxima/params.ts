export type MaximaCommands =
  | {
      command: "maxcontacts"
      payload: MaximaContactsParams
    }
  | { command: "maxcreate"; payload?: null }
  | { command: "maxextra"; payload?: MaxExtraParams }
  | { command: "maxima"; payload: MaximaParams }

type MaximaContactsParams = {
  /**
   * Action to perform on Maxima contacts.
   * - `list`: List your Maxima contacts, including their id, address details, MLS, and if they are on the same chain.
   * - `add`: Add a new contact. Requires the `contact` parameter.
   * - `remove`: Remove a Maxima contact. Will also remove you from their contacts. Requires the `id` parameter.
   * - `search`: Search for a contact. Can be used with the `id` or `publickey` parameter.
   */
  action: "list" | "add" | "remove" | "search"
  /**
   * Optional: The Maxima contact address of another node.
   * Can be found using the 'maxima' command.
   * Used with `add` action.
   */
  contact?: string
  /**
   * Optional: The id of an existing contact to remove or search for.
   * Used with `remove` or `search` action.
   */
  id?: string
  /**
   * Optional: The Maxima public key of an existing contact to remove or search for.
   * Used with `search` action.
   */
  publickey?: string
}
type MaxExtraParams = {
  /**
   * Perform extra functions on Maxima.
   * - `staticmls`: Set an unchanging Maxima Location Service (mls) host for yourself.
   * - `addpermanent`: On your static mls node, add your Maxima public key to allow 'getaddress' requests from anyone.
   * - `removepermanent`: On your static mls node, remove your Maxima public key to stop allowing 'getaddress' requests.
   * - `listpermanent`: On your static mls node, list all public keys currently allowing public requests for their contact address.
   * - `clearpermanent`: On your static mls node, remove ALL public keys currently allowing requests for their contact address.
   * - `getaddress`: Request the current contact address of a permanently accessible user from their static mls host.
   * - `mlsinfo`: List info about users using you as their mls and the public keys of their contacts.
   * - `allowallcontacts`: If you have shared your permanent maxaddress, you can disable/enable users adding you as a contact.
   * - `addallowed`: If 'allowallcontacts' is disabled, you can authorize specific users to add you as a contact. Stored in RAM.
   * - `listallowed`: List all the public keys which are allowed to add you as a Maxima contact.
   * - `clearallowed`: Remove the public keys of ALL users which are allowed to add you as a Maxima contact.
   */
  action:
    | "staticmls"
    | "addpermanent"
    | "removepermanent"
    | "listpermanent"
    | "clearpermanent"
    | "getaddress"
    | "mlsinfo"
    | "allowallcontacts"
    | "addallowed"
    | "listallowed"
    | "clearallowed"
  /**
   * Optional: The Maxima public key of the user who wants to share their permanent maxaddress to be publicly contactable over Maxima.
   * Or the Maxima public key of a user who is allowed to add you as a contact.
   * Used with actions `addpermanent`, `removepermanent`, `getaddress`, `addallowed`.
   */
  publickey?: string
  /**
   * Optional: Used with `getaddress` action to get the contact address of a user using their permanent maxaddress.
   * The maxaddress must be in the format `MAX#pubkey#staticmls`, including their public key and static mls host address.
   */
  maxaddress?: string
  /**
   * Optional: Used with `allowallcontacts` action to enable or disable all new contacts.
   * Must be `true` or `false`.
   */
  enable?: "true" | "false"
  /**
   * Optional: The 'p2pidentity' of a server node which is always online.
   * Used with the `staticmls` action to set the host of your static mls.
   */
  host?: string
}
type MaximaParams = {
  /**
   * Check your Maxima details, send a message/data.
   * - `info`: Show your Maxima details - name, publickey, staticmls, mls, local identity, and contact address.
   * - `setname`: Set your Maxima name so your contacts recognize you. Default is 'noname'.
   * - `hosts`: List your Maxima hosts and see their Maxima public key, contact address, last seen time, and if you are connected.
   * - `send`: Send a message to a contact. Must specify 'id|to|publickey', 'application', and 'data' parameters.
   * - `sendall`: Send a message to ALL your contacts. Must specify 'application' and 'data' parameters.
   * - `refresh`: Refresh your contacts by sending them a network message.
   */
  action: "info" | "setname" | "hosts" | "send" | "sendall" | "refresh"
  /**
   * Optional: The name to set for your Maxima identity.
   * Used with the `setname` action.
   */
  name?: string
  /**
   * Optional: The recipient's id
   * Use with the `send` action.
   */
  id?: string
  /**
   * Optional: The recipient's public key
   * Use with the `send` action.
   */
  publickey?: string
  /**
   * Optional: The recipient's contact address
   * Use with the `send` action.
   */
  to?: string
  /**
   * Optional: The application string that identifies which application should process the message.
   * Use with the `send` and `sendall` actions.
   */
  application?: string
  /**
   * Optional: The data to send. Can be a HEX string or a JSON object.
   * Use with the `send` and `sendall` actions.
   */
  data?: string | JSON
  /**
   * Optional: Whether to poll the send action until successful. Defaults to false.
   * Use with the `send` action.
   */
  poll?: "true" | "false"
  /**
   * Optional: Delay sending the message by this many milliseconds.
   * Only used with `poll` or with the `sendall` action.
   */
  delay?: string
}
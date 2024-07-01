export type NetworkCommands =
  | { command: "connect"; payload: ConnectParams }
  | { command: "disconnect"; payload: DisconnectParams }
  | { command: "message"; payload: MessageParams }
  | { command: "network"; payload: NetworkParams }
  | { command: "peers"; payload?: PeersParams }
  | { command: "ping"; payload: PingParams }
  | { command: "rpc"; payload: RPCParams }
  | { command: "webhooks"; payload: WebhooksParams }

type ConnectParams = {
  /**
   * The external ip:port of the node to connect to.
   * Use the -host parameter at start up to set your own host.
   * @example '123.456.789.0:5000'
   */
  host: string
}
type DisconnectParams = {
  /**
   * Use 'all' to disconnect from all hosts or enter the uid of the host to disconnect from.
   * uid can be found from the 'network' command.
   * @example '123abc456def'
   * @example 'all'
   */
  uid: string
}
type MessageParams = {
  /**
   * The message content as a string.
   *
   * @example 'Hello, peers!'
   */
  data: string
  /**
   * Optional: Leave blank to send a message to all peers or enter the uid of the peer to send the message to.
   * uid can be found from the 'network' command.
   *
   * @example '123abc456def'
   */
  uid?: string
}
type NetworkParams = {
  /**
   * Optional: Specify the action to perform.
   * - `list`: List the direct peers you are connected to. The default.
   * - `reset`: Restart the traffic counter from 0.
   * - `recalculateip`: Reset your IP - when you move to a different WiFi.
   */
  action?: "list" | "reset" | "recalculateip"
}
type PeersParams = {
  /**
   * Optional: Specify the action to perform.
   * - `list`: List your peers. The default.
   * - `addpeers`: Add a list of new peers.
   */
  action?: "list" | "addpeers"
  /**
   * Optional: JSON array of new peers [ip:port, ip:port, ...].
   * Required if action is 'addpeers'.
   */
  peerslist?: string[]
}
type PingParams = {
  /*
   * The external ip:port of the node to ping.
   */
  host: string
}
type RPCParams = {
  /**
   * Enable or disable RPC on port 9005.
   */
  enable: "true" | "false"
  /**
   * Optional: Enable or disable Self signed SSL for RPC.
   * Use with caution and ensure SSL is properly configured.
   */
  ssl?: "true" | "false"
  /**
   * Optional: Basic Auth password used in headers.
   * Only secure if used with SSL.
   */
  password?: string
}
type WebhooksParams = {
  /**
   * Action to perform on webhooks.
   * - `list`: List existing webhooks.
   * - `add`: Add a new webhook.
   * - `remove`: Remove an existing webhook.
   * - `clear`: Clear all existing webhooks.
   * Default action is `list`.
   */
  action?: "list" | "add" | "remove" | "clear"

  /**
   * Optional: URL of the webhook endpoint.
   * Must be a POST endpoint.
   */
  hook?: string

  /**
   * Optional: Filters which events trigger the webhook.
   * Specify event types or criteria to filter.
   */
  filter?: string[]
}

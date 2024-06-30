export type BackupCommands =
  | { command: "restore"; payload: RestoreParams }
  | { command: "backup"; payload: BackupParams }

type BackupParams = {
  file: string
  password?: string
}

type RestoreParams = {
  file: string
  password?: string
}

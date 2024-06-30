export interface BackupRes {
  restore: Restore
  backup: Backup
}

type Backup = {
  file: string
  password?: string
}

type Restore = {
  name: string
  age: number
}

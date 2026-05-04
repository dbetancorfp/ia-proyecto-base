import Database from 'better-sqlite3'
import { join } from 'path'
import { app } from 'electron'
import { runMigrations } from './migrations'

export function initDatabase(): Database.Database {
  const dbPath = join(app.getPath('userData'), 'cuaderno.db')
  const db = new Database(dbPath)
  db.pragma('journal_mode = WAL')
  runMigrations(db)
  return db
}

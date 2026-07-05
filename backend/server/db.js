import Database from 'better-sqlite3'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
 

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DB_PATH = process.env.DB_PATH ?? path.join(__dirname, 'data.db')
 
const db = new Database(DB_PATH)
 
db.exec(`
  CREATE TABLE IF NOT EXISTS applications (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    discord_id TEXT,
    name       TEXT    NOT NULL,
    email      TEXT    NOT NULL,
    message    TEXT    NOT NULL,
    status     TEXT    DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`)
 
export default db
 
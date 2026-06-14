import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbFile = path.join(__dirname, 'database.sqlite');
const initFile = path.join(__dirname, 'init.sql');
const firstRun = !fs.existsSync(dbFile);

const db = new Database(dbFile);

if (firstRun) {
  const sql = fs.readFileSync(initFile, 'utf8');
  db.exec(sql);
}

export default db;

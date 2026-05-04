import type Database from 'better-sqlite3'

export function runMigrations(db: Database.Database): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS cursos (
      id INTEGER PRIMARY KEY,
      moodle_id INTEGER UNIQUE NOT NULL,
      nombre TEXT NOT NULL,
      shortname TEXT
    );

    CREATE TABLE IF NOT EXISTS alumnos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      moodle_id INTEGER UNIQUE NOT NULL,
      nombre TEXT NOT NULL,
      apellidos TEXT NOT NULL,
      email TEXT,
      curso_id INTEGER,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS grade_items (
      id INTEGER PRIMARY KEY,
      curso_id INTEGER NOT NULL,
      itemname TEXT NOT NULL,
      itemtype TEXT NOT NULL,
      itemmodule TEXT,
      categoryid INTEGER,
      grademax REAL DEFAULT 10
    );

    CREATE TABLE IF NOT EXISTS grades (
      alumno_moodle_id INTEGER NOT NULL,
      grade_item_id    INTEGER NOT NULL,
      graderaw         REAL,
      gradeformatted   TEXT,
      last_synced      TEXT DEFAULT (datetime('now')),
      PRIMARY KEY (alumno_moodle_id, grade_item_id)
    );
  `)
}

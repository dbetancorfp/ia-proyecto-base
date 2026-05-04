import type Database from 'better-sqlite3'
import type { Alumno, IAlumnoRepository } from '../../shared/types'

export class AlumnoRepository implements IAlumnoRepository {
  constructor(private readonly db: Database.Database) {}

  findAll(): Alumno[] {
    return this.db
      .prepare('SELECT * FROM alumnos ORDER BY apellidos, nombre')
      .all() as Alumno[]
  }

  findByCourse(cursoId: number): Alumno[] {
    return this.db
      .prepare('SELECT * FROM alumnos WHERE curso_id = ? ORDER BY apellidos, nombre')
      .all(cursoId) as Alumno[]
  }

  upsertMany(alumnos: Alumno[]): void {
    const stmt = this.db.prepare(`
      INSERT INTO alumnos (moodle_id, nombre, apellidos, email, curso_id)
      VALUES (@moodle_id, @nombre, @apellidos, @email, @curso_id)
      ON CONFLICT(moodle_id) DO UPDATE SET
        nombre    = excluded.nombre,
        apellidos = excluded.apellidos,
        email     = excluded.email,
        curso_id  = excluded.curso_id
    `)
    const upsertAll = this.db.transaction((rows: Alumno[]) => {
      for (const row of rows) stmt.run(row)
    })
    upsertAll(alumnos)
  }
}

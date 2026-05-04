import type Database from 'better-sqlite3'
import type { GradeItem, GradebookRow, Gradebook, MoodleUserGrade, IGradeRepository } from '../../shared/types'

export class GradeRepository implements IGradeRepository {
  constructor(private readonly db: Database.Database) {}

  syncCourseGradebook(courseId: number, usergrades: MoodleUserGrade[]): void {
    if (!usergrades.length) return

    const upsertItem = this.db.prepare(`
      INSERT INTO grade_items (id, curso_id, itemname, itemtype, itemmodule, categoryid, grademax)
      VALUES (@id, @curso_id, @itemname, @itemtype, @itemmodule, @categoryid, @grademax)
      ON CONFLICT(id) DO UPDATE SET
        itemname  = excluded.itemname,
        grademax  = excluded.grademax,
        categoryid = excluded.categoryid
    `)

    const upsertGrade = this.db.prepare(`
      INSERT INTO grades (alumno_moodle_id, grade_item_id, graderaw, gradeformatted, last_synced)
      VALUES (@alumno_moodle_id, @grade_item_id, @graderaw, @gradeformatted, datetime('now'))
      ON CONFLICT(alumno_moodle_id, grade_item_id) DO UPDATE SET
        graderaw       = excluded.graderaw,
        gradeformatted = excluded.gradeformatted,
        last_synced    = excluded.last_synced
    `)

    const sync = this.db.transaction(() => {
      for (const item of usergrades[0].gradeitems) {
        upsertItem.run({
          id:         item.id,
          curso_id:   courseId,
          itemname:   item.itemname ?? '',
          itemtype:   item.itemtype,
          itemmodule: item.itemmodule ?? null,
          categoryid: item.categoryid,
          grademax:   item.grademax
        })
      }

      for (const ug of usergrades) {
        for (const item of ug.gradeitems) {
          upsertGrade.run({
            alumno_moodle_id: ug.userid,
            grade_item_id:    item.id,
            graderaw:         item.graderaw,
            gradeformatted:   item.gradeformatted
          })
        }
      }
    })

    sync()
  }

  getGradebook(courseId: number): Gradebook {
    const items = this.db
      .prepare(`
        SELECT * FROM grade_items
        WHERE curso_id = ? AND itemtype = 'mod'
        ORDER BY categoryid, itemname
      `)
      .all(courseId) as GradeItem[]

    const alumnos = this.db
      .prepare(`
        SELECT moodle_id, nombre, apellidos
        FROM alumnos WHERE curso_id = ?
        ORDER BY apellidos, nombre
      `)
      .all(courseId) as { moodle_id: number; nombre: string; apellidos: string }[]

    const rawGrades = this.db
      .prepare(`
        SELECT g.alumno_moodle_id, g.grade_item_id, g.graderaw, g.gradeformatted
        FROM grades g
        INNER JOIN grade_items gi ON g.grade_item_id = gi.id
        WHERE gi.curso_id = ? AND gi.itemtype = 'mod'
      `)
      .all(courseId) as Array<{
        alumno_moodle_id: number
        grade_item_id: number
        graderaw: number | null
        gradeformatted: string
      }>

    const index: Record<number, Record<number, { graderaw: number | null; gradeformatted: string }>> = {}
    for (const g of rawGrades) {
      index[g.alumno_moodle_id] ??= {}
      index[g.alumno_moodle_id][g.grade_item_id] = {
        graderaw:       g.graderaw,
        gradeformatted: g.gradeformatted
      }
    }

    const rows: GradebookRow[] = alumnos.map(a => ({
      moodle_id: a.moodle_id,
      nombre:    a.nombre,
      apellidos: a.apellidos,
      grades:    index[a.moodle_id] ?? {}
    }))

    return { items, rows }
  }
}

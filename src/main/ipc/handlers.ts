import { ipcMain } from 'electron'
import { loadConfig } from '../config'
import type { Alumno, IMoodleService, IAlumnoRepository, IGradeRepository, MoodleUser } from '../../shared/types'

export function registerHandlers(
  moodleService: IMoodleService,
  alumnoRepo: IAlumnoRepository,
  gradeRepo: IGradeRepository
): void {
  ipcMain.handle('moodle:getCourses', () =>
    moodleService.getCourses()
  )

  ipcMain.handle('moodle:getStudents', (_e, courseId: number) =>
    moodleService.getEnrolledUsers(courseId)
  )

  ipcMain.handle('moodle:getAssignments', (_e, courseId: number) =>
    moodleService.getAssignments(courseId)
  )

  ipcMain.handle('db:getAlumnos', () =>
    alumnoRepo.findAll()
  )

  ipcMain.handle('db:getAlumnosByCourse', (_e, cursoId: number) =>
    alumnoRepo.findByCourse(cursoId)
  )

  ipcMain.handle('db:syncStudents', async (_e, courseId: number) => {
    const { moodleUserId } = loadConfig()
    const users = await moodleService.getEnrolledUsers(courseId) as MoodleUser[]
    const alumnos: Alumno[] = users
      .filter(u => u.id !== moodleUserId)
      .map(u => ({
        moodle_id: u.id,
        nombre:    u.firstname,
        apellidos: u.lastname,
        email:     u.email,
        curso_id:  courseId
      }))
    alumnoRepo.upsertMany(alumnos)
    return alumnoRepo.findByCourse(courseId)
  })

  ipcMain.handle('db:syncGradebook', async (_e, courseId: number) => {
    const { moodleUserId } = loadConfig()
    const all = await moodleService.getGradebook(courseId)
    const usergrades = all.filter(ug => ug.userid !== moodleUserId)
    gradeRepo.syncCourseGradebook(courseId, usergrades)
    return { ok: true }
  })

  ipcMain.handle('db:getGradebook', (_e, courseId: number) =>
    gradeRepo.getGradebook(courseId)
  )
}

export interface MoodleCourse {
  id: number
  shortname: string
  fullname: string
}

export interface MoodleUser {
  id: number
  fullname: string
  firstname: string
  lastname: string
  email: string
}

export interface MoodleGradeItem {
  id: number
  itemname: string
  itemtype: 'mod' | 'category' | 'course'
  itemmodule: string | null
  categoryid: number | null
  graderaw: number | null
  gradeformatted: string
  grademin: number
  grademax: number
}

export interface MoodleUserGrade {
  userid: number
  userfullname: string
  gradeitems: MoodleGradeItem[]
}

export interface Alumno {
  id?: number
  moodle_id: number
  nombre: string
  apellidos: string
  email: string
  curso_id: number
}

export interface GradeItem {
  id: number
  curso_id: number
  itemname: string
  itemtype: string
  itemmodule: string | null
  categoryid: number | null
  grademax: number
}

export interface GradebookRow {
  moodle_id: number
  nombre: string
  apellidos: string
  grades: Record<number, { graderaw: number | null; gradeformatted: string }>
}

export interface Gradebook {
  items: GradeItem[]
  rows: GradebookRow[]
}

// ── Interfaces de dominio (DIP / LSP) ────────────────────────────────────────

export interface IAlumnoRepository {
  findAll(): Alumno[]
  findByCourse(cursoId: number): Alumno[]
  upsertMany(alumnos: Alumno[]): void
}

export interface IGradeRepository {
  syncCourseGradebook(courseId: number, usergrades: MoodleUserGrade[]): void
  getGradebook(courseId: number): Gradebook
}

export interface IMoodleService {
  getCourses(): Promise<MoodleCourse[]>
  getEnrolledUsers(courseId: number): Promise<MoodleUser[]>
  getAssignments(courseId: number): Promise<unknown>
  getGradebook(courseId: number): Promise<MoodleUserGrade[]>
}

// ── API expuesta al renderer vía contextBridge ────────────────────────────────

export interface ElectronAPI {
  moodle: {
    getCourses: () => Promise<MoodleCourse[]>
    getStudents: (courseId: number) => Promise<MoodleUser[]>
    getAssignments: (courseId: number) => Promise<unknown>
  }
  db: {
    getAlumnos: () => Promise<Alumno[]>
    getAlumnosByCourse: (cursoId: number) => Promise<Alumno[]>
    syncStudents: (courseId: number) => Promise<Alumno[]>
    syncGradebook: (courseId: number) => Promise<{ ok: boolean }>
    getGradebook: (courseId: number) => Promise<Gradebook>
  }
}

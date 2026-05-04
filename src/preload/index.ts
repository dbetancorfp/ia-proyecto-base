import { contextBridge, ipcRenderer } from 'electron'
import type { ElectronAPI } from '../shared/types'

const api: ElectronAPI = {
  moodle: {
    getCourses:     ()         => ipcRenderer.invoke('moodle:getCourses'),
    getStudents:    (courseId) => ipcRenderer.invoke('moodle:getStudents', courseId),
    getAssignments: (courseId) => ipcRenderer.invoke('moodle:getAssignments', courseId)
  },
  db: {
    getAlumnos:         ()         => ipcRenderer.invoke('db:getAlumnos'),
    getAlumnosByCourse: (cursoId)  => ipcRenderer.invoke('db:getAlumnosByCourse', cursoId),
    syncStudents:       (courseId) => ipcRenderer.invoke('db:syncStudents', courseId),
    syncGradebook:      (courseId) => ipcRenderer.invoke('db:syncGradebook', courseId),
    getGradebook:       (courseId) => ipcRenderer.invoke('db:getGradebook', courseId)
  }
}

contextBridge.exposeInMainWorld('api', api)

import { app, BrowserWindow } from 'electron'
import { join } from 'path'
import { initDatabase } from './db'
import { loadConfig } from './config'
import { MoodleService } from './services/MoodleService'
import { AlumnoRepository } from './repositories/AlumnoRepository'
import { GradeRepository } from './repositories/GradeRepository'
import { registerHandlers } from './ipc/handlers'

function createWindow(): void {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    show: false,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  win.on('ready-to-show', () => win.show())

  if (process.env['ELECTRON_RENDERER_URL']) {
    win.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    win.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  const db           = initDatabase()
  const config       = loadConfig()
  const moodleService = new MoodleService(config.moodleToken, config.moodleUserId)
  const alumnoRepo   = new AlumnoRepository(db)
  const gradeRepo    = new GradeRepository(db)

  registerHandlers(moodleService, alumnoRepo, gradeRepo)
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

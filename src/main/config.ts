import { app } from 'electron'
import { join } from 'path'
import { existsSync, readFileSync, writeFileSync } from 'fs'

export interface AppConfig {
  moodleToken: string
  moodleUserId: number
}

const DEFAULT_CONFIG: AppConfig = {
  moodleToken: '',
  moodleUserId: 0
}

function configPath(): string {
  return join(app.getPath('userData'), 'config.json')
}

export function loadConfig(): AppConfig {
  const path = configPath()
  if (!existsSync(path)) {
    writeFileSync(path, JSON.stringify(DEFAULT_CONFIG, null, 2), 'utf-8')
    return { ...DEFAULT_CONFIG }
  }
  return JSON.parse(readFileSync(path, 'utf-8')) as AppConfig
}

export function saveConfig(config: AppConfig): void {
  writeFileSync(configPath(), JSON.stringify(config, null, 2), 'utf-8')
}

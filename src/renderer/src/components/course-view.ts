import { LitElement, html, css } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import type { Alumno, MoodleUser } from '../../../shared/types'
import { TARGET_COURSES } from '../../../shared/courses'
import './student-list'
import './gradebook-view'

const TEACHER_ID = 28435

@customElement('course-view')
export class CourseView extends LitElement {
  @property({ type: Number }) courseId!: number

  @state() private alumnos: Alumno[] = []
  @state() private loading = false
  @state() private syncing = false
  @state() private error = ''

  static styles = css`
    /* Layout de 2 columnas: alumnado | calificaciones */
    :host {
      display: grid;
      grid-template-columns: 280px 1fr;
      grid-template-rows: 1fr;
      height: 100%;
      overflow: hidden;
    }

    /* ── Cabecera de columna compartida ── */
    .col {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      height: 100%;
    }

    .col-header {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-3);
      padding: var(--space-4) var(--space-4) var(--space-3);
      border-bottom: 1px solid var(--color-border);
      background: var(--color-surface);
    }

    .col-title {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

    .col-title h3 {
      font-size: var(--font-size-sm);
      font-weight: 700;
      color: var(--color-text);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .count {
      font-size: var(--font-size-xs);
      color: var(--color-text-muted);
      margin-top: 2px;
    }

    /* ── Columna izquierda: Alumnado ── */
    .col-students {
      border-right: 1px solid var(--color-border);
      background: var(--color-surface);
    }

    /* Scroll vertical en la lista de alumnos */
    .students-scroll {
      flex: 1;
      overflow-y: scroll;
      overflow-x: hidden;
    }

    /* ── Columna derecha: Calificaciones ── */
    .col-grades {
      background: var(--color-background);
    }

    /* El gradebook-view gestiona su propio scroll */
    .grades-body {
      flex: 1;
      overflow: hidden;
      padding: var(--space-4);
      display: flex;
      flex-direction: column;
    }

    /* ── Botón ── */
    .btn {
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 5px var(--space-3);
      border-radius: var(--radius-sm);
      border: 1px solid var(--color-border);
      cursor: pointer;
      font-size: var(--font-size-xs);
      font-family: var(--font-sans);
      font-weight: 500;
      background: var(--color-surface);
      color: var(--color-text-muted);
      transition: background 0.1s, color 0.1s, border-color 0.1s;
    }
    .btn:hover:not(:disabled) {
      background: var(--color-primary);
      color: #fff;
      border-color: var(--color-primary);
    }
    .btn:disabled { opacity: 0.4; cursor: not-allowed; }

    /* ── Error ── */
    .error {
      flex-shrink: 0;
      margin: var(--space-2) var(--space-4);
      padding: var(--space-2) var(--space-3);
      background: var(--color-error-bg);
      border: 1px solid #fecaca;
      border-radius: var(--radius-sm);
      color: var(--color-error);
      font-size: var(--font-size-xs);
    }

    /* Nombre del módulo en cabecera de columna de calificaciones */
    .module-name {
      font-size: var(--font-size-xs);
      color: var(--color-text-muted);
      font-weight: 400;
      margin-top: 2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `

  updated(changed: Map<string, unknown>) {
    if (changed.has('courseId')) this.loadAlumnos()
  }

  private get course() {
    return TARGET_COURSES.find(c => c.id === this.courseId)
  }

  private async loadAlumnos(): Promise<void> {
    this.loading = true
    this.error = ''
    try {
      this.alumnos = await window.api.db.getAlumnosByCourse(this.courseId)
    } catch (e) {
      this.error = e instanceof Error ? e.message : 'Error al cargar alumnado'
    } finally {
      this.loading = false
    }
  }

  private async syncAlumnos(): Promise<void> {
    this.syncing = true
    this.error = ''
    try {
      const users = await window.api.moodle.getStudents(this.courseId) as MoodleUser[]
      const alumnos: Alumno[] = users
        .filter(u => u.id !== TEACHER_ID)
        .map(u => ({
          moodle_id: u.id,
          nombre:    u.firstname,
          apellidos: u.lastname,
          email:     u.email,
          curso_id:  this.courseId
        }))
      await window.api.db.syncAlumnos(alumnos)
      await this.loadAlumnos()
    } catch (e) {
      this.error = e instanceof Error ? e.message : 'Error al sincronizar'
    } finally {
      this.syncing = false
    }
  }

  render() {
    const name   = this.course?.name.replace(/^25-26\s+/, '') ?? 'Módulo'
    const count  = this.alumnos.length

    return html`
      <!-- Columna izquierda: Alumnado -->
      <div class="col col-students">
        <div class="col-header">
          <div class="col-title">
            <h3>Alumnado</h3>
            <span class="count">${this.loading ? '…' : `${count} alumno${count !== 1 ? 's' : ''}`}</span>
          </div>
          <button class="btn" ?disabled=${this.syncing || this.loading} @click=${this.syncAlumnos}>
            ↻ Sync
          </button>
        </div>

        ${this.error ? html`<div class="error">⚠ ${this.error}</div>` : ''}

        <div class="students-scroll">
          <student-list .alumnos=${this.alumnos} .loading=${this.loading}></student-list>
        </div>
      </div>

      <!-- Columna derecha: Calificaciones -->
      <div class="col col-grades">
        <div class="col-header">
          <div class="col-title">
            <h3>Calificaciones</h3>
            <span class="module-name">${name}</span>
          </div>
        </div>

        <div class="grades-body">
          <gradebook-view
            .courseId=${this.courseId}
            .alumnos=${this.alumnos}
          ></gradebook-view>
        </div>
      </div>
    `
  }
}

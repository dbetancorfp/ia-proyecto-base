import { LitElement, html, css } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import type { Alumno } from '../../../shared/types'
import { TARGET_COURSES } from '../../../shared/courses'
import './sidebar-nav'
import './student-list'
import './gradebook-view'

@customElement('app-root')
export class AppRoot extends LitElement {
  @state() private selectedCourseId: number | null = null
  @state() private alumnos: Alumno[] = []
  @state() private syncing  = false
  @state() private loading  = false
  @state() private error    = ''

  /*
   * Layout: grid plano de 3 columnas + 2 filas.
   * Todos los paneles son hijos directos del mismo grid,
   * sin anidamiento de flexbox/grid que rompa los tamaños.
   *
   *  col1 (220px) | col2 (280px) | col3 (1fr)
   *  ─────────────────────────────────────────
   *  header  (span 3 columnas)
   *  sidebar │ alumnado       │ calificaciones
   */
  static styles = css`
    :host {
      display: grid;
      grid-template-columns: 220px 280px 1fr;
      grid-template-rows: 52px 1fr;
      height: 100vh;
      width: 100vw;
      overflow: hidden;
      font-family: var(--font-sans);
    }

    /* ── HEADER ───────────────────────────── */
    header {
      grid-column: 1 / -1;
      grid-row: 1;
      background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
      color: #fff;
      display: flex;
      align-items: center;
      gap: var(--space-3);
      padding: 0 var(--space-6);
      box-shadow: 0 2px 8px rgba(30,64,175,0.3);
      z-index: 10;
    }
    .logo {
      width: 28px; height: 28px;
      background: rgba(255,255,255,0.18);
      border-radius: var(--radius-sm);
      display: flex; align-items: center; justify-content: center;
      font-size: 1rem; flex-shrink: 0;
    }
    h1 { font-size: var(--font-size-base); font-weight: 600; letter-spacing: -0.01em; }
    .year { font-size: var(--font-size-xs); opacity: 0.55; margin-left: 6px; }

    /* ── COLUMNA 1: Módulos ───────────────── */
    sidebar-nav {
      grid-column: 1;
      grid-row: 2;
      overflow-y: scroll;
      overflow-x: hidden;
      border-right: 1px solid var(--color-border);
      background: var(--color-surface);
      min-height: 0;
    }

    /* ── COLUMNA 2: Alumnado ─────────────── */
    .col-students {
      grid-column: 2;
      grid-row: 2;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      border-right: 1px solid var(--color-border);
      background: var(--color-surface);
      min-height: 0;
    }

    /* ── COLUMNA 3: Calificaciones ────────── */
    .col-grades {
      grid-column: 3;
      grid-row: 2;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      background: var(--color-background);
      min-height: 0;
    }

    /* ── Cabecera de columna ──────────────── */
    .col-header {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-3);
      padding: var(--space-3) var(--space-4);
      border-bottom: 1px solid var(--color-border);
      background: var(--color-surface);
    }
    .col-title h3 {
      font-size: var(--font-size-xs);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--color-text-muted);
    }
    .col-title .sub {
      font-size: var(--font-size-xs);
      color: var(--color-text-faint);
      margin-top: 2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 200px;
    }

    /* ── Botón secundario ─────────────────── */
    .btn {
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px var(--space-3);
      border-radius: var(--radius-sm);
      border: 1px solid var(--color-border);
      cursor: pointer;
      font-size: var(--font-size-xs);
      font-family: var(--font-sans);
      font-weight: 500;
      background: var(--color-surface);
      color: var(--color-text-muted);
      transition: background 0.1s, color 0.1s, border-color 0.1s;
      white-space: nowrap;
    }
    .btn:hover:not(:disabled) {
      background: var(--color-primary); color: #fff; border-color: var(--color-primary);
    }
    .btn:disabled { opacity: 0.4; cursor: not-allowed; }

    /* ── Scroll alumnado ──────────────────── */
    .students-scroll {
      flex: 1;
      overflow-y: scroll;
      overflow-x: hidden;
      min-height: 0;
    }

    /* ── Contenido calificaciones ─────────── */
    .grades-body {
      flex: 1;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      padding: var(--space-4);
      min-height: 0;
    }

    /* ── Error ────────────────────────────── */
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

    /* ── Placeholder cuando no hay módulo ─── */
    .placeholder {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      gap: var(--space-2);
      color: var(--color-text-faint);
    }
    .placeholder-icon { font-size: 2rem; opacity: 0.2; }
    .placeholder p    { font-size: var(--font-size-xs); }
  `

  /* ─── Carga de datos ─────────────────────────────────── */

  private onCourseSelected(e: CustomEvent<number>) {
    const id = e.detail
    if (id === this.selectedCourseId) return
    this.selectedCourseId = id
    this.alumnos = []
    this.error   = ''
    this.loadAlumnos(id)
  }

  private async loadAlumnos(courseId: number): Promise<void> {
    this.loading = true
    try {
      this.alumnos = await window.api.db.getAlumnosByCourse(courseId)
    } catch (e) {
      this.error = e instanceof Error ? e.message : 'Error al cargar alumnado'
    } finally {
      this.loading = false
    }
  }

  private async syncAlumnos(): Promise<void> {
    if (!this.selectedCourseId) return
    this.syncing = true
    this.error   = ''
    try {
      this.alumnos = await window.api.db.syncStudents(this.selectedCourseId)
    } catch (e) {
      this.error = e instanceof Error ? e.message : 'Error al sincronizar'
    } finally {
      this.syncing = false
    }
  }

  /* ─── Render ─────────────────────────────────────────── */

  render() {
    const course    = TARGET_COURSES.find(c => c.id === this.selectedCourseId)
    const courseName = course?.name.replace(/^25-26\s+/, '') ?? ''
    const count      = this.alumnos.length

    return html`
      <!-- Header -->
      <header>
        <div class="logo">📓</div>
        <h1>Cuaderno de Aula Digital<span class="year">25-26</span></h1>
      </header>

      <!-- Columna 1: Lista de módulos -->
      <sidebar-nav
        .selectedCourseId=${this.selectedCourseId}
        @course-selected=${this.onCourseSelected}
      ></sidebar-nav>

      <!-- Columna 2: Alumnado -->
      <div class="col-students">
        <div class="col-header">
          <div class="col-title">
            <h3>Alumnado</h3>
            <div class="sub">
              ${this.selectedCourseId
                ? this.syncing  ? 'Sincronizando con Moodle…'
                : this.loading  ? 'Cargando…'
                : `${count} alumno${count !== 1 ? 's' : ''}`
                : 'Selecciona un módulo'}
            </div>
          </div>
          <button class="btn"
            ?disabled=${!this.selectedCourseId || this.syncing || this.loading}
            @click=${this.syncAlumnos}>
            ${this.syncing ? '…' : '↻ Sync'}
          </button>
        </div>

        ${this.error ? html`<div class="error">⚠ ${this.error}</div>` : ''}

        <div class="students-scroll">
          ${this.selectedCourseId
            ? html`<student-list .alumnos=${this.alumnos} .loading=${this.loading}></student-list>`
            : html`<div class="placeholder"><div class="placeholder-icon">←</div><p>Selecciona un módulo</p></div>`}
        </div>
      </div>

      <!-- Columna 3: Calificaciones -->
      <div class="col-grades">
        <div class="col-header">
          <div class="col-title">
            <h3>Calificaciones</h3>
            ${courseName ? html`<div class="sub">${courseName}</div>` : ''}
          </div>
        </div>
        <div class="grades-body">
          ${this.selectedCourseId
            ? html`
              <gradebook-view
                .courseId=${this.selectedCourseId}
                .alumnos=${this.alumnos}
              ></gradebook-view>`
            : html`<div class="placeholder"><div class="placeholder-icon">📊</div><p>Selecciona un módulo</p></div>`}
        </div>
      </div>
    `
  }
}

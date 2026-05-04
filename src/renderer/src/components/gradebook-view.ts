import { LitElement, html, css } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import type { Gradebook, Alumno } from '../../../shared/types'

@customElement('gradebook-view')
export class GradebookView extends LitElement {
  @property({ type: Number }) courseId!: number
  @property({ type: Array })  alumnos: Alumno[] = []

  @state() private gradebook: Gradebook | null = null
  @state() private syncing  = false
  @state() private loading  = false
  @state() private error    = ''
  @state() private progress = ''

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      flex: 1;
      overflow: hidden;
    }

    /* Barra de herramientas */
    .toolbar {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      gap: var(--space-3);
      margin-bottom: var(--space-3);
    }

    .btn {
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

    .progress-msg {
      display: flex; align-items: center; gap: var(--space-2);
      font-size: var(--font-size-xs);
      color: var(--color-text-muted);
    }
    .spinner {
      width: 12px; height: 12px;
      border: 2px solid var(--color-border);
      border-top-color: var(--color-primary);
      border-radius: 99px;
      animation: spin 0.7s linear infinite;
      flex-shrink: 0;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    .error {
      flex-shrink: 0;
      padding: var(--space-2) var(--space-3);
      background: var(--color-error-bg);
      border: 1px solid #fecaca;
      border-radius: var(--radius-sm);
      color: var(--color-error);
      font-size: var(--font-size-xs);
      margin-bottom: var(--space-3);
    }

    /* Leyenda */
    .legend {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      gap: var(--space-4);
      margin-bottom: var(--space-2);
      font-size: var(--font-size-xs);
      color: var(--color-text-muted);
    }
    .legend-dot {
      display: inline-block;
      width: 8px; height: 8px;
      border-radius: 2px;
      margin-right: 3px;
      vertical-align: middle;
    }
    .legend-right { margin-left: auto; }

    .empty {
      flex: 1;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      gap: var(--space-3);
      color: var(--color-text-muted);
      font-size: var(--font-size-sm);
      text-align: center;
    }
    .empty-icon { font-size: 2rem; opacity: 0.25; }

    /* ─────────────────────────────────────────
       Tabla: scroll vertical Y horizontal
    ───────────────────────────────────────── */
    .table-wrap {
      flex: 1;
      overflow-x: scroll;   /* scroll horizontal siempre visible */
      overflow-y: scroll;   /* scroll vertical siempre visible   */
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      background: var(--color-surface);
    }

    table {
      border-collapse: collapse;
      font-size: var(--font-size-xs);
      /* min-width fuerza scroll horizontal aunque haya pocas columnas */
      min-width: max-content;
    }

    /* Cabecera: sticky top */
    thead th {
      position: sticky;
      top: 0;
      z-index: 2;
      background: var(--color-surface-2);
      border-bottom: 2px solid var(--color-border);
      vertical-align: bottom;
      padding: var(--space-1) 3px;
    }

    /* Primera columna cabecera: sticky left + top */
    th.col-name {
      position: sticky;
      left: 0;
      z-index: 3;
      text-align: left;
      min-width: 170px;
      padding: var(--space-3) var(--space-4);
      font-size: 0.65rem;
      font-weight: 700;
      color: var(--color-text-faint);
      text-transform: uppercase;
      letter-spacing: 0.06em;
      border-right: 2px solid var(--color-border);
      white-space: nowrap;
      background: var(--color-surface-2);
    }

    /* Cabeceras rotadas de actividades */
    .th-inner {
      display: block;
      writing-mode: vertical-lr;
      transform: rotate(180deg);
      white-space: nowrap;
      overflow: hidden;
      height: 120px;
      font-weight: 500;
      color: var(--color-text);
      font-size: 0.65rem;
      padding: var(--space-1) 0;
    }

    /* Celdas de datos */
    td {
      border-bottom: 1px solid var(--color-border);
      border-right: 1px solid #f1f5f9;
      padding: 5px 3px;
      text-align: center;
      width: 38px;
      min-width: 38px;
      max-width: 38px;
      font-variant-numeric: tabular-nums;
    }

    /* Primera columna de datos: sticky left */
    td.col-name {
      position: sticky;
      left: 0;
      z-index: 1;
      background: var(--color-surface);
      text-align: left;
      padding: var(--space-2) var(--space-4);
      font-size: var(--font-size-xs);
      font-weight: 500;
      border-right: 2px solid var(--color-border);
      white-space: nowrap;
      min-width: 170px;
      width: auto;
      max-width: none;
    }

    tr:last-child td { border-bottom: none; }
    tbody tr:hover td          { background: #f8fafc; }
    tbody tr:hover td.col-name { background: #eef2ff; }

    /* Colores de nota */
    .g-none { color: var(--color-text-faint); }
    .g-fail { background: #fff1f2; color: #be123c; font-weight: 700; }
    .g-pass { background: #f0fdf4; color: #15803d; font-weight: 700; }
  `

  updated(changed: Map<string, unknown>) {
    if (changed.has('courseId')) this.loadFromDb()
  }

  private async loadFromDb(): Promise<void> {
    this.loading = true
    try {
      const gb = await window.api.db.getGradebook(this.courseId)
      this.gradebook = gb.items.length ? gb : null
    } finally {
      this.loading = false
    }
  }

  private async syncGradebook(): Promise<void> {
    if (!this.alumnos.length) { this.error = 'Sincroniza primero el alumnado.'; return }

    this.syncing  = true
    this.error    = ''
    this.progress = 'Sincronizando calificaciones…'

    try {
      await window.api.db.syncGradebook(this.courseId)
      await this.loadFromDb()
      this.progress = ''
    } catch (e) {
      this.error    = e instanceof Error ? e.message : 'Error al sincronizar'
      this.progress = ''
    } finally {
      this.syncing = false
    }
  }

  private cls(raw: number | null) {
    if (raw === null) return 'g-none'
    return raw >= 5 ? 'g-pass' : 'g-fail'
  }

  private fmt(raw: number | null) {
    if (raw === null) return '–'
    return raw % 1 === 0 ? String(raw) : raw.toFixed(1)
  }

  render() {
    return html`
      <div class="toolbar">
        <button class="btn" ?disabled=${this.syncing || this.loading} @click=${this.syncGradebook}>
          ↻ Sync calificaciones
        </button>
        ${this.progress ? html`
          <span class="progress-msg">
            <span class="spinner"></span>${this.progress}
          </span>` : ''}
      </div>

      ${this.error ? html`<div class="error">⚠ ${this.error}</div>` : ''}

      ${this.loading
        ? html`<div class="empty"><span class="spinner"></span></div>`
        : !this.gradebook
          ? html`
            <div class="empty">
              <div class="empty-icon">📊</div>
              <p>Sin datos. Pulsa <strong>↻ Sync calificaciones</strong>.</p>
            </div>`
          : this.renderMatrix()
      }
    `
  }

  private renderMatrix() {
    const { items, rows } = this.gradebook!
    return html`
      <div class="legend">
        <span><span class="legend-dot" style="background:#f0fdf4;border:1px solid #bbf7d0"></span>Aprobado ≥5</span>
        <span><span class="legend-dot" style="background:#fff1f2;border:1px solid #fecdd3"></span>Suspenso &lt;5</span>
        <span><span class="legend-dot" style="background:#f8fafc;border:1px solid #e2e8f0"></span>Sin nota</span>
        <span class="legend-right">${items.length} actividades · ${rows.length} alumnos</span>
      </div>

      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th class="col-name">Alumno/a</th>
              ${items.map(it => html`
                <th title=${it.itemname}>
                  <span class="th-inner">${it.itemname}</span>
                </th>`)}
            </tr>
          </thead>
          <tbody>
            ${rows.map(row => html`
              <tr>
                <td class="col-name">${row.apellidos}, ${row.nombre}</td>
                ${items.map(it => {
                  const raw = row.grades[it.id]?.graderaw ?? null
                  return html`
                    <td class=${this.cls(raw)} title="${it.itemname}: ${this.fmt(raw)}/${it.grademax}">
                      ${this.fmt(raw)}
                    </td>`
                })}
              </tr>`)}
          </tbody>
        </table>
      </div>
    `
  }
}

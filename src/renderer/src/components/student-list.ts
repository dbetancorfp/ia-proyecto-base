import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { Alumno } from '../../../shared/types'

@customElement('student-list')
export class StudentList extends LitElement {
  @property({ type: Array })   alumnos: Alumno[] = []
  @property({ type: Boolean }) loading = false

  static styles = css`
    :host { display: block; }

    .empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: var(--space-8) var(--space-4);
      gap: var(--space-2);
      color: var(--color-text-muted);
      text-align: center;
    }
    .empty-icon { font-size: 1.75rem; opacity: 0.25; }
    .empty p    { font-size: var(--font-size-xs); line-height: 1.5; }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    /* Cabecera sticky dentro del scroll del padre */
    thead th {
      position: sticky;
      top: 0;
      z-index: 1;
      background: var(--color-surface-2);
      border-bottom: 1px solid var(--color-border);
      padding: var(--space-2) var(--space-3);
      font-size: 0.65rem;
      font-weight: 700;
      color: var(--color-text-faint);
      text-transform: uppercase;
      letter-spacing: 0.06em;
      white-space: nowrap;
    }

    td {
      padding: var(--space-2) var(--space-3);
      font-size: var(--font-size-sm);
      border-bottom: 1px solid var(--color-border);
      color: var(--color-text);
      vertical-align: middle;
    }
    tr:last-child td { border-bottom: none; }
    tbody tr:hover td { background: var(--color-background); }

    .num {
      width: 2rem;
      text-align: right;
      color: var(--color-text-faint);
      font-size: var(--font-size-xs);
      font-variant-numeric: tabular-nums;
    }

    .avatar {
      width: 26px; height: 26px;
      border-radius: 99px;
      background: var(--color-primary-light);
      color: var(--color-primary);
      display: inline-flex;
      align-items: center; justify-content: center;
      font-size: 0.6rem; font-weight: 700;
      flex-shrink: 0;
      margin-right: var(--space-2);
      vertical-align: middle;
    }

    .name-text {
      vertical-align: middle;
      font-size: var(--font-size-sm);
    }

    .apellidos { font-weight: 500; }
  `

  render() {
    if (this.loading) {
      return html`<div class="empty"><p>Cargando…</p></div>`
    }

    if (!this.alumnos.length) {
      return html`
        <div class="empty">
          <div class="empty-icon">👤</div>
          <p>Sin alumnado.<br>Pulsa <strong>↻ Sync</strong> para importar de Moodle.</p>
        </div>
      `
    }

    return html`
      <table>
        <thead>
          <tr>
            <th class="num">#</th>
            <th>Alumno/a</th>
          </tr>
        </thead>
        <tbody>
          ${this.alumnos.map((a, i) => {
            const initials = ((a.apellidos[0] ?? '') + (a.nombre[0] ?? '')).toUpperCase()
            return html`
              <tr>
                <td class="num">${i + 1}</td>
                <td>
                  <span class="avatar">${initials}</span>
                  <span class="name-text">
                    <span class="apellidos">${a.apellidos}</span>,
                    ${a.nombre}
                  </span>
                </td>
              </tr>
            `
          })}
        </tbody>
      </table>
    `
  }
}

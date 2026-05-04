import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { TARGET_COURSES } from '../../../shared/courses'

const BADGE_COLORS: Record<string, string> = {
  'SSF':       '#1e40af',
  'DEW 2DAW':  '#7c3aed',
  'DEW 2DAWs': '#6d28d9',
  'DJK':       '#0891b2',
  'CI4 2DAWs': '#d97706',
  'PRW':       '#059669',
}

@customElement('sidebar-nav')
export class SidebarNav extends LitElement {
  @property({ type: Number }) selectedCourseId: number | null = null

  static styles = css`
    :host { display: flex; flex-direction: column; }

    .section-title {
      font-size: 0.65rem;
      font-weight: 700;
      color: var(--color-text-faint);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      padding: var(--space-5) var(--space-4) var(--space-2);
    }

    ul { list-style: none; padding: 0 var(--space-2); }

    li { margin-bottom: 2px; }

    button {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      width: 100%;
      text-align: left;
      padding: var(--space-2) var(--space-3);
      background: none;
      border: none;
      border-radius: var(--radius-sm);
      cursor: pointer;
      font-family: var(--font-sans);
      font-size: var(--font-size-sm);
      color: var(--color-text-muted);
      transition: background 0.1s, color 0.1s;
    }

    button:hover { background: var(--color-background); color: var(--color-text); }

    button.active {
      background: var(--color-primary-light);
      color: var(--color-primary);
      font-weight: 500;
    }

    .badge {
      flex-shrink: 0;
      width: 32px;
      height: 32px;
      border-radius: var(--radius-sm);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.6rem;
      font-weight: 700;
      color: #fff;
      letter-spacing: 0;
      line-height: 1;
      text-align: center;
    }

    .label { flex: 1; min-width: 0; }

    .course-name {
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 0.78rem;
      line-height: 1.3;
    }

    .course-short {
      display: block;
      font-size: 0.65rem;
      opacity: 0.6;
      margin-top: 1px;
    }

    button.active .course-short { opacity: 0.8; }

    .divider {
      height: 1px;
      background: var(--color-border);
      margin: var(--space-3) var(--space-4);
    }
  `

  private select(id: number) {
    this.dispatchEvent(
      new CustomEvent<number>('course-selected', { detail: id, bubbles: true, composed: true })
    )
  }

  render() {
    return html`
      <div class="section-title">Módulos 25-26</div>
      <ul>
        ${TARGET_COURSES.map(c => html`
          <li>
            <button
              class=${this.selectedCourseId === c.id ? 'active' : ''}
              @click=${() => this.select(c.id)}
            >
              <span
                class="badge"
                style="background:${BADGE_COLORS[c.short] ?? '#475569'}"
              >${c.short.split(' ')[0]}</span>
              <span class="label">
                <span class="course-name">${c.name.replace(/^25-26\s+/, '')}</span>
                <span class="course-short">${c.short}</span>
              </span>
            </button>
          </li>
        `)}
      </ul>
    `
  }
}

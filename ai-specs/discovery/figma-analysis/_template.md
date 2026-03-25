# Figma Analysis: {Screen or Flow Name}

**Date**: YYYY-MM-DD
**Figma source**: {Link or file name}
**Related interview**: `ai-specs/discovery/client-interviews/{file}.md`
**Related issue**: GH-{N} (if already created)

---

## 1. Screen Inventory

_List every screen or state in this flow._

| Screen | Description | Status in Figma |
|---|---|---|
| `/login` | Login form with email and password | Designed |
| `/login — error state` | Form with validation errors shown | Designed |
| `/dashboard` | Main app screen after login | Wireframe only |

---

## 2. Component Breakdown

_For each screen, list the UI components visible and their behavior._

### Screen: {name}

| Component | Type | Behavior | Data shown |
|---|---|---|---|
| Email field | Input | Required, validates on blur | User input |
| Submit button | Button | Disabled until form valid | — |
| Error banner | Alert | Shown on API error | Error message from API |

---

## 3. User Flows

_Describe the navigation paths visible in the Figma._

```
[Login screen]
  → Submit valid credentials → [Dashboard]
  → Submit invalid credentials → [Login screen + error banner]
  → Click "Forgot password" → [Password reset screen]
```

---

## 4. Design Inconsistencies

_Things in the Figma that seem inconsistent, incomplete, or contradictory._

| # | Issue | Location | Severity |
|---|---|---|---|
| 1 | Error state for network failure not designed | Login screen | Medium |
| 2 | Mobile layout missing for dashboard | Dashboard | High |

---

## 5. Edge Cases Not Covered in Design

_Scenarios that will happen in production but have no Figma representation._

- What does the loading state look like while the API call is in progress?
- What happens on session timeout?
- Empty state when the list has no items?

---

## 6. Questions for the Designer / Client

| # | Question | Status |
|---|---|---|
| 1 | What color for the disabled button state? | Pending |
| 2 | Should errors clear automatically after X seconds? | Pending |

---

## 7. Technical Notes for Implementation

_Notes for the developer about how to translate this design into components._

- Use `PrimeVue > InputText` for all input fields
- Error banner maps to `PrimeVue > Message severity="error"` or `InlineMessage`
- Colors and design tokens must follow the project's PrimeVue theme configuration (see frontend-standards.mdc)
- All interactive elements need `data-testid` attributes for Playwright tests

---

## 8. Claude Prompt for Next Step

_Use this prompt to generate the frontend implementation plan from this analysis:_

```
Read ai-specs/discovery/figma-analysis/{this-file}.md and
ai-specs/discovery/client-interviews/{interview-file}.md

Act as a Frontend Architect. Generate a component tree and implementation plan
for this screen following our Vue 3 + PrimeVue 4 standards in
ai-specs/specs/frontend-standards.mdc.
```

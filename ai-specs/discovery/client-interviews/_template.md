# Client Interview: {Project/Feature Name}

**Date**: YYYY-MM-DD
**Participants**: {Client name, role} | {Your name}
**Meeting type**: Kickoff / Follow-up / Clarification
**Duration**: {X} minutes

---

## 1. Context

Brief description of why this meeting was held and what was discussed at a high level.

---

## 2. Raw Notes

_Write everything the client says here, verbatim or close to it. Do not filter yet._

- ...
- ...

---

## 3. Functional Requirements Identified

_Extract from the raw notes. Each item should be an action the system must perform._

| # | Requirement | Priority | Notes |
|---|---|---|---|
| 1 | The user must be able to... | High | |
| 2 | The system should... | Medium | |

---

## 4. Non-Functional Requirements

_Performance, security, accessibility, browser support, etc._

- ...

---

## 5. Ambiguities & Open Questions

_Things the client said that were unclear, contradictory, or need follow-up._

| # | Question | Asked to | Status |
|---|---|---|---|
| 1 | What happens when...? | Client | Pending |
| 2 | Should X also apply to Y? | Client | Resolved: Yes |

---

## 6. Out of Scope (Confirmed)

_Things explicitly ruled out for this iteration._

- ...

---

## 7. Figma / Design References

_Links to screens, flows, or mockups discussed in the meeting._

- Screen: {name} — {Figma link or description}
- Flow: {name} — {description}

---

## 8. Next Steps

| Action | Owner | Due |
|---|---|---|
| Send clarification questions | {You} | YYYY-MM-DD |
| Share Figma updates | {Client} | YYYY-MM-DD |
| Generate User Stories from this | Claude | Next session |

---

## 9. Claude Prompt for Next Step

_Use this prompt to generate User Stories from this interview:_

```
Read ai-specs/discovery/client-interviews/{this-file}.md

Act as a Product Owner. Extract User Stories from this client interview following our format.
For each story, identify acceptance criteria and flag any remaining ambiguities.
Save the stories to ai-specs/discovery/user-stories/.
```

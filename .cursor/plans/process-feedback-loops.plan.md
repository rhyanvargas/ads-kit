---
name: Process + feedback loops
overview: Tighten ADSK SDD + docs around Explore→Plan→Clear→Implement, tracer bullets, fail-closed verify, HITL/AFK policy, lean steering, and README/eng-lead messaging that process + feedback loops beat more agent power — without shipping Ralph or a competing SDD spine.
todos:
  - id: T1
    content: REQ-001 — Encode Explore→Plan→Clear→Implement in SDD skill + /implement-spec
    status: completed
  - id: T2
    content: REQ-002 — Tracer bullet gate in problem-size-guide + /plan-impl + plan checklist
    status: completed
  - id: T3
    content: REQ-003 — Fail-closed verify in quality gates + /implement-spec + getting-started
    status: completed
  - id: T4
    content: REQ-004 — Agent-navigable checklist in /quick-start + getting-started.md
    status: completed
  - id: T5
    content: REQ-005,009 — Add agent-autonomy.md; link from for-eng-leads; reaffirm boundaries
    status: completed
  - id: T6
    content: REQ-006,007 — Lean steering audit + parallel build/verify plan guidance
    status: completed
  - id: T7
    content: REQ-008 — README + for-eng-leads (+ create-adsk if needed) thesis language
    status: completed
  - id: T8
    content: REQ-010 — sync-adsk kit + self-check (+ skills-ci if needed); acceptance pass
    status: completed
isProject: false
---

# Plan: Process + feedback loops

**Spec:** [`.cursor/docs/specs/process-feedback-loops.md`](../docs/specs/process-feedback-loops.md)

## Locked defaults

- No Ralph / GitHub-Issues AFK product; autonomy = docs + pointers only (REQ-005).
- No new profile/pack; stay on first-party SDD + existing packs (REQ-009).
- Messaging thesis (exact sense required): **process + feedback loops beat more agent power** (REQ-008).
- After skill edits: `./scripts/sync-adsk.sh kit` before claiming done (REQ-010).

## Requirements → tasks

| Requirement                             | Tasks |
| --------------------------------------- | ----- |
| REQ-001 Clear loop                      | T1    |
| REQ-002 Tracer                          | T2    |
| REQ-003 Fail-closed verify              | T3    |
| REQ-004 Navigable onboarding            | T4    |
| REQ-005 / REQ-009 Autonomy + boundaries | T5    |
| REQ-006 / REQ-007 Lean + parallel plans | T6    |
| REQ-008 Positioning language            | T7    |
| REQ-010 Sync / verify                   | T8    |

## Tasks

### T1 — Explore → Plan → Clear → Implement (REQ-001)

**Files:**

- `skills/spec-driven-workflow/SKILL.md` (gated procedure or quality gates)
- `skills/spec-driven-workflow/references/best-practices.md` (replace soft “keep context fresh” with Clear duty)
- `.cursor/commands/implement-spec.md` (one-line Clear reminder)

**Do:**

1. Add an explicit **Clear** step: persist exploration into living spec/plan; start implement lean.
2. Keep command thin — link to skill, don’t copy the playbook.

**Done when:** An agent reading only `SKILL.md` + `/implement-spec` knows Clear is mandatory before/at start of implement for Medium+.

---

### T2 — Tracer bullet gate (REQ-002)

**Files:**

- `skills/spec-driven-workflow/references/problem-size-guide.md` (Large + ambiguous Medium)
- `skills/spec-driven-workflow/SKILL.md` or plan-related reference (checklist item)
- `.cursor/commands/plan-impl.md` (one-line: require tracer task or N/A justification)

**Do:**

1. Define tracer = thin vertical slice + one verify before multi-phase implement.
2. Plan must include tracer task or explicit “architecture already proven” justification.

**Done when:** Size guide + `/plan-impl` both mention the gate; Large path cannot skip without justification language.

---

### T3 — Fail-closed verify (REQ-003)

**Files:**

- `skills/spec-driven-workflow/SKILL.md` (quality gates — strengthen from “run verify” to fail-closed)
- `.cursor/commands/implement-spec.md`
- `skills/spec-driven-workflow/references/getting-started.md` (and `commands-reference.md` if it implies soft verify)

**Do:**

1. If `project-cmds` / project verify missing → do not claim done; point to `/quick-start`.
2. If present → run before done; fix failures first.

**Done when:** “Looks good without verify” is explicitly forbidden in skill quality gates.

---

### T4 — Agent-navigable checklist (REQ-004)

**Files:**

- `.cursor/commands/quick-start.md`
- `skills/spec-driven-workflow/references/getting-started.md`

**Do:** Extend quick-start output to a short checklist: artifact home, verify location, `.agents/skills/`, next command.

**Done when:** `/quick-start` behavior lists all four checklist items.

---

### T5 — HITL vs AFK + boundaries (REQ-005, REQ-009)

**Files:**

- New: `docs/product/agent-autonomy.md` (preferred) **or** section in `docs/engineering-methods.md`
- `docs/product/for-eng-leads.md` (link + one paragraph)
- Touch `docs/engineering-methods.md` exclusions only if needed to cross-link (no pack expansion)

**Do:**

1. HITL vs AFK criteria; sandbox/branch/verify prerequisites for AFK-ish work.
2. Explicit non-goal: no Ralph/issue-tracker clone; Cursor Automations/loops as optional tools.
3. Reaffirm product-value-loop vs SDD handoff; no overlapping SDD packs.

**Done when:** Eng lead can open one doc and know when to stay in the loop vs go AFK — without a new skill.

---

### T6 — Lean steering + parallel plan tasks (REQ-006, REQ-007)

**Files (audit, minimal edits):**

- `AGENTS.md`
- Stock adopter-facing rules under `.cursor/rules/` (only if playbook bloat exists)
- `docs/skill-authoring.md` (rule of thumb if missing)
- Plan guidance in SDD (`SKILL.md` plan bullet or `best-practices.md` / plan section): suggest **build** vs **verify/review** task split

**Do:** Trim always-on text; point depth to skills; add parallel QA guidance for Medium+ plans.

**Done when:** Audit notes (in PR/commit body or short comment in docs) what moved/trimmed; plan guidance mentions parallel verify/review.

---

### T7 — README + eng-lead thesis language (REQ-008)

**Files:**

- `README.md` — hero / tagline / early positioning (not buried in FAQ)
- `docs/product/for-eng-leads.md` — align problem/positioning with the thesis
- `docs/product/create-adsk.md` — only if one-liner/job currently implies “more agent power”; keep kill criteria

**Do:**

1. Make the meaning unmistakable: **process + feedback loops beat more agent power**.
2. Tie to existing job: consistent team workflow / trustworthy delivery — not raw model strength.
3. Follow `readme-authoring` evidence rules: don’t invent features; link real paths (SDD, engineering-methods, verify).

**Suggested placement (implementer may refine):**

- README: after the adopt one-liner, one short sentence or subhead.
- for-eng-leads: under Problem framing or Positioning.

**Done when:** Grep/read of README + for-eng-leads shows the thesis (exact phrase or unmistakable paraphrase); create-adsk two-tool model unchanged.

---

### T8 — Sync, verify, acceptance (REQ-010)

**Commands:**

```bash
./scripts/sync-adsk.sh kit
./scripts/sync-adsk.sh self-check
# if skills/spec-driven-workflow structure/evals touched:
./scripts/check-skills-ci.sh
```

**Acceptance checklist (map to REQs):**

| REQ     | Evidence                                                    |
| ------- | ----------------------------------------------------------- |
| 001     | Clear step in `SKILL.md` + `/implement-spec`                |
| 002     | Tracer in size guide + `/plan-impl`                         |
| 003     | Fail-closed verify language                                 |
| 004     | Quick-start checklist                                       |
| 005/009 | `agent-autonomy.md` (or equiv) + eng-lead link + boundaries |
| 006/007 | Lean audit + parallel plan note                             |
| 008     | README + for-eng-leads thesis                               |
| 010     | sync/self-check green                                       |

**Done when:** All rows pass; suggest `/review --spec .cursor/docs/specs/process-feedback-loops.md`.

## Risks

| Risk                          | Mitigation                                                                 |
| ----------------------------- | -------------------------------------------------------------------------- |
| Skill body grows (token cost) | Prefer short SKILL.md bullets + `references/`; run skill-optimizer mindset |
| README becomes manifesto      | One sharp thesis line + link to eng-leads; keep Quick Start first          |
| Scope creep into AFK product  | REQ-005 non-goal is hard; reject new skills in review                      |

## Implement order

T1 → T2 → T3 → T4 → T5 → T6 → T7 → T8

(T7 can parallel T5/T6 if needed; T8 always last.)

**Lean steering audit (T6):** Prefer table in `AGENTS.md` already correct; added one lean-steering line + link to `agent-autonomy.md`. Stock `.cursor/rules/` (testing, project-cmds, skill-authoring, adopter-product, cursor-artifacts, project) — no playbook bloat trimmed; rule of thumb added under progressive disclosure in `docs/skill-authoring.md`. Parallel build/verify noted in `SKILL.md` Plan step, `/plan-impl`, and `commands-reference.md`.

## Next step

Suggest `/review --spec .cursor/docs/specs/process-feedback-loops.md`.

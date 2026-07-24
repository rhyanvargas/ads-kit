# Spec: Process + feedback loops (ADSK quality tightening)

**Status:** Implemented  
**Size:** Medium  
**Source:** Analysis of [AI Coding for Real Engineers](https://www.aihero.dev/cohorts/ai-coding-for-real-engineers-m0k0w) → actionable ADSK takeaways  
**Out of scope:** Ralph/GitHub-Issues AFK automation skill; competing SDD/PRD spines (`to-prd` / `to-spec`); new create-adsk profiles or skill-picker UX

## Problem

ADSK already ships a gated spec→plan→implement→review spine and progressive disclosure, but adopter outcomes still under-encode the practices that keep agents trustworthy: context hygiene (**Clear** before implement — drop exploration transcript after findings are in the living artifacts), architectural validation before full build (tracer bullets), fail-closed verify, lean always-on steering, and an explicit HITL vs AFK policy. Product messaging underplays the differentiator that **process + feedback loops beat more agent power**.

## Success criteria

1. An agent following `spec-driven-workflow` for Medium+ work clears exploration into durable artifacts before implement, and cannot honestly claim “done” without project verify (or an explicit missing-verify block).
2. Large (and ambiguous Medium) plans include a tracer-bullet gate before multi-phase implement.
3. README + eng-lead docs state the process/feedback-loops thesis in adopter-facing language.
4. Kit docs define HITL vs AFK without shipping an issue-tracker automation product.
5. No new competing SDD/PRD pack; product contract hard rules remain intact.

## Assumptions

1. Changes live primarily in first-party `skills/spec-driven-workflow/`, thin `.cursor/commands/`, `docs/`, and `README.md` / `docs/product/for-eng-leads.md`.
2. After skill tree edits: `./scripts/sync-adsk.sh kit` (and self-check as needed).
3. Behavioral tests are N/A for most doc/skill prose; verify = skill CI + sync self-check + evidence review of wording.

## Requirements

### REQ-001 — Explore → Plan → Clear → Implement

`skills/spec-driven-workflow/SKILL.md` (and `references/best-practices.md` as needed) MUST instruct agents to:

- Explore/research in a bounded pass (subagent or dedicated chat OK).
- Persist durable findings into the living spec and/or plan.
- **Clear** before implement: start implement sessions lean; do not carry full exploration transcript as working context.

Thin commands that start implement (`/implement-spec`) MUST reference this Clear habit (one line; depth in skill).

Order (do not reverse Clear and Implement): `… → PLAN → CLEAR → IMPLEMENT → …`

### REQ-002 — Tracer bullet gate

`references/problem-size-guide.md` and plan guidance MUST require, for **Large** and for **Medium** when architecture/integration is ambiguous:

- A thin vertical slice (one path, one verify) that validates architecture **before** multi-phase implement.
- The plan MUST include an explicit tracer task (or “N/A — architecture proven” with justification).

`/plan-impl` behavior (command or skill plan section) MUST call out checking for this gate.

### REQ-003 — Fail-closed verify

Implement / done claims MUST:

- Run adopter `project-cmds` (or documented project verify) when configured.
- If verify is **not** configured: refuse to claim done; instruct `/quick-start` or set `project-cmds` / portable equivalent — do not invent a silent “looks good.”

Update `SKILL.md` quality gates, `/implement-spec`, and relevant references (`getting-started.md`, `commands-reference.md` if they contradict).

### REQ-004 — Agent-navigable onboarding

`/quick-start` + `references/getting-started.md` MUST produce or confirm a short “where truth lives” checklist:

- Spec/plan artifact home
- Verify commands location (`project-cmds` or portable)
- Skills discovery path (`.agents/skills/`)
- Next command (greenfield `/draft-spec` vs brownfield `/extract-spec`)

Success metric remains: path to first `/draft-spec` (or extract) without guessing structure.

### REQ-005 — HITL vs AFK policy (docs only)

Add a short eng-facing doc (prefer `docs/product/agent-autonomy.md` or a section in `docs/engineering-methods.md` + link from `for-eng-leads.md`) that states:

- When to stay HITL (spec gates, brownfield, security/data paths, unclear architecture).
- When background/loop agents are OK (bounded items, verify present, branch isolation).
- Explicit non-goal: ADSK does **not** ship a GitHub-Issues Ralph clone; point to Cursor Automations / loops / team process.

Must not add a first-party AFK skill or pack.

### REQ-006 — Lean steering audit

Audit kit always-on surfaces (`AGENTS.md`, stock `.cursor/rules/` that ship to adopters) for token waste:

- Keep stable constraints in rules / AGENTS.md.
- Move playbook depth into skills + `references/` (progressive disclosure).
- Document the rule of thumb in `docs/skill-authoring.md` or AGENTS.md “Prefer” table if not already clear.
- No drive-by rewrites of unrelated rules.

### REQ-007 — Parallel quality in plans

Plan templates / skill plan guidance MUST suggest splitting **build** tasks from **verify/review** tasks so QA can proceed in parallel with the next REQ slice (optional, not mandatory for Small).

### REQ-008 — README + eng-lead language (thesis)

Update adopter-facing positioning so the kit’s value is not “more agent power” but trustworthy process:

- `README.md` hero / one-liner area: state that **process + feedback loops beat more agent power** (or a close, brand-consistent paraphrase that keeps that meaning).
- Align a short paragraph in `docs/product/for-eng-leads.md` (and `docs/product/create-adsk.md` one-liner/job if needed) so eng leads hear the same thesis.
- Keep create-adsk kill criteria and two-tool model intact; do not reframe as a skills marketplace.

### REQ-009 — Product boundary guardrails

Docs and skill text MUST reaffirm:

- Discovery PRD work → `product-value-loop`; executable engineering → `spec-driven-workflow`.
- Do not add mattpocock / overlapping SDD packs.
- Changes stay inside kit adoption differentiation.

### REQ-010 — Sync + verify

After skill/command edits:

1. `./scripts/sync-adsk.sh kit`
2. `./scripts/sync-adsk.sh self-check` (and `./scripts/check-skills-ci.sh` if skill frontmatter/evals touched)
3. Confirm discovery symlinks / kit-snapshot expectations per repo convention

## Test strategy

| Kind | Approach |
|------|----------|
| Behavioral app tests | N/A (docs/skills) |
| Skill integrity | `./scripts/check-skills-ci.sh` if `skills/spec-driven-workflow` structure/frontmatter changes |
| Kit integrity | `./scripts/sync-adsk.sh self-check` |
| Acceptance | Manual: each REQ has a cited file path + quoted/paraphrased rule an agent would follow |

## Non-goals

- Implementing Ralph loops or issue-backlog AFK agents in-repo
- New optional pack solely for “quality bar”
- Competing with skills.sh discovery
- Full rewrite of `best-practices.md` or all SDD references

## Open questions

None blocking if assumptions above hold. Optional later: encode tracer/Clear into skill `evals/evals.json` output assertions (out of v1 unless cheap).

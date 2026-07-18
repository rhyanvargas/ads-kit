---
name: spec-driven-workflow
description: >-
  Draft specs, plan implementation, implement from specs, review against
  specs, extract specs from existing code, and size greenfield/brownfield
  work. Use when the user wants testable requirements, living specs,
  spec-driven development, or /draft-spec /plan-impl /implement-spec
  /review /extract-spec. Do not use for DevOps/CI-CD strategy design or
  trivial one-line fixes.
---

# Spec-Driven Workflow

The spec is the shared source of truth for what to build and how to know it is done.

## Quick size guide

| Size | Workflow |
|------|----------|
| Trivial | Skip formal workflow; handle in chat |
| Small | Draft spec → implement |
| Medium | Draft spec → plan → implement → review |
| Large | Research first, then full workflow |

Read `references/problem-size-guide.md` when size is unclear.

## Gated procedure

Do not advance phases until the current artifact is good enough (user review for medium+; self-check for small).

```
SIZE → SPECIFY → PLAN (medium+) → IMPLEMENT → REVIEW
              ↑______________ living spec ______________|
```

1. **Size** — Match depth to problem size (table above).
2. **Specify** — Surface assumptions first, then write testable requirements (`REQ-XXX` preferred). Read `references/spec-writing-guide.md`.
3. **Plan** (medium+) — Break work into concrete, verifiable tasks. Prefer a written plan before multi-file changes.
4. **Implement** — Follow the spec/plan; map each requirement to tests unless non-behavioral with explicit justification.
5. **Review** — Check correctness, security-sensitive paths, test coverage, and spec compliance.
6. **Brownfield** — Document existing behavior with extract-spec before large changes. Read `references/brownfield-workflow.md`.

### Before writing a spec

**Surface assumptions immediately.** List what you are assuming and invite correction before drafting:

```
ASSUMPTIONS:
1. …
2. …
→ Correct me now or I'll proceed with these.
```

**Reframe vague goals as success criteria** (measurable / testable), then confirm:

```
REQUIREMENT: "Make the dashboard faster"
SUCCESS CRITERIA:
- LCP < 2.5s on 4G
- Initial data load < 500ms
→ Are these the right targets?
```

Do not silently fill ambiguous requirements — that is the failure mode SDD exists to prevent.

### Living spec

Update the spec when decisions or scope change; prefer updating the spec before implementing the change. Link PRs back to the spec section or `REQ-XXX` they satisfy.

## Artifact homes

Before writing a spec or plan, **resolve the output home** (do not assume `.cursor/`):

1. Explicit path from the user (`--out`, `@file`, concrete path)
2. Existing project convention (`docs/specs|plans` or `.cursor/docs/specs` / `.cursor/plans`)
3. Client default — Cursor `/` or Cursor wiring → `.cursor/...`; otherwise → `docs/specs` + `docs/plans`

Read `references/artifact-homes.md` whenever creating or locating specs/plans.  
Read `references/cursor-adapter.md` when the home is Cursor (Plan YAML `todos` required).

Slash commands are optional thin wrappers; details in `references/commands-reference.md`.

## Progressive disclosure

Load references only when needed:

| Reference | When to read |
|-----------|----------------|
| `references/artifact-homes.md` | Creating/locating specs or plans; path unclear |
| `references/cursor-adapter.md` | Cursor `/` commands or `.cursor/plans` / `.cursor/docs` homes |
| `references/problem-size-guide.md` | Size unclear or contested |
| `references/spec-writing-guide.md` | Writing or reviewing a spec |
| `references/greenfield-workflow.md` | New feature, no existing behavior to preserve |
| `references/brownfield-workflow.md` | Changing or documenting existing code |
| `references/commands-reference.md` | Slash-command usage or options |
| `references/getting-started.md` | User asks how to install/setup ADSK |
| `references/spec-driven-overview.md` | User asks *why* SDD (not for routine runs) |
| `references/best-practices.md` | User asks for tips/external links |
| `references/extending.md` | Adding rules/commands/skills or pairing upstream packs |

## Quality gates

- Assumptions surfaced before drafting when requirements are ambiguous.
- Requirements are specific and testable.
- Implemented requirements have automated tests (or a short justification when truly non-behavioral).
- Run the project's verify commands (tests/lint/typecheck) before claiming done.

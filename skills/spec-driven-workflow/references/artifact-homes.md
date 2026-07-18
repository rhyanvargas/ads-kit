# Artifact homes (path resolution)

Resolve where specs and plans are written **before** creating files. Do not assume `.cursor/` on every project.

Aligned with [agentskills.io client scan paths](https://agentskills.io/client-implementation/adding-skills-support#where-to-scan): portable skills under `.agents/skills/`; client-specific dirs are optional wiring.

## Resolution order

Apply the first match:

1. **Explicit path** — User gave `--out`, `@path`, or a concrete file/dir in the prompt.
2. **Existing project convention** — If the repo already has specs or plans under one of these trees, keep using that tree:
   - `docs/specs/` and/or `docs/plans/`
   - `.cursor/docs/specs/` and/or `.cursor/plans/`
3. **Client default** — Detect from workspace signals (table below).
4. **Portable fallback** — `docs/specs/` and `docs/plans/` (skills-only / unknown client).

Create missing directories only for the chosen home.

## Client detection (signals)

| Signal | Treat as | Spec home | Plan home |
|--------|----------|-----------|-----------|
| Invoked via Cursor `/` slash command **or** `.cursor/commands/` present and in active use | Cursor | `.cursor/docs/specs/` | `.cursor/plans/` |
| `.cursor/docs/specs/` or `.cursor/plans/` already populated | Cursor (convention) | same | same |
| Skills installed under `.agents/skills/` only; no Cursor wiring | Portable | `docs/specs/` | `docs/plans/` |
| Ambiguous | Ask once, then record choice in the plan/spec header | — | — |

Do **not** invent other clients’ command trees (e.g. `.claude/commands`) unless the project already uses them. Skills remain the portable entry point.

## Filename conventions

| Artifact | Pattern |
|----------|---------|
| Feature spec | `{feature-name}.md` |
| Baseline / extract | `{area}-current.md` or `{area}-existing.md` |
| Plan | `{feature-name}.plan.md` |

## Plan trackability (all clients)

Every written plan must expose **trackable tasks** mapped to `REQ-XXX` where possible:

- **Cursor plan home** (`.cursor/plans/`) — use Cursor Plan YAML frontmatter. Read `cursor-adapter.md`.
- **Portable plan home** (`docs/plans/`) — use a markdown checklist with stable IDs (`T1`, `T2`, …) and status (`pending` / `in_progress` / `done`). Optionally mirror the same IDs in the agent’s session todo tool.

A requirements↔tasks table in the body is useful, but it does **not** replace trackable todos.

## Anti-patterns

- Hardcoding `.cursor/...` in the skill playbook when the project uses `docs/`
- Writing a REQ→task table with empty platform todos (Cursor Plan UI shows “0 To-dos”)
- Copying full path tables into every slash command — commands stay thin; this file is the source of truth

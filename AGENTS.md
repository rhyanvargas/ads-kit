# Agent Instructions — The Agentic Development Starter Kit (ADSK)

This repository is an **Agentic Development Starter Kit**:

- Portable Agent Skills under `skills/` (source of truth)
- Optional Cursor wiring under `.cursor/` (commands, rules, skill symlinks)

## Single source of truth

- **Portable content** lives in `skills/<name>/` and must work across Agent Skills–compatible tools.
- **Cursor wiring** lives in `.cursor/` and should **reference** `skills/` rather than duplicating playbooks.

Prefer:

| Artifact | Use for |
|----------|---------|
| **Rules** | Stable constraints and quality gates |
| **Commands** | User-invoked multi-step `/` workflows (thin wrappers) |
| **Skills** | Deep reusable playbooks + `references/` + `evals/` |

## Repo intent

- Keep docs concise and evidence-based (link to real file paths).
- When changing workflow behavior, update the skill **and** any thin command that invokes it.
- New skills: `skills/<name>/SKILL.md` + optional `references/`, `evals/`, `scripts/`.
- Recommended upstream skills are listed in `recommended-skills.json` — do not vendor them without an explicit decision.

## Authoring & evals

Follow [docs/skill-authoring.md](docs/skill-authoring.md) and [docs/evaluating-skills.md](docs/evaluating-skills.md)
(aligned with [agentskills.io](https://agentskills.io)).

## Testing note

This kit is primarily templates/docs. If you add executable code, also add:

- a test harness,
- exact `test` / `lint` / `typecheck` commands in `.cursor/rules/project-cmds/`,
- and map spec requirements to tests where applicable.

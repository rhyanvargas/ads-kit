# Agent Instructions — The Agentic Development Starter Kit (ADSK)

This repository is the **kit source** (package + optional Cursor wiring).

**Adopters adding ADSK to an app:** follow [docs/using-adsk.md](docs/using-adsk.md) — install into `.agents/skills/`, not a root `skills/` folder.

## When the user asks to sync ADSK

Run the script; do not hand-copy skill trees or Cursor files.

| Context | Run |
|---------|-----|
| **This kit repo** | `./scripts/sync-adsk.sh kit` (optional: `./scripts/sync-adsk.sh self-check`) |
| **Adopter app** | Resolve kit checkout → `<kit>/scripts/sync-adsk.sh adopter --from <kit>` from the app root |

Playbook: [`.cursor/commands/sync-adsk.md`](.cursor/commands/sync-adsk.md). Dual-audience steps: [docs/upgrading.md](docs/upgrading.md).

## Kit layout (this repo)

- **Package source:** `skills/<name>/` (Agent Skills `SKILL.md` — what `npx skills add` ships)
- **Discovery links (do not duplicate trees):**
  - `.agents/skills/<name>` → `../../skills/<name>`
  - `.cursor/skills/<name>` → `../../skills/<name>`
- **Cursor wiring:** `.cursor/commands/`, `.cursor/rules/` — thin wrappers; reference skills, don’t copy playbooks
- **Sync script:** [`scripts/sync-adsk.sh`](scripts/sync-adsk.sh)

Prefer:

| Artifact | Use for |
|----------|---------|
| **Rules** | Stable constraints and quality gates |
| **Commands** | User-invoked multi-step `/` workflows (thin wrappers) |
| **Skills** | Deep reusable playbooks + `references/` + `evals/` |

## Repo intent

- Keep docs concise and evidence-based (link to real file paths).
- When changing workflow behavior, update the skill **and** any thin command that invokes it.
- New first-party skills: add under `skills/<name>/`, then sync (`./scripts/sync-adsk.sh kit` or ask the agent / `/sync-adsk`).
- Adopter Cursor updates: `adopter --from <kit>` (see [docs/using-adsk.md](docs/using-adsk.md)).
- Recommended upstream skills are listed in `recommended-skills.json` — do not vendor them without an explicit decision.

## Authoring & evals

Follow [docs/skill-authoring.md](docs/skill-authoring.md) and [docs/evaluating-skills.md](docs/evaluating-skills.md)
(aligned with [agentskills.io](https://agentskills.io)).

**When creating or editing any skill**, apply **`skill-optimizer`** (validate, lean `SKILL.md`, progressive disclosure, trigger + output evals). Cursor: rule `.cursor/rules/skill-authoring/`, command `/optimize-skill`.

## Testing note

This kit is primarily templates/docs. Executable tooling today:

- Smoke: `./scripts/sync-adsk.sh self-check` (see `.cursor/rules/project-cmds/`)

If you add more executable code, also add a test harness, exact verify commands in `project-cmds`, and map spec requirements to tests where applicable.

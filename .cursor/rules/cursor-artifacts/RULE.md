---
description: "Where Cursor artifacts live and when to use rules vs skills vs commands"
alwaysApply: true
---

# Cursor Artifact Conventions

Use the right artifact type. Do not duplicate the same guidance in multiple places.

## Locations (single source of truth)

| Artifact | Path | Purpose |
|----------|------|---------|
| Rules | `.cursor/rules/<name>/RULE.md` | Persistent constraints always/globs/manual |
| Skills | `.cursor/skills/<name>/SKILL.md` | Domain workflows; agent-decided or `/skill-name` |
| Commands | `.cursor/commands/*.md` | Explicit `/` slash workflows |
| Specs | `.cursor/docs/specs/` | Generated feature specs |
| Plans | `.cursor/plans/` | Implementation plans from `/plan-impl` |
| Templates | `.cursor/templates/` | Copy-paste starters for new rules |

Do **not** keep a parallel skills tree under `.agents/skills/` in this repo. Cursor loads project skills from `.cursor/skills/`.

## When to use which

- **Rule** — Stable project constraints the agent must always (or for matching files) follow: coding standards, testing policy, verify commands.
- **Skill** — Specialized workflow knowledge with a clear trigger description (spec-driven SDD, DevOps strategy facilitation). Prefer skills when the agent should auto-apply from context.
- **Command** — User-invoked multi-step procedure via `/`. Keep command bodies thin; point to the matching skill for deep guidance when one exists.

## Anti-duplication

- One concern → one primary home (rule **or** skill **or** command body).
- Commands that wrap a skill should invoke/reference that skill, not restate its full playbook.
- Detailed docs belong in `skills/*/references/`, not a second docs tree.

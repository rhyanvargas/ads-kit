---
description: "Where Cursor artifacts live and when to use rules vs skills vs commands"
alwaysApply: true
---

# Cursor Artifact Conventions (ADSK)

Use the right artifact type. Do not duplicate the same guidance in multiple places.

## Locations (single source of truth)

| Artifact | Path | Purpose |
|----------|------|---------|
| Rules | `.cursor/rules/<name>/RULE.md` | Persistent constraints always/globs/manual |
| Skills (git source) | `skills/<name>/` | Versioned skill content in this repo |
| Skills (project, cross-client) | `.agents/skills/<name>` → `../../skills/<name>` | agentskills.io project discovery |
| Skills (project, Cursor) | `.cursor/skills/<name>` → `../../skills/<name>` | Cursor project discovery |
| Skills (user hub) | `~/.agents/skills/<name>` | Global install via `npx skills add -g` |
| Skills (user, Cursor) | `~/.cursor/skills/<name>` → hub | Cursor global discovery |
| Commands | `.cursor/commands/*.md` | Explicit `/` slash workflows |
| Specs | `.cursor/docs/specs/` | Generated feature specs |
| Plans | `.cursor/plans/` | Implementation plans from `/plan-impl` |
| Templates | `.cursor/templates/` | Copy-paste starters for new rules |

**This kit:** real content in `skills/`; `.agents/skills/` and `.cursor/skills/` are symlinks.  
**Adopter apps:** real content in `.agents/skills/` via `npx skills add` — see `docs/using-adsk.md`.  
Do not keep duplicate skill trees.

## When to use which

- **Rule** — Stable project constraints the agent must always (or for matching files) follow: coding standards, testing policy, verify commands.
- **Skill** — Specialized workflow knowledge with a clear trigger description (spec-driven SDD, DevOps strategy facilitation, skill optimization). Prefer skills when the agent should auto-apply from context.
- **New/edited skills** — Follow `skill-optimizer` and the `skill-authoring` rule; do not ship without validate + trigger evals.
- **Command** — User-invoked multi-step procedure via `/`. Keep command bodies thin; point to the matching skill for deep guidance when one exists.

## Anti-duplication

- One concern → one primary home (rule **or** skill **or** command body).
- Commands that wrap a skill should invoke/reference that skill, not restate its full playbook.
- Detailed docs belong in `skills/*/references/`, not a second docs tree.

# `.cursor/` (Cursor integration for ADSK)

Optional Cursor wiring for **The Agentic Development Starter Kit (ADSK)**.

| Path | Purpose |
|------|---------|
| `.cursor/commands/` | Slash commands (`/draft-spec`, `/review`, …) — thin wrappers over skills |
| `.cursor/rules/` | Project Rules (`RULE.md`) — quality gates |
| `.cursor/skills/` | Relative symlinks → `../../skills/` (portable source of truth) |
| `.cursor/templates/` | Copy-paste starters for new rules |
| `.cursor/docs/specs/` | Generated feature specs |
| `.cursor/plans/` | Implementation plans |

Portable skill content lives in repo-root `skills/`, not duplicated here.

Full setup: root [`README.md`](../README.md) and [`AGENTS.md`](../AGENTS.md).

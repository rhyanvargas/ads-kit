# `.cursor/` (Cursor integration for ADSK)

Optional Cursor wiring for **The Agentic Development Starter Kit (ADSK)**.

| Path | Purpose |
|------|---------|
| `.cursor/commands/` | Slash commands (`/draft-spec`, `/review`, …) — thin wrappers over skills |
| `.cursor/rules/` | Project Rules (`RULE.md`) — quality gates |
| `.cursor/skills/` | Relative symlinks → `../../skills/` (Cursor discovery) |
| `.cursor/templates/` | Copy-paste starters for new rules |
| `.cursor/docs/specs/` | Generated feature specs |
| `.cursor/plans/` | Implementation plans |

In **this kit**, skill content is packaged under `skills/` with discovery symlinks from `.agents/skills/` and `.cursor/skills/`.

**App adopters** install into `.agents/skills/` with the CLI — see [`docs/using-adsk.md`](../docs/using-adsk.md). Copy this folder’s `commands/` / `rules/` only if you want Cursor slash commands.

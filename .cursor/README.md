# `.cursor/` (Cursor integration for ADSK)

Optional Cursor wiring for **The Agentic Development Starter Kit (ADSK)**.

| Path | Purpose |
|------|---------|
| `.cursor/commands/` | Slash commands (`/draft-spec`, `/review`, …) — thin wrappers over skills |
| `.cursor/rules/` | Project Rules (`RULE.md`) — quality gates |
| `.cursor/skills/` | Relative symlinks → `../../skills/` (Cursor discovery) |
| `.cursor/templates/` | Copy-paste starters for new rules |
| `.cursor/docs/specs/` | Generated feature specs (Cursor default; portable: `docs/specs/`) |
| `.cursor/plans/` | Implementation plans (Cursor default; portable: `docs/plans/`; YAML `todos` required) |

In **this kit**, skill content is packaged under `skills/` with discovery symlinks from `.agents/skills/` and `.cursor/skills/`.

**Ask the agent:** “Sync ADSK” or `/sync-adsk` — it should run [`scripts/sync-adsk.sh`](../scripts/sync-adsk.sh) (not hand-copy). Adopters need a kit checkout path or clone.

```bash
# adopter app:
/path/to/adsk/scripts/sync-adsk.sh adopter --from /path/to/adsk

# kit maintainers:
./scripts/sync-adsk.sh kit
```

Step-by-step: [`docs/using-adsk.md`](../docs/using-adsk.md) (adopters), [`docs/upgrading.md`](../docs/upgrading.md) (both).

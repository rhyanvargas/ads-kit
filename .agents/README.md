# `.agents/` (skill discovery)

Per [agentskills.io](https://agentskills.io/client-implementation/adding-skills-support#where-to-scan), agents look for project skills here.

**In this kit repo:** entries under `.agents/skills/` are symlinks to package source `skills/<name>/`. Refresh with `./scripts/sync-adsk.sh kit`.

**In your app:** `npx skills add …` installs real skill folders under `.agents/skills/`. To also sync Cursor commands/rules when the kit updates, use `scripts/sync-adsk.sh adopter` — see [docs/using-adsk.md](../docs/using-adsk.md).

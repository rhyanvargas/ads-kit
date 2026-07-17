# `.agents/` (skill discovery)

Per [agentskills.io](https://agentskills.io/client-implementation/adding-skills-support#where-to-scan), agents look for project skills here.

**In this kit repo:** entries under `.agents/skills/` are symlinks to package source `skills/<name>/`.

**In your app:** `npx skills add …` installs real skill folders under `.agents/skills/`. See [docs/using-adsk.md](../docs/using-adsk.md).

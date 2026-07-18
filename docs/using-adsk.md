# Using ADSK in your project

For people adding ADSK to an **app** (not contributing to this kit).

Skills in **your** project live under `.agents/skills/` ([agentskills.io](https://agentskills.io/client-implementation/adding-skills-support#where-to-scan)). There is no root `skills/` folder in your app.

**Kit maintainers** (this repo): see [upgrading.md](upgrading.md#kit-maintainers) and [CONTRIBUTING.md](../CONTRIBUTING.md).

### Direction (two-tool model)

| Goal | Use |
|------|-----|
| Install skill folders only | `npx skills add …` (below) |
| Adopt ADSK as a **profile** (skills + Cursor wiring + saved config) | **`npx create-adsk`** — package at [`packages/create-adsk`](../packages/create-adsk); see [product/create-adsk.md](product/create-adsk.md) and [`profiles.json`](../profiles.json) |
| Cursor commands (script path) | Kit checkout + `sync-adsk.sh adopter` (section 2) — still valid without the CLI |

Preferred when the package is available locally or on npm:

```bash
npx create-adsk --profile delivery --yes
# from a kit checkout:
# npx --yes /path/to/agentic-development-starter-kit/packages/create-adsk --profile delivery --yes
```

The steps below remain the supported script-based path.

---

## Ask your coding agent (recommended)

You can ask the agent in plain language, for example:

- “Sync ADSK”
- “Update ADSK Cursor commands and skills”
- `/sync-adsk` (after Cursor wiring is installed)

The agent should run [`scripts/sync-adsk.sh`](../scripts/sync-adsk.sh) — not hand-copy files.

| You are in… | Agent should run |
|-------------|------------------|
| **This kit repo** | `./scripts/sync-adsk.sh kit` |
| **Your app** | `<kit>/scripts/sync-adsk.sh adopter --from <kit>` from the app root |

**Adopter requirement:** the agent needs a kit checkout (path you provide, an existing clone, or it clones GitHub once). `npx skills add` installs skills only; it does **not** install the sync script into your app. After the first Cursor sync, `/sync-adsk` is available in your project and points the agent at the same flow.

---

## 1. Install skills

### This project only (recommended)

In your app repo:

```bash
npx skills add rhyanvargas/agentic-development-starter-kit
```

That installs ADSK skills into `.agents/skills/`.

### All your projects (global)

```bash
npx skills add rhyanvargas/agentic-development-starter-kit -g
```

Skills go to `~/.agents/skills/` instead of the repo.

### Optional: product value loop (discover → ship)

ADSK’s first-party skills cover **spec → plan → implement → review**. To add customer discovery, competitive research, prioritization, and outcome roadmaps, install the recommended product pack and follow:

**[docs/product-value-loop.md](product-value-loop.md)**

```text
Discover → Research → Prioritize → Plan → Execute → measure → Discover
```

Those upstream skills are listed under `optional` in [`recommended-skills.json`](../recommended-skills.json). Install **project-local** (team share) and/or **global** (`-g`, personal) after your trust review; do not treat them as ADSK first-party packages.

---

## 2. Optional: Cursor slash commands (first time)

Skills work without this. Do this only if you want `/draft-spec`, `/plan-impl`, `/sync-adsk`, etc.

### Steps

1. Clone ADSK once (keep the checkout for later updates):

   ```bash
   git clone https://github.com/rhyanvargas/agentic-development-starter-kit.git ~/src/adsk
   ```

2. From **your app root**, either:

   **A. Ask your agent:** “Sync ADSK Cursor commands from `~/src/adsk`”

   **B. Run the script yourself:**

   ```bash
   ~/src/adsk/scripts/sync-adsk.sh adopter --from ~/src/adsk
   ```

3. Open the project in Cursor and try `/quick-start`.

### What the sync does

| Artifact | Behavior |
|----------|----------|
| `.cursor/commands/` | Writes/updates stock ADSK commands; rewrites `skills/<name>` → `.agents/skills/<name>` |
| `.cursor/rules/` | Adds stock rules (`skill-authoring`, `testing`, `project-cmds`) only if missing |
| `.agents/skills/` | Runs `npx skills update` (or `add` if none installed) |
| Specs / plans | Never overwritten; ensures empty `.cursor/docs/specs/` + `.cursor/plans/` exist |

Useful flags: `--dry-run`, `--commands-only`, `--skip-skills`, `--force-rules`, `--rules all|none`, `--skills-from-path` (offline copy from kit `skills/`).

---

## 3. Get updates later

When ADSK ships changes, skim [`CHANGELOG.md`](../CHANGELOG.md) on GitHub, then update.

### Cursor wiring + skills (if you use slash commands)

1. Update your kit checkout: `git -C ~/src/adsk pull`
2. From your **app** root, ask the agent “Sync ADSK” / run `/sync-adsk`, **or**:

   ```bash
   ~/src/adsk/scripts/sync-adsk.sh adopter --from ~/src/adsk
   ```

### Skills only (no Cursor wiring)

From your app repo:

```bash
npx skills update
```

If the CLI asks for **Update scope**:

| Scope | Choose when |
|-------|-------------|
| **Project** | You installed with `npx skills add …` in this repo (recommended) |
| **Global** | You installed with `-g` |
| **Both** | You keep the same skills in project **and** global |

For a normal app install, pick **Project**.

`npx skills update` alone does **not** refresh Cursor commands/rules. The sync script does. It will not overwrite customized rules unless you pass `--force-rules`.

---

## 4. Add your own skill (your project only)

1. Create a folder under `.agents/skills/` (folder name = skill `name`):

   ```bash
   mkdir -p .agents/skills/my-company-skill
   ```

2. Add `.agents/skills/my-company-skill/SKILL.md`:

   ```markdown
   ---
   name: my-company-skill
   description: >-
     Does X for our app. Use when the user asks about Y. Do not use for Z
     (near-miss).
   ---

   # My company skill

   1. …
   ```

3. **Optimize before you ship it.** Ask the agent to follow `skill-optimizer` (or `/optimize-skill`):
   - Keep `SKILL.md` lean; put depth in `references/` with when-to-load conditions
   - Add `evals/trigger/eval_queries.json` (~20 should/shouldn’t queries, including near-misses)
   - Validate: `npx --yes skills-ref validate ./.agents/skills/my-company-skill`

4. Restart / refresh the agent so it picks up the new skill.

**Share with the team:** commit `.agents/skills/`.  
**Keep private:** gitignore, for example `.agents/skills/my-company-skill/`.

More authoring guidance: [skill-authoring.md](skill-authoring.md).

---

## 5. Quick check

- Agent sees `spec-driven-workflow`, `skill-optimizer`, `devops-strategy-facilitator`, `release-automation`, and `readme-authoring` (if installed)
- Project install → real folders under `.agents/skills/`
- Specs/plans unchanged after update/sync
- Synced slash commands reference `.agents/skills/<name>` (not kit `skills/`)
- `/sync-adsk` is available if you synced Cursor commands

---

## Notes

| Topic | Detail |
|-------|--------|
| This ADSK repo | Package source under `skills/`; not used that way in your app |
| Cursor sync | [`scripts/sync-adsk.sh`](../scripts/sync-adsk.sh) `adopter` |
| Ask the agent | Preferred UX; agent must run the script (see top of this page) |
| Cursor-only skills | `.cursor/skills/` works; prefer `.agents/skills/` for portability |
| Upstream PRs | [CONTRIBUTING.md](../CONTRIBUTING.md) |
| Releases | [CHANGELOG.md](../CHANGELOG.md) · [RELEASE.md](RELEASE.md) |

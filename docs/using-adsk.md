# Using ADSK in your project

For people adding ADSK to an app (not contributing to this kit).

Skills in **your** project live under `.agents/skills/` ([agentskills.io](https://agentskills.io/client-implementation/adding-skills-support#where-to-scan)). There is no root `skills/` folder in your app.

---

## 1. Install (pick one)

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

---

## 2. Optional: Cursor slash commands

Skills work without this. Add it only if you want `/draft-spec`, `/plan-impl`, etc.

1. Clone or download ADSK once.
2. Copy into your app:

```bash
mkdir -p .cursor
cp -R /path/to/agentic-development-starter-kit/.cursor/commands .cursor/
cp -R /path/to/agentic-development-starter-kit/.cursor/rules .cursor/
mkdir -p .cursor/docs/specs .cursor/plans
```

Do **not** copy ADSK’s specs/plans folders with content — start empty.

Then open the project in Cursor and try `/quick-start`.

---

## 3. Get updates later

When ADSK ships changes on GitHub:

```bash
# skim CHANGELOG.md on GitHub first, then:
npx skills update
```

That refreshes installed skills. It does not touch your specs, plans, or custom rules.

If you copied Cursor commands/rules and want newer stock commands, re-copy `.cursor/commands/` only. Do not overwrite rules you customized.

---

## 4. Add your own skill (your project only)

Create a folder under `.agents/skills/` (folder name = skill `name`):

```bash
mkdir -p .agents/skills/my-company-skill
```

Add `.agents/skills/my-company-skill/SKILL.md`:

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

**Optimize before you ship it.** With ADSK installed you get `skill-optimizer`:

1. Ask the agent to follow `skill-optimizer` (or run `/optimize-skill` if you copied Cursor commands).
2. Keep `SKILL.md` lean; put depth in `references/` with when-to-load conditions.
3. Add `evals/trigger/eval_queries.json` (~20 should/shouldn’t queries, including near-misses).
4. Validate: `npx --yes skills-ref validate ./.agents/skills/my-company-skill`

If you copied `.cursor/rules/` from ADSK, the `skill-authoring` rule reminds the agent of these gates when `SKILL.md` is in context.

Restart / refresh the agent so it picks up the new skill.

**Share with the team:** commit `.agents/skills/`.  
**Keep private:** add to `.gitignore`, for example:

```gitignore
.agents/skills/my-company-skill/
```

More authoring guidance: [skill-authoring.md](skill-authoring.md).

---

## 5. Quick check

- Agent sees `spec-driven-workflow`, `skill-optimizer`, and `devops-strategy-facilitator` (if installed).
- Project install → folders under `.agents/skills/`.
- Your specs/plans (`.cursor/docs/specs/`, `.cursor/plans/`, or portable `docs/specs|plans`) are unchanged after `npx skills update`.

---

## Notes

| Topic | Detail |
|-------|--------|
| This ADSK repo | Ships package source under `skills/`; that layout is for the kit, not your app |
| Cursor-only skills | You may also use `.cursor/skills/`; prefer `.agents/skills/` for portability |
| Upstream PRs | [CONTRIBUTING.md](../CONTRIBUTING.md) — only if improving ADSK itself |
| Releases | [CHANGELOG.md](../CHANGELOG.md) |

# Installing and upgrading ADSK

Non-disruptive update paths for individuals and teams.

## Product / repo names

| Item | Value |
|------|--------|
| Product | The Agentic Development Starter Kit (ADSK) |
| GitHub slug | `agentic-development-starter-kit` |
| Example clone | `https://github.com/rhyanvargas/agentic-development-starter-kit.git` |

If your remote still points at `rhyan-cursor-docs`:

1. Rename the repository in GitHub settings to `agentic-development-starter-kit`
2. Update the local remote:
   ```bash
   git remote set-url origin https://github.com/rhyanvargas/agentic-development-starter-kit.git
   ```

## Install modes

### 1. Project copy (versioned with the app repo)

Best when each product repo should carry the kit.

```bash
cp -R skills /path/to/your-project/
cp -R .cursor /path/to/your-project/   # optional Cursor wiring
# Repair symlinks if needed:
# .cursor/skills/<name> -> ../../skills/<name>
```

**Upgrade:** merge from ADSK (subtree, vendor branch, or careful re-copy). Never overwrite:

- `.cursor/docs/specs/`
- `.cursor/plans/`
- project-specific rules you customized

Read `CHANGELOG.md` before upgrading majors.

### 2. Global hub (`npx skills`)

Best for personal or shared agent hubs without copying into every repo.

```bash
npx skills add rhyanvargas/agentic-development-starter-kit -g
npx skills check
npx skills update
```

**Upgrade:** `npx skills update` after reading ADSK release notes.  
**Safe for workflows:** project specs/plans/rules stay in the project; only hub skills change.

### 3. Recommended upstream pins

ADSK does not vendor Superpowers / find-skills / skill-creator. Install from [`recommended-skills.json`](../recommended-skills.json):

```bash
npx skills add obra/superpowers -g
npx skills add vercel-labs/skills@find-skills -g
# maintainers:
npx skills add anthropics/skills@skill-creator -g
```

**Upgrade:** review pins and upstream changelogs, then `npx skills update`. Re-run trust checklist on major upstream bumps.

## Compatibility rules

- Prefer **additive** skill changes within a minor release.
- Renaming or removing first-party skills = **major** version.
- Cursor commands remain thin wrappers; updating skills should not require rewriting consumer specs.
- Consumer projects own verify commands in their `project-cmds` rule — ADSK templates are starters only.

## Verifying after upgrade

1. Skill still discoverable by name  
2. Trigger smoke prompts from `skills/*/evals/trigger/eval_queries.json`  
3. Optional: rerun output evals ([docs/evaluating-skills.md](evaluating-skills.md))  
4. Confirm symlinks: `.cursor/skills/*` → `../../skills/*`  

## Releases

See [CHANGELOG.md](../CHANGELOG.md) for semver notes. First public tag target: **v0.1.0**.

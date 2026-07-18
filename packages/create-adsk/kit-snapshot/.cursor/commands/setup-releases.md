# /setup-releases

Wire Conventional Commits–based version and changelog automation for this repo.

## Skill

Read and follow **`skills/release-automation`** (adopter apps: `.agents/skills/release-automation`).

## Usage

```
/setup-releases
/setup-releases "Azure DevOps + squash merge on main"
/setup-releases "GitHub Actions + release-please, start at 0.1.0"
```

## Behavior

1. Confirm DevOps platform from evidence + user (GitHub Actions, Azure DevOps, or other).
2. Persist the choice in the skill’s `references/project-context.md`.
3. Install matching automation; update `docs/RELEASE.md` and Conventional Commit PR guidance.
4. Call out any manual org settings (e.g. Actions allowed to open PRs, Azure tag permissions).

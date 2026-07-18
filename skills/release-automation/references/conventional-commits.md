# Conventional Commits (release input)

Load when drafting PR templates, CONTRIBUTING notes, or changelog section maps.

## Preferred forms

| Type | Use for | Changelog |
|------|---------|-----------|
| `feat:` | User-visible capability | Added |
| `fix:` | Bug fix | Fixed |
| `perf:` | Performance | Changed |
| `refactor:` | Behavior-neutral restructure | Changed (optional) |
| `docs:` | Docs only | Changed (optional) |
| `chore:` | Maintenance | Often hidden |
| `ci:` / `test:` / `build:` | Tooling | Often hidden |

Breaking: `feat!:` / `fix!:` or footer `BREAKING CHANGE: …` → major bump
(after 1.0; with `bump-minor-pre-major`, pre-1.0 may still minor — match tool config).

## PR title > body

With squash-merge, the **PR title** becomes the release subject. Put the type
in the title, not only in individual commits.

## Example titles

- `feat: add Azure DevOps changelog pipeline template`
- `fix: allow Actions to open release PRs`
- `docs: clarify bootstrap tag steps`
- `chore: bump devcontainer base image`

# Releases — ADSK

Releases are automated with [release-please](https://github.com/googleapis/release-please) from [Conventional Commits](https://www.conventionalcommits.org/) on `main`.

| Artifact | Role |
|----------|------|
| `.github/workflows/release-please.yml` | Runs on push to `main` |
| `release-please-config.json` | `simple` release type → `CHANGELOG.md` + `version.txt` |
| `.release-please-manifest.json` | Last released version |
| `version.txt` | Current semver (updated by release PRs) |
| `CHANGELOG.md` | Generated/updated by the Release PR |

## Day-to-day (after bootstrap)

1. Merge PRs to `main` with Conventional Commit **PR titles** (squash-merge) or commit messages: `feat:`, `fix:`, `docs:`, `chore:`, etc. Breaking changes: `feat!:` or a `BREAKING CHANGE:` footer.
2. release-please opens/updates a **Release PR** that bumps version, refreshes `CHANGELOG.md` / `version.txt`, and lists commits since the last tag.
3. Maintainers review that PR (adopter-facing wording), then merge it.
4. Merge creates the GitHub Release and `vX.Y.Z` tag.

User-visible skill or adopter-path changes should use `feat` / `fix` (not only `chore`) so they appear in the changelog.

## Bootstrap — first public tag (v0.1.0)

Do this **once** before relying on automation for later versions. Manifest and `version.txt` already say `0.1.0`.

- [ ] GitHub repository is **`agentic-development-starter-kit`**
- [ ] Local remote matches (`git remote -v`)
- [ ] README clone URLs resolve
- [ ] `CHANGELOG.md` `[0.1.0]` section is accurate
- [ ] Symlinks under `.agents/skills/` and `.cursor/skills/` resolve (`./scripts/sync-adsk.sh kit`)
- [ ] `./scripts/sync-adsk.sh self-check` passes
- [ ] `./scripts/check-skills-ci.sh` (and `--self-test`) passes — Tier 1 skill gates
- [ ] Spot-check thin commands still point at skills
- [ ] `docs/using-adsk.md` adopt/update steps match the layout (incl. sync script)
- [ ] Adopter product contract consistent: `docs/product/create-adsk.md` ↔ `profiles.json` ↔ `.cursor/docs/specs/create-adsk.md` (and using-adsk direction callout)
- [ ] (Ops) After first green `skills-ci` run on `main`, optionally mark **skills-ci / tier1** as a **required** status check in branch protection — do **not** require `skills-evals-soft`

```bash
git tag -a v0.1.0 -m "v0.1.0 — The Agentic Development Starter Kit (ADSK)"
git push origin main
git push origin v0.1.0
```

Create a GitHub Release from the tag (or paste the `[0.1.0]` section from `CHANGELOG.md`). After this tag exists, later versions come from merging Release PRs only.

## Permissions note

The workflow uses `GITHUB_TOKEN` with `contents` + `pull-requests` write. If Release PRs fail to open in an org repo, allow Actions to create PRs or use a PAT per [release-please-action credentials](https://github.com/googleapis/release-please-action#github-credentials).

## Optional next

- Publish/list on [skills.sh](https://skills.sh) via `npx skills`
- Run Tier 2 with_skill vs without_skill iterations (see `docs/evaluating-skills.md`) and fill numeric deltas in `docs/evals/SCORECARD.md`
- Add enterprise adoption docs (governance / allowlist) if targeting large orgs next

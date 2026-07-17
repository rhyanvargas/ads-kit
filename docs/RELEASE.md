# Release notes — preparing v0.1.0

Maintainer checklist for the first ADSK public release.

## Before tagging

- [ ] GitHub repository renamed to **`agentic-development-starter-kit`**
- [ ] Local remote updated (`git remote -v` shows the new URL)
- [ ] README clone URLs resolve
- [ ] `CHANGELOG.md` `[0.1.0]` section is accurate
- [ ] Symlinks under `.agents/skills/` and `.cursor/skills/` resolve to `skills/`
- [ ] Spot-check thin commands still point at skills
- [ ] `docs/using-adsk.md` adopt/update steps still match the layout

## Tag (when ready)

```bash
git tag -a v0.1.0 -m "v0.1.0 — The Agentic Development Starter Kit (ADSK)"
git push origin main
git push origin v0.1.0
```

Create a GitHub Release from the tag; paste the `[0.1.0]` section from `CHANGELOG.md`.

## Optional next

- Publish/list on [skills.sh](https://skills.sh) via `npx skills`
- Run first eval iteration and fill numeric deltas in `docs/evals/SCORECARD.md`
- Add enterprise adoption docs (governance / allowlist) if targeting large orgs next

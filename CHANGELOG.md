# Changelog

All notable changes to **The Agentic Development Starter Kit (ADSK)** are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

Changelog entries for tagged releases are produced by [release-please](https://github.com/googleapis/release-please) from Conventional Commits (see [docs/RELEASE.md](docs/RELEASE.md)). Prefer `feat:` / `fix:` PR titles for adopter-visible work over editing this file by hand.

### Added

- First-party skill `readme-authoring` — audience-aware, evidence-grounded README create/update/review (patterns absorbed from upstream README skills; not vendored); `/update-readme` invokes it
- release-please workflow (`simple` type) — Conventional Commits → Release PR → tag + `CHANGELOG.md` / `version.txt`
- [docs/product-value-loop.md](docs/product-value-loop.md) — Discover → Research → Prioritize → Plan → Execute playbook for optional upstream product skills
- `recommended-skills.json` optional entries: wondelai product pack, deanpeters PM planning, Anthropic `competitive-intelligence`
- Project-level `.agents/skills/` symlinks → `skills/` (agentskills.io cross-client discovery)
- Adopter guide: [docs/using-adsk.md](docs/using-adsk.md)
- First-party skill `skill-optimizer` — clarity / trigger / token optimization playbook for kit + adopters
- Cursor rule `.cursor/rules/skill-authoring/` and command `/optimize-skill`
- [`scripts/sync-adsk.sh`](scripts/sync-adsk.sh) — `kit` (discovery symlinks), `adopter` (Cursor sync + path translate + skills CLI), `self-check`
- Cursor command `/sync-adsk` — agents run the sync script (kit or adopter); docs spell out ask-agent flows for both audiences

### Changed

- Adopter path is CLI-first: `npx skills add` / `npx skills update`; app skills live in `.agents/skills/` (no root `skills/` in consumer apps)
- README / AGENTS.md separate **kit package layout** (`skills/`) from **adopter layout** (`.agents/skills/`)
- [docs/using-adsk.md](docs/using-adsk.md) / [docs/upgrading.md](docs/upgrading.md): Cursor updates via `sync-adsk.sh adopter` (not manual `cp` alone)
- `spec-driven-workflow`: gated procedure, assumption surfacing, success-criteria reframing, living-spec guidance (patterns absorbed from high-adoption upstream SDD skills; not vendored); leaner activation body and tighter description boundaries
- `devops-strategy-facilitator`: clearer near-miss description boundaries; trigger eval set expanded to ~20 queries
- [docs/skill-authoring.md](docs/skill-authoring.md) / [docs/using-adsk.md](docs/using-adsk.md): optimization gates required for new skills
- `recommended-skills.json` `do_not_add.overlapping-sdd` lists reviewed upstream SDD skills and absorbed patterns
- `recommended-skills.json`: remove optional `crafting-effective-readmes`; add `do_not_add.overlapping-readme` (use first-party `readme-authoring`)

### Planned

- GitHub repository rename to `agentic-development-starter-kit` (maintainer action)
- Optional skills.sh listing
- First-party or pinned skills for security review and deeper observability (lifecycle gaps)

## [0.1.0] — 2026-07-17

### Added

- Apache-2.0 `LICENSE`, `NOTICE`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`
- GitHub issue/PR templates and `.gitignore`
- Portable skills source of truth under `skills/` with `.cursor/skills` relative symlinks
- First-party skills: `spec-driven-workflow`, `devops-strategy-facilitator`
- Skill eval harness files (`evals/evals.json`, trigger query sets)
- Docs: skill authoring, evaluating skills, scorecard, lifecycle coverage, upgrading
- `recommended-skills.json` for pinned upstream packs (Superpowers, find-skills, skill-creator)
- ADSK branding across README / AGENTS.md / Cursor README

### Changed

- Cursor commands thinned to invoke skills instead of duplicating playbooks
- DevOps strategy template moved into skill `references/`
- Brownfield workflow reference filled in
- Project rule text updated for ADSK naming

### Removed

- Duplicated skill trees under `.cursor/skills/**` (replaced by symlinks)

### Migration notes (from `rhyan-cursor-docs`)

1. Rename the GitHub repo to `agentic-development-starter-kit` and update `git remote`
2. Ensure consumer projects copy both `skills/` and `.cursor/` (or install via `npx skills add`)
3. Re-link `.cursor/skills/<name>` → `../../skills/<name>` if upgrading an old copy
4. Install recommended upstream skills separately if you relied on local hub copies

[Unreleased]: https://github.com/rhyanvargas/agentic-development-starter-kit/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/rhyanvargas/agentic-development-starter-kit/releases/tag/v0.1.0

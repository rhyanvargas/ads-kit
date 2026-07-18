# create-adsk — adopter CLI

## Overview

Ship `npx create-adsk` so app teams can adopt ADSK as a **versioned profile** (skills via the skills CLI + optional Cursor wiring via existing adopter sync), without competing with skills.sh as a marketplace.

Product contract: [`docs/product/create-adsk.md`](../../../docs/product/create-adsk.md).  
Profiles: [`profiles.json`](../../../profiles.json).

**Status:** Spec for planned CLI. This bake-in slice lands the contract only; implementation is a later `/plan-impl`.

## Assumptions

- [x] Package name / bin: `create-adsk` (invoked as `npx create-adsk`)
- [x] Skill transport remains `npx skills add|update` against `rhyanvargas/agentic-development-starter-kit`
- [x] Cursor sync reuses [`scripts/sync-adsk.sh`](../../../scripts/sync-adsk.sh) `adopter` (or a thin port with the same flags/behavior)
- [x] Four profiles and defaults match `profiles.json` exactly
- [x] Kit-maintainer `kit` mode stays out of the CLI

## Requirements

### Functional

- [ ] REQ-001: `npx create-adsk` (and `init`) interactively selects a profile from `profiles.json` (`core` | `delivery` | `maintainer` | `skills-only`) — not a free-form multi-select of arbitrary skills.
- [ ] REQ-002: After profile choice, optionally prompt to add product-value-loop packs (`optional_packs` in `profiles.json`); default is No.
- [ ] REQ-003: Skill installation shells out to `npx skills add` with `--skill` flags for the profile’s skill list (and `-y` / non-interactive when `--yes`).
- [ ] REQ-004: When profile `cursor` is `commands`, sync Cursor commands into the target app (path rewrite to `.agents/skills/<name>`), reusing adopter sync behavior.
- [ ] REQ-005: When profile `rules` is `stock`, add stock rules add-if-missing (same set as `sync-adsk.sh`); never overwrite existing rules unless `--force-rules`.
- [ ] REQ-006: When profile is `skills-only` (`cursor: none`), perform no `.cursor/commands` or `.cursor/rules` writes.
- [ ] REQ-007: Write `.adsk/config.json` with at least: `version`, `profile`, `cursor`, `rules`, `scope`, `kitRef`, `optionalPacks`.
- [ ] REQ-008: `npx create-adsk update` refreshes skills and re-syncs Cursor artifacts according to the saved config (skip Cursor when `cursor` is `none`).
- [ ] REQ-009: `npx create-adsk status` prints installed profile, kit ref, cursor/rules mode, and obvious drift (e.g. missing skills from profile).
- [ ] REQ-010: Support `--yes` (non-interactive defaults), `--dry-run`, and `--scope project|global` (default project).
- [ ] REQ-011: Non-interactive profile selection via `--profile <id>` for CI/scripts.

### Non-Functional

- [ ] REQ-012: Must not implement a third-party or registry skill browser.
- [ ] REQ-013: Must not expose `sync-adsk.sh kit` (maintainer symlink mode).
- [ ] REQ-014: Docs and CLI help state the two-tool model (skills = folders; create-adsk = kit profile).

## Acceptance Criteria

- Given a clean app repo, when the user runs `npx create-adsk --profile delivery --yes`, then the three delivery skills are installed under `.agents/skills/`, Cursor stock commands are present with `.agents/skills/` paths, `.adsk/config.json` records `delivery`, and no third-party catalog was shown.
- Given `skills-only`, when init completes, then first-party skills are installed and `.cursor/commands` was not created/updated by create-adsk.
- Given an existing `.adsk/config.json`, when the user runs `update`, then skills refresh and Cursor re-sync matches the saved profile without requiring a manual kit clone path from the user.
- Given the question “why not just npx skills?”, when reading CLI/README help, then the answer is kit profile + Cursor wiring in one command — not “a menu of skills.”

## Test Strategy

- REQ-001–011: CLI integration tests (temp dir fixture) asserting skills CLI args, Cursor file presence/absence, and config shape — **when CLI is implemented**.
- REQ-012–014: Review / golden help text assertions.
- **This bake-in slice (docs only):** No executable tests. Verify by inspection that `profiles.json` skill lists match this spec’s profile table and `docs/product/create-adsk.md`. Smoke: `./scripts/sync-adsk.sh self-check`.

**No tests needed because…** this change set is documentation, JSON contract, and Cursor rules only (non-behavioral for runtime code).

## Boundaries

- Always: Read profiles from `profiles.json`; wrap skills CLI; wrap adopter sync for Cursor.
- Ask first: Changing profile skill membership; renaming the npm package.
- Never: Skill marketplace UX; kit symlink mode; inventing skill lists that diverge from `profiles.json`.

## Constraints

- Reuse adopter flags/behavior where applicable: `--commands-only`, `--skip-skills`, `--rules`, `--force-rules`, `--dry-run`, `--from` / kit ref resolution.
- Do not overwrite adopter specs/plans content (same as current sync script).
- Keep `recommended-skills.json` as the source for optional upstream packs.

## Open for implementation plan

- npm package layout (repo-root bin vs `packages/create-adsk`)
- Whether to vendor Cursor artifacts at publish time or fetch kit ref at runtime
- Exact skills CLI flags for selective add across CLI versions

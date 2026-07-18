---
description: "Adopter product direction — create-adsk profiles, not a skills marketplace"
alwaysApply: true
---

# Adopter product constraints (ADSK)

Adopter UX must follow the product contract. Do not invent a skill-marketplace installer.

## Sources of truth

| Artifact | Path |
|----------|------|
| Product contract | `docs/product/create-adsk.md` |
| Profile matrix | `profiles.json` |
| Living spec | `.cursor/docs/specs/create-adsk.md` |
| Interim adopter guide | `docs/using-adsk.md` |

## Non-negotiables

- **create-adsk** (planned) = kit **profile** adoption (skills + Cursor wiring + `.adsk/config.json`).
- **`npx skills`** = skill transport only. create-adsk wraps it; never reimplements install.
- Primary UX is **named profiles** from `profiles.json` (core / delivery / maintainer / skills-only), not multi-select skill menus or third-party catalogs.
- Optional product-value-loop packs are a separate yes/no from `recommended-skills.json` — not mixed into a free-form picker.
- Cursor commands default **on** for core / delivery / maintainer; **skills-only** writes no `.cursor/` artifacts.

## Forbidden

- Framing create-adsk as “skills.sh with a nicer menu”
- Interactive discovery/install of arbitrary GitHub or registry skills inside create-adsk
- Putting `sync-adsk.sh kit` (maintainer symlink mode) behind the adopter CLI
- Changing adopter install docs to a different skill set than `profiles.json` without updating the contract + profiles + spec together

## Required when changing adopter path

Update in the same change:

1. `docs/product/create-adsk.md`
2. `profiles.json`
3. `.cursor/docs/specs/create-adsk.md`
4. Pointers in `docs/using-adsk.md` / README as needed

## Modes (do not confuse)

| Mode | Audience | Mechanism |
|------|----------|-----------|
| **Kit** | Maintainers of this repo | `./scripts/sync-adsk.sh kit` |
| **Adopter (interim)** | App teams today | `npx skills` + `sync-adsk.sh adopter --from <kit>` |
| **Adopter (north star)** | App teams after CLI ships | `npx create-adsk` reading `profiles.json` |

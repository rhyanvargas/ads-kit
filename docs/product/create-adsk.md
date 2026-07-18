# Product contract — create-adsk

Single source of truth for ADSK’s **adopter product**. Agents and contributors must align adopter UX with this document and [`profiles.json`](../../profiles.json). Living requirements: [`.cursor/docs/specs/create-adsk.md`](../../.cursor/docs/specs/create-adsk.md).

**Status:** Direction locked. CLI (`npx create-adsk`) is **planned** — not shipped. Interim adopter path: [`docs/using-adsk.md`](../using-adsk.md) (`npx skills` + `sync-adsk.sh adopter`).

---

## Job

> When I’m starting or standardizing agentic work in an app repo, I want to adopt a proven spec→ship kit with optional Cursor slash commands, so I can get a consistent team workflow without assembling skills, commands, and sync scripts myself.

## One-liner

**Repo adopter for the Agentic Development Starter Kit** — workflow + Cursor wiring + versioned profile. Not a skills marketplace.

## Two-tool model

| Tool | Owns | Does not own |
|------|------|----------------|
| **`npx skills`** (skills.sh) | Discover, install, update skill folders into `.agents/skills/` | Cursor commands/rules, ADSK profiles, kit trust policy |
| **`npx create-adsk`** (planned) | Apply an ADSK **profile** (skills + Cursor + config), update/status | Third-party skill catalog, kit-maintainer symlink sync |

**README answer:** Use `npx skills` to install skill folders. Use `npx create-adsk` when you want ADSK’s workflow + Cursor commands adopted as a versioned profile in your repo.

create-adsk **wraps** `npx skills` and [`scripts/sync-adsk.sh`](../../scripts/sync-adsk.sh) `adopter`. It must not reimplement skill install.

---

## Profiles

Machine-readable source: [`profiles.json`](../../profiles.json).

| Profile | Skills | Cursor default | Rules default |
|---------|--------|----------------|---------------|
| **core** | `spec-driven-workflow` | Commands | None |
| **delivery** | Core + `devops-strategy-facilitator` + `release-automation` | Commands | None |
| **maintainer** | Delivery + `skill-optimizer` + `readme-authoring` | Commands | Stock |
| **skills-only** | All five first-party | None (no `.cursor/` writes) | None |

Optional second prompt (default **No**): add recommended **product-value-loop** upstream packs from [`recommended-skills.json`](../../recommended-skills.json). Never mixed into a free-form skill picker.

---

## Hard product rules

1. Differentiate by **kit adoption**, not skill installation.
2. Always shell out to the skills CLI for skill bytes; own only Cursor sync, profile, and pin.
3. Default Cursor commands **ON** for core / delivery / maintainer. Skills-only exists for honesty.
4. Persist `.adsk/config.json` (profile, cursor mode, kit ref, scope) so `update` is deterministic.
5. Do **not** reinvent discovery, global skill search, or “install any GitHub skill.” Point to skills.sh / `find-skills` for that.
6. **Kill criteria:** If the demo cannot answer “why not `npx skills`?” in one sentence without mentioning menus, cut scope.

---

## Non-goals

- Interactive multi-select of every first-party skill as the primary UX
- Competing with skills.sh discovery or hosting arbitrary third-party skills
- Kit-maintainer `sync-adsk.sh kit` mode behind `npx create-adsk`
- Replacing the interim agent `/sync-adsk` flow before the CLI ships

---

## Success metrics

- Time-to-first `/draft-spec` (or equivalent) in a fresh app under 2 minutes (after CLI ships)
- Adopters who want Cursor commands get them without a manual kit clone (~100% for non–skills-only)
- Support questions about “which path do I clone?” → near zero
- Non-goal: skills.sh download share

---

## Interim path (until CLI ships)

1. `npx skills add rhyanvargas/agentic-development-starter-kit` (optionally with `--skill` flags matching a profile)
2. Optional Cursor: kit checkout → `scripts/sync-adsk.sh adopter --from <kit>`

See [using-adsk.md](../using-adsk.md). After create-adsk ships, that CLI becomes the recommended first-time adopt path; skills-only users may still use `npx skills` alone.

# Engineering methods pack

Optional ADSK **workflow pack**: pin a Superpowers subset and use it **inside** the spec→ship spine — not a second “development” catalog.

**Pack id:** `engineering-methods`  
**Profiles model:** [product/profiles-and-packs.md](product/profiles-and-packs.md)  
**Pins:** [`recommended-skills.json`](../recommended-skills.json) (`id`: `engineering-methods`)

---

## Job

> When implementing from an ADSK spec/plan, I want TDD, systematic debugging, and granular planning habits enforced — without installing every Superpowers skill or inventing a competing SDD stack.

## Skills in this pack

| Skill | Role in ADSK flow |
|-------|-------------------|
| `writing-plans` | Granular task style under `/plan-impl` (after spec is solid) |
| `test-driven-development` | Red→green→refactor during `/implement-spec` |
| `systematic-debugging` | Root-cause loops when verify fails or behavior is wrong |

Upstream source: [`obra/superpowers`](https://github.com/obra/superpowers). Full Superpowers (brainstorming, code-review, …) remains listed under `recommended` if you want the wider tree; this pack is the **team-default subset**.

## Stage map (orchestration)

```text
/draft-spec  →  /plan-impl (+ writing-plans)  →  /implement-spec (+ TDD)
                                                      ↓ fail?
                                            systematic-debugging
                                                      ↓
                                                 /review
```

| Stage | ADSK entrypoint | Pack skill |
|-------|-----------------|------------|
| Specify | `/draft-spec` | — (first-party `spec-driven-workflow`) |
| Plan | `/plan-impl` | Prefer `writing-plans` for bite-sized tasks once the living spec is accepted |
| Implement | `/implement-spec` | `test-driven-development` before production code |
| Unstick | during implement / verify | `systematic-debugging` before guessing fixes |
| Review | `/review` | ADSK review against spec (optional: upstream code-review skills outside this pack) |

## Exclusions

Do **not** add overlapping SDD / “spec-driven” packs that replace ADSK `spec-driven-workflow` — see `do_not_add.overlapping-sdd` in [`recommended-skills.json`](../recommended-skills.json).

Do **not** treat this pack as a skills.sh Testing topic clone. It is a **versioned team contract** wired to ADSK commands.

## Install

### Via create-adsk (recommended)

```bash
# Interactive: choose profile, then toggle engineering-methods in packs
npx create-adsk

# Non-interactive
npx create-adsk --profile core --yes --packs engineering-methods
```

All packs: `--with-optional-packs` (includes product-value-loop + engineering-methods).

### Manual (skills CLI)

**Project-local (team):**

```bash
npx skills add obra/superpowers \
  --skill writing-plans \
  --skill test-driven-development \
  --skill systematic-debugging \
  -y
```

**Global (personal):**

```bash
npx skills add obra/superpowers \
  --skill writing-plans \
  --skill test-driven-development \
  --skill systematic-debugging \
  -g -y
```

Trust-review and pin before enterprise rollout (see `trust_policy` in recommended-skills.json). Superpowers may assume paths like `docs/superpowers/` — adapt to your repo layout.

## Done when

- `/implement-spec` runs with a failing test first for behavioral changes  
- Plan tasks are small enough to verify independently  
- Debug sessions follow systematic-debugging before shotgun fixes  
- `.adsk/config.json` lists `engineering-methods` under `optionalPacks` when adopted via create-adsk  

## Related

- [product-value-loop.md](product-value-loop.md) — product discovery pack (orthogonal)  
- [product/for-eng-leads.md](product/for-eng-leads.md) — team adoption pitch  
- [using-adsk.md](using-adsk.md) — adopter install  

# Product value loop (recommended workflow)

How to use **recommended upstream product skills** with ADSK’s first-party execution spine so teams discover real customer problems, research the market, prioritize honestly, plan outcomes, then ship with specs — and repeat.

These skills are **not** first-party ADSK packages. They are pinned recommendations in [`recommended-skills.json`](../recommended-skills.json). Install them into your app’s `.agents/skills/` after trust review (or select the **`product-value-loop`** pack in `npx create-adsk`). Do not vendor their trees into this kit’s `skills/` package source. Pack model: [product/profiles-and-packs.md](product/profiles-and-packs.md).

---

## The loop

```text
Discover → Research → Prioritize → Plan → Execute → (measure) → Discover
```

| Stage | Outcome | Skills |
|-------|---------|--------|
| **Discover** | Evidence of customer jobs, pains, and past behavior | `mom-test`, `continuous-discovery`, `jobs-to-be-done`, `inspired-product` |
| **Research** | Competitor moves, table-stakes vs differentiation | `competitive-intelligence` |
| **Prioritize** | Ranked opportunities (problems), not a feature wish list | `inspired-product`, `continuous-discovery` (OST), `prioritization-advisor` |
| **Plan** | Aligned strategy + outcome-based roadmap | `product-strategy-session`, `roadmap-planning`, Superpowers `writing-plans` |
| **Execute** | Spec → plan → implement → review | ADSK `spec-driven-workflow` (+ TDD / debugging from Superpowers) |

`inspired-product` is the **spine for product thinking** (dual-track discovery/delivery, four risks, opportunity assessment, vision). ADSK `spec-driven-workflow` is the **spine for engineering delivery**.

---

## Best-scenario walkthrough

Use this when you have a fuzzy product idea, stakeholder pressure for features, or a roadmap that is mostly a date-locked backlog.

### 1. Discover — talk about their life, not your idea

1. Activate **`mom-test`**. Plan interviews that ask about past behavior and specifics; avoid pitching.
2. Frame needs with **`jobs-to-be-done`** (job, circumstance, success criteria).
3. Keep a weekly cadence with **`continuous-discovery`** (product trio; Opportunity Solution Tree).
4. Score the practice with **`inspired-product`** (value / usability / feasibility / viability risks).

**Done when:** you can name the top customer problems from direct evidence, not opinions.

### 2. Research — competitors against the same opportunities

1. Activate **`competitive-intelligence`** for the opportunities under consideration.
2. Separate table-stakes (must match) from differentiation (where you win).
3. Feed findings into opportunity assessment — do not copy competitor feature lists into the roadmap.

**Done when:** each high-priority opportunity has a short note on market context and competitive risk.

### 3. Prioritize — problems and outcomes first

1. Map **outcome → opportunities → solutions → experiments** (`continuous-discovery` / OST).
2. Run **`inspired-product`** opportunity assessment (severity, business alignment, readiness).
3. Facilitate tradeoffs with **`prioritization-advisor`** when stakeholders disagree.

**Done when:** the next slice of work is a validated *problem to solve* (or experiment), not “build feature X by date Y.”

### 4. Plan — strategy and an honest roadmap

1. Run **`product-strategy-session`** when positioning, ICP, or roadmap visions conflict.
2. Sequence work with **`roadmap-planning`** (outcomes / problems over promised features).
3. For implementation sequencing, use Superpowers **`writing-plans`** (or ADSK `/plan-impl` once a spec exists).

**Done when:** stakeholders share one outcome-based roadmap and clear success metrics.

### 5. Execute — ADSK delivery

Only after discovery evidence is strong enough to invest:

1. `/draft-spec` → `/plan-impl` → `/implement-spec` → `/review` via **`spec-driven-workflow`**.
2. Pair with **`test-driven-development`** and **`systematic-debugging`** as needed.
3. Instrument the release so learnings return to Discover (`inspired-product` continuous delivery guidance).

**Done when:** a small, measurable increment ships and feeds the next discovery cycle.

---

## Install

| Scope | Where skills land | When to use |
|-------|-------------------|-------------|
| **Project-local** (recommended for teams) | `<app>/.agents/skills/` | Share with the repo; commit after trust review |
| **Global** (`-g`) | `~/.agents/skills/` | Personal use across all projects |

Do **not** install these into the ADSK kit repo’s discovery tree for commit — kit `.agents/skills/` stays first-party symlinks only. Install in your **app**, or use `-g` for yourself.

### Project-local (app root)

```bash
# Discover / prioritize (wondelai)
npx skills add wondelai/skills \
  --skill inspired-product \
  --skill mom-test \
  --skill continuous-discovery \
  --skill jobs-to-be-done \
  -y

# Plan (deanpeters)
npx skills add deanpeters/product-manager-skills \
  --skill product-strategy-session \
  --skill roadmap-planning \
  --skill prioritization-advisor \
  -y

# Research (Anthropic)
npx skills add anthropics/knowledge-work-plugins \
  --skill competitive-intelligence \
  -y
```

### Global (all your projects)

Same packs with `-g`:

```bash
npx skills add wondelai/skills \
  --skill inspired-product \
  --skill mom-test \
  --skill continuous-discovery \
  --skill jobs-to-be-done \
  -g -y

npx skills add deanpeters/product-manager-skills \
  --skill product-strategy-session \
  --skill roadmap-planning \
  --skill prioritization-advisor \
  -g -y

npx skills add anthropics/knowledge-work-plugins \
  --skill competitive-intelligence \
  -g -y
```

Also install ADSK first-party skills if you have not already:

```bash
npx skills add rhyanvargas/agentic-development-starter-kit      # project
npx skills add rhyanvargas/agentic-development-starter-kit -g   # global
```

Optional engineering habits: Superpowers pack in [`recommended-skills.json`](../recommended-skills.json).

Restore from lockfile after clone (**in your app**, when you committed `skills-lock.json` there — not in the ADSK kit repo):

```bash
npx skills experimental_install
```

---

## Skill reference

| Skill | Source | Role in the loop |
|-------|--------|------------------|
| [inspired-product](https://skills.sh/wondelai/skills/inspired-product) | wondelai | Empowered teams, four risks, opportunity assessment, vision |
| [mom-test](https://skills.sh/wondelai/skills/mom-test) | wondelai | Customer conversations that elicit truth |
| [continuous-discovery](https://skills.sh/wondelai/skills/continuous-discovery) | wondelai | Weekly discovery + Opportunity Solution Trees |
| [jobs-to-be-done](https://skills.sh/wondelai/skills/jobs-to-be-done) | wondelai | Job-centric framing of value |
| [competitive-intelligence](https://skills.sh/anthropics/knowledge-work-plugins/competitive-intelligence) | anthropics | Structured competitor research |
| [product-strategy-session](https://skills.sh/deanpeters/product-manager-skills/product-strategy-session) | deanpeters | End-to-end strategy alignment |
| [roadmap-planning](https://skills.sh/deanpeters/product-manager-skills/roadmap-planning) | deanpeters | Outcome-oriented roadmaps |
| [prioritization-advisor](https://skills.sh/deanpeters/product-manager-skills/prioritization-advisor) | deanpeters | Facilitation for hard tradeoffs |
| `spec-driven-workflow` | ADSK (first-party) | Spec → plan → implement → review |

---

## PRD vs engineering spec

| Need | Use |
|------|-----|
| Customer evidence, opportunity trees, strategy, outcome roadmaps | This loop (wondelai / deanpeters / competitive-intel) |
| Executable engineering requirements (`REQ-XXX`), living specs, implement/review | ADSK `spec-driven-workflow` |
| Granular TDD implementation plans | [`engineering-methods`](engineering-methods.md) (`writing-plans`) |

Do **not** install Matt Pocock `to-prd` / `to-spec` for “product requirements.” Those skills synthesize the current chat into issue-tracker tickets — a different job from discovery PRDs, and they collide with ADSK SDD triggers/paths (`do_not_add.overlapping-sdd`).

## Trust notes

- Prefer install counts, maintainer reputation, and a human review of each `SKILL.md` before team rollout ([lifecycle trust criteria](lifecycle-coverage.md#trust-criteria)).
- `competitive-intelligence` may show elevated automated risk scores (network/research behavior). Review before production use.
- Do **not** install overlapping generic “spec-driven development” packs alongside ADSK SDD — see `do_not_add` in [`recommended-skills.json`](../recommended-skills.json) (includes `to-prd` / `to-spec` / `to-tickets`, Addy SDD, Warp SDD).

## Related

- [lifecycle-coverage.md](lifecycle-coverage.md) — stage map
- [engineering-methods.md](engineering-methods.md) — Superpowers plan/TDD complement
- [using-adsk.md](using-adsk.md) — install / sync
- [recommended-skills.json](../recommended-skills.json) — machine-readable pins

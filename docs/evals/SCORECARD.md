# ADSK skill scorecard

Decision aid for adopters: which skills to keep, treat as optional, or skip.

Scoring axes (1–5): **Fit** (lifecycle value), **Portability**, **Clarity**, **Trust**, **Eval readiness**.

## First-party skills

| Skill | Fit | Portability | Clarity | Trust | Eval readiness | Disposition | Notes |
|-------|-----|-------------|---------|-------|----------------|-------------|-------|
| `spec-driven-workflow` | 5 | 5 | 4 | 5 (in-repo Apache-2.0) | 4 (cases defined; run locally) | **Keep (core)** | Kit spine: specify → plan → implement → review + brownfield |
| `devops-strategy-facilitator` | 4 | 5 | 5 | 5 | 4 (cases defined; run locally) | **Keep** | Decision-first strategy sessions; not a full SRE pack |
| `release-automation` | 5 | 5 | 5 | 5 | 4 (cases defined; run locally) | **Keep** | Platform-confirmed changelog/semver (GitHub release-please or Azure + git-cliff) |
| `skill-optimizer` | 5 | 5 | 5 | 5 | 4 (cases defined; run locally) | **Keep** | Author/optimize skills; required gate for new skills |
| `readme-authoring` | 4 | 5 | 5 | 5 (in-repo Apache-2.0) | 4 (cases + npm CLI Quick Start pattern) | **Keep** | Audience-aware + evidence-grounded README craft; OSS Quick Start patterns in `references/quick-start-patterns.md` |

### How to interpret “Eval readiness”

Cases and assertions live under each skill’s `evals/`. Published **with vs without** numeric deltas appear here after a **Tier 2** run (see [docs/evaluating-skills.md](../evaluating-skills.md)); Tier 1 CI only checks harness integrity, not pass rates. Until Tier 2 numbers exist, treat readiness as “harness ready,” not “benchmarked on your model.”

### How to fill results from a Tier 2 package

1. Generate (or download the Actions artifact from **skills-evals-soft**):
   ```bash
   ./scripts/run-skill-evals-soft.sh
   # or one skill: ./scripts/run-skill-evals-soft.sh --skill skill-optimizer
   ```
2. Complete with/without runs and grade `eval-*/**/grading.json`.
3. Copy the **Aggregate** table from `.adsk-tier2-out/<skill>/scorecard-paste.md` into the template below (replace `_TBD_` for that skill).
4. Optionally bump **Eval readiness** to 5 and note the iteration date in **Notes**.

**Template for pasting run results:**

| Skill | Iteration | with_skill pass_rate | without_skill pass_rate | Δ pass_rate | Token Δ | Recommendation |
|-------|-----------|----------------------|-------------------------|-------------|---------|----------------|
| `skill-optimizer` | 1 | _TBD_ | _TBD_ | _TBD_ | _TBD_ | keep |
| `spec-driven-workflow` | 1 | _TBD_ | _TBD_ | _TBD_ | _TBD_ | keep |
| `devops-strategy-facilitator` | 1 | _TBD_ | _TBD_ | _TBD_ | _TBD_ | keep |

## Recommended upstream (not vendored)

| Source / skill | Fit | Trust signals | Coupling / risks | Disposition |
|----------------|-----|---------------|------------------|-------------|
| `obra/superpowers` (`writing-plans`, `test-driven-development`, `systematic-debugging`, …) | 5 for eng discipline | Very high adoption / public repo | May assume Superpowers paths (e.g. `docs/superpowers/`); pin and review updates | **Recommend (pinned)** |
| `vercel-labs/skills` → `find-skills` | 4 for discovery | Official Vercel Labs CLI ecosystem | Encourages registry installs — still apply trust checklist | **Recommend (pinned)** |
| `anthropics/skills` → `skill-creator` | 4 for maintainers/evals | Official Anthropic; Apache-2.0 | Maintainer-oriented; not required for every developer | **Recommend (maintainers)** |
| `anthropics/skills` → `frontend-design` | 3 (UI) | Official + high installs | UI craft only | **Optional** |
| Product value loop (wondelai / deanpeters / `competitive-intelligence`) | 5 for product teams | See per-source notes in `recommended-skills.json` | Install in **adopter apps** only; never vendor into kit | **Optional** — [product-value-loop.md](../product-value-loop.md) |
| Overlapping SDD skills (`to-spec`, other “spec-driven-development” packs) | — | Varies | Collides with first-party SDD | **Do not add** |
| Overlapping README skills (`crafting-effective-readmes`, `accelint-readme-writer`, …) | — | Varies | Collides with first-party `readme-authoring` | **Do not add** |

## Gaps (v1)

| Stage | Status |
|-------|--------|
| Secure (security review skill) | Not first-party yet — search via `find-skills` under org policy, or add later |
| Maintain / monitor (SRE) | Partial via DevOps observability questions only |

## Trust checklist (any upstream skill)

Before enabling in a company environment:

1. Source org / maintainer reputation  
2. License compatible with your policy  
3. Install/star signal (prefer well-known packs)  
4. Review `SKILL.md` + `scripts/` for exfiltration or credential prompts  
5. Pin version; re-review on upgrade  

See [`recommended-skills.json`](../../recommended-skills.json) and [lifecycle-coverage.md](../lifecycle-coverage.md).

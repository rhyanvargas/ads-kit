# ADSK skill scorecard

Decision aid for adopters: which skills to keep, treat as optional, or skip.

Scoring axes (1–5): **Fit** (lifecycle value), **Portability**, **Clarity**, **Trust**, **Eval readiness**.

## First-party skills

| Skill | Fit | Portability | Clarity | Trust | Eval readiness | Disposition | Notes |
|-------|-----|-------------|---------|-------|----------------|-------------|-------|
| `spec-driven-workflow` | 5 | 5 | 4 | 5 (in-repo Apache-2.0) | 5 (Tier 2 2026-07-24) | **Keep (core)** | Kit spine: specify → plan → implement → review + brownfield |
| `devops-strategy-facilitator` | 4 | 5 | 5 | 5 | 5 (Tier 2 2026-07-24) | **Keep** | Decision-first strategy sessions; not a full SRE pack; Δ=0 this run (assertions may be weak-signal) |
| `release-automation` | 5 | 5 | 5 | 5 | 5 (Tier 2 2026-07-24) | **Keep** | Platform-confirmed changelog/semver (GitHub release-please or Azure + git-cliff); strongest Δ this run |
| `skill-optimizer` | 5 | 5 | 5 | 5 | 5 (Tier 2 2026-07-24) | **Keep** | Author/optimize skills; required gate for new skills |
| `readme-authoring` | 4 | 5 | 5 | 5 (in-repo Apache-2.0) | 5 (Tier 2 2026-07-24) | **Keep** | Audience-aware + evidence-grounded README craft; Δ=0 this run |
| `pull-request-authoring` | 5 | 5 | 5 | 5 | 5 (Tier 2 2026-07-24) | **Keep** | Conventional Commits PR title/body via `gh` |
| `supply-chain-gate` | 5 | 5 | 5 | 5 | 5 (Tier 2 2026-07-24) | **Keep** | Socket / dependency merge triage |

### How to interpret “Eval readiness”

Cases and assertions live under each skill’s `evals/`. Published **with vs without** numeric deltas appear here after a **Tier 2** run (see [docs/evaluating-skills.md](../evaluating-skills.md)); Tier 1 CI only checks harness integrity, not pass rates. Until Tier 2 numbers exist, treat readiness as “harness ready,” not “benchmarked on your model.”

### How to fill results from a Tier 2 package

1. Generate (or download the Actions artifact from **skills-evals-soft**), or ask the agent **`/run-skill-evals`**:
   ```bash
   ./scripts/run-skill-evals-soft.sh
   # or one skill: ./scripts/run-skill-evals-soft.sh --skill skill-optimizer
   ```
2. Complete with/without runs and grade `eval-*/**/grading.json`.
3. Copy the **Aggregate** table from `.adsk-tier2-out/<skill>/scorecard-paste.md` into the template below (replace `_TBD_` for that skill).
4. Optionally bump **Eval readiness** to 5 and note the iteration date in **Notes**.

Adopters deciding keep/optional/replace: use the published table below; re-run only when you change the skill or model ([evaluating-skills.md](../evaluating-skills.md#adopters-first)).

**Tier 2 iteration 1 results** (2026-07-24; Cursor `agent` CLI ask-mode; isolated workspaces; LLM-graded assertions; token Δ n/a):

| Skill | Iteration | with_skill pass_rate | without_skill pass_rate | Δ pass_rate | Token Δ | Recommendation |
|-------|-----------|----------------------|-------------------------|-------------|---------|----------------|
| `devops-strategy-facilitator` | 1 | 1.0 (14/14) | 1.0 (14/14) | +0.0 | n/a | keep |
| `pull-request-authoring` | 1 | 0.917 (11/12) | 0.833 (10/12) | +0.084 | n/a | keep |
| `readme-authoring` | 1 | 0.941 (16/17) | 0.941 (16/17) | +0.0 | n/a | keep |
| `release-automation` | 1 | 1.0 (14/14) | 0.643 (9/14) | +0.357 | n/a | keep |
| `skill-optimizer` | 1 | 1.0 (14/14) | 0.929 (13/14) | +0.071 | n/a | keep |
| `spec-driven-workflow` | 1 | 1.0 (27/27) | 0.889 (24/27) | +0.111 | n/a | keep |
| `supply-chain-gate` | 1 | 0.923 (12/13) | 0.692 (9/13) | +0.231 | n/a | keep |

## Recommended upstream (not vendored)

| Source / skill | Fit | Trust signals | Coupling / risks | Disposition |
|----------------|-----|---------------|------------------|-------------|
| `obra/superpowers` (`writing-plans`, `test-driven-development`, `systematic-debugging`, …) | 5 for eng discipline | Very high adoption / public repo | May assume Superpowers paths (e.g. `docs/superpowers/`); pin and review updates | **Recommend (pinned)** |
| `vercel-labs/skills` → `find-skills` | 4 for discovery | Official Vercel Labs CLI ecosystem | Encourages registry installs — still apply trust checklist | **Recommend (pinned)** |
| `anthropics/skills` → `skill-creator` | 4 for maintainers/evals | Official Anthropic; Apache-2.0 | Maintainer-oriented; not required for every developer | **Recommend (maintainers)** |
| `anthropics/skills` → `frontend-design` | 3 (UI) | Official + high installs | UI craft only | **Optional** |
| Product value loop (wondelai / deanpeters / `competitive-intelligence`) | 5 for product teams | See per-source notes in `recommended-skills.json` | Install in **adopter apps** only; never vendor into kit | **Optional** — [product-value-loop.md](../product-value-loop.md) |
| Overlapping SDD skills (`to-prd`→`to-spec`, `to-tickets`, Addy/Warp SDD, `create-specification`) | — | Varies | Collides with first-party SDD; competing tracker spine | **Do not add** |
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

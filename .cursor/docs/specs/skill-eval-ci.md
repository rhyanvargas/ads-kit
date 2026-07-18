# Skill eval CI quality gates

## Overview

Add CI that keeps first-party skills **release-ready** by hard-gating deterministic quality checks on PRs, and by running optional scheduled/manual full with-vs-without evals as a soft quality signal — without blocking merges on flaky LLM pass rates until baselines exist.

Related: [docs/evaluating-skills.md](../../../docs/evaluating-skills.md), [docs/evals/SCORECARD.md](../../../docs/evals/SCORECARD.md), `skill-optimizer` gates.

## Assumptions

Confirmed from product direction discussion (correct before implement if wrong):

1. **Tier 1 (hard gate on PRs):** `skills-ref validate` + eval harness integrity (structure/schema + presence policy). No LLM agent runs on the PR critical path.
2. **Tier 2 (scheduled / `workflow_dispatch`):** Full with_skill vs without_skill evals are soft (report/artifact; may update SCORECARD); do not fail `release-please` or block merge in v1 of this work.
3. **Tier 3 (hard pass-rate gate):** Explicitly **out of scope** until flakiness/cost baselines exist.
4. Scope is **this kit repo’s** `skills/*/` first-party skills only (not adopter apps, not recommended upstream packs).
5. Workflows use GitHub Actions alongside existing [`.github/workflows/release-please.yml`](../../../.github/workflows/release-please.yml).

## Requirements

### Functional — Tier 1 (PR hard gate)

- [ ] REQ-001: On every `pull_request` and on `push` to `main` (no path filters — required check `tier1` must always report), a GitHub Actions workflow runs the Tier 1 checks and **fails the job** on any check failure.
- [ ] REQ-002: For every directory `skills/<name>/` that contains `SKILL.md`, CI runs `npx --yes skills-ref validate ./skills/<name>` (or equivalent pinned invoke) and fails if validation fails.
- [ ] REQ-003: For every first-party skill directory, CI asserts presence of:
  - `evals/evals.json` (valid JSON)
  - `evals/trigger/eval_queries.json` (valid JSON)
- [ ] REQ-004: CI validates `evals/evals.json` shape at minimum:
  - top-level `skill_name` is a non-empty string matching the folder name
  - `evals` is a non-empty array
  - each case has `id`, non-empty `prompt`, non-empty `expected_output`
  - each case has `assertions` as a non-empty array of non-empty strings
- [ ] REQ-005: CI validates `evals/trigger/eval_queries.json` shape at minimum:
  - is a JSON array
  - length ≥ 20 (matches skill-optimizer target; all current first-party skills already have n=20)
  - each entry has non-empty `query` string and boolean `should_trigger`
  - both `true` and `false` appear; neither class may be under 40% of the set (~50/50 with tolerance)
- [ ] REQ-006: CI asserts YAML frontmatter `name` in `SKILL.md` equals the skill folder name (lowercase/hyphens), matching skill-optimizer naming gate.
- [ ] REQ-007: Tier 1 checks are implemented as an invocable script under `scripts/` (e.g. `scripts/check-skill-evals.sh` or `scripts/check-skills-ci.sh`) so maintainers can run the same gate locally; CI only orchestrates the script.
- [ ] REQ-008: Document the local verify command in [`.cursor/rules/project-cmds/RULE.md`](../../../.cursor/rules/project-cmds/RULE.md) and mention it in [docs/evaluating-skills.md](../../../docs/evaluating-skills.md) and [docs/RELEASE.md](../../../docs/RELEASE.md) checklist.

### Functional — Tier 2 (scheduled / manual soft evals)

- [ ] REQ-009: A separate workflow (or separate job with `if`) supports `schedule` (e.g. weekly) and `workflow_dispatch`, and does **not** run on every PR by default.
- [ ] REQ-010: Tier 2 documents how to run full with_skill vs without_skill iterations (per evaluating-skills) and, when automation is feasible in v1, uploads results as a **workflow artifact** (grading/benchmark JSON or a summary markdown). If full agent automation is not feasible without secrets/productized harness, Tier 2 v1 may be a **documented manual runbook + artifact upload path** — but the workflow stub and docs must exist.
- [ ] REQ-011: Tier 2 failures (or missing API secrets) must **not** fail PR checks or block release-please. Soft signal only (job `continue-on-error: true` or separate non-required workflow).
- [ ] REQ-012: After a Tier 2 run (automated or manual), maintainers can paste pass-rate / token deltas into [docs/evals/SCORECARD.md](../../../docs/evals/SCORECARD.md) using the existing results template; docs state that SCORECARD numbers come from Tier 2, not Tier 1.

### Non-Functional

- [ ] REQ-013: Tier 1 completes in under ~3 minutes on `ubuntu-latest` for the current first-party skill count (no model API calls).
- [ ] REQ-014: Tier 1 requires no repository secrets.
- [ ] REQ-015: Workflows pin action major versions consistently with existing release-please style; Node version is explicit if needed for `npx`.

## Acceptance Criteria

- Given a PR that breaks `SKILL.md` validation, when Tier 1 CI runs, then the check fails and the PR cannot be considered green.
- Given a PR that removes `evals/evals.json` or empties assertions from a first-party skill, when Tier 1 CI runs, then the check fails.
- Given a PR that only changes docs or release metadata (no skill edits), when Tier 1 CI runs, then the job still runs and reports `tier1` (pass if harness intact).
- Given Tier 2 is triggered without model credentials, when the soft workflow runs, then it does not fail required PR status checks or release-please.
- Given a maintainer on a laptop, when they run the Tier 1 script from repo root, then they get the same pass/fail signal as CI.

## Test Strategy

- REQ-002–006: Unit/script tests or fixture-based checks against sample skill dirs (valid fixture passes; each mutation fails) — prefer a small `scripts/` test or `self-check` extension.
- REQ-001, REQ-007: Integration — run the script in CI dry-run / `act` optional; at minimum document and run once on `main` after merge.
- REQ-009–012: Manual verification of workflow triggers + that the workflow is not in the required PR gate set.
- REQ-008: Doc review — commands match script path.

**Minimum for implement-spec:** Add a local script that fails on a deliberately broken fixture (or `--self-test` mode) and passes on current `skills/*`.

## Boundaries

- Always: Gate deterministic harness integrity + `skills-ref validate` on skill-touching PRs; keep full LLM evals off the merge-critical path in v1.
- Ask first: Changing the trigger query hard floor; adding required status checks in GitHub branch protection; spending money on model APIs in Actions.
- Never: Block release-please on LLM pass-rate in this slice; run evals on skill *invocation* at runtime; vendor upstream skills into CI as first-party.

## Constraints

- Must not require changes to Agent Skills runtime / progressive disclosure model.
- Must align with skill-optimizer and CONTRIBUTING (“eval when you change behavior”).
- Generated eval workspaces remain gitignored (`*-workspace/`, `**/iteration-*/` per [`.gitignore`](../../../.gitignore)).
- Keep docs concise; link rather than duplicate evaluating-skills playbook.

## Out of Scope

- Tier 3: hard-gating merges/releases on with_skill pass-rate or Δ vs without_skill
- Automatic SCORECARD PRs from Tier 2 (nice-to-have later)
- Evaluating recommended upstream packs in `recommended-skills.json`
- create-adsk CLI work ([create-adsk.md](create-adsk.md))
- Runtime hooks that run evals when a skill activates

## Open Questions

1. **Path filter:** Also run Tier 1 when `scripts/check-skills-ci.sh` or the workflow file itself changes? *Default: yes.*
2. **Branch protection:** Spec delivers the workflow; enabling it as a **required** check in GitHub settings is a maintainer ops step (document in RELEASE.md), not automated by the workflow YAML alone.
3. **Tier 2 automation depth in v1:** Full agent loops in Actions vs runbook + artifact upload only? *Default: runbook + optional stub workflow first; automate agent loops only if secrets and harness are ready without blocking Tier 1.*

## Implementation notes (non-normative)

Suggested layout:

```text
.github/workflows/skills-ci.yml          # Tier 1 on PR / push paths
.github/workflows/skills-evals-soft.yml  # Tier 2 schedule + workflow_dispatch
scripts/check-skills-ci.sh               # REQ-007 local+CI entrypoint
```

Tier 1 job sketch: checkout → setup Node → `./scripts/check-skills-ci.sh`.

## Done when

- [x] Spec requirements above implemented or explicitly deferred with SCORECARD/docs notes
- [x] `./scripts/check-skills-ci.sh` passes on current tree
- [ ] Tier 1 workflow visible on a skill-touching PR _(verify after merge / on PR)_
- [x] project-cmds + evaluating-skills + RELEASE updated
- [x] Tier 3 still documented as future, not implemented

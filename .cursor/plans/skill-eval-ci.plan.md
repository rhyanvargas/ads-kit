---
name: Skill eval CI
overview: Add a local Tier 1 gate script (skills-ref + eval harness integrity), wire it into a path-filtered PR workflow, ship a soft Tier 2 stub + runbook, prove the script with --self-test fixtures, then point project-cmds / evaluating-skills / RELEASE at the new verify path.
todos:
  - id: T1
    content: "REQ-002–007 — scripts/check-skills-ci.sh (validate + presence/schema/frontmatter gates)"
    status: completed
  - id: T2
    content: "REQ-001,009–011,015 — skills-ci.yml (Tier 1) + skills-evals-soft.yml (Tier 2 stub)"
    status: completed
  - id: T3
    content: "Test strategy — --self-test fixtures (valid pass; mutations fail); script passes on skills/*"
    status: completed
  - id: T4
    content: "REQ-008,010,012 — project-cmds + evaluating-skills + RELEASE (+ SCORECARD Tier 2 note)"
    status: completed
isProject: false
---

# Skill eval CI — implementation plan

Spec: [`.cursor/docs/specs/skill-eval-ci.md`](../docs/specs/skill-eval-ci.md)

## Locked defaults (from open questions)

- Path filter includes `skills/**`, `scripts/check-skills-ci.sh`, and the Tier 1 workflow file.
- Branch protection “required check” is a post-merge ops step (document only).
- Tier 2 v1 = schedule/`workflow_dispatch` stub + runbook/artifact path; no LLM on PR critical path; no Tier 3.

## Requirements → tasks

| Requirement | Tasks |
|-------------|-------|
| REQ-002–007, 013–014 | T1 |
| REQ-001, 009–011, 015 | T2 |
| Test strategy (fixture / `--self-test`) | T3 |
| REQ-008, 010, 012 | T4 |
| REQ-003–006 (enforced by script) | T1, T3 |

## Tasks

### T1 — `scripts/check-skills-ci.sh`

Single entrypoint for local + CI (REQ-007):

1. Discover `skills/*/SKILL.md`.
2. Per skill: `npx --yes skills-ref validate ./skills/<name>` (REQ-002).
3. Presence: `evals/evals.json`, `evals/trigger/eval_queries.json` valid JSON (REQ-003).
4. Shape checks for both JSON files (REQ-004, REQ-005) — trigger n≥20, both classes, neither &lt;40%.
5. Frontmatter `name` == folder name (REQ-006).
6. Exit non-zero on first failure with a clear skill + check message; no secrets/API calls (REQ-014).

Prefer pure bash + `python3`/`jq` for JSON (whatever keeps the script small and dependency-light on `ubuntu-latest`).

### T2 — Workflows

Match release-please style (pinned major actions, explicit Node if needed — REQ-015):

| File | Role |
|------|------|
| [`.github/workflows/skills-ci.yml`](../../.github/workflows/skills-ci.yml) | Tier 1: `pull_request` + `push` to `main`, path filters; checkout → setup-node → `./scripts/check-skills-ci.sh`; **fail hard** (REQ-001). |
| [`.github/workflows/skills-evals-soft.yml`](../../.github/workflows/skills-evals-soft.yml) | Tier 2: `schedule` (weekly) + `workflow_dispatch` only; stub steps + pointer to runbook; `continue-on-error: true` or non-required workflow; optional `actions/upload-artifact` for a summary placeholder (REQ-009–011). |

Do not touch `release-please.yml` behavior.

### T3 — Fixtures / `--self-test`

Minimum per spec test strategy:

- `--self-test` (or small fixture tree under e.g. `scripts/fixtures/skill-ci/`) that:
  - **passes** a minimal valid skill dir
  - **fails** each class of mutation (bad validate surface, missing evals, empty assertions, bad trigger balance, frontmatter mismatch)
- Then run `./scripts/check-skills-ci.sh` against real `skills/*` and confirm green.

### T4 — Doc pointers (link, don’t duplicate)

| File | Change |
|------|--------|
| [`.cursor/rules/project-cmds/RULE.md`](../../.cursor/rules/project-cmds/RULE.md) | Add `./scripts/check-skills-ci.sh` (+ `--self-test`) next to sync self-check. |
| [`docs/evaluating-skills.md`](../../docs/evaluating-skills.md) | Tier 1 = CI/script gate; Tier 2 = soft/full with-vs-without; SCORECARD from Tier 2 only. |
| [`docs/RELEASE.md`](../../docs/RELEASE.md) | Checklist: run Tier 1 script; note enabling required status check in GitHub settings. |
| [`docs/evals/SCORECARD.md`](../../docs/evals/SCORECARD.md) | One-line: numbers come from Tier 2, not Tier 1. |

Tier 2 runbook can be a short subsection in evaluating-skills (artifact upload path + paste into SCORECARD).

## Risks

| Risk | Mitigation |
|------|------------|
| `skills-ref` CLI drift / npx cold start | Pin invoke pattern; keep Tier 1 under ~3m (REQ-013). |
| Trigger 40% rule too strict later | Ask before changing floor (spec Boundaries). |
| Accidental required-check on Tier 2 | Separate workflow; document not to require it. |

## Verify (after implement)

```bash
./scripts/check-skills-ci.sh --self-test
./scripts/check-skills-ci.sh
./scripts/sync-adsk.sh self-check   # unchanged smoke
```

## Done when

Matches spec “Done when”: script green on tree; Tier 1 workflow on skill-touching PRs; docs updated; Tier 3 still future-only.

---

After you approve this plan, run `/implement-spec .cursor/plans/skill-eval-ci.plan.md`.

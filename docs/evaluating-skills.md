# Evaluating skills (ADSK)

How to test whether a skill produces good outputs using **eval-driven iteration**. Based on [Evaluating skill output quality](https://agentskills.io/skill-creation/evaluating-skills).

## Why evals

A single happy-path prompt is not enough. Evals answer:

- Does the skill beat **no skill** (or the previous version)?
- Does it hold across varied phrasing and edge cases?
- What does it cost in time/tokens?

## Test cases (`evals/evals.json`)

Each case has:

- **prompt** — realistic user message
- **expected_output** — human description of success
- **files** (optional) — fixtures under `evals/files/`
- **assertions** (add after first run) — verifiable pass/fail checks

Start with **2–3** cases plus at least one **edge** case. Vary phrasing and formality.

Example shape (see first-party skills for live files):

```json
{
  "skill_name": "example",
  "evals": [
    {
      "id": 1,
      "prompt": "…",
      "expected_output": "…",
      "assertions": ["…"]
    }
  ]
}
```

## Running evals

For each case, run **twice** in a clean context:

1. **with_skill** — agent has the skill path
2. **without_skill** (or prior version snapshot)

Workspace layout (generated; gitignored):

```
<skill>-workspace/
└── iteration-1/
    ├── eval-<name>/
    │   ├── with_skill/{outputs,timing.json,grading.json}
    │   └── without_skill/{outputs,timing.json,grading.json}
    └── benchmark.json
```

Record `total_tokens` and `duration_ms` in `timing.json` when available.

## Grading

Grade each assertion **PASS/FAIL with evidence** (quote paths or output). Prefer scripts for mechanical checks (file exists, valid JSON). Use LLM grading for semantic checks; use **blind A/B** when comparing versions.

## Aggregating

Compute pass-rate (and optional time/token) deltas into `benchmark.json`. Patterns to watch:

- Assertions that always pass both ways → remove (no signal)
- Always fail both ways → fix assertion or case
- Pass only with skill → keep; understand which instruction caused it
- High variance → tighten ambiguous instructions

## Trigger evals

Separate from output quality. Store labeled queries under `evals/trigger/eval_queries.json`:

```json
[
  { "query": "…", "should_trigger": true },
  { "query": "…", "should_trigger": false }
]
```

Aim for ~20 queries (half should / half should not). Prefer near-miss negatives. See [Optimizing skill descriptions](https://agentskills.io/skill-creation/optimizing-descriptions).

When authoring or revising skills, follow **`skill-optimizer`** (`references/eval-loop.md` inside that skill) so trigger + output loops stay coupled to token budgets.

## Iteration loop

1. Grade + human feedback + skim transcripts  
2. Propose lean, generalized skill edits (explain *why*)  
3. Rerun in `iteration-N+1/`  
4. Stop when feedback is empty or deltas plateau  

Optional automation: Anthropic [`skill-creator`](https://github.com/anthropics/skills/tree/main/skills/skill-creator) (listed in `recommended-skills.json`).

## CI tiers (this kit)

| Tier | When | What | Merge impact |
|------|------|------|--------------|
| **1 (hard)** | PRs/pushes touching `skills/**` (and the check script / workflow) | `skills-ref validate` + eval harness integrity (`evals.json` + trigger queries shape) via [`scripts/check-skills-ci.sh`](../scripts/check-skills-ci.sh) | Fails the job on check failure |
| **2 (soft)** | Weekly schedule + `workflow_dispatch` (`.github/workflows/skills-evals-soft.yml`) | Full with_skill vs without_skill iterations (runbook below); v1 uploads a stub summary artifact | Must **not** be a required PR check; does not block release-please |
| **3** | Future | Hard pass-rate gate vs baselines | Out of scope until flakiness/cost baselines exist |

Local verify (same as CI Tier 1):

```bash
./scripts/check-skills-ci.sh
./scripts/check-skills-ci.sh --self-test
```

Path filters skip Tier 1 when a PR only changes docs outside `skills/**` / the check script / workflow.

### Tier 2 runbook (manual until agent loops are automated)

1. For each first-party skill, run with_skill vs without_skill iterations as in [Running evals](#running-evals) / [Aggregating](#aggregating).
2. Keep generated workspaces gitignored (`*-workspace/`, `**/iteration-*/`).
3. Optionally upload grading/`benchmark.json` (or a short summary markdown) as a workflow artifact when extending the soft workflow.
4. Paste pass-rate / token deltas into [docs/evals/SCORECARD.md](evals/SCORECARD.md) using the results template.

SCORECARD numeric deltas come from **Tier 2**, not Tier 1.

## Publishing results

Update [docs/evals/SCORECARD.md](evals/SCORECARD.md) so adopters can decide keep / optional / replace.

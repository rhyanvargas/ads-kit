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

Aim for ~20 queries (half should / half should not). See [Optimizing skill descriptions](https://agentskills.io/skill-creation/optimizing-descriptions).

## Iteration loop

1. Grade + human feedback + skim transcripts  
2. Propose lean, generalized skill edits (explain *why*)  
3. Rerun in `iteration-N+1/`  
4. Stop when feedback is empty or deltas plateau  

Optional automation: Anthropic [`skill-creator`](https://github.com/anthropics/skills/tree/main/skills/skill-creator) (listed in `recommended-skills.json`).

## Publishing results

Update [docs/evals/SCORECARD.md](evals/SCORECARD.md) so adopters can decide keep / optional / replace.

# Eval loop (trigger + output)

Use when adding or revising skill evals. Repo overview: `docs/evaluating-skills.md`. Cursor: `/run-skill-evals` for the with/without output pass.

## Trigger accuracy

1. Build ~20 labeled queries (`evals/trigger/eval_queries.json`).
2. Split train vs validation (do not tune on validation).
3. For train failures:
   - Missed should-trigger → broaden intent categories (not single keywords)
   - False should-not → add boundaries / narrow scope
4. Repeat a few iterations; select by **validation** pass rate.
5. Sanity-check with 5–10 fresh queries never used in tuning.

Optional automation: Anthropic [`skill-creator`](https://github.com/anthropics/skills/tree/main/skills/skill-creator) (see `recommended-skills.json`).

## Output quality

For each case in `evals/evals.json`, run clean contexts (or invoke `/run-skill-evals`):

1. **with_skill** — skill available
2. **without_skill** (or prior version)

Record assertion PASS/FAIL with evidence; capture `total_tokens` / `duration_ms` when available.

Patterns:

- Always pass both ways → assertion has no signal; remove
- Always fail both → fix case/assertion
- Pass only with skill → keep; note which instruction helped
- High variance → tighten ambiguous instructions
- Large token Δ with small quality gain → cut activation-tier content

## Stop criteria

- Trigger validation acceptable on near-misses
- Output pass-rate improved or plateaued with acceptable token cost
- `skills-ref validate` still green
- Human feedback empty or only nits

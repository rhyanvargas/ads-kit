# Description checklist

Use when drafting or revising a skill `description` field.

## Requirements ([spec](https://agentskills.io/specification#description-field))

- 1–1024 characters, non-empty
- States **what** the skill does and **when** to use it
- Includes keywords agents can match to user intent

## Writing principles ([optimizing descriptions](https://agentskills.io/skill-creation/optimizing-descriptions))

1. **Agent-directed** — “Use when…” not “This skill helps with…”
2. **User intent** — what the user is trying to achieve, not internal mechanics
3. **Slightly pushy** — list adjacent phrasings (even if the user does not name the domain)
4. **Concise** — a few sentences; catalog cost is paid for every installed skill
5. **Boundaries** — add “Do not use for…” when near-miss skills or tasks share keywords

## Template

```yaml
description: >-
  <capability verbs and scope>. Use when <trigger intents, slash commands,
  synonyms>. Do not use for <near-miss tasks>.
```

## Anti-patterns

| Bad | Why |
|-----|-----|
| “Helps with documents.” | No what/when; will under-trigger |
| Keyword stuffing from failed eval queries | Overfits; fails on new phrasing |
| Listing every reference file | Implementation detail; wastes catalog tokens |
| First-person (“I can…”) | Descriptions are catalog metadata, not chat |

## Trigger query set

Store under `evals/trigger/eval_queries.json`:

- Aim for **~20** queries
- ~half `should_trigger: true`, ~half `false`
- True cases: include non-obvious intents where wording matters
- False cases: prefer **near-misses** (shared keywords, different job), not only unrelated trivia

Optimize with a train/validation split; pick the description by **validation** pass rate, not the last edit.

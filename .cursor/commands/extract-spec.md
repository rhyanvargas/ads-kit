# /extract-spec

Document existing code as a baseline specification (brownfield).

## Skill

Read and follow **`skills/spec-driven-workflow`**, especially `references/brownfield-workflow.md`.

## Usage

```
/extract-spec src/auth/
/extract-spec "user authentication"
```

## Behavior

1. Search and analyze the target code.
2. Document **current** behavior (not desired future) with clear requirements/gaps.
3. Save under `.cursor/docs/specs/` (e.g. `{area}-current.md`).
4. Suggest drafting a **change** spec next via `/draft-spec`.

# /implement-spec

Implement from a specification or plan.

## Skill

Read and follow **`skills/spec-driven-workflow`**. Honor `@.cursor/rules/testing` and `@.cursor/rules/project-cmds` for tests and verify commands. When the **engineering-methods** pack is installed, follow `test-driven-development` (and `systematic-debugging` on failures) — see `docs/engineering-methods.md`.

## Usage

```
/implement-spec path/to/spec-or-plan.md
```

## Behavior

1. Read the spec or plan; follow the plan step-by-step when present.
2. Implement with tests mapped to requirements (or justify non-behavioral exceptions).
3. Update plan todo status as steps complete (Cursor Plan YAML `todos` and/or portable checklist — see `references/cursor-adapter.md` / `artifact-homes.md`).
4. Run project verify commands; fix failures before claiming done.
5. Suggest `/review` when implementation is complete.

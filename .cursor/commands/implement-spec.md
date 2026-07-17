# /implement-spec

Implement from a specification or plan.

## Skill

Read and follow **`skills/spec-driven-workflow`**. Honor `@.cursor/rules/testing` and `@.cursor/rules/project-cmds` for tests and verify commands. Recommended upstream TDD skill applies when installing the recommended pack.

## Usage

```
/implement-spec .cursor/docs/specs/{feature-name}.md
/implement-spec .cursor/plans/{feature-name}.plan.md
```

## Behavior

1. Read the spec or plan; follow the plan step-by-step when present.
2. Implement with tests mapped to requirements (or justify non-behavioral exceptions).
3. Update plan todo status as steps complete.
4. Run project verify commands; fix failures before claiming done.
5. Suggest `/review` when implementation is complete.

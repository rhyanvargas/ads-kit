# /review

Post-implementation quality review.

## Skill

Read and follow **`skills/spec-driven-workflow`** review guidance. Apply `@.cursor/rules/testing` and `@.cursor/rules/project-cmds`. Resolve spec paths with `references/artifact-homes.md` when locating `--spec`.

## Usage

```
/review
/review path/to/file.ts
/review --spec path/to/spec.md
```

## Behavior

1. Identify changed or specified files.
2. Check correctness, edge cases, security-sensitive paths, and test coverage vs spec.
3. Report actionable findings; offer to apply safe fixes when asked.
4. Re-run verify commands after fixes.

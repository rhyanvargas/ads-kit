# /implement-spec

Generate code from a specification or implementation plan.

## Usage

From a spec:
```
/implement-spec .cursor/docs/specs/{feature-name}.md
```

From a plan:
```
/implement-spec .cursor/plans/{feature-name}.plan.md
```

## Behavior

1. **Read** - Parse the spec or plan
2. **Implement** - Generate code following the spec/plan
3. **Verify** - Run tests and linters
4. **Iterate** - Fix issues until verification passes

## Instructions

When the user invokes `/implement-spec`:

1. Read the referenced spec or plan file
2. If a plan exists, follow it step by step
3. If only a spec exists, create an implicit plan
4. For each step:
   - Create or modify the specified files
   - Follow coding standards from `.cursor/rules/`
   - Write or update tests for each implemented requirement (see `.cursor/rules/testing.mdc`)
   - **Update the plan file's todo status** (both frontmatter and markdown body)
5. After implementation:
   - Run the test suite
   - Run linters
   - Fix any issues
6. Report completion status
7. **Suggest next step**: Tell the user to run `/review` to verify code quality, or `/review --spec {spec-path}` to check against the original spec

## Implementation Guidelines

### Code Quality
- Follow existing patterns in the codebase
- Keep functions small and focused
- Use descriptive names
- Add comments for non-obvious logic

### Testing
- Write tests alongside implementation (tests are a deliverable, not an afterthought)
- Cover happy path and edge cases
- Use existing test patterns
- Prefer TDD (red → green → refactor) when practical:
  - New behavior: write a failing test first, then implement until it passes
  - Bug fix: add a regression test that fails before the fix
- If tests are intentionally omitted (docs-only / non-behavioral), include an explicit justification in the plan/spec (“No tests needed because…”)

### Iteration
- If tests fail, analyze and fix
- If linter fails, correct style issues
- Maximum 3 iteration attempts before asking for help

## Verification Checklist

Before reporting completion:
- [ ] All spec requirements addressed
- [ ] Each implemented requirement is covered by tests (or has an explicit, justified exception)
- [ ] Tests written/updated and passing
- [ ] Linter passing
- [ ] No regressions in existing tests
- [ ] Plan file todos updated to `completed` status (if using a plan)

## Next Steps

After implementation:
- Run `/review` for quality check
- Manually test the feature
- Update documentation if needed

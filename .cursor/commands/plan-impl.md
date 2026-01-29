# /plan-impl

Create an implementation plan from a specification document.

## Usage

```
/plan-impl docs/specs/{feature-name}.md
```

Or reference a spec file:
```
/plan-impl @docs/specs/my-feature.md
```

## Behavior

1. **Read** - Parse the spec file
2. **Analyze** - Understand requirements and constraints
3. **Plan** - Break down into concrete implementation steps
4. **Output** - Create a plan in `.cursor/plans/`

## Plan Structure

The generated plan includes:

- **Summary**: What will be implemented
- **Steps**: Ordered list of implementation tasks
- **Files**: Which files will be created or modified
- **Tests**: What tests to write
- **Risks**: Potential issues or unknowns

## Instructions

When the user invokes `/plan-impl`:

1. Read the referenced spec file
2. Analyze the codebase to understand:
   - Existing patterns and conventions
   - Related code that will be affected
   - Dependencies and integration points
3. Generate a plan with concrete steps
4. Each step should be small enough to verify independently
5. Save the plan to `.cursor/plans/{feature-name}.plan.md`

## Plan Template

```markdown
# Implementation Plan: {Feature Name}

## Summary
{One paragraph summary of what will be implemented}

## Steps

### 1. {Step Title}
- **Files**: `path/to/file.ts`
- **Action**: Create/Modify/Delete
- **Details**: {What specifically to do}

### 2. {Step Title}
...

## Files to Create
- `path/to/new-file.ts` - {purpose}

## Files to Modify
- `path/to/existing.ts` - {what changes}

## Tests
- [ ] Unit test for {component}
- [ ] Integration test for {flow}

## Risks
- {Potential issue and mitigation}

## Verification
- [ ] All tests pass
- [ ] Linter passes
- [ ] Matches spec requirements
```

## Next Steps

After generating the plan:
- Review the plan and adjust if needed
- Run `/implement-spec` to execute the plan

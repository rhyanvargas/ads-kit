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
5. **Track** - Initialize todos for implementation tracking

## Plan Structure

The generated plan includes:

- **Frontmatter**: Cursor plan metadata (name, overview, todos array)
- **Spec Reference**: Link to source specification
- **Tasks**: Ordered list with unique IDs for todo tracking
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
5. Assign unique task IDs (e.g., `TASK-001`, `TASK-002`) for tracking
6. Save the plan to `.cursor/plans/{feature-name}.plan.md`
7. **Initialize todos** using the TodoWrite tool with all tasks in `pending` status

## Plan Template

```markdown
---
name: {Feature Name}
overview: {One paragraph summary of what will be implemented, including lifecycle stage and key requirements}
todos: 
  - id: "TASK-001"
    content: {Step Title}
    status: "pending"
  - id: "TASK-002"
    content: {Step Title}
    status: "pending"
    #... etc
isProject: false
---

# {Feature Name}

**Spec**: `docs/specs/{feature-name}.md`

## Prerequisites

Before starting implementation:
- [ ] {PREREQ-001} {Prerequisite task}

## Tasks

### TASK-001: {Step Title}
- **Status**: pending
- **Files**: `path/to/file.ts`
- **Action**: Create | Modify | Delete
- **Details**: {What specifically to do}
- **Depends on**: none | TASK-XXX
- **Verification**: {How to verify this step is complete}

### TASK-002: {Step Title}
- **Status**: pending
- **Files**: `path/to/file.ts`
- **Action**: Create | Modify | Delete
- **Details**: {What specifically to do}
- **Depends on**: TASK-001
- **Verification**: {How to verify this step is complete}

## Files Summary

### To Create
| File | Task | Purpose |
|------|------|---------|
| `path/to/new-file.ts` | TASK-001 | {purpose} |

### To Modify
| File | Task | Changes |
|------|------|---------|
| `path/to/existing.ts` | TASK-002 | {what changes} |

## Test Plan

| Test ID | Type | Description | Task |
|---------|------|-------------|------|
| TEST-001 | contract | {description} | TASK-XXX |
| TEST-002 | unit | {description} | TASK-XXX |

## Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| {Risk description} | High/Medium/Low | {Mitigation strategy} |

## Verification Checklist

- [ ] All tasks completed
- [ ] All tests pass (`npm test`)
- [ ] Linter passes (`npm run lint`)
- [ ] Type check passes (`npm run typecheck`)
- [ ] Matches spec requirements

## Implementation Order

```
{task-id} → {task-id} → {task-id}
         ↘ {task-id} ↗
```
```

## Todo Integration

After creating the plan:

1. **Initialize todos** using TodoWrite with all tasks:
   - Each `TASK-XXX` becomes a todo item
   - ID format: `TASK-001`, `TASK-002`, etc.
   - Content: `"{TASK-XXX}: {Step Title}"`
   - Status: `pending` (or `in_progress` for first task if starting immediately)

2. **Cursor tracks progress** via the `todos: []` array in frontmatter

This allows the agent to:
- Track progress through implementation
- Mark tasks complete as they finish
- Show remaining work at any point

## Next Steps

After generating the plan:
1. Review the plan and adjust if needed
2. Run `/implement-spec` to execute the plan (agent will use todos to track progress)
3. Or implement manually, updating task status as you go

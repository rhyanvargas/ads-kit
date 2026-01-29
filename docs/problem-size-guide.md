# Problem Size Guide

Match your workflow to the size of the problem.

## Quick Reference

| Size | Examples | Spec? | Plan? | Commands |
|------|----------|-------|-------|----------|
| **Trivial** | Typo, rename, 1-line fix | No | No | Chat directly |
| **Small** | Single file, clear scope | Yes | Optional | `/draft-spec` → `/implement-spec` |
| **Medium** | Multi-file, 1-5 day work | Yes | Yes | Full workflow |
| **Large** | Epic, unclear scope | Yes | Yes | Research first |

## Trivial Changes

**Skip the workflow entirely.**

### Examples
- Fix a typo in documentation
- Rename a variable
- Add a log statement
- Fix a single-line bug with obvious cause

### How to handle
Just describe the change in chat:
```
"Fix the typo in README.md line 42: 'teh' should be 'the'"
```

```
"Rename the variable 'usr' to 'user' in UserService.ts"
```

### Why skip?
- Overhead exceeds benefit
- No ambiguity in requirements
- Easy to verify correctness
- Low risk of unintended effects

---

## Small Changes

**Spec recommended, plan optional.**

### Examples
- Add a new utility function
- Create a simple component
- Add a field to a model
- Write tests for existing code

### How to handle
```
/draft-spec "Add email validation utility function"
```

Then skip to implementation:
```
/implement-spec docs/specs/email-validation.md
```

### Why spec but skip plan?
- Spec clarifies requirements
- Single file = obvious plan
- Quick feedback loop

---

## Medium Changes

**Full workflow recommended.**

### Examples
- New feature spanning multiple files
- Refactor a module
- Add a new API endpoint with frontend
- Implement a user story (3-5 points)

### How to handle
1. `/draft-spec "Add user profile editing feature"`
2. Review and refine spec
3. `/plan-impl docs/specs/user-profile.md`
4. Review plan
5. `/implement-spec docs/specs/user-profile.md`
6. `/review --spec docs/specs/user-profile.md`

### Why full workflow?
- Multiple files = coordination needed
- Plan catches issues early
- Spec prevents scope creep
- Review ensures completeness

---

## Large Changes

**Research before spec.**

### Examples
- New system or major feature
- Architectural changes
- Integration with external systems
- Epic-level work

### How to handle
1. Research first (manually or with agent)
2. Understand constraints and dependencies
3. `/draft-spec "..."` - be very detailed
4. Split into smaller specs if needed
5. Full workflow for each sub-spec

### Why research first?
- Large scope = high ambiguity
- Need to understand constraints
- May require human decisions
- Spec needs to be very specific

---

## Decision Tree

```
Is the change obvious and < 5 lines?
├── Yes → Just describe in chat (Trivial)
└── No ↓

Is the scope clear and single-file?
├── Yes → /draft-spec → /implement-spec (Small)
└── No ↓

Is it a well-defined story (1-5 days)?
├── Yes → Full workflow (Medium)
└── No → Research first (Large)
```

## Signs You're Using the Wrong Size

### Using full workflow for trivial
- You're writing a spec for a typo fix
- The spec is longer than the change
- It feels like busywork

**Solution**: Skip the workflow, just do it.

### Skipping workflow for medium
- Changes keep growing in scope
- You're surprised by side effects
- Multiple files need changes

**Solution**: Stop, write a spec, then continue.

### Not researching large changes
- Spec keeps changing
- Agent asks many clarifying questions
- You discover new requirements mid-implementation

**Solution**: Pause implementation, research more, refine spec.

## Adjusting Mid-Task

It's okay to change approaches:

### Upgrade
Started small but scope grew?
1. Stop implementation
2. Write a proper spec
3. Create a plan
4. Continue with full workflow

### Downgrade
Started with full workflow but it's simpler than expected?
1. Simplify or skip the plan
2. Implement directly from spec
3. Don't force unnecessary process

## Context Matters

### Familiar codebase
- You can go faster
- Trivial/small thresholds expand
- Trust your judgment

### Unfamiliar codebase
- Slow down
- Medium becomes large
- Spec more, assume less

### High-risk areas
- Payment, auth, data integrity
- Always use full workflow
- Even for "small" changes

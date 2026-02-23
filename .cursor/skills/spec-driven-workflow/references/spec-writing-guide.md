# Spec Writing Guide

Write effective specifications for AI-assisted development.

## The Problem

Specs can fail in two ways:
1. **Too vague**: AI fills gaps with assumptions (often wrong)
2. **Too detailed**: Spec becomes harder to maintain than code

The goal is **just enough detail** to communicate intent clearly.

## Functional vs Technical

### Functional Spec (What)
Lives in the spec document:
- User behavior and expectations
- Acceptance criteria
- Business rules
- Constraints and edge cases

### Technical Spec (How)
Lives in rules (`.cursor/rules/`):
- Implementation patterns
- Framework conventions
- Coding standards
- Architecture decisions

### When to Add Technical Details to Spec

Add to the spec when:
- Rules don't cover the specific case
- Integration requires specific approach
- Performance constraints affect design
- Security requirements dictate implementation

**Example**: Spec normally wouldn't mention database:
```markdown
## Requirements
- Store user preferences
```

But if there's a constraint:
```markdown
## Requirements
- Store user preferences in Redis (not PostgreSQL) for fast access
```

## Spec Structure

### Minimal Spec (Small changes)
```markdown
# Feature Name

## Overview
One sentence: what and why.

## Requirements
- [ ] Requirement 1
- [ ] Requirement 2

## Acceptance Criteria
- Given X, when Y, then Z
```

### Standard Spec (Medium changes)
```markdown
# Feature Name

## Overview
What this does and why it matters.

## Requirements

### Functional
- [ ] REQ-001: User can do X
- [ ] REQ-002: System responds with Y

### Non-Functional
- [ ] Performance: responds in < 200ms
- [ ] Security: requires authentication

## Acceptance Criteria
- Given [context], when [action], then [result]

## Test Strategy
- REQ-001: {unit|integration|e2e} — {what to assert}
- REQ-002: {unit|integration|e2e} — {what to assert}

## Constraints
- Must work with existing Z
- Cannot break backward compatibility

## Out of Scope
- Not included: A, B, C
```

### Detailed Spec (Large/complex changes)
Add as needed:
- Data models
- API contracts
- State diagrams
- Error scenarios
- Migration strategy

## Writing Good Requirements

### Bad: Vague
```markdown
- User can search
```

### Better: Specific
```markdown
- User can search users by name (partial match, case-insensitive)
- User can search users by email (exact match)
- Search returns max 20 results per page
- Empty search shows all users (paginated)
```

### Bad: Implementation-focused
```markdown
- Create a SearchService class with findByName method
- Use SQL LIKE query for partial match
```

### Better: Behavior-focused
```markdown
- Search matches partial names (e.g., "john" matches "Johnny")
- Search is case-insensitive
```

## Acceptance Criteria

Use Given-When-Then format:

```markdown
## Acceptance Criteria

### Happy Path
- Given a user with name "John Doe"
- When I search for "john"
- Then the user appears in results

### Edge Cases
- Given no users match the search
- When I search for "xyz123"
- Then I see "No results found" message

### Error Handling
- Given the search service is unavailable
- When I search for anything
- Then I see a friendly error message
```

## Constraints Section

Document what limits the solution:

```markdown
## Constraints
- Must use existing User model (no schema changes)
- Must maintain backward compatibility with v1 API
- Must work offline (cached data)
- Performance: search completes in < 500ms
```

## Out of Scope

Explicitly state what you're NOT building:

```markdown
## Out of Scope
- Advanced filters (date range, status)
- Saved searches
- Search history
- Full-text search of user content
```

This prevents scope creep and clarifies boundaries.

## Common Mistakes

### 1. Assuming context
**Bad**: "Add the usual validation"
**Good**: "Validate email format, require @ and domain"

### 2. Mixing abstraction levels
**Bad**: Requirements mixing UI, API, and database details
**Good**: Separate functional (what) from technical (how)

### 3. Forgetting edge cases
**Bad**: Only describing happy path
**Good**: Include empty states, errors, limits

### 4. Being too prescriptive
**Bad**: "Create file X.ts with function Y that calls Z"
**Good**: "Enable users to do X" (let AI figure out how)

### 5. Skipping acceptance criteria
**Bad**: Vague "should work"
**Good**: Specific testable scenarios

## Tips

### Start with the user
"As a user, I want to..." forces you to think about value.

### Write tests first (mentally)
If you can't test it, you can't spec it. Prefer assigning `REQ-XXX` IDs so plans and tests can map cleanly back to requirements.

### Include examples
```markdown
## Examples
- Input: "john@example.com" → Valid
- Input: "john@" → Invalid (no domain)
- Input: "john" → Invalid (no @)
```

### Use checkboxes
They make specs actionable and trackable.

### Keep it living
Update specs when requirements change. Outdated specs are worse than no specs.

## Checklist

Before running `/implement-spec`:

- [ ] Overview explains what and why
- [ ] Requirements are specific and testable
- [ ] Acceptance criteria cover happy path
- [ ] Edge cases documented
- [ ] Constraints stated
- [ ] Out of scope defined
- [ ] No implementation details (unless necessary)

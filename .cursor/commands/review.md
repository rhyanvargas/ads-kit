# /review

Perform a post-implementation quality review.

## Usage

Review recent changes:
```
/review
```

Review specific files:
```
/review path/to/file.ts
```

Review against a spec:
```
/review --spec docs/specs/{feature-name}.md
```

## Behavior

1. **Scan** - Identify changed or specified files
2. **Analyze** - Check for issues and improvements
3. **Report** - Provide actionable feedback
4. **Fix** - Optionally apply suggested fixes

## Review Checklist

### Code Quality
- [ ] Clear, descriptive naming
- [ ] Functions are focused and small
- [ ] No unnecessary complexity
- [ ] Error handling is appropriate

### Standards Compliance
- [ ] Follows coding style rules
- [ ] Matches architectural patterns
- [ ] Consistent with existing code

### Testing
- [ ] Tests exist for new code
- [ ] Edge cases covered
- [ ] Tests are readable

### Security
- [ ] No hardcoded secrets
- [ ] Input validation present
- [ ] No obvious vulnerabilities

### Performance
- [ ] No obvious inefficiencies
- [ ] Appropriate data structures
- [ ] No unnecessary computations

## Instructions

When the user invokes `/review`:

1. Identify the scope:
   - If no arguments, review recent changes (git diff)
   - If file path provided, review that file
   - If --spec provided, verify against spec requirements
2. For each file in scope:
   - Check against the review checklist
   - Identify issues with severity (error, warning, info)
   - Suggest specific improvements
3. Generate a review report
4. If requested, apply fixes automatically

## Report Format

```markdown
## Review Summary

**Files Reviewed**: 3
**Issues Found**: 2 errors, 1 warning

### Errors
- `file.ts:42` - Missing error handling for API call

### Warnings  
- `file.ts:15` - Function could be simplified

### Suggestions
- Consider extracting common logic to a utility

### Spec Compliance (if --spec provided)
- [x] Requirement 1: Implemented
- [ ] Requirement 2: Partially implemented - missing edge case
```

## Next Steps

After review:
- Address any errors
- Consider warnings and suggestions
- Re-run `/review` after fixes

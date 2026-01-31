# /extract-spec

Reverse-engineer a specification from existing code (brownfield documentation).

## Usage

Extract spec for a module:
```
/extract-spec src/auth/
```

Extract spec for a feature:
```
/extract-spec "user authentication"
```

Extract spec for specific files:
```
/extract-spec src/services/UserService.ts
```

## Behavior

1. **Search** - Find relevant code using grep and semantic search
2. **Analyze** - Understand the code's purpose and behavior
3. **Document** - Generate a spec describing current functionality
4. **Output** - Save to `.cursor/docs/specs/`

## Use Cases

- **Brownfield onboarding**: Document an unfamiliar codebase
- **Missing docs**: Fill gaps in documentation
- **Refactor prep**: Understand before changing
- **Knowledge capture**: Preserve understanding of legacy code

## Instructions

When the user invokes `/extract-spec`:

1. Parse the target (path, module name, or description)
2. Search the codebase:
   - Use grep for exact matches
   - Use semantic search for concepts
   - Explore related files and dependencies
3. Analyze the code:
   - Identify public interfaces
   - Trace data flow
   - Note dependencies
   - Find tests for behavior clues
4. Generate a spec that documents:
   - What the code does (behavior)
   - How it's used (interfaces)
   - What it depends on (dependencies)
5. Save to `.cursor/docs/specs/{module-name}-existing.md`
6. **Suggest next step**: Tell the user to review the generated spec, then run `/draft-spec` to plan enhancements or new features that build on this code

## Output Template

```markdown
# {Module/Feature Name} (Existing)

> Auto-generated spec from existing code. Review and refine as needed.

## Overview
{What this code does based on analysis}

## Current Behavior

### Public Interface
- `functionName(params)` - {description}
- `ClassName.method()` - {description}

### Data Flow
1. {Step 1}
2. {Step 2}

## Dependencies
- `{dependency}` - {how it's used}

## Integration Points
- {Where this code connects to other systems}

## Tests
- {Summary of existing test coverage}

## Observations
- {Patterns noticed}
- {Potential issues}
- {Missing documentation}

## Suggested Improvements
- {Refactoring opportunities}
- {Missing tests}
- {Documentation gaps}
```

## Next Steps

After extracting specs:
- Review and refine the generated documentation
- Use as baseline for planning changes
- Feed into `/draft-spec` for new features that build on this

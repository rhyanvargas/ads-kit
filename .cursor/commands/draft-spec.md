# /draft-spec

Generate a specification document from a feature idea or brief description.

## Usage

```
/draft-spec "your feature idea or description"
```

## Behavior

1. **Clarify** - Ask clarifying questions if the idea is vague
2. **Research** - Scan the codebase for relevant context
3. **Generate** - Create a structured spec in `docs/specs/`
4. **Output** - Return the spec for review

## Spec Structure

The generated spec includes:

- **Overview**: What the feature does
- **Requirements**: Functional requirements with acceptance criteria
- **Constraints**: Technical or business constraints
- **Out of Scope**: What this spec does NOT cover
- **Dependencies**: Related systems or features

## Instructions

When the user invokes `/draft-spec`:

1. Parse the provided description
2. If the description is unclear or missing key details, ask 2-3 clarifying questions:
   - What problem does this solve?
   - Who is the user?
   - Are there existing patterns to follow?
3. Search the codebase for related code, patterns, or existing specs
4. Generate a spec file at `docs/specs/{feature-name}.md`
5. Use the template below

## Spec Template

```markdown
# {Feature Name}

## Overview
{One paragraph describing what this feature does and why}

## Requirements

### Functional
- [ ] {Requirement 1}
- [ ] {Requirement 2}

### Acceptance Criteria
- Given {context}, when {action}, then {result}

## Constraints
- {Technical or business constraint}

## Out of Scope
- {What this does NOT include}

## Dependencies
- {Related features or systems}

## Notes
- {Any additional context}
```

## Next Steps

After generating the spec:
- Review and refine the spec
- Run `/plan-impl docs/specs/{feature-name}.md` to create an implementation plan

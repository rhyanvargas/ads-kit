# Commands Reference

Complete reference for all spec-driven workflow commands.

## Command Summary

| Command | Purpose | When to Use |
|---------|---------|-------------|
| `/draft-spec` | Generate spec from idea | Starting a new feature |
| `/plan-impl` | Create implementation plan | Before coding medium+ changes |
| `/implement-spec` | Generate code from spec | After spec is approved |
| `/review` | Quality check | After implementation |
| `/extract-spec` | Document existing code | Brownfield projects |
| `/quick-start` | Initialize workflow | First-time setup |
| `/update-readme` | Sync README with codebase | Keep README accurate |

---

## /draft-spec

Generate a specification document from a feature idea.

### Usage
```
/draft-spec "your feature description"
```

### Examples
```
/draft-spec "Add user authentication with email/password"
/draft-spec "Create a dashboard showing sales metrics"
/draft-spec "Refactor payment service to use Stripe"
```

### Behavior
1. Asks clarifying questions if needed
2. Searches codebase for context
3. Generates spec in `.cursor/docs/specs/{feature-name}.md`

### Output
- Spec file with requirements, constraints, acceptance criteria
- Location: `.cursor/docs/specs/`

### Options
- Add context: `/draft-spec "feature" @src/related-file.ts`
- Specify output: `/draft-spec "feature" --out .cursor/docs/specs/custom-name.md`

---

## /plan-impl

Create an implementation plan from a specification.

### Usage
```
/plan-impl path/to/spec.md
```

### Examples
```
/plan-impl .cursor/docs/specs/user-auth.md
/plan-impl @.cursor/docs/specs/payment-refactor.md
```

### Behavior
1. Reads and analyzes the spec
2. Breaks down into concrete steps
3. Identifies files to create/modify
4. Plans tests and verification

### Output
- Plan file with steps, files, tests, risks
- Location: `.cursor/plans/{feature-name}.plan.md`

### When to Use
- Medium and large changes
- Multi-file modifications
- Complex refactors

### When to Skip
- Small, single-file changes
- Clear, obvious implementations

---

## /implement-spec

Generate code from a specification or plan.

### Usage
From spec:
```
/implement-spec .cursor/docs/specs/feature.md
```

From plan:
```
/implement-spec .cursor/plans/feature.plan.md
```

### Behavior
1. Reads spec/plan
2. Creates and modifies files
3. Writes tests
4. Runs tests and linters
5. Fixes issues (up to 3 iterations)

### Output
- Generated code following the spec
- Tests for new functionality
- Updated files

### Options
- Dry run: `/implement-spec spec.md --dry-run` (shows what would change)
- No tests (discouraged): `/implement-spec spec.md --no-tests`
  - Only for clearly non-behavioral work (docs/formatting) or repos without a test harness
  - Must include an explicit “no tests needed because…” justification in the plan/spec

---

## /review

Perform a quality review of code changes.

### Usage
Review recent changes:
```
/review
```

Review specific files:
```
/review src/services/UserService.ts
```

Review against spec:
```
/review --spec .cursor/docs/specs/feature.md
```

### Behavior
1. Identifies files to review
2. Checks code quality, standards, security
3. Verifies spec compliance (if --spec)
4. Reports issues and suggestions

### Output
- Review summary with issues by severity
- Spec compliance checklist (if --spec)
- Suggested fixes

### Review Checklist
- Code quality (naming, complexity, patterns)
- Standards compliance (style, architecture)
- Testing (coverage, edge cases)
- Security (input validation, secrets)
- Performance (efficiency, scaling)

---

## /extract-spec

Reverse-engineer documentation from existing code.

### Usage
From path:
```
/extract-spec src/services/
```

From concept:
```
/extract-spec "authentication flow"
```

From file:
```
/extract-spec src/api/users.ts
```

### Behavior
1. Searches for relevant code
2. Analyzes behavior and interfaces
3. Generates documentation spec

### Output
- Spec file documenting existing behavior
- Location: `.cursor/docs/specs/{module}-existing.md`

### Use Cases
- Brownfield onboarding
- Filling documentation gaps
- Understanding legacy code
- Preparing for refactors

---

## /quick-start

Initialize the spec-driven workflow for a project.

### Usage
```
/quick-start
```

### Behavior
1. Detects tech stack (language, framework, tools)
2. Reads existing config files
3. Updates `.cursor/rules/project.mdc`
4. Provides next steps

### Output
- Updated project rules
- Detected stack summary
- Recommended workflow (greenfield vs brownfield)

### What It Detects
- Package manager (npm, pip, cargo, etc.)
- Framework (React, Django, Rails, etc.)
- Test framework (Jest, pytest, etc.)
- Linter (ESLint, ruff, etc.)
- Build commands

---

## Combining Commands

### Greenfield Flow
```
/quick-start                                    # Setup
/draft-spec "new feature"                       # Spec
/plan-impl .cursor/docs/specs/feature.md        # Plan
/implement-spec .cursor/docs/specs/feature.md   # Build
/review --spec .cursor/docs/specs/feature.md    # Verify
```

### Brownfield Flow
```
/quick-start                                    # Setup
/extract-spec src/legacy/                       # Document
/draft-spec "change to legacy"                  # Spec change
/plan-impl .cursor/docs/specs/change.md         # Plan
/implement-spec .cursor/docs/specs/change.md    # Build
/review --spec .cursor/docs/specs/change.md     # Verify
```

### Quick Fix (Skip workflow)
```
"Fix the typo in README.md"            # Direct chat
```

---

## /update-readme

Synchronize README.md with current codebase state.

### Usage
```
/update-readme
/update-readme --section tech-stack
```

### Behavior
1. Scan codebase (manifests, src, tests, docs)
2. Compare with README claims
3. Update sections to match; reference files instead of duplicating content
4. Verify links and tech stack against actual manifests

### When to Use
- After adding/removing dependencies or modules
- When README and code have drifted
- Before releasing or onboarding

---

## Troubleshooting

### Command not found
- Verify `.cursor/commands/` folder exists
- Check command files are present
- Restart Cursor IDE

### Spec not generated
- Provide more detail in description
- Check `.cursor/docs/specs/` folder exists
- Review agent output for errors

### Plan missing files
- Spec may be too vague
- Add more context to spec
- Reference related files with @

### Implementation fails
- Check tests for clues
- Refine spec with clarifications
- Run `/review` to identify issues

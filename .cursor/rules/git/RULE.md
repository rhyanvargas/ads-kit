---
description: Git workflow and commit conventions
---

# Git Workflow

## Philosophy

Git history should tell the story of how the project evolved. Clear commits and branches make code review easier and debugging with `git bisect` possible.

## Conventional Commits

Use conventional commit format for clear, parseable history:

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

### Types

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Formatting, no code change |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `perf` | Performance improvement |
| `test` | Adding or updating tests |
| `chore` | Build process, dependencies, tooling |
| `ci` | CI configuration |
| `revert` | Reverting a previous commit |

### Examples

```bash
feat(auth): add OAuth2 login with Google
fix(api): handle null response from payment provider
docs(readme): add deployment instructions
refactor(users): extract validation logic to separate module
test(orders): add integration tests for checkout flow
chore(deps): upgrade React to v19
```

### Breaking Changes

Use `!` or footer for breaking changes:

```bash
feat(api)!: change user endpoint response format

BREAKING CHANGE: User endpoint now returns { data: user } instead of user directly
```

## Branch Naming

Use descriptive, prefixed branch names:

```bash
feature/user-authentication
feature/JIRA-123-add-payment-flow
fix/login-redirect-loop
fix/JIRA-456-cart-calculation
chore/upgrade-dependencies
docs/api-documentation
refactor/extract-auth-module
```

## Branch Strategy

### Main Branches

- `main` - Production-ready code, always deployable
- `develop` (optional) - Integration branch for features

### Feature Branches

1. Branch from `main` (or `develop`)
2. Make changes in small, focused commits
3. Open PR when ready for review
4. Squash or rebase before merge
5. Delete branch after merge

```bash
# Start feature
git checkout main
git pull origin main
git checkout -b feature/new-feature

# Work on feature
git add .
git commit -m "feat(scope): add thing"

# Keep up to date
git fetch origin
git rebase origin/main

# Push for review
git push origin feature/new-feature
```

## Commit Best Practices

### Atomic Commits

Each commit should:
- Represent one logical change
- Leave the codebase in a working state
- Be independently reviewable

```bash
# BAD: One giant commit
git commit -m "add user feature, fix bugs, update deps"

# GOOD: Separate logical changes
git commit -m "feat(users): add user registration form"
git commit -m "feat(users): add user validation logic"
git commit -m "fix(auth): correct session expiration check"
```

### Commit Message Guidelines

**Subject line:**
- Use imperative mood ("add", not "added" or "adds")
- No period at the end
- Max 50 characters
- Capitalize first letter

**Body (when needed):**
- Wrap at 72 characters
- Explain what and why, not how
- Reference issues/tickets

```bash
fix(orders): prevent duplicate order submissions

Users were able to double-click the submit button and create
duplicate orders. Added debounce and disabled state while
processing.

Fixes #123
```

## Pull Request Guidelines

### PR Title

Follow same format as commits:

```
feat(auth): implement password reset flow
```

### PR Description Template

```markdown
## Summary
Brief description of changes

## Changes
- Added password reset endpoint
- Created reset email template
- Added token expiration check

## Testing
- [ ] Unit tests pass
- [ ] Integration tests added
- [ ] Manual testing completed

## Screenshots (if UI changes)

## Related Issues
Fixes #123
```

### PR Size

- Keep PRs small and focused (<400 lines preferred)
- Split large features into multiple PRs
- Easier to review = faster to merge

## Code Review

### As Author

- Self-review before requesting review
- Respond to all comments
- Don't push during active review without notice

### As Reviewer

- Review within 24 hours
- Be constructive, suggest solutions
- Approve when "good enough", not perfect
- Use conventional comments:

```
nit: minor style suggestion
suggestion: alternative approach
question: seeking clarification
issue: must be addressed before merge
```

## Merge Strategy

### Squash and Merge (Recommended)

- Combines all commits into one
- Creates clean linear history
- Good for feature branches

### Rebase and Merge

- Preserves individual commits
- Use when commit history is valuable
- Requires clean, logical commits

### Merge Commit

- Preserves branch history
- Creates explicit merge points
- Good for long-running branches

## .gitignore

Standard ignores for Node.js/Next.js projects:

```gitignore
# Dependencies
node_modules/
.pnp/
.pnp.js

# Build
.next/
out/
build/
dist/

# Environment
.env
.env.local
.env.*.local

# IDE
.idea/
.vscode/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*

# Testing
coverage/
.nyc_output/

# Misc
*.tsbuildinfo
```

## Hooks (Optional)

Use Husky for git hooks:

```bash
# Pre-commit: lint and format
npx lint-staged

# Commit message: validate format
npx commitlint --edit $1

# Pre-push: run tests
npm test
```

```json
// package.json
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md}": ["prettier --write"]
  }
}
```

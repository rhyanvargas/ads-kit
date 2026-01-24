---
description: Project-specific git workflow
alwaysApply: true
---

# Git Workflow

> Project-specific git conventions. Standard git practices are omitted — Cursor already knows those.

## Branch Strategy

<!-- Your project's branching model -->

- Main branch: `<!-- main / master -->`
- Development branch: `<!-- develop / none -->`
- Feature branch pattern: `<!-- feature/*, feat/* -->`
- Release branch pattern: `<!-- release/* -->`

## Commit Message Format

<!-- Your project's commit convention -->

```
<!-- your format, e.g., conventional commits with scope -->
```

### Scopes

- `<!-- scope1: description -->`
- `<!-- scope2: description -->`

## PR Requirements

<!-- Your project's PR standards -->

- Required reviewers: `<!-- number -->`
- Required checks: `<!-- list -->`
- PR template location: `<!-- path -->`

## Protected Branches

- `<!-- branch: protection rules -->`

## Hooks

<!-- Pre-commit, pre-push hooks in your project -->

- Pre-commit: `<!-- what runs -->`
- Pre-push: `<!-- what runs -->`
- Hook manager: `<!-- husky / lefthook / etc. -->`

## CI Integration

<!-- How git integrates with CI -->

- CI platform: `<!-- GitHub Actions / GitLab CI / etc. -->`
- Required workflows: `<!-- list -->`

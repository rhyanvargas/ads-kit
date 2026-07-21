# /create-pr

Open or refresh a GitHub pull request with title and body filled from branch commits.

## Skill

Read and follow **`skills/pull-request-authoring`** (adopter apps: `.agents/skills/pull-request-authoring`).

## Usage

```
/create-pr
/create-pr "base main"
/create-pr "fill the existing empty PR body"
```

## Behavior

1. Gather `git log <base>...HEAD` and the branch diff.
2. Draft a Conventional Commits title plus Summary / Changes (repo PR template when present).
3. `gh pr create`, or `gh pr edit` if an empty-template PR already exists.
4. Return the PR URL.

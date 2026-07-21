# Default PR body shape

Load when the repo has no `.github/PULL_REQUEST_TEMPLATE.md`, or the template is too thin to guide Summary/Changes.

Prefer the repo template verbatim when it exists. Otherwise use:

```markdown
## Summary

<!-- Why this change exists — 1–3 bullets from branch commits -->

## Changes

- …

## Test plan

- [ ] …
```

For this kit (ADSK), when `.github/PULL_REQUEST_TEMPLATE.md` is present, keep its **Checklist** section and fill Summary/Changes from commits.

### Drafting tips

- Summary = why / outcome; Changes = concrete areas touched
- Mirror Conventional Commit types already on the branch (`feat`, `fix`, `docs`, `chore`)
- Do not paste secrets, tokens, or full lockfile dumps
- Link related issues with `Fixes #N` / `Closes #N` only when the user or commits imply it

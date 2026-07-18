# Project release context

Filled by **release-automation** after the DevOps platform is confirmed.
Commit this file with the project so agents reuse it. On skill sync/upgrade,
**preserve** this file (do not overwrite with kit defaults).

| Field | Value |
|-------|--------|
| **platform** | `github-actions` \| `azure-devops` \| `other` |
| **git_host** | `github` \| `azure-repos` \| `other` |
| **default_branch** | `main` |
| **package_shape** | `simple` \| `node` \| `python` \| `other` |
| **version_file** | e.g. `version.txt` / `package.json` |
| **changelog_path** | `CHANGELOG.md` |
| **tooling** | e.g. `release-please` \| `git-cliff+pipeline` \| `manual` |
| **confirmed** | ISO date + who/what confirmed |
| **notes** | Org constraints, PAT vs GITHUB_TOKEN, etc. |

## Evidence used

- Remotes:
- CI paths found:
- Prior release tooling:

# Platform decision (when evidence is mixed)

Load when remotes/CI disagree, platform is neither GitHub nor Azure DevOps, or
the user has not confirmed yet.

## Decision rules

1. **Ask once** — present evidence, propose the best-fit platform, wait for
   confirmation. Do not install workflows before confirmation.
2. **Git host ≠ CI** — e.g. GitHub repo + Azure Pipelines is valid. Release
   automation that needs GitHub APIs (release-please) still requires GitHub
   as the git host. Azure Repos → do **not** install release-please.
3. **Prefer existing CI** — extend the platform already in the repo unless the
   user is migrating.
4. **Unsupported in v1 of this skill** — GitLab, Jenkins, Bitbucket, CircleCI:
   recommend Conventional Commits + point to their native release/changelog
   tools; write `platform: other` in project context; stop after docs + commit
   convention unless the user explicitly provides a target tool.

## Quick matrix

| Git host | CI | Default tooling |
|----------|----|-----------------|
| GitHub | GitHub Actions | release-please |
| GitHub | Azure Pipelines | release-please (Actions) **or** Azure pipeline changelog — ask |
| Azure Repos | Azure Pipelines | git-cliff (or conventional-changelog) in pipeline |
| Other | Other | Document only; no invented YAML |

After confirmation, write `project-context.md`, then load the matching platform guide.

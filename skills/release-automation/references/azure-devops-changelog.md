# Azure DevOps + Conventional Commits changelog

Load only when `platform` is `azure-devops`.

**release-please is GitHub-API-centric — do not install it for Azure Repos.**

## Default approach

| Concern | Choice |
|---------|--------|
| Commit convention | Conventional Commits (PR title / squash merge) |
| Changelog | [git-cliff](https://git-cliff.org/) (or `conventional-changelog-cli` if already present) |
| Version | Semver in `version.txt` (or existing manifest — match evidence) |
| Tag / notes | Azure Pipeline on default branch after merge |

## Artifacts to add/update

| Path | Role |
|------|------|
| `azure-pipelines.yml` or `.azure-pipelines/release.yml` | Changelog + tag job (extend existing CI; don’t fork a second unrelated pipeline without asking) |
| `cliff.toml` | git-cliff Conventional Commits config |
| `version.txt` (or existing) | Semver bump source |
| `CHANGELOG.md` | Generated/updated on release |
| `docs/RELEASE.md` | Day-to-day + bootstrap |
| PR template / branch policy notes | Conventional Commit titles |

If the repo already has a root `azure-pipelines.yml`, **add a stage/job** rather
than creating a conflicting top-level file.

## Pipeline shape (illustrative)

Adapt to the project’s agent pool, auth, and whether tags require a PAT:

1. Trigger on pushes to `default_branch` (and optionally on `v*` tags for publish).
2. Job steps (conceptually):
   - Checkout with full history (`fetchDepth: 0`) — needed for cliff/semver.
   - Install git-cliff (or use a container/task the org allows).
   - Compute next version from Conventional Commits since last tag.
   - Update `version.txt` + regenerate `CHANGELOG.md`.
   - Commit with a bot identity **or** open a PR (org policy decides).
   - Create annotated tag `vX.Y.Z` and push (needs contribute + create-tag
     permissions; often a project PAT or Azure DevOps service connection).
3. Optional: attach `CHANGELOG.md` section as pipeline release notes.

Do **not** invent org-specific service-connection names — ask or read existing
pipelines.

## Branch / PR policy (call out; may be manual)

- Require squash merge when possible.
- Require PR title pattern: `^(feat|fix|docs|chore|refactor|perf|test|ci)(\(.+\))?!?: .+`
- Document in `docs/RELEASE.md` if the agent cannot change project settings.

## Bootstrap (once)

1. Seed `CHANGELOG.md` and version file at the agreed starting semver.
2. Create the first annotated tag on default branch.
3. Ensure the pipeline identity can push tags (or document a human release step).

## Day-to-day

1. Merge PRs with Conventional Commit titles.
2. Pipeline updates changelog/version and tags (or opens a release PR — match
   what `project-context.md` records under `tooling` / `notes`).
3. Publish artifacts in a separate stage if the org already has one — do not
   conflate “changelog automation” with full CD unless asked.

## Escape hatches

- User prefers **Changesets** (JS monorepos) → use that instead of git-cliff;
  still persist platform in `project-context.md`.
- Git host is **GitHub** but CI is Azure Pipelines → prefer release-please via
  GitHub Actions unless policy forbids Actions; ask once
  (`references/platform-decision.md`).

# GitHub Actions + release-please

Load only when `platform` is `github-actions` (git host must be GitHub).

## Artifacts to add/update

| Path | Role |
|------|------|
| `.github/workflows/release-please.yml` | On push to default branch |
| `release-please-config.json` | Release type + changelog sections |
| `.release-please-manifest.json` | Last released version |
| `version.txt` (or package manifest) | Semver source for `simple` / extra-files |
| `CHANGELOG.md` | Maintained by Release PRs |
| `docs/RELEASE.md` | Human day-to-day + bootstrap |
| `.github/PULL_REQUEST_TEMPLATE.md` | Conventional Commit title checkbox |

## Minimal workflow

```yaml
name: release-please
on:
  push:
    branches: [main]   # use project default_branch
permissions:
  contents: write
  pull-requests: write
  issues: write
jobs:
  release-please:
    runs-on: ubuntu-latest
    steps:
      - uses: googleapis/release-please-action@v4
        with:
          config-file: release-please-config.json
          manifest-file: .release-please-manifest.json
```

## Minimal config (`simple` package)

```json
{
  "$schema": "https://raw.githubusercontent.com/googleapis/release-please/main/schemas/config.json",
  "packages": {
    ".": {
      "release-type": "simple",
      "changelog-path": "CHANGELOG.md",
      "bump-minor-pre-major": true,
      "extra-files": ["version.txt"]
    }
  }
}
```

Use `node` / `python` release-type when the repo already versions via
`package.json` / `pyproject.toml` — match evidence, don’t force `simple`.

Manifest example: `{ ".": "0.1.0" }`.

## Permissions (common failure)

If the job fails with *“GitHub Actions is not permitted to create or approve
pull requests”*:

**Settings → Actions → General → Workflow permissions** → enable
“Allow GitHub Actions to create and approve pull requests”
(or use a PAT per release-please-action docs).

Record the outcome under `notes` in `project-context.md`.

## Bootstrap (once)

1. Align manifest / version file / `CHANGELOG.md` `[x.y.z]` section.
2. Tag and push: `git tag -a vX.Y.Z -m "vX.Y.Z"` then push tag + default branch.
3. Later versions come from merging the Release PR only.

## Day-to-day

1. Squash-merge PRs with Conventional Commit titles.
2. release-please opens/updates a Release PR.
3. Maintainers merge the Release PR → GitHub Release + `vX.Y.Z` tag.

## Do not

- Install release-please against Azure Repos.
- Add Changesets or semantic-release alongside release-please unless the user
  explicitly wants a migration.

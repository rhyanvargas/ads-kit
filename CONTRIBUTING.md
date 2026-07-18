# Contributing to ADSK

Thanks for helping improve **The Agentic Development Starter Kit (ADSK)**.

## Principles

- **Portable first**: skill content lives in `skills/<name>/` (Agent Skills format).
- **No duplication**: Cursor commands/rules should reference skills, not copy them.
- **Discovery links**: after adding a first-party skill, run `./scripts/sync-adsk.sh kit` (or add relative symlinks under `.agents/skills/` and `.cursor/skills/` → `../../skills/<name>`).
- **Adopter product = profile adoption**: do not build a skill-marketplace or menu that competes with skills.sh. Follow [docs/product/create-adsk.md](docs/product/create-adsk.md) and [`profiles.json`](profiles.json); update those plus [`.cursor/docs/specs/create-adsk.md`](.cursor/docs/specs/create-adsk.md) together when changing the adopter path.
- **Evidence-based**: prefer links to real paths and agentskills.io guidance.
- **Eval when you change behavior**: update or add `evals/evals.json` cases for first-party skills.

Adopters (not contributing upstream) should use [docs/using-adsk.md](docs/using-adsk.md) instead of this guide.

## How to contribute

1. Fork and clone the repo.
2. Create a branch for your change.
3. Follow the layout in [AGENTS.md](AGENTS.md).
4. Validate skills if you touch them:
   ```bash
   npx --yes skills-ref validate ./skills/<skill-name>
   ```
   (or the current `skills-ref` install method from [agentskills.io](https://agentskills.io/specification#validation))
5. Open a PR with a clear description of *why* the change helps adopters.
6. Use a [Conventional Commits](https://www.conventionalcommits.org/) **PR title** (preferred with squash-merge) so [release-please](https://github.com/googleapis/release-please) can version and update `CHANGELOG.md` on release:

   | Prefix | Use for |
   |--------|---------|
   | `feat:` | User-visible capability (skills, adopter path, sync script) |
   | `fix:` | Bug fix |
   | `docs:` | Docs-only |
   | `chore:` | Internal / non-user-facing |
   | `feat!:` / `fix!:` | Breaking change |

   Release process: [docs/RELEASE.md](docs/RELEASE.md).

## Adding or changing skills

1. Edit under `skills/<name>/`; keep `SKILL.md` lean; put depth in `references/`.
2. **Run the optimization gates** via `skill-optimizer` (or `/optimize-skill`): validate, description triggers, progressive disclosure, `evals/trigger/` + `evals/evals.json`.
3. **Sync discovery links** — ask the agent “Sync ADSK” / `/sync-adsk`, or run:
   ```bash
   ./scripts/sync-adsk.sh kit
   ./scripts/sync-adsk.sh self-check
   ```
4. Recommended upstream skills: update [`recommended-skills.json`](recommended-skills.json) and [docs/lifecycle-coverage.md](docs/lifecycle-coverage.md). Do **not** vendor upstream trees into `skills/` or commit real folders / `skills-lock.json` under `.agents/skills/` (kit discovery = symlinks only).

See [docs/skill-authoring.md](docs/skill-authoring.md), [docs/evaluating-skills.md](docs/evaluating-skills.md), and [docs/upgrading.md](docs/upgrading.md#kit-maintainers).

## Code of conduct

By participating, you agree to uphold our [Code of Conduct](CODE_OF_CONDUCT.md).

## Security

Report vulnerabilities via [SECURITY.md](SECURITY.md) — do not open public issues for sensitive reports.

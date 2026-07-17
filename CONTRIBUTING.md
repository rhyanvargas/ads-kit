# Contributing to ADSK

Thanks for helping improve **The Agentic Development Starter Kit (ADSK)**.

## Principles

- **Portable first**: skill content lives in `skills/<name>/` (Agent Skills format).
- **No duplication**: Cursor commands/rules should reference skills, not copy them.
- **Discovery links**: after adding a first-party skill, add relative symlinks under `.agents/skills/` and `.cursor/skills/` → `../../skills/<name>`.
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

## Adding or changing skills

- First-party skills: edit under `skills/<name>/` and keep `SKILL.md` lean; put depth in `references/`.
- **Run the optimization gates** via `skill-optimizer` (or `/optimize-skill`): validate, description triggers, progressive disclosure, `evals/trigger/` + `evals/evals.json`.
- Recommended upstream skills: update [`recommended-skills.json`](recommended-skills.json) and [docs/lifecycle-coverage.md](docs/lifecycle-coverage.md) — do **not** vendor upstream trees unless maintainers agree.
- See [docs/skill-authoring.md](docs/skill-authoring.md) and [docs/evaluating-skills.md](docs/evaluating-skills.md).

## Code of conduct

By participating, you agree to uphold our [Code of Conduct](CODE_OF_CONDUCT.md).

## Security

Report vulnerabilities via [SECURITY.md](SECURITY.md) — do not open public issues for sensitive reports.

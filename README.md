# The Agentic Development Starter Kit (ADSK)

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)
[![Agent Skills](https://img.shields.io/badge/Agent_Skills-compatible-green.svg)](https://agentskills.io)

Portable, eval-ready starter for **spec-driven agentic development**. Use it with Cursor or any Agent Skills–compatible harness.

**Repository:** [`rhyanvargas/agentic-development-starter-kit`](https://github.com/rhyanvargas/agentic-development-starter-kit)  
*(If your remote still uses the old name `rhyan-cursor-docs`, rename the GitHub repo to match — see [docs/upgrading.md](docs/upgrading.md).)*

## What’s in here

| Layer | Path | Purpose |
|-------|------|---------|
| **Portable skills** | `skills/<name>/` | Source of truth (Agent Skills `SKILL.md`) |
| **Cursor commands** | `.cursor/commands/` | Slash workflows (`/draft-spec`, …) |
| **Cursor rules** | `.cursor/rules/` | Quality gates (testing, verify commands) |
| **Cursor skill links** | `.cursor/skills/` | Relative symlinks → `../../skills/<name>` |
| **Recommended upstream** | [`recommended-skills.json`](recommended-skills.json) | Pinned external skills (not vendored) |

## First-party skills

- **`spec-driven-workflow`** — spec → plan → implement → review (+ brownfield extract)
- **`devops-strategy-facilitator`** — concise CI/CD, branching, environments strategy

Lifecycle coverage and recommended upstream packs: [docs/lifecycle-coverage.md](docs/lifecycle-coverage.md).

## Quick start (Cursor)

```bash
git clone https://github.com/rhyanvargas/agentic-development-starter-kit.git
cd agentic-development-starter-kit
```

Open in Cursor, then:

1. `/quick-start`
2. `/draft-spec "idea"` → `/plan-impl` → `/implement-spec` → `/review`

### Copy into another project

```bash
cp -R .cursor /path/to/your-project/
cp -R skills /path/to/your-project/
# Ensure .cursor/skills/* → ../../skills/* (relative symlinks)
```

## Quick start (any Agent Skills harness)

```bash
npx skills add rhyanvargas/agentic-development-starter-kit -g
```

Skills install under `~/.agents/skills/`. Optional recommended pack:

```bash
# See recommended-skills.json for pinned sources
npx skills add obra/superpowers -g
npx skills add vercel-labs/skills@find-skills -g
```

Install modes and upgrades: [docs/upgrading.md](docs/upgrading.md).

## Docs

| Doc | Topic |
|-----|--------|
| [AGENTS.md](AGENTS.md) | Repo-level agent contract |
| [docs/skill-authoring.md](docs/skill-authoring.md) | agentskills.io best practices |
| [docs/evaluating-skills.md](docs/evaluating-skills.md) | Eval-driven iteration |
| [docs/evals/SCORECARD.md](docs/evals/SCORECARD.md) | Skill decision scorecard |
| [docs/lifecycle-coverage.md](docs/lifecycle-coverage.md) | Enterprise lifecycle map |
| [CONTRIBUTING.md](CONTRIBUTING.md) | How to contribute |
| [CHANGELOG.md](CHANGELOG.md) | Release notes |

## License

Apache License 2.0 — see [LICENSE](LICENSE) and [NOTICE](NOTICE).

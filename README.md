# The Agentic Development Starter Kit (ADSK)

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)
[![Agent Skills](https://img.shields.io/badge/Agent_Skills-compatible-green.svg)](https://agentskills.io)

Portable, eval-ready starter for **spec-driven agentic development**. Use it with Cursor or any Agent Skills–compatible harness.

**Repository:** [`rhyanvargas/agentic-development-starter-kit`](https://github.com/rhyanvargas/agentic-development-starter-kit)

## Use in your app (2 minutes)

In your project:

```bash
npx skills add rhyanvargas/agentic-development-starter-kit
```

Skills install under `.agents/skills/` (not a root `skills/` folder).

**Ask your agent:** “Sync ADSK” (or `/sync-adsk` after Cursor wiring is installed) — the agent should run [`scripts/sync-adsk.sh`](scripts/sync-adsk.sh). Adopters need a kit checkout path (or the agent clones one). Step-by-step: [docs/using-adsk.md](docs/using-adsk.md).

Later, skills only:

```bash
npx skills update
```

If the CLI asks for **Update scope**, choose **Project** for a normal app install. Details: [docs/using-adsk.md](docs/using-adsk.md#3-get-updates-later).

**Full guide** (Cursor `/` commands, updates, custom skills): [docs/using-adsk.md](docs/using-adsk.md).  
**Kit maintainers:** [docs/upgrading.md](docs/upgrading.md#kit-maintainers).

### Optional: Cursor slash commands

Skills work without slash commands. To add `/draft-spec`, `/sync-adsk`, and friends:

1. Clone ADSK once → keep the checkout.
2. Ask your agent to sync from that path, **or** run:

```bash
/path/to/adsk/scripts/sync-adsk.sh adopter --from /path/to/adsk
```

That syncs `.cursor/commands/` (paths → `.agents/skills/`), adds missing stock rules, and refreshes skills via the CLI.

## What’s in this kit repo

| Layer | Path | Purpose |
|-------|------|---------|
| **Package source** | `skills/<name>/` | What `npx skills add` publishes from |
| **Discovery (this repo)** | `.agents/skills/`, `.cursor/skills/` | Symlinks → `skills/` for local use of the kit |
| **Cursor wiring** | `.cursor/commands/`, `.cursor/rules/` | Optional slash commands + quality gates |
| **Recommended upstream** | [`recommended-skills.json`](recommended-skills.json) | Pinned external skills (not vendored) |

**Your app** should use `.agents/skills/` only — see [docs/using-adsk.md](docs/using-adsk.md).

## First-party skills

- **`spec-driven-workflow`** — spec → plan → implement → review (+ brownfield extract)
- **`devops-strategy-facilitator`** — concise CI/CD, branching, environments strategy
- **`skill-optimizer`** — author/optimize skills for trigger accuracy, clarity, and token cost

## Try this repo in Cursor

```bash
git clone https://github.com/rhyanvargas/agentic-development-starter-kit.git
cd agentic-development-starter-kit
```

Then `/quick-start` → `/draft-spec` → `/plan-impl` → `/implement-spec` → `/review`.

## Docs

| Doc | Topic |
|-----|--------|
| [docs/using-adsk.md](docs/using-adsk.md) | Adopter: install, ask-agent sync, Cursor, custom skills |
| [docs/upgrading.md](docs/upgrading.md) | Adopter + kit-maintainer sync/upgrade steps |
| [scripts/sync-adsk.sh](scripts/sync-adsk.sh) | Sync Cursor wiring + discovery links |
| [AGENTS.md](AGENTS.md) | Repo-level agent contract (kit maintainers) |
| [docs/skill-authoring.md](docs/skill-authoring.md) | Skill authoring |
| [docs/evaluating-skills.md](docs/evaluating-skills.md) | Eval-driven iteration |
| [docs/lifecycle-coverage.md](docs/lifecycle-coverage.md) | Enterprise lifecycle map |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Upstream contributions |
| [CHANGELOG.md](CHANGELOG.md) | Release notes |

## License

Apache License 2.0 — see [LICENSE](LICENSE) and [NOTICE](NOTICE).

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

Skills work without slash commands. To add `/draft-spec`, `/sync-adsk`, `/update-readme`, and friends:

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
| **Discovery (this repo)** | `.agents/skills/`, `.cursor/skills/` | Symlinks → `skills/` only (do not vendor upstream trees here) |
| **Cursor wiring** | `.cursor/commands/`, `.cursor/rules/` | Optional slash commands + quality gates |
| **Sync script** | [`scripts/sync-adsk.sh`](scripts/sync-adsk.sh) | Kit discovery links + adopter Cursor sync (`kit` / `adopter` / `self-check`) |
| **Recommended upstream** | [`recommended-skills.json`](recommended-skills.json) | Pinned external skills for **adopter apps** (not shipped as first-party) |

**Your app** should use `.agents/skills/` only — see [docs/using-adsk.md](docs/using-adsk.md).

## First-party skills

- **`spec-driven-workflow`** — spec → plan → implement → review (+ brownfield extract)
- **`devops-strategy-facilitator`** — concise CI/CD, branching, environments strategy
- **`skill-optimizer`** — author/optimize skills for trigger accuracy, clarity, and token cost
- **`readme-authoring`** — evidence-grounded README create/update/review (audience-aware; `/update-readme`)

## Recommended upstream (adopter apps)

Install after trust review — pins and commands in [`recommended-skills.json`](recommended-skills.json):

- **Recommended:** Superpowers (`writing-plans`, TDD, systematic debugging), Vercel Labs `find-skills`, Anthropic `skill-creator` (maintainers)
- **Optional:** product value loop pack + `frontend-design` (see below)

## Product value loop (optional)

To maximize customer value before (and while) you execute specs:

```text
Discover → Research → Prioritize → Plan → Execute → (measure) → Discover
```

Optional upstream skills (`inspired-product`, `mom-test`, `continuous-discovery`, `jobs-to-be-done`, `competitive-intelligence`, roadmap/prioritization) install **project-local** or **global** (`-g`) — see **[docs/product-value-loop.md](docs/product-value-loop.md)**. They complement ADSK SDD; they do not replace it. Pins live in [`recommended-skills.json`](recommended-skills.json).

## Try this repo in Cursor

```bash
git clone https://github.com/rhyanvargas/agentic-development-starter-kit.git
cd agentic-development-starter-kit
```

**Delivery path:** `/quick-start` → `/draft-spec` → `/plan-impl` → `/implement-spec` → `/review`.

**Product path (after installing the optional pack):** Discover/Research/Prioritize with the product skills → then the same ADSK delivery commands — see [docs/product-value-loop.md](docs/product-value-loop.md).

## Docs

**Adopters**

| Doc | Topic |
|-----|--------|
| [docs/using-adsk.md](docs/using-adsk.md) | Install, ask-agent sync, Cursor, custom skills |
| [docs/product-value-loop.md](docs/product-value-loop.md) | Optional discover → research → prioritize → plan → execute |
| [docs/upgrading.md](docs/upgrading.md) | Updates (adopter section) |

**Kit maintainers**

| Doc | Topic |
|-----|--------|
| [AGENTS.md](AGENTS.md) | Repo layout contract (package source vs discovery) |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Contributions; do not vendor upstream skills |
| [`scripts/sync-adsk.sh`](scripts/sync-adsk.sh) | `kit` / `self-check` after first-party skill changes |
| [docs/upgrading.md](docs/upgrading.md#kit-maintainers) | Sync / upgrade playbook |
| [docs/skill-authoring.md](docs/skill-authoring.md) / [evaluating-skills.md](docs/evaluating-skills.md) | Author + eval skills |
| [docs/lifecycle-coverage.md](docs/lifecycle-coverage.md) / [docs/evals/SCORECARD.md](docs/evals/SCORECARD.md) | Coverage map |
| [docs/RELEASE.md](docs/RELEASE.md) / [CHANGELOG.md](CHANGELOG.md) | release-please + Conventional Commits |

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Security reports: [SECURITY.md](SECURITY.md). Code of conduct: [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## License

Apache License 2.0 — see [LICENSE](LICENSE) and [NOTICE](NOTICE).

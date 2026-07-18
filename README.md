```text
 █████╗ ██████╗ ███████╗██╗  ██╗
██╔══██╗██╔══██╗██╔════╝██║ ██╔╝
███████║██║  ██║███████╗█████╔╝
██╔══██║██║  ██║╚════██║██╔═██╗
██║  ██║██████╔╝███████║██║  ██╗
╚═╝  ╚═╝╚═════╝ ╚══════╝╚═╝  ╚═╝
```

# The Agentic Development Starter Kit (ADSK)

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)
[![Agent Skills](https://img.shields.io/badge/Agent_Skills-compatible-green.svg)](https://agentskills.io)

A ready-to-adopt kit for agentic, spec-driven development — workflow skills, Cursor slash commands, and a versioned profile for your team.

**Repository:** [`rhyanvargas/agentic-development-starter-kit`](https://github.com/rhyanvargas/agentic-development-starter-kit)

### Two-tool model

| Tool | Owns |
|------|------|
| **`npx skills`** | Install and update skill folders into `.agents/skills/` |
| **`npx create-adsk`** | Adopt ADSK as a versioned **profile** (skills + Cursor wiring + `.adsk/config.json`) |

Use `npx skills` for skill folders alone. Use `npx create-adsk` when you want this kit’s workflow + Cursor commands adopted as a versioned profile. Profiles: [`profiles.json`](profiles.json). Contract: [docs/product/create-adsk.md](docs/product/create-adsk.md).

## Use in your app (2 minutes)

**Recommended — adopt a profile:**

```bash
# After publish to npm:
npx create-adsk --profile delivery --yes

# From a kit checkout (until npm publish):
npx --yes ./packages/create-adsk --profile delivery --yes
```

That installs the profile’s first-party skills, syncs Cursor commands when the profile includes them, and writes `.adsk/config.json`. Later: `npx create-adsk update` / `npx create-adsk status`. Package docs: [`packages/create-adsk`](packages/create-adsk).

**Skills only** (no Cursor wiring / no profile config):

```bash
npx skills add rhyanvargas/agentic-development-starter-kit
```

Skills install under `.agents/skills/` (not a root `skills/` folder). Updates: `npx skills update` (choose **Project** scope for a normal app install).

**Script-based Cursor sync** (without create-adsk): ask your agent “Sync ADSK” / `/sync-adsk`, or run [`scripts/sync-adsk.sh`](scripts/sync-adsk.sh) `adopter --from <kit>`. Step-by-step: [docs/using-adsk.md](docs/using-adsk.md).

**Full guide:** [docs/using-adsk.md](docs/using-adsk.md).  
**Kit maintainers:** [docs/upgrading.md](docs/upgrading.md#kit-maintainers).

### Optional: Cursor slash commands (script path)

Skills work without slash commands. If you are not using `create-adsk` and still want `/draft-spec`, `/sync-adsk`, `/update-readme`, and friends:

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
| **Adopter CLI** | [`packages/create-adsk`](packages/create-adsk) | `npx create-adsk` — init / update / status |
| **Sync script** | [`scripts/sync-adsk.sh`](scripts/sync-adsk.sh) | Kit discovery links + adopter Cursor sync (`kit` / `adopter` / `self-check`) |
| **Recommended upstream** | [`recommended-skills.json`](recommended-skills.json) | Pinned external skills for **adopter apps** (not shipped as first-party) |

**Your app** should use `.agents/skills/` only — see [docs/using-adsk.md](docs/using-adsk.md).

## First-party skills

- **`spec-driven-workflow`** — spec → plan → implement → review (+ brownfield extract)
- **`devops-strategy-facilitator`** — concise CI/CD, branching, environments strategy
- **`release-automation`** — Conventional Commits → changelog/semver (GitHub or Azure DevOps; `/setup-releases`)
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

Optional upstream skills (`inspired-product`, `mom-test`, `continuous-discovery`, `jobs-to-be-done`, `competitive-intelligence`, roadmap/prioritization) install **project-local** or **global** (`-g`) — see **[docs/product-value-loop.md](docs/product-value-loop.md)**. They complement ADSK spec-driven delivery; they do not replace it. Pins live in [`recommended-skills.json`](recommended-skills.json).

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
| [docs/using-adsk.md](docs/using-adsk.md) | Install, create-adsk, ask-agent sync, Cursor, custom skills |
| [docs/product/create-adsk.md](docs/product/create-adsk.md) | Product contract — create-adsk profiles |
| [packages/create-adsk](packages/create-adsk) | `create-adsk` CLI (init / update / status) |
| [`profiles.json`](profiles.json) | Machine-readable adopter profiles |
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

```text
 █████╗ ██████╗ ███████╗██╗  ██╗
██╔══██╗██╔══██╗██╔════╝██║ ██╔╝
███████║██║  ██║███████╗█████╔╝
██╔══██║██║  ██║╚════██║██╔═██╗
██║  ██║██████╔╝███████║██║  ██╗
╚═╝  ╚═╝╚═════╝ ╚══════╝╚═╝  ╚═╝
```

# create-adsk

Adopt the **Agentic Development Starter Kit (ADSK)** as a versioned **profile** — first-party skills via the skills CLI plus optional Cursor commands/rules — without a skills marketplace UX.

A ready-to-adopt kit for agentic, spec-driven development — workflow skills, Cursor slash commands, and a versioned profile for your team.

## Two-tool model

| Tool | Owns |
|------|------|
| **`npx skills`** | Install and update skill folders into `.agents/skills/` |
| **`npx create-adsk`** | Apply an ADSK profile (skills + Cursor + `.adsk/config.json`) |

Use `npx skills` to install skill folders. Use `npx create-adsk` when you want this kit’s workflow + Cursor adopted as a versioned profile in your repo.

## Quick start

```bash
# From an app repo (after npm publish):
npx create-adsk --profile delivery --yes

# From a kit checkout (until publish):
npx --yes /path/to/agentic-development-starter-kit/packages/create-adsk --profile delivery --yes
```

Profiles (`core` | `delivery` | `maintainer` | `skills-only`) are defined in the kit [`profiles.json`](../../profiles.json). Product contract: [`docs/product/create-adsk.md`](../../docs/product/create-adsk.md).

## Commands

```bash
npx create-adsk init --profile delivery --yes   # default command
npx create-adsk update                          # from .adsk/config.json
npx create-adsk status                          # profile + drift (exit 1 if drift)
npx create-adsk --help                          # skills-style banner + command list
```

Flags: `--yes` / `-y`, `--dry-run`, `--scope project|global`, `--force-rules`, `--with-optional-packs`, `--target <dir>`.

## Develop in this monorepo

```bash
# from kit root
./scripts/prepare-create-adsk-snapshot.sh
cd packages/create-adsk && npm install && npm test && npm run build
node dist/cli.js --help
```

## Publishing

Releases use npm [Trusted Publishing](https://docs.npmjs.com/trusted-publishers/) from [`.github/workflows/publish-create-adsk.yml`](../../.github/workflows/publish-create-adsk.yml) (OIDC + provenance). Day-to-day and bootstrap steps: [`docs/RELEASE.md`](../../docs/RELEASE.md).

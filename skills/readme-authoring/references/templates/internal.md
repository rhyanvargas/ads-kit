# Template — internal service / team project

**When to load:** Creating or major-restructuring an internal README.

Replace bracketed placeholders. Keep only sections you can support with evidence.

---

# [Service / Project Name]

[One sentence: what this does in the system.]

**Team**: [channel / owner]  
**On-call**: [rotation or link]

## Overview

[What it does, why it exists, upstream/downstream deps.]

## Local setup

### Prerequisites

- [Tools + versions]
- [VPN / access notes]

### Environment

| Variable | Purpose | Where to get it |
|----------|---------|-----------------|
| `…` | … | … |

### Run

```bash
# install + run from real scripts
```

### Test

```bash
# test command from CI or package scripts
```

## Architecture

[Short sketch or link to ARCHITECTURE.md. Key directories only.]

## Ops notes

- Deploy: [link or one-liner]
- Logs / dashboards: [links]
- Rollback: [pointer]

## Contributing

[Link AGENTS.md / CONTRIBUTING.md if present.]

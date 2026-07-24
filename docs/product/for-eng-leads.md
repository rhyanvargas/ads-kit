# For engineering leads — team skill adoption with ADSK

One-pager for leads who need an easy, flexible way to **find, add, optimize, version, manage, and deliver** agent skills — with consistency on high-blast-radius work, without stripping developer independence.

**Audience:** Eng lead / platform / staff engineer owning agentic workflow for a team or org.  
**Companion model:** [profiles-and-packs.md](profiles-and-packs.md)  
**Product contract:** [create-adsk.md](create-adsk.md) · [`profiles.json`](../../profiles.json)

---

## Strategy context

Teams already have a skills marketplace ([skills.sh](https://skills.sh), including [topics](https://www.skills.sh/topic)). Discovery is solved. What fails at team scale is **governance and delivery**: which skills are required, how they stay pinned and updated, how Cursor entrypoints stay shared, and how you avoid skill sprawl that fights itself — while still letting individuals explore.

## Target customer

| | |
|--|--|
| **Primary** | Eng lead standardizing agentic delivery across app repos |
| **Job** | Adopt a proven workflow kit once; keep high-stakes practices consistent; leave niche experimentation open |
| **Not for** | Someone who only wants to browse and install one-off skills (use `npx skills` / skills.sh) |

## Problem framing

> When my team uses coding agents, I need a **shared floor** for security, docs, delivery, and specs — versioned and updatable — without turning every engineer into a skill curator or blocking creative use of the long tail.

**Thesis:** **Process + feedback loops beat more agent power.** Stronger models without gated specs, tracer validation, fail-closed verify, and review still amplify bad habits. ADSK’s value is the trustworthy delivery spine — not raw model strength.

**Why now:** Agents amplify both good and bad habits. Without a team contract, each repo drifts (different SDD packs, README writers, release scripts). With only a catalog, you get installs but no update channel, Cursor wiring, or collision policy.

## Positioning (one sentence)

**skills.sh is the app store; ADSK is the team standard library + update channel** — profiles set how deep the standard goes, packs set which consistency domains you adopt, and developers still install anything else for creative work without forking the baseline.

| Layer | Owns | Does not own |
|-------|------|----------------|
| **[skills.sh](https://skills.sh) / `npx skills`** | Discover and install skill folders | Team profile, Cursor commands/rules, kit trust policy, drift status |
| **ADSK / `npx create-adsk`** | Versioned **profile** + optional **packs**, Cursor wiring, `.adsk/config.json`, `update` / `status` | Competing with topic browse or arbitrary skill menus |

## Solution: Profile × Pack

Do **not** organize the kit as domain menus that clone skills.sh topics (Design / Docs / Dev / …). That recreates discovery and fails the product kill test (“why not just `npx skills`?”).

Use two axes:

| Axis | Question | Examples (today) |
|------|----------|------------------|
| **Profile** | How deep is the kit in *this* repo? | `core` → `delivery` → `maintainer` (or `skills-only`) |
| **Pack** | Which methodology / consistency contracts do we adopt? | `product-value-loop`, `engineering-methods` — see [profiles-and-packs.md](profiles-and-packs.md) |

**Profile** = adoption depth (skills + Cursor/rules mode).  
**Pack** = opinionated composition: pinned skills, playbook, exclusions, trust notes — not a browse-by-topic index.

### Consistency without killing creativity

| | Mechanism |
|--|-----------|
| **Must stay consistent** (high blast radius) | Profile + required packs — e.g. spec→ship spine, DevOps/release (`delivery`), supply-chain + README standards (`maintainer`), product discovery loop when you opt in |
| **May stay independent** | Engineers still use skills.sh / `npx skills` for niche or experimental skills |
| **Guardrail** | [`recommended-skills.json`](../../recommended-skills.json) `do_not_add` — avoid colliding SDD/README stacks that fork the team baseline |

Same pattern as shared lint rules vs personal editor themes: **shared floor, personal ceiling**.

### What a pack must include (contract shape)

1. Skill list (first-party and/or pinned upstream)  
2. Cursor commands/rules delta when relevant  
3. Short playbook (stage map — when to invoke what)  
4. Explicit exclusions (redundant LLM knowledge + colliding skills)  
5. Trust pins + membership in `create-adsk update` / `status`

Generic “what is TDD / DDD” content belongs on skills.sh or in upstream packs (e.g. Superpowers), not as ADSK domain profiles — unless it encodes **your** conventions or a clear orchestration story into the SDD spine.

## How this maps to find → deliver

| Need | skills.sh alone | With ADSK |
|------|-----------------|-----------|
| **Find** | Topics + search | Use skills.sh to explore; kit endorses compositions |
| **Add** | Per-person, easy to diverge | `npx create-adsk` — profile (+ optional packs) → skills + Cursor + config |
| **Optimize** | Per-author skill quality | First-party skill-optimizer + playbooks that orchestrate upstream skills |
| **Version** | Ad hoc pins | Kit ref + pack pins + `.adsk/config.json` |
| **Manage** | Tribal README | `npx create-adsk status` / `update` against saved config |
| **Deliver** | Slack list of skills | Reproducible adopter path; shared slash commands |

## Adopt path (happy path)

```bash
npx create-adsk
```

1. Choose **profile** depth (`core` / `delivery` / `maintainer` / `skills-only`).  
2. Optionally select **packs** (defaults off) — e.g. `engineering-methods`, `product-value-loop`.  
3. Get skills under `.agents/skills/`, Cursor commands when applicable, and `.adsk/config.json`.

Later: `npx create-adsk update` · `npx create-adsk status`.  
Full adopter guide: [using-adsk.md](../using-adsk.md).

### Mandate vs leave open (suggested org policy)

| Mandate (example) | Leave open |
|-------------------|------------|
| Profile ≥ `core` (or `delivery` for shipping teams) | Personal / spike skills via `npx skills` |
| Supply-chain + README standards on maintainer-facing repos | UI craft / niche library skills from skills.sh |
| Company skills: `maintainer` + `/optimize-skill` + evals before ship | Re-running kit SCORECARD on every PR |
| Optional: product-value-loop when PMs share the agent workflow | Anything not in `do_not_add` |

Tune the mandate to org risk; the kit gives you the **mechanism**, not a single org policy.

### Skill evals (org policy)

**Thesis:** process + feedback loops beat more agent power — including skill quality loops. Treat evals as **maintainer work**, not an install feature.

| Policy | Detail |
|--------|--------|
| **Default** | Trust [evals/SCORECARD.md](../evals/SCORECARD.md) for first-party skills; do **not** re-benchmark every app PR |
| **Company skills** | Profile ≥ `maintainer`; `/optimize-skill` before ship; `/run-skill-evals` when behavior changes |
| **Re-run when** | Skill behavior/description changed, or the team switched models |
| **Do not** | Add hard LLM pass-rate CI gates yet; do not expect `create-adsk eval` (deferred) |

Adopter quick path: [using-adsk.md — Evaluating skills](../using-adsk.md#5-evaluating-skills-adopters). Playbook: [evaluating-skills.md](../evaluating-skills.md).

## When ADSK is the right kit

**Yes, if you want:**

- A shared delivery spine (spec → plan → implement → review) across apps  
- Optional methodology packs with pins and collision policy  
- Cursor as a first-class surface for those workflows  
- Deterministic update/status against a named contract  

**No, if you only want:**

- A skill browser → [skills.sh/topic](https://www.skills.sh/topic)  
- Free-form multi-select of every skill → out of product scope by design  
- Textbook methodology with no team convention → compose upstream; don’t fork the kit into a second catalog  

## Success signals

- Time-to-first `/draft-spec` (or equivalent) in a fresh app under ~2 minutes  
- New repos get the same profile/packs without a “which clone path?” thread  
- High-blast-radius practices (release, supply-chain, docs standards) stop diverging repo-to-repo  
- Individuals still add exploratory skills without changing the team baseline  

## Related docs

| Doc | Use |
|-----|-----|
| [agent-autonomy.md](agent-autonomy.md) | HITL vs AFK policy (docs only; no Ralph product) |
| [profiles-and-packs.md](profiles-and-packs.md) | Depth × methodology model; shipped vs planned |
| [create-adsk.md](create-adsk.md) | Adopter product contract |
| [using-adsk.md](../using-adsk.md) | Install / update / alternate paths |
| [evaluating-skills.md](../evaluating-skills.md) · [evals/SCORECARD.md](../evals/SCORECARD.md) | When to re-eval; published with/without deltas |
| [product-value-loop.md](../product-value-loop.md) | Optional discover → ship pack playbook |
| [`recommended-skills.json`](../../recommended-skills.json) | Pins, trust notes, `do_not_add` |
| [`profiles.json`](../../profiles.json) | Machine-readable profiles + optional packs |

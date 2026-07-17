# Token budget heuristics

Use when trimming `SKILL.md` or deciding what belongs in `references/`.

## Three tiers ([progressive disclosure](https://agentskills.io/specification#progressive-disclosure))

| Tier | Content | Budget signal |
|------|---------|---------------|
| Catalog | `name` + `description` | ~50–100 tokens per skill at session start |
| Instructions | Full `SKILL.md` body | Keep under ~5k tokens; prefer much leaner |
| Resources | `references/`, `scripts/`, `assets/` | Load only when `SKILL.md` says to |

## Cut / move / keep

Ask of each block: **Would the agent get this wrong without it?**

| Decision | Put it… |
|----------|---------|
| Needed on almost every activation | `SKILL.md` |
| Needed only for a phase or question | `references/` + when-to-load |
| Fragile sequence or mechanical check | `scripts/` + instruct to run |
| Kit packaging, slash-command catalog, “why this exists” rationale | Reference with a **hard** when-to-load (user asks why/how to install) — not soft “read for overview” |

## Common bloat in ADSK-style skills

- Full slash-command tables (link to a commands reference instead)
- Complementary/upstream install advice on every activate
- Domain primers the model already knows
- Equal menus of tools without a default
- Soft progressive-disclosure rows that invite loading rationale files early

## Target sizes (practical)

| Skill type | Prefer |
|------------|--------|
| Focused facilitator / optimizer | under ~800 tokens in `SKILL.md` |
| Multi-phase workflow | under ~1500 tokens in `SKILL.md` |
| Hard ceiling | 500 lines / ~5000 tokens ([best practices](https://agentskills.io/skill-creation/best-practices)) |

Measure roughly as `chars/4` if you lack a tokenizer; validate with real runs when optimizing for cost.

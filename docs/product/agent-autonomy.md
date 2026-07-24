# Agent autonomy — HITL vs AFK

When to keep a human in the loop versus letting background/loop agents run. **Docs and policy only** — ADSK does not ship an issue-tracker AFK product (no Ralph / GitHub-Issues clone).

**Audience:** Eng leads and senior ICs setting team norms.  
**Companion:** [for-eng-leads.md](for-eng-leads.md) · [engineering-methods.md](../engineering-methods.md)

---

## Default: stay HITL

Keep a human reviewing gates when:

| Situation | Why |
|-----------|-----|
| Spec / plan gates (Medium+) | Ambiguous requirements and scope need a person, not a transcript |
| Brownfield / unclear architecture | High risk of silent wrong assumptions |
| Security, auth, money, PII, destructive ops | Blast radius |
| Missing or weak verify (`project-cmds`) | No trustworthy “done” signal |
| Product discovery / prioritization | Use [`product-value-loop`](../product-value-loop.md); not autonomous ticket farming |

Executable engineering stays on first-party **`spec-driven-workflow`**. Discovery PRD work stays on **product-value-loop**. Do not add overlapping SDD / mattpocock spines as team packs.

---

## When AFK-ish work is OK

Background agents, Cursor Automations, or `/loop`-style runs are reasonable when **all** of these hold:

1. **Bounded item** — clear acceptance criteria (ideally a `REQ-XXX` or small ticket), not open-ended exploration
2. **Verify present** — `project-cmds` (or equivalent) exists and the agent must fail-closed if it fails
3. **Branch isolation** — work on a throwaway/feature branch; no direct push to protected defaults
4. **Sandbox / least privilege** — secrets and production access stay out of the agent’s path

Even then: prefer a short human review (diff + `/review --spec`) before merge.

---

## Non-goals

- ADSK does **not** ship a GitHub-Issues / Ralph-style AFK loop skill or pack
- Optional tools (Cursor Automations, loops, team CI) are fine; they are not a kit product surface
- Do not invent a second “autonomy profile” or competing SDD pack for AFK

---

## Lean always-on steering

Keep always-on text (rules / `AGENTS.md`) as **constraints**. Put playbook depth in skills + `references/`. See [skill-authoring.md](../skill-authoring.md) progressive disclosure and the Prefer table in kit `AGENTS.md`.

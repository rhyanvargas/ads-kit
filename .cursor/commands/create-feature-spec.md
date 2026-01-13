# Create Feature Specification

## Overview
Generate a well-documented feature specification in `docs/`. Ask clarifying questions first, perform research for spikes/ill-defined requests, then create the spec using the template at `.cursor/templates/feature-spec-template.md`.

## Parameters
Text after `/feature-spec` = scoping hints (e.g., `/feature-spec spike: email service options`).

## Rules
- **Documentation only** – do NOT edit application code.
- **Align to project rules** – read `.cursor/rules/`, `docs/`, `README.md`, `CONTRIBUTING.md`, `ARCHITECTURE.md` if they exist. All recommendations must follow these.
- **Create `docs/`** if missing.
- **Sources required** – include ≥3 up-to-date official doc links with access dates.
- **Unknown = TBD** – record in spec under **Open Questions**, proceed anyway.

## Steps

### 1. Classify request
- **SPIKE / discovery**: user says "spike", "research", "investigate", OR key requirements are missing.
- **Well-defined feature**: clear scope, requirements mostly known.

### 2. Discover project constraints
- Search for rule/tech-doc files (locations above). Read and note constraints.
- If not found, ask user: *"Where are your engineering standards documented?"* Add to Open Questions if unknown.

### 3. Ask clarifying questions (batched)
Ask in **3 batches**, waiting for answers between each. Mark unanswered items as **TBD**.

**Batch A – Basics**
- Feature name?
- Type? (feature | enhancement | bugfix | spike | chore | tech debt)
- Target area? (frontend | backend | full-stack | infra | docs)
- Priority + timeline?
- Owner / stakeholders?

**Batch B – Problem & Goals**
- Problem statement?
- Business/user goal (measurable)?
- Success criteria / acceptance criteria?
- Non-goals / out of scope?

**Batch C – Technical Scope** *(skip for pure spikes)*
- Data requirements (PII? retention)?
- API changes needed?
- DB changes needed?
- Security/compliance constraints?
- Observability needs?
- Rollout plan needs (feature flag, backout)?

### 4. Research + Discovery (SPIKE only)
If classified as spike:
1. Convert prompt into 3–8 research questions.
2. Gather ≥2–3 options from official docs (SDKs, auth, rate limits, pricing, compliance).
3. Build lightweight evaluation matrix (pros/cons/fit vs project constraints).
4. Draft recommendation + POC plan (or "decision deferred" if insufficient data).

### 5. Collect sources
- ≥3 official doc links, each with: **title**, **URL**, **access date (YYYY-MM-DD)**, **relevance**.

### 6. Create spec document
- Ensure `docs/` exists.
- Filename: `docs/feature-spec-<slug>.md` (lowercase, spaces → `-`).
- Populate using template at `.cursor/templates/feature-spec-template.md`.
- Replace placeholders; use **TBD** for unknowns and mirror each in **Open Questions**.

## Completion Checklist
Before finishing, verify:
- [ ] Project rules/docs were checked (or gap noted in Open Questions)
- [ ] All 3 question batches asked (or skipped with reason)
- [ ] SPIKE research done if applicable
- [ ] ≥3 sources with access dates included
- [ ] `docs/` directory exists
- [ ] Spec file created at `docs/feature-spec-<slug>.md`
- [ ] All TBDs mirrored in Open Questions

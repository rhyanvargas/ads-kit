# Feature Specification Template

> **Usage**: This template is used by the `/feature-spec` command. Copy the structure below into the generated spec file.

---

## Feature Specification: {{FEATURE_NAME}}

### Metadata
| Field | Value |
|-------|-------|
| **Type** | {{feature \| enhancement \| bugfix \| spike \| chore \| tech debt}} |
| **Status** | Draft |
| **Owner / DRI** | {{name}} |
| **Stakeholders** | {{names}} |
| **Priority** | {{P0/P1/P2/P3}} |
| **Timeline** | {{target date/range}} |
| **Affected area(s)** | {{frontend \| backend \| full-stack \| infra \| docs}} |

---

### Summary
{{1–3 sentences: what is being built and why}}

### Problem Statement
{{What problem are we solving? Who is impacted? Current behavior?}}

### Goals / Success Criteria
- {{goal 1 – measurable if possible}}
- {{goal 2}}

### Non-goals / Out of Scope
- {{explicitly excluded item}}

---

### User Impact
- **Primary users**: {{who}}
- **User journey (happy path)**:
  1. {{step}}
  2. {{step}}
- **Edge cases**:
  - {{case}}

---

### Requirements

#### Functional
- {{requirement}}

#### Non-functional
| Aspect | Details |
|--------|---------|
| **Performance** | {{SLOs/constraints}} |
| **Reliability** | {{retry/backoff, idempotency, SLAs}} |
| **Security/Privacy** | {{authz/authn, PII handling, encryption, secrets}} |
| **Compliance** | {{if applicable}} |
| **Accessibility** | {{if frontend}} |

---

### Proposed Solution (High-level)
{{System-level approach; key components and responsibilities}}

### Detailed Design

#### Architecture / Components
- **{{component}}**: {{responsibility}}

#### API Design (if applicable)
- **Endpoints**:
  - `{{METHOD}} {{PATH}}`: {{purpose}}
- **Auth**: {{mechanism}}
- **Error handling**: {{pattern}}

#### Data Model / Storage (if applicable)
- **Schema changes**:
  - {{table/collection}}: {{change}}
- **Migration plan**:
  1. {{step}}

#### Security Considerations
- {{threat}}: {{mitigation}}
- **Secrets management**: {{approach}}

#### Observability
| Type | Details |
|------|---------|
| **Logs** | {{what, where, redaction rules}} |
| **Metrics** | {{counters/timers}} |
| **Tracing** | {{span boundaries if relevant}} |
| **Audit** | {{actions needing audit}} |

---

### Testing Plan
- **Unit tests**: {{what}}
- **Integration tests**: {{what}}
- **E2E tests** (if applicable): {{what}}

### Rollout Plan
- **Feature flag**: {{yes/no + strategy}}
- **Deployment steps**:
  1. {{step}}
  2. {{step}}
- **Backout plan**: {{how to revert safely}}

### Risks / Tradeoffs
| Risk | Mitigation |
|------|------------|
| {{risk}} | {{mitigation}} |

---

### Discovery & Research (SPIKE only)
> Include this section only if **Type = spike** or feature is not yet well-defined.

#### Research Questions
- {{question}}

#### Options Considered
| Option | Description | Fit |
|--------|-------------|-----|
| A | {{what}} | {{high-level fit}} |
| B | {{what}} | {{high-level fit}} |
| C | {{what}} | {{high-level fit}} |

#### Evaluation Criteria
- {{criterion 1}}
- {{criterion 2}}

#### Evaluation Matrix
| Option | Pros | Cons | Open questions | Fit vs constraints |
|--------|------|------|----------------|-------------------|
| A | {{...}} | {{...}} | {{...}} | {{...}} |
| B | {{...}} | {{...}} | {{...}} | {{...}} |

#### Recommendation / Next Steps
- **Recommendation**: {{choose option or defer}}
- **POC plan**: {{what to build/measure}}
- **Decision deadline**: {{date}}

---

### Open Questions
- {{question 1}}
- {{question 2}}

---

### Sources (latest docs)
> Official documentation links required. Each entry must include an access date.

| Source | URL | Accessed | Relevance |
|--------|-----|----------|-----------|
| {{Title}} | {{URL}} | {{YYYY-MM-DD}} | {{why relevant}} |
| {{Title}} | {{URL}} | {{YYYY-MM-DD}} | {{why relevant}} |
| {{Title}} | {{URL}} | {{YYYY-MM-DD}} | {{why relevant}} |

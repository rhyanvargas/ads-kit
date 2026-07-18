# Section checklist by project type

**When to load:** Choosing sections for a new README, or auditing an existing one for audience fit.

| Section | OSS | Personal | Internal | Config |
|---------|-----|----------|----------|--------|
| Name + one-line description | Yes | Yes | Yes | Yes |
| Badges (≤3–4) | Optional | Optional | No | No |
| Problem / about | Yes | Yes | Yes | Brief “what’s here” |
| Installation / setup | Yes | Yes | Yes | No (or “apply these files”) |
| Quick start / usage | Yes | Yes | Yes | Brief |
| Features | Optional | Optional | Optional | No |
| Public API | Libs only | Optional | Rare | No |
| Architecture / key paths | Optional | No | Yes | No |
| Env vars / secrets pointers | If needed | If needed | Yes | Gotchas |
| Contributing | Yes | Optional | Yes (or link) | No |
| License | Yes | Optional | No | No |
| Team / on-call | No | No | Yes | No |
| How to extend | Optional | No | Optional | Yes |
| Gotchas / last reviewed | Optional | Optional | Yes | Yes |
| Links to AGENTS / ARCHITECTURE / docs | If exist | If exist | If exist | If exist |

## Minimum viable README (all types)

1. **Name** — clear title  
2. **What + why** — 1–3 sentences  
3. **How to use** — install/run or “what’s here” + one concrete path  

## Ordering defaults

**OSS / libraries:** Heading → (TOC if long) → Install → Quick start → About → Usage/API → Contributing → License  

**Internal / services:** Heading → Overview → Local setup → Run/test → Architecture/key files → Ops notes → Contributing links  

**Config:** Heading → What’s here → Why → How to extend → Gotchas  

Omit sections with nothing true to say. Prefer links over pasting long docs into the README.

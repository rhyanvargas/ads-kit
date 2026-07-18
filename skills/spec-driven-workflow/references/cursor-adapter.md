# Cursor adapter

Load when artifact homes resolve to Cursor paths, or when the user invoked a Cursor `/` command (`/draft-spec`, `/plan-impl`, etc.).

Slash commands under `.cursor/commands/` are **optional UX**. Portable behavior lives in the skill + `artifact-homes.md`.

## Default homes (Cursor)

| Artifact | Path |
|----------|------|
| Specs | `.cursor/docs/specs/{feature-name}.md` |
| Plans | `.cursor/plans/{feature-name}.plan.md` |
| Rules / commands / templates | `.cursor/rules/`, `.cursor/commands/`, `.cursor/templates/` |

Still honor explicit `--out` and existing `docs/specs/` convention when the project already uses it.

## Cursor Plan file format (required)

Plans written under `.cursor/plans/` **must** include YAML frontmatter with a non-empty `todos` array. Cursor’s Plan UI reads this frontmatter — a body-only REQ→task table leaves **0 To-dos**.

```markdown
---
name: short plan title
overview: one-paragraph summary
todos:
  - id: T1
    content: "REQ-006 — migrate additionalFields"
    status: pending
  - id: T2
    content: "REQ-001 — createAuth + drizzle pg"
    status: pending
isProject: false
---

# Plan title

## Requirements → tasks

| Requirement | Tasks |
|-------------|---------|
| REQ-001 … | T2, T3 |

## Tasks

### T1 — …
…
```

### Todo rules

- `id`: stable short ids (`T1`, `T2`, …)
- `content`: actionable; prefer embedding the primary `REQ-XXX`
- `status`: `pending` | `in_progress` | `completed` | `cancelled`
- Keep frontmatter todos in sync with the body table as work progresses
- On `/implement-spec`, update matching todo `status` as steps complete

## Slash command examples

```
/draft-spec "Add email/password auth"
/plan-impl .cursor/docs/specs/user-auth.md
/implement-spec .cursor/plans/user-auth.plan.md
/review --spec .cursor/docs/specs/user-auth.md
/extract-spec src/auth/
```

Override output when needed:

```
/draft-spec "feature" --out docs/specs/custom-name.md
```

## `/quick-start` (Cursor)

When Cursor wiring is present, update `.cursor/rules/project/` and `project-cmds` with detected verify commands. Confirm skills are discoverable under `.agents/skills/` (or kit symlinks). Point missing installs to `docs/using-adsk.md`.

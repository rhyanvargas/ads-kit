# Extending the Starter

Add custom rules, commands, and workflows to fit your project.

## When to Extend

### Add a rule when:
- The agent makes the same mistake repeatedly
- You have project-specific conventions
- You need to document domain knowledge

### Add a command when:
- You repeat a multi-step workflow
- You want to standardize a process
- You need domain-specific automation

## Adding Rules

Rules live in `.cursor/rules/<name>/RULE.md`. Control apply mode with frontmatter (`alwaysApply`, `globs`).

### Create a new rule

1. Open `.cursor/templates/rule-templates.md`, copy the section you need into `.cursor/rules/<name>/RULE.md`.

2. Customize for your project

3. The agent will pick it up automatically

### Rule file format

```markdown
---
description: What this rule covers
alwaysApply: true
---

# Rule Name

## Section 1
- Guideline
```

### Tips for rules
- Keep rules focused (one topic per rule folder)
- Be specific (vague rules are ignored)
- Update when patterns change
- Remove outdated rules

### Example: Domain rule

`.cursor/rules/domain/RULE.md`:
```markdown
---
description: E-commerce domain terminology and business rules
alwaysApply: true
---

# E-commerce Domain Rules

## Terminology
- "Order" = a customer purchase
- "Cart" = items before checkout
- "SKU" = product identifier

## Business Rules
- Orders cannot be modified after payment
- Carts expire after 24 hours
- Prices are in cents (integer)

## Naming
- Use "Order" not "Purchase"
- Use "Cart" not "Basket"
```

---

## Adding Skills

Skills live in `.cursor/skills/<name>/SKILL.md` (optional `references/`, `scripts/`, `assets/`).

### Create a new skill

1. Create `.cursor/skills/my-skill/SKILL.md` with `name` + `description` frontmatter
2. Put deep docs in `references/` and link them from `SKILL.md`
3. Prefer agent auto-apply via a specific description; set `disable-model-invocation: true` only for slash-only skills

Do not duplicate the same skill under `.agents/skills/` in this template.

---

## Adding Commands

Commands live in `.cursor/commands/` and are invoked with `/`.

### Create a new command

1. Create a markdown file:
   ```bash
   touch .cursor/commands/my-command.md
   ```

2. Add the command structure:
   ```markdown
   # /my-command

   Description of what this command does.

   ## Usage
   ```
   /my-command [arguments]
   ```

   ## Behavior
   1. Step 1
   2. Step 2

   ## Instructions
   When the user invokes `/my-command`:
   1. Do this
   2. Then this
   ```

3. The command appears in Cursor's `/` menu

### Command best practices
- Clear, descriptive name
- Document usage and examples
- Define explicit behavior
- Handle edge cases

### Example: Database migration command

`.cursor/commands/migrate-db.md`:
```markdown
# /migrate-db

Generate and run database migrations.

## Usage
```
/migrate-db "add email to users"
```

## Behavior
1. Generate migration file
2. Apply migration
3. Update TypeScript types

## Instructions
When the user invokes `/migrate-db`:
1. Parse the migration description
2. Generate migration in `migrations/`
3. Run `npm run db:migrate`
4. Regenerate types with `npm run db:types`
5. Report success or errors
```

---

## Customizing Templates

`.cursor/templates/rule-templates.md` holds consolidated rule templates. `/quick-start` can merge detected project info with content from these patterns.

### Modify templates

Edit `rule-templates.md` and adjust the section(s) you use. Copy updated content into `.cursor/rules/<name>/RULE.md` as needed.

### Add a new template section

Add a new section to `rule-templates.md` and document what to copy to which rule file.

---

## Workflow Customization

### Modify existing workflows

Edit the command files to change behavior:
- `draft-spec.md` - Change spec structure
- `plan-impl.md` - Change plan format
- `implement-spec.md` - Change implementation process
- `review.md` - Change review checklist

### Create new workflows

Combine commands for project-specific flows:

`.cursor/commands/feature-flow.md`:
```markdown
# /feature-flow

Run the complete feature workflow.

## Usage
```
/feature-flow "feature description"
```

## Instructions
1. Run `/draft-spec "feature description"`
2. Wait for user to approve spec
3. Run `/plan-impl` on the spec
4. Wait for user to approve plan
5. Run `/implement-spec` on the plan
6. Run `/review --spec` on the result
7. Report completion
```

---

## Sharing Extensions

### Export for team use

1. Commit your `.cursor/` folder to git
2. Document custom rules and commands
3. Team members get extensions on pull

### Import from others

1. Copy their `.cursor/` extensions
2. Review and customize for your project
3. Remove what doesn't apply

### Community resources

- Cursor community rules and commands
- Anthropic skills repository
- Project-specific starter templates

---

## Maintenance

### Keep extensions current

- Review rules quarterly
- Remove unused commands
- Update for new patterns

### Document your extensions

Create a `CURSOR.md` in your project:
```markdown
# Cursor Extensions

## Custom Rules
- `domain/` - Business domain terminology

## Custom Commands
- `/migrate-db` - Database migrations
- `/deploy` - Deployment workflow

## Modifications
- `/review` - Added security checklist
```

### Version your extensions

Track changes in git like code:
```bash
git add .cursor/
git commit -m "Add domain rules for e-commerce"
```

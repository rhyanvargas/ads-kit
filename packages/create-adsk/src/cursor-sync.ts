import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { basename, join } from "node:path";
import { rewriteCommandBody } from "./path-rewrite.js";
import type { CursorMode, RulesMode } from "./types.js";

/** Match STOCK_RULES in scripts/sync-adsk.sh */
export const STOCK_RULES = ["skill-authoring", "testing", "project-cmds"] as const;

export function listSkillNamesFromSnapshot(snapshotRoot: string): string[] {
  const skillsDir = join(snapshotRoot, "skills");
  if (existsSync(skillsDir)) {
    return readdirSync(skillsDir).filter((name) =>
      existsSync(join(skillsDir, name, "SKILL.md")),
    );
  }
  // Snapshot may omit skills/; derive names from profiles.json
  try {
    const profiles = JSON.parse(
      readFileSync(join(snapshotRoot, "profiles.json"), "utf8"),
    ) as { profiles: Record<string, { skills: string[] }> };
    const set = new Set<string>();
    for (const p of Object.values(profiles.profiles ?? {})) {
      for (const s of p.skills ?? []) set.add(s);
    }
    return [...set].sort();
  } catch {
    return [];
  }
}

export function syncCursor(opts: {
  snapshotRoot: string;
  appRoot: string;
  cursor: CursorMode;
  rules: RulesMode;
  forceRules: boolean;
  dryRun: boolean;
}): { commandsWritten: string[]; rulesWritten: string[]; skipped: string[] } {
  const commandsWritten: string[] = [];
  const rulesWritten: string[] = [];
  const skipped: string[] = [];

  if (opts.cursor === "none") {
    return { commandsWritten, rulesWritten, skipped };
  }

  const skillNames = listSkillNamesFromSnapshot(opts.snapshotRoot);
  const srcCmds = join(opts.snapshotRoot, ".cursor", "commands");
  const destCmds = join(opts.appRoot, ".cursor", "commands");

  if (!existsSync(srcCmds)) {
    throw new Error(`missing ${srcCmds}`);
  }

  if (!opts.dryRun) {
    mkdirSync(destCmds, { recursive: true });
  }

  for (const entry of readdirSync(srcCmds)) {
    if (!entry.endsWith(".md")) continue;
    const src = join(srcCmds, entry);
    if (!statSync(src).isFile()) continue;
    const body = rewriteCommandBody(readFileSync(src, "utf8"), skillNames);
    const dest = join(destCmds, entry);
    if (opts.dryRun) {
      commandsWritten.push(entry);
      continue;
    }
    writeFileSync(dest, body, "utf8");
    commandsWritten.push(entry);
  }

  if (opts.rules === "stock") {
    const srcRules = join(opts.snapshotRoot, ".cursor", "rules");
    const destRules = join(opts.appRoot, ".cursor", "rules");
    if (existsSync(srcRules)) {
      if (!opts.dryRun) mkdirSync(destRules, { recursive: true });
      for (const name of STOCK_RULES) {
        const srcDir = join(srcRules, name);
        if (!existsSync(srcDir) || !statSync(srcDir).isDirectory()) continue;
        const destDir = join(destRules, name);
        if (existsSync(destDir) && !opts.forceRules) {
          skipped.push(name);
          continue;
        }
        if (opts.dryRun) {
          rulesWritten.push(name);
          continue;
        }
        rmSync(destDir, { recursive: true, force: true });
        mkdirSync(destDir, { recursive: true });
        cpSync(srcDir, destDir, { recursive: true });
        rulesWritten.push(name);
      }
    }
  }

  if (!opts.dryRun) {
    mkdirSync(join(opts.appRoot, ".cursor", "docs", "specs"), {
      recursive: true,
    });
    mkdirSync(join(opts.appRoot, ".cursor", "plans"), { recursive: true });
  }

  return { commandsWritten, rulesWritten, skipped };
}

export function commandBasenames(snapshotRoot: string): string[] {
  const srcCmds = join(snapshotRoot, ".cursor", "commands");
  if (!existsSync(srcCmds)) return [];
  return readdirSync(srcCmds)
    .filter((e) => e.endsWith(".md"))
    .map((e) => basename(e));
}

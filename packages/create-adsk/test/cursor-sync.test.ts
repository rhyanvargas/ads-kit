import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { syncCursor } from "../src/cursor-sync.js";
import { rewriteCommandBody } from "../src/path-rewrite.js";
import { makeTempApp, snapshotRoot } from "./helpers/temp-app.js";

describe("path rewrite", () => {
  it("rewrites bare skills/ paths to .agents/skills/", () => {
    const body = "See skills/spec-driven-workflow for details.";
    expect(rewriteCommandBody(body, ["spec-driven-workflow"])).toBe(
      "See .agents/skills/spec-driven-workflow for details.",
    );
  });

  it("does not double-prefix .agents/skills/", () => {
    const body = "Already .agents/skills/spec-driven-workflow ok.";
    expect(rewriteCommandBody(body, ["spec-driven-workflow"])).toBe(body);
  });

  it("strips redundant adopter parenthetical", () => {
    const body =
      "Use skill-optimizer (or .agents/skills/skill-optimizer in adopter apps).";
    expect(rewriteCommandBody(body, ["skill-optimizer"])).toBe(
      "Use skill-optimizer.",
    );
  });
});

describe("syncCursor", () => {
  it("skills-only / cursor none writes no .cursor/commands", () => {
    const app = makeTempApp();
    syncCursor({
      snapshotRoot: snapshotRoot(),
      appRoot: app,
      cursor: "none",
      rules: "none",
      forceRules: false,
      dryRun: false,
    });
    expect(existsSync(join(app, ".cursor", "commands"))).toBe(false);
  });

  it("writes translated commands when cursor=commands", () => {
    const app = makeTempApp();
    const result = syncCursor({
      snapshotRoot: snapshotRoot(),
      appRoot: app,
      cursor: "commands",
      rules: "none",
      forceRules: false,
      dryRun: false,
    });
    expect(result.commandsWritten.length).toBeGreaterThan(0);
    const sample = join(app, ".cursor", "commands", "draft-spec.md");
    expect(existsSync(sample)).toBe(true);
    const text = readFileSync(sample, "utf8");
    expect(text).toMatch(/\.agents\/skills\/spec-driven-workflow/);
    expect(text).not.toMatch(/(^|[^/])skills\/spec-driven-workflow/);
  });

  it("preserves existing stock rule without forceRules", () => {
    const app = makeTempApp();
    const ruleDir = join(app, ".cursor", "rules", "project-cmds");
    mkdirSync(ruleDir, { recursive: true });
    writeFileSync(join(ruleDir, "RULE.md"), "# kept\n", "utf8");

    const result = syncCursor({
      snapshotRoot: snapshotRoot(),
      appRoot: app,
      cursor: "commands",
      rules: "stock",
      forceRules: false,
      dryRun: false,
    });
    expect(result.skipped).toContain("project-cmds");
    expect(readFileSync(join(ruleDir, "RULE.md"), "utf8")).toBe("# kept\n");
  });
});

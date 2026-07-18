import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { writeConfig } from "../src/config.js";
import type { RunCommand } from "../src/skills.js";
import { runUpdate } from "../src/update.js";
import type { AdskConfig } from "../src/types.js";
import { makeTempApp, snapshotRoot } from "./helpers/temp-app.js";

function fakeUpdateRunner(calls: string[][]): RunCommand {
  return async (argv) => {
    calls.push(argv);
    return { code: 0, argv };
  };
}

describe("update integration", () => {
  // REQ-008
  it("update refreshes skills and Cursor without --from", async () => {
    const app = makeTempApp();
    const cfg: AdskConfig = {
      version: 1,
      profile: "delivery",
      cursor: "commands",
      rules: "none",
      scope: "project",
      kitRef: "old@ref",
      optionalPacks: [],
    };
    writeConfig(app, cfg);
    mkdirSync(join(app, ".agents", "skills", "spec-driven-workflow"), {
      recursive: true,
    });
    writeFileSync(
      join(app, ".agents", "skills", "spec-driven-workflow", "SKILL.md"),
      "# s\n",
    );

    const calls: string[][] = [];
    const next = await runUpdate({
      target: app,
      dryRun: false,
      forceRules: false,
      snapshotRoot: snapshotRoot(),
      run: fakeUpdateRunner(calls),
    });

    expect(calls[0].join(" ")).toContain("skills update");
    expect(calls[0]).toContain("-p");
    expect(existsSync(join(app, ".cursor", "commands", "draft-spec.md"))).toBe(
      true,
    );
    expect(next.kitRef).not.toBe("old@ref");
  });

  it("update with cursor none skips Cursor writes", async () => {
    const app = makeTempApp();
    writeConfig(app, {
      version: 1,
      profile: "skills-only",
      cursor: "none",
      rules: "none",
      scope: "project",
      kitRef: "old@ref",
      optionalPacks: [],
    });
    await runUpdate({
      target: app,
      dryRun: false,
      forceRules: false,
      snapshotRoot: snapshotRoot(),
      run: fakeUpdateRunner([]),
    });
    expect(existsSync(join(app, ".cursor", "commands"))).toBe(false);
  });
});

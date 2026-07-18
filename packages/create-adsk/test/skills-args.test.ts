import { describe, expect, it } from "vitest";
import {
  buildOptionalPackArgv,
  buildSkillsAddArgv,
  buildSkillsUpdateArgv,
} from "../src/skills.js";

describe("skills argv builders", () => {
  it("builds project skills add with --skill per skill and -y", () => {
    const argv = buildSkillsAddArgv({
      kitSource: "rhyanvargas/agentic-development-starter-kit",
      skills: [
        "spec-driven-workflow",
        "devops-strategy-facilitator",
        "release-automation",
      ],
      scope: "project",
      yes: true,
    });
    expect(argv).toEqual([
      "npx",
      "--yes",
      "skills",
      "add",
      "rhyanvargas/agentic-development-starter-kit",
      "--skill",
      "spec-driven-workflow",
      "--skill",
      "devops-strategy-facilitator",
      "--skill",
      "release-automation",
      "-y",
    ]);
    expect(argv.join(" ")).not.toMatch(/\bfind\b/);
    expect(argv.join(" ")).not.toMatch(/catalog/);
  });

  it("adds -g for global scope", () => {
    const argv = buildSkillsAddArgv({
      kitSource: "kit",
      skills: ["spec-driven-workflow"],
      scope: "global",
      yes: true,
    });
    expect(argv).toContain("-g");
  });

  it("builds skills update with -p for project", () => {
    expect(buildSkillsUpdateArgv({ scope: "project", yes: true })).toEqual([
      "npx",
      "--yes",
      "skills",
      "update",
      "-y",
      "-p",
    ]);
  });

  it("builds skills update with -g for global", () => {
    expect(buildSkillsUpdateArgv({ scope: "global", yes: true })).toEqual([
      "npx",
      "--yes",
      "skills",
      "update",
      "-y",
      "-g",
    ]);
  });

  it("ensures -y on optional pack install and strips -g for project", () => {
    const argv = buildOptionalPackArgv(
      "npx skills add wondelai/skills --skill mom-test -g",
      "project",
      true,
    );
    expect(argv).not.toContain("-g");
    expect(argv).toContain("-y");
  });
});

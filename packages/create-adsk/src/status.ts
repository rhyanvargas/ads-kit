import { existsSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { readConfig } from "./config.js";
import { commandBasenames } from "./cursor-sync.js";
import { getProfile, loadProfiles } from "./profiles.js";
import { getSnapshotRoot } from "./snapshot.js";

export interface StatusResult {
  configPresent: boolean;
  profile?: string;
  kitRef?: string;
  cursor?: string;
  rules?: string;
  scope?: string;
  optionalPacks?: string[];
  drift: string[];
  exitCode: number;
}

export function runStatus(opts: {
  target: string;
  snapshotRoot?: string;
}): StatusResult {
  const cfg = readConfig(opts.target);
  if (!cfg) {
    console.log("No .adsk/config.json — run `npx create-adsk init`.");
    return { configPresent: false, drift: ["missing config"], exitCode: 1 };
  }

  const snapshotRoot = getSnapshotRoot(opts.snapshotRoot);
  const profiles = loadProfiles(snapshotRoot);
  const profile = getProfile(profiles, cfg.profile);
  const skillsRoot =
    cfg.scope === "global"
      ? join(homedir(), ".agents", "skills")
      : join(opts.target, ".agents", "skills");

  const drift: string[] = [];
  for (const skill of profile.skills) {
    const skillMd = join(skillsRoot, skill, "SKILL.md");
    if (!existsSync(skillMd)) {
      drift.push(`missing skill: ${skill} (${skillMd})`);
    }
  }

  if (cfg.cursor === "commands") {
    for (const cmd of commandBasenames(snapshotRoot)) {
      const dest = join(opts.target, ".cursor", "commands", cmd);
      if (!existsSync(dest)) {
        drift.push(`missing command: ${cmd}`);
      }
    }
  }

  console.log(`profile:       ${cfg.profile}`);
  console.log(`kitRef:        ${cfg.kitRef}`);
  console.log(`cursor:        ${cfg.cursor}`);
  console.log(`rules:         ${cfg.rules}`);
  console.log(`scope:         ${cfg.scope}`);
  console.log(`optionalPacks: ${cfg.optionalPacks.join(", ") || "(none)"}`);
  if (drift.length === 0) {
    console.log("drift:         none");
  } else {
    console.log("drift:");
    for (const d of drift) console.log(`  - ${d}`);
  }

  return {
    configPresent: true,
    profile: cfg.profile,
    kitRef: cfg.kitRef,
    cursor: cfg.cursor,
    rules: cfg.rules,
    scope: cfg.scope,
    optionalPacks: cfg.optionalPacks,
    drift,
    exitCode: drift.length === 0 ? 0 : 1,
  };
}

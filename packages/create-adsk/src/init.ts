import * as p from "@clack/prompts";
import { writeConfig } from "./config.js";
import { syncCursor } from "./cursor-sync.js";
import {
  findOptionalPack,
  getProfile,
  isProfileId,
  listProfileIds,
  loadProfiles,
  loadRecommendedSkills,
} from "./profiles.js";
import { getSnapshotRoot, readKitRef } from "./snapshot.js";
import {
  buildOptionalPackArgv,
  buildSkillsAddArgv,
  runSkills,
  type RunCommand,
} from "./skills.js";
import type { AdskConfig, ProfileId, Scope } from "./types.js";

export interface InitOptions {
  target: string;
  profile?: string;
  yes: boolean;
  dryRun: boolean;
  scope: Scope;
  forceRules: boolean;
  withOptionalPacks: boolean;
  snapshotRoot?: string;
  run?: RunCommand;
}

export async function runInit(opts: InitOptions): Promise<AdskConfig> {
  const snapshotRoot = getSnapshotRoot(opts.snapshotRoot);
  const profiles = loadProfiles(snapshotRoot);
  const kitRef = readKitRef(snapshotRoot);

  const profileId = await resolveProfile(opts, profiles);
  const profile = getProfile(profiles, profileId);

  const optionalPacks = await resolveOptionalPacks(opts, profiles);

  if (opts.dryRun) {
    console.log(`[dry-run] profile=${profileId} scope=${opts.scope} kitRef=${kitRef}`);
  }

  const skillsArgv = buildSkillsAddArgv({
    kitSource: profiles.kit_source,
    skills: profile.skills,
    scope: opts.scope,
    yes: true,
  });

  if (opts.dryRun) {
    console.log(`[dry-run] would run: ${skillsArgv.join(" ")}`);
  }

  const skillResult = await runSkills(skillsArgv, {
    cwd: opts.target,
    dryRun: opts.dryRun,
    run: opts.run,
  });
  if (skillResult.code !== 0) {
    throw new Error(
      `skills add failed (exit ${skillResult.code}). Check skills CLI flags/network.`,
    );
  }

  if (optionalPacks.length > 0) {
    const recommended = loadRecommendedSkills(snapshotRoot);
    for (const packId of optionalPacks) {
      const entry = findOptionalPack(recommended, packId);
      if (!entry) {
        throw new Error(`Unknown optional pack: ${packId}`);
      }
      const installCmd =
        opts.scope === "global"
          ? entry.install_global ?? entry.install
          : entry.install ?? entry.install_global;
      if (!installCmd) {
        throw new Error(`Optional pack ${packId} has no install command`);
      }
      const packArgv = buildOptionalPackArgv(installCmd, opts.scope, true);
      if (opts.dryRun) {
        console.log(`[dry-run] would run optional pack ${packId}: ${packArgv.join(" ")}`);
      }
      const packResult = await runSkills(packArgv, {
        cwd: opts.target,
        dryRun: opts.dryRun,
        run: opts.run,
      });
      if (packResult.code !== 0) {
        throw new Error(`optional pack install failed: ${packId}`);
      }
    }
  } else if (opts.dryRun) {
    console.log("[dry-run] optional packs: none");
  }

  const syncResult = syncCursor({
    snapshotRoot,
    appRoot: opts.target,
    cursor: profile.cursor,
    rules: profile.rules,
    forceRules: opts.forceRules,
    dryRun: opts.dryRun,
  });

  if (opts.dryRun) {
    if (profile.cursor === "none") {
      console.log("[dry-run] Cursor sync: skipped (cursor=none)");
    } else {
      console.log(
        `[dry-run] would sync ${syncResult.commandsWritten.length} command(s)` +
          (profile.rules === "stock"
            ? `, ${syncResult.rulesWritten.length} stock rule(s)`
            : ""),
      );
    }
  }

  const cfg: AdskConfig = {
    version: 1,
    profile: profileId,
    cursor: profile.cursor,
    rules: profile.rules,
    scope: opts.scope,
    kitRef,
    optionalPacks,
  };

  if (opts.dryRun) {
    console.log(`[dry-run] would write ${opts.target}/.adsk/config.json`);
    console.log("[dry-run] no files written");
  } else {
    writeConfig(opts.target, cfg);
    if (profile.cursor === "commands") {
      console.log("\nNext: open Cursor and try /quick-start\n");
    }
  }

  return cfg;
}

async function resolveProfile(
  opts: InitOptions,
  profiles: ReturnType<typeof loadProfiles>,
): Promise<ProfileId> {
  if (opts.profile) {
    if (!isProfileId(opts.profile)) {
      throw new Error(
        `Unknown profile "${opts.profile}". Expected: ${listProfileIds().join(", ")}`,
      );
    }
    return opts.profile;
  }
  if (opts.yes) {
    return "core";
  }

  const choice = await p.select({
    message: "Select an ADSK profile",
    options: listProfileIds().map((id) => ({
      value: id,
      label: id,
      hint: profiles.profiles[id].description,
    })),
  });
  if (p.isCancel(choice)) {
    p.cancel("Cancelled");
    process.exit(1);
  }
  return choice as ProfileId;
}

async function resolveOptionalPacks(
  opts: InitOptions,
  profiles: ReturnType<typeof loadProfiles>,
): Promise<string[]> {
  if (opts.yes) {
    return opts.withOptionalPacks ? [...profiles.optional_packs.ids] : [];
  }
  if (opts.withOptionalPacks) {
    return [...profiles.optional_packs.ids];
  }

  const add = await p.confirm({
    message: `Add optional product-value-loop packs? (${profiles.optional_packs.description})`,
    initialValue: profiles.optional_packs.prompt_default,
  });
  if (p.isCancel(add)) {
    p.cancel("Cancelled");
    process.exit(1);
  }
  return add ? [...profiles.optional_packs.ids] : [];
}

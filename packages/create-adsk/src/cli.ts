#!/usr/bin/env node
import { Command, Help } from "commander";
import { renderHelpBanner, showLogo } from "./banner.js";
import { HELP_DESCRIPTION } from "./help-copy.js";
import { runInit } from "./init.js";
import { runStatus } from "./status.js";
import { runUpdate } from "./update.js";
import type { Scope } from "./types.js";

const program = new Command();

/** Root `--help` uses the skills-style banner; subcommands keep default Help. */
class AdskHelp extends Help {
  formatHelp(cmd: Command, helper: Help): string {
    if (!cmd.parent) {
      return renderHelpBanner();
    }
    return super.formatHelp(cmd, helper);
  }
}

program.createHelp = () => new AdskHelp();

program
  .name("create-adsk")
  .description(HELP_DESCRIPTION)
  .version("0.1.0");

function parseScope(value: string): Scope {
  if (value !== "project" && value !== "global") {
    throw new Error(`Invalid --scope ${value} (expected project|global)`);
  }
  return value;
}

program
  .command("init", { isDefault: true })
  .description("Apply an ADSK profile (default command)")
  .option("--profile <id>", "Profile: core|delivery|maintainer|skills-only")
  .option("-y, --yes", "Non-interactive; default profile core if omitted", false)
  .option("--scope <scope>", "project|global", "project")
  .option("--target <dir>", "App root to adopt into", ".")
  .option("--dry-run", "Print actions without writing", false)
  .option("--force-rules", "Overwrite existing stock rules", false)
  .option(
    "--with-optional-packs",
    "Include optional product-value-loop packs (default off with --yes)",
    false,
  )
  .action(async (opts) => {
    try {
      const interactive = !opts.yes && process.stdout.isTTY;
      if (interactive) {
        showLogo();
      }
      await runInit({
        target: opts.target,
        profile: opts.profile,
        yes: Boolean(opts.yes),
        dryRun: Boolean(opts.dryRun),
        scope: parseScope(opts.scope),
        forceRules: Boolean(opts.forceRules),
        withOptionalPacks: Boolean(opts.withOptionalPacks),
      });
    } catch (err) {
      console.error(err instanceof Error ? err.message : err);
      process.exit(1);
    }
  });

program
  .command("update")
  .description("Refresh skills + Cursor from saved .adsk/config.json")
  .option("--target <dir>", "App root", ".")
  .option("--dry-run", "Print actions without writing", false)
  .option("--force-rules", "Overwrite existing stock rules", false)
  .action(async (opts) => {
    try {
      await runUpdate({
        target: opts.target,
        dryRun: Boolean(opts.dryRun),
        forceRules: Boolean(opts.forceRules),
      });
    } catch (err) {
      console.error(err instanceof Error ? err.message : err);
      process.exit(1);
    }
  });

program
  .command("status")
  .description("Show profile, kitRef, and drift (exit 1 if drift)")
  .option("--target <dir>", "App root", ".")
  .action((opts) => {
    try {
      const result = runStatus({ target: opts.target });
      process.exit(result.exitCode);
    } catch (err) {
      console.error(err instanceof Error ? err.message : err);
      process.exit(1);
    }
  });

program.parseAsync(process.argv).catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});

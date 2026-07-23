import { spawn } from "node:child_process";
import type { Scope } from "./types.js";

export type RunCommand = (
  argv: string[],
  opts: { cwd: string; dryRun: boolean },
) => Promise<{ code: number; argv: string[] }>;

/**
 * Resolve npm/npx for `spawn(..., { shell: false })`.
 * On Windows, Node cannot find bare `npx`/`npm` (they are `.cmd` shims) → ENOENT.
 */
export function resolveSpawnCommand(
  cmd: string,
  platform: NodeJS.Platform = process.platform,
): string {
  if (platform !== "win32") return cmd;
  if (cmd === "npx" || cmd === "npm") return `${cmd}.cmd`;
  return cmd;
}

export function buildSkillsAddArgv(opts: {
  kitSource: string;
  skills: string[];
  scope: Scope;
  yes: boolean;
}): string[] {
  const argv = ["npx", "--yes", "skills", "add", opts.kitSource];
  for (const skill of opts.skills) {
    argv.push("--skill", skill);
  }
  if (opts.scope === "global") argv.push("-g");
  if (opts.yes) argv.push("-y");
  return argv;
}

export function buildSkillsUpdateArgv(opts: {
  scope: Scope;
  yes: boolean;
}): string[] {
  const argv = ["npx", "--yes", "skills", "update"];
  if (opts.yes) argv.push("-y");
  if (opts.scope === "global") argv.push("-g");
  else argv.push("-p");
  return argv;
}

/** Split an install command string into argv; ensure -y when yes. */
export function buildOptionalPackArgv(
  installCmd: string,
  scope: Scope,
  yes: boolean,
): string[] {
  const parts = installCmd.trim().split(/\s+/);
  let argv = [...parts];
  if (scope === "global" && !argv.includes("-g") && !argv.includes("--global")) {
    argv.push("-g");
  }
  if (scope === "project") {
    argv = argv.filter((a) => a !== "-g" && a !== "--global");
  }
  if (yes && !argv.includes("-y") && !argv.includes("--yes")) {
    argv.push("-y");
  }
  return argv;
}

export const defaultRunCommand: RunCommand = async (argv, opts) => {
  if (opts.dryRun) {
    return { code: 0, argv };
  }
  const [cmd, ...args] = argv;
  const resolved = resolveSpawnCommand(cmd);
  const code = await new Promise<number>((resolve, reject) => {
    const child = spawn(resolved, args, {
      cwd: opts.cwd,
      stdio: "inherit",
      shell: false,
    });
    child.on("error", (err: NodeJS.ErrnoException) => {
      if (err.code === "ENOENT") {
        reject(
          new Error(
            `Failed to spawn '${resolved}' (ENOENT). Ensure Node.js is installed and on PATH` +
              (process.platform === "win32"
                ? " (Windows: create-adsk runs npx.cmd without a shell)."
                : ".") +
              ` Command was: ${argv.join(" ")}`,
          ),
        );
        return;
      }
      reject(err);
    });
    child.on("close", (c) => resolve(c ?? 1));
  });
  return { code, argv };
};

export async function runSkills(
  argv: string[],
  opts: { cwd: string; dryRun: boolean; run?: RunCommand },
): Promise<{ code: number; argv: string[] }> {
  const run = opts.run ?? defaultRunCommand;
  return run(argv, { cwd: opts.cwd, dryRun: opts.dryRun });
}

import { describe, expect, it } from "vitest";
import { readConfig, writeConfig } from "../src/config.js";
import type { AdskConfig } from "../src/types.js";
import { makeTempApp } from "./helpers/temp-app.js";

describe("config", () => {
  it("round-trips all config_marker fields", () => {
    const app = makeTempApp();
    const cfg: AdskConfig = {
      version: 1,
      profile: "delivery",
      cursor: "commands",
      rules: "none",
      scope: "project",
      kitRef: "rhyanvargas/agentic-development-starter-kit@abc",
      optionalPacks: ["competitive-intelligence"],
    };
    writeConfig(app, cfg);
    expect(readConfig(app)).toEqual(cfg);
  });

  it("returns null when missing", () => {
    expect(readConfig(makeTempApp())).toBeNull();
  });
});

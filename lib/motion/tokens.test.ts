import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { durations, easings, seconds } from "./tokens";

const css = readFileSync(path.join(process.cwd(), "app/styles/tokens.css"), "utf8");

function cssValue(name: string): string {
  const match = css.match(new RegExp(`--${name}:\\s*([^;]+);`));
  if (!match) throw new Error(`Token CSS --${name} introuvable`);
  return match[1].trim();
}

const easingCssNames = { out: "ease-out", in: "ease-in", inOut: "ease-in-out" } as const;

describe("tokens motion", () => {
  it.each(Object.entries(durations))("durée %s identique en CSS et en TS", (name, ms) => {
    expect(cssValue(`duration-${name}`)).toBe(`${ms}ms`);
  });

  it.each(Object.entries(easings))("courbe %s identique en CSS et en TS", (name, bezier) => {
    const cssName = easingCssNames[name as keyof typeof easingCssNames];
    expect(cssValue(cssName)).toBe(`cubic-bezier(${bezier.join(", ")})`);
  });

  it("convertit les durées en secondes", () => {
    expect(seconds("base")).toBe(0.22);
  });
});

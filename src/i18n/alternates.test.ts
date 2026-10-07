import { describe, expect, it } from "vitest";

import { getSiteUrl, SITE_URL } from "@/constants/site";

import { buildPageAlternates } from "./alternates";

const organizerPaths = {
  "pt-BR": "/produtos/organizer",
  en: "/en/produtos/organizer",
  es: "/es/produtos/organizer",
} as const;

describe("buildPageAlternates", () => {
  it("monta canonical e hreflang absolutos, com x-default no pt-BR", () => {
    const alternates = buildPageAlternates(
      organizerPaths,
      "en",
      new URL(SITE_URL),
    );

    expect(alternates.canonical).toBe(`${SITE_URL}/en/produtos/organizer`);
    expect(alternates.languages["pt-BR"]).toBe(`${SITE_URL}/produtos/organizer`);
    expect(alternates.languages.en).toBe(`${SITE_URL}/en/produtos/organizer`);
    expect(alternates.languages.es).toBe(`${SITE_URL}/es/produtos/organizer`);
    expect(alternates.languages["x-default"]).toBe(alternates.languages["pt-BR"]);
    expect(JSON.stringify(alternates)).not.toContain("localhost");
  });

  it("omite o prefixo na home em pt-BR", () => {
    const alternates = buildPageAlternates(
      { "pt-BR": "/", en: "/en", es: "/es" },
      "pt-BR",
      new URL(SITE_URL),
    );

    expect(alternates.canonical).toBe(`${SITE_URL}/`);
    expect(alternates.languages.en).toBe(`${SITE_URL}/en`);
    expect(alternates.languages.es).toBe(`${SITE_URL}/es`);
    expect(alternates.languages["x-default"]).toBe(`${SITE_URL}/`);
  });
});

describe("getSiteUrl", () => {
  it("rejeita um override apontando para localhost", () => {
    const previous = process.env.NEXT_PUBLIC_SITE_URL;
    process.env.NEXT_PUBLIC_SITE_URL = "http://localhost:3000";

    expect(() => getSiteUrl()).toThrow(/localhost/);

    if (previous === undefined) {
      delete process.env.NEXT_PUBLIC_SITE_URL;
      return;
    }

    process.env.NEXT_PUBLIC_SITE_URL = previous;
  });
});

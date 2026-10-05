import { describe, expect, it } from "vitest";

import {
  ATTENDANT_HREF,
  BEHAVIOR_HREF,
  CONCIERGE_HREF,
  CONVERT_HREF,
  IOT_HREF,
  ORGANIZER_HREF,
  RESOLVE_HREF,
  isAvailableHref,
} from "@/constants/routes";

import { FOOTER_NAV_GROUPS } from "./footer.constants";

const PUBLISHED_PRODUCT_LINKS = [
  ["Iungo Organizer AI PIM", ORGANIZER_HREF],
  ["Iungo Behavior CDP", BEHAVIOR_HREF],
  ["Iungo Concierge", CONCIERGE_HREF],
  ["Iungo Resolve", RESOLVE_HREF],
  ["Iungo Attendant", ATTENDANT_HREF],
  ["Iungo Convert", CONVERT_HREF],
  ["Iungo IoT", IOT_HREF],
] as const;

function productLinks() {
  const group = FOOTER_NAV_GROUPS.find((item) => item.title === "Produtos");

  if (!group) {
    throw new Error("Grupo Produtos ausente no Footer.");
  }

  return group.links;
}

describe("links de produto do Footer", () => {
  it("aponta cada produto com página publicada para a rota canônica", () => {
    const links = productLinks();

    expect(links).toHaveLength(PUBLISHED_PRODUCT_LINKS.length);

    for (const [label, href] of PUBLISHED_PRODUCT_LINKS) {
      const link = links.find((item) => item.label === label);

      expect(link?.href).toBe(href);
      expect(isAvailableHref(link?.href)).toBe(true);
    }
  });

  it("mantém href nulo nos itens que ainda não têm página", () => {
    const publishedLabels = new Set<string>(
      PUBLISHED_PRODUCT_LINKS.map(([label]) => label),
    );
    const unpublished = FOOTER_NAV_GROUPS.flatMap((group) => group.links).filter(
      (link) => !publishedLabels.has(link.label),
    );

    expect(unpublished.length).toBeGreaterThan(0);

    for (const link of unpublished) {
      expect(link.href).toBeNull();
      expect(isAvailableHref(link.href)).toBe(false);
    }
  });
});

import { describe, expect, it } from "vitest";

import { isAvailableHref } from "@/constants/routes";
import {
  FOOTER_PRODUCT_IDS,
  getProductById,
  getProductFooterName,
} from "@/components/sections/Products/products.constants";

import { FOOTER_NAV_GROUPS } from "./footer.constants";

function productLinks() {
  const group = FOOTER_NAV_GROUPS.find((item) => item.id === "products");

  if (!group) {
    throw new Error("Grupo Produtos ausente no Footer.");
  }

  return group.links;
}

describe("links de produto do Footer", () => {
  it("aponta cada produto com página publicada para a rota canônica", () => {
    const links = productLinks();

    expect(links).toHaveLength(FOOTER_PRODUCT_IDS.length);

    for (const id of FOOTER_PRODUCT_IDS) {
      const link = links.find((item) => item.kind === "product" && item.id === id);

      expect(link?.kind).toBe("product");

      if (link?.kind !== "product") {
        continue;
      }

      expect(getProductById(link.id).ctaHref).toBe(getProductById(id).ctaHref);
      expect(isAvailableHref(getProductById(link.id).ctaHref)).toBe(true);
      expect(getProductFooterName(id).length).toBeGreaterThan(0);
    }
  });

  it("mantém href nulo nos itens que ainda não têm página", () => {
    const unpublished = FOOTER_NAV_GROUPS.flatMap((group) => group.links).filter(
      (link) => link.kind === "text",
    );

    expect(unpublished.length).toBeGreaterThan(0);

    for (const link of unpublished) {
      expect(link.href).toBeNull();
      expect(isAvailableHref(link.href)).toBe(false);
    }
  });
});

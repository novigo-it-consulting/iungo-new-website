import { getProductById } from "@/components/sections/Products/products.constants";

import type { SolucoesMegaMenuCategory } from "./solucoesMegaMenu.constants";

export type SolucoesMegaMenuProductBadgeId = "new";

export type SolucoesMegaMenuProduct = {
  readonly id: ReturnType<typeof getProductById>["id"];
  readonly name: string;
  readonly href: string;
  readonly iconSrc: string;
  readonly iconBackgroundClassName: string;
  readonly titleColorClassName: string;
  readonly badgeId?: SolucoesMegaMenuProductBadgeId;
};

function toTitleColorClassName(backgroundClassName: string): string {
  return backgroundClassName.replace("bg-", "text-");
}

const MEGA_MENU_PRODUCT_BADGES: Partial<
  Record<SolucoesMegaMenuProduct["id"], SolucoesMegaMenuProductBadgeId>
> = {
  iot: "new",
};

export function getSolucoesMegaMenuProduct(
  productId: SolucoesMegaMenuProduct["id"],
): SolucoesMegaMenuProduct {
  const product = getProductById(productId);

  return {
    id: product.id,
    name: product.name,
    href: product.ctaHref,
    iconSrc: product.icon.src,
    iconBackgroundClassName: product.icon.backgroundClassName,
    titleColorClassName: toTitleColorClassName(product.icon.backgroundClassName),
    badgeId: MEGA_MENU_PRODUCT_BADGES[productId],
  };
}

export function getSolucoesMegaMenuProductsForCategory(
  category: SolucoesMegaMenuCategory,
): readonly SolucoesMegaMenuProduct[] {
  return category.productIds.map(getSolucoesMegaMenuProduct);
}

/**
 * Pendência de contraste (referência do inspetor):
 * - nome do Organizer (#1E9F67) ≈ 3,38:1
 * - selo NOVO (#B8860B / #B8860B1A) ≈ 2,92:1
 * Tokens iungo-fog / iungo-indigo ausentes no projeto; hover usa #F4F6FA e #0024AE localmente.
 */

import {
  FIRST_ROW_PRODUCTS,
  SECOND_ROW_PRODUCTS,
} from "@/components/sections/Products/products.constants";

import type { SolucoesMegaMenuCategory } from "./solucoesMegaMenu.constants";

const ALL_PRODUCTS = [...FIRST_ROW_PRODUCTS, ...SECOND_ROW_PRODUCTS];

const PRODUCT_BY_ID = Object.fromEntries(
  ALL_PRODUCTS.map((product) => [product.id, product] as const),
) as Record<(typeof ALL_PRODUCTS)[number]["id"], (typeof ALL_PRODUCTS)[number]>;

export type SolucoesMegaMenuProductBadge = {
  readonly label: string;
};

export type SolucoesMegaMenuProduct = {
  readonly id: (typeof ALL_PRODUCTS)[number]["id"];
  readonly name: string;
  readonly description: string;
  readonly href: string;
  readonly iconSrc: string;
  readonly iconBackgroundClassName: string;
  readonly titleColorClassName: string;
  readonly badge?: SolucoesMegaMenuProductBadge;
};

function toTitleColorClassName(backgroundClassName: string): string {
  return backgroundClassName.replace("bg-", "text-");
}

/** Textos específicos do mega menu quando diferem dos cards da home. */
const MEGA_MENU_DESCRIPTION_OVERRIDES: Partial<
  Record<(typeof ALL_PRODUCTS)[number]["id"], string>
> = {
  iot: "RFID, RTLS e gestão de ativos",
};

const MEGA_MENU_PRODUCT_BADGES: Partial<
  Record<(typeof ALL_PRODUCTS)[number]["id"], SolucoesMegaMenuProductBadge>
> = {
  iot: { label: "NOVO" },
};

export function getSolucoesMegaMenuProduct(
  productId: (typeof ALL_PRODUCTS)[number]["id"],
): SolucoesMegaMenuProduct {
  const product = PRODUCT_BY_ID[productId];

  return {
    id: product.id,
    name: product.name,
    description:
      MEGA_MENU_DESCRIPTION_OVERRIDES[productId] ?? product.copy.description,
    href: product.ctaHref,
    iconSrc: product.icon.src,
    iconBackgroundClassName: product.icon.backgroundClassName,
    titleColorClassName: toTitleColorClassName(product.icon.backgroundClassName),
    badge: MEGA_MENU_PRODUCT_BADGES[productId],
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

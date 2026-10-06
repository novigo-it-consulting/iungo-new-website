"use client";

import type { ProductId } from "@/components/sections/Products/products.constants";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

import type { SolucoesMegaMenuProduct } from "./solucoesMegaMenu.products";
import SolucoesMegaMenuBadge from "./SolucoesMegaMenuBadge";
import {
  solucoesMegaMenuProductCardClassName,
  solucoesMegaMenuProductDescriptionClassName,
  solucoesMegaMenuProductIconImageClassName,
  solucoesMegaMenuProductIconShellClassName,
  solucoesMegaMenuProductTitleClassName,
  solucoesMegaMenuProductTitleGroupClassName,
  solucoesMegaMenuProductTitleLeadingGroupClassName,
  solucoesMegaMenuProductTitleRowClassName,
  solucoesMegaMenuProductTitleRowWithBadgeClassName,
} from "./solucoesMegaMenu.styles";

type SolucoesMegaMenuProductCardProps = {
  product: SolucoesMegaMenuProduct;
  onNavigate?: () => void;
};

function productMenuDescription(id: ProductId, t: ReturnType<typeof useTranslations<"products">>) {
  switch (id) {
    case "organizer":
      return t("organizer.description");
    case "concierge":
      return t("concierge.description");
    case "behavior":
      return t("behavior.description");
    case "resolve":
      return t("resolve.description");
    case "attendant":
      return t("attendant.description");
    case "convert":
      return t("convert.description");
    case "iot":
      return t("iot.description");
    default: {
      const exhaustive: never = id;
      return exhaustive;
    }
  }
}

export default function SolucoesMegaMenuProductCard({
  product,
  onNavigate,
}: Readonly<SolucoesMegaMenuProductCardProps>) {
  const tProducts = useTranslations("products");
  const tMegaMenu = useTranslations("megaMenu");
  const titleLeadingClassName = product.badgeId
    ? solucoesMegaMenuProductTitleLeadingGroupClassName
    : solucoesMegaMenuProductTitleGroupClassName;

  const titleRowClassName = product.badgeId
    ? solucoesMegaMenuProductTitleRowWithBadgeClassName
    : solucoesMegaMenuProductTitleRowClassName;

  return (
    <Link
      href={product.href}
      data-solucoes-mega-menu-product={product.id}
      className={solucoesMegaMenuProductCardClassName}
      onClick={onNavigate}
    >
      <span className={titleRowClassName}>
        <span className={titleLeadingClassName}>
          <span
            aria-hidden="true"
            className={`${solucoesMegaMenuProductIconShellClassName} ${product.iconBackgroundClassName}`}
          >
            <Image
              src={product.iconSrc}
              alt=""
              fill
              sizes="28px"
              className={solucoesMegaMenuProductIconImageClassName}
            />
          </span>
          <span
            className={`${solucoesMegaMenuProductTitleClassName} ${product.titleColorClassName}`}
          >
            {product.name}
          </span>
        </span>
        {product.badgeId === "new" ? (
          <SolucoesMegaMenuBadge variant="product" label={tMegaMenu("badges.new")} />
        ) : null}
      </span>
      <p className={solucoesMegaMenuProductDescriptionClassName}>
        {productMenuDescription(product.id, tProducts)}
      </p>
    </Link>
  );
}

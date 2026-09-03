"use client";

import Image from "next/image";
import Link from "next/link";

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

export default function SolucoesMegaMenuProductCard({
  product,
  onNavigate,
}: Readonly<SolucoesMegaMenuProductCardProps>) {
  const titleLeadingClassName = product.badge
    ? solucoesMegaMenuProductTitleLeadingGroupClassName
    : solucoesMegaMenuProductTitleGroupClassName;

  const titleRowClassName = product.badge
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
        {product.badge ? (
          <SolucoesMegaMenuBadge variant="product" label={product.badge.label} />
        ) : null}
      </span>
      <p className={solucoesMegaMenuProductDescriptionClassName}>
        {product.description}
      </p>
    </Link>
  );
}

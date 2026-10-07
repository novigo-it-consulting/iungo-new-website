"use client";

import { useTranslations } from "next-intl";

import type { SolucoesMegaMenuCategory } from "./solucoesMegaMenu.constants";
import { getSolucoesMegaMenuProductsForCategory } from "./solucoesMegaMenu.products";
import SolucoesMegaMenuArrowLink from "./SolucoesMegaMenuArrowLink";
import SolucoesMegaMenuCategoryHeader from "./SolucoesMegaMenuCategoryHeader";
import SolucoesMegaMenuProductCard from "./SolucoesMegaMenuProductCard";
import {
  solucoesMegaMenuCategoryViewLinkClassName,
  solucoesMegaMenuProductListClassName,
  solucoesMegaMenuProductListItemClassName,
} from "./solucoesMegaMenu.styles";

type SolucoesMegaMenuCategorySectionProps = {
  category: SolucoesMegaMenuCategory;
  onProductNavigate?: () => void;
};

export default function SolucoesMegaMenuCategorySection({
  category,
  onProductNavigate,
}: Readonly<SolucoesMegaMenuCategorySectionProps>) {
  const t = useTranslations("megaMenu");
  const products = getSolucoesMegaMenuProductsForCategory(category);

  return (
    <>
      <SolucoesMegaMenuCategoryHeader category={category} />
      <ul
        data-solucoes-mega-menu-product-list={category.id}
        className={solucoesMegaMenuProductListClassName}
      >
        {products.map((product) => (
          <li key={product.id} className={solucoesMegaMenuProductListItemClassName}>
            <SolucoesMegaMenuProductCard
              product={product}
              onNavigate={onProductNavigate}
            />
          </li>
        ))}
      </ul>
      <SolucoesMegaMenuArrowLink
        label={t("viewSolution")}
        href={category.viewSolutionHref}
        linkKind="view-solution"
        className={solucoesMegaMenuCategoryViewLinkClassName}
        onNavigate={onProductNavigate}
      />
    </>
  );
}

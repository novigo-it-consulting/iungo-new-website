"use client";

import { useTranslations } from "next-intl";

import type { SolucoesMegaMenuCategory } from "./solucoesMegaMenu.constants";
import SolucoesMegaMenuBadge from "./SolucoesMegaMenuBadge";
import {
  solucoesMegaMenuCategoryHeaderClassName,
  solucoesMegaMenuCategorySubtitleClassName,
} from "./solucoesMegaMenu.styles";

type SolucoesMegaMenuCategoryHeaderProps = {
  category: SolucoesMegaMenuCategory;
};

export default function SolucoesMegaMenuCategoryHeader({
  category,
}: Readonly<SolucoesMegaMenuCategoryHeaderProps>) {
  const t = useTranslations("megaMenu");

  return (
    <div
      data-solucoes-mega-menu-category-header={category.id}
      className={solucoesMegaMenuCategoryHeaderClassName}
    >
      <SolucoesMegaMenuBadge variant="category" label={t(category.badgeKey)} />
      <p className={solucoesMegaMenuCategorySubtitleClassName}>
        {t(category.subtitleKey)}
      </p>
    </div>
  );
}

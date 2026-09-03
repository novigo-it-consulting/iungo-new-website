"use client";

import {
  SOLUCOES_MEGA_MENU_CATEGORIES,
  SOLUCOES_MEGA_MENU_FEATURED_CASE_COLUMN_ID,
} from "./solucoesMegaMenu.constants";
import { useSolucoesMegaMenu } from "./SolucoesMegaMenuContext";
import SolucoesMegaMenuCategorySection from "./SolucoesMegaMenuCategorySection";
import SolucoesMegaMenuFeaturedCaseCard from "./SolucoesMegaMenuFeaturedCaseCard";
import {
  solucoesMegaMenuColumnClassName,
  solucoesMegaMenuFeaturedColumnClassName,
  solucoesMegaMenuGridClassName,
} from "./solucoesMegaMenu.styles";

export default function SolucoesMegaMenuColumns() {
  const { close } = useSolucoesMegaMenu();

  return (
    <div
      data-solucoes-mega-menu-grid
      className={solucoesMegaMenuGridClassName}
    >
      {SOLUCOES_MEGA_MENU_CATEGORIES.map((category) => (
        <div
          key={category.id}
          data-solucoes-mega-menu-column={category.id}
          className={solucoesMegaMenuColumnClassName}
        >
          <SolucoesMegaMenuCategorySection
            category={category}
            onProductNavigate={close}
          />
        </div>
      ))}

      <div
        data-solucoes-mega-menu-column={SOLUCOES_MEGA_MENU_FEATURED_CASE_COLUMN_ID}
        className={solucoesMegaMenuFeaturedColumnClassName}
      >
        <SolucoesMegaMenuFeaturedCaseCard onNavigate={close} />
      </div>
    </div>
  );
}

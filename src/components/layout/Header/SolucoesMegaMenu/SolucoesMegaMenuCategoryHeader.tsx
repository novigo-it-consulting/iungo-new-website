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
  return (
    <div
      data-solucoes-mega-menu-category-header={category.id}
      className={solucoesMegaMenuCategoryHeaderClassName}
    >
      <SolucoesMegaMenuBadge variant="category" label={category.badge} />
      <p className={solucoesMegaMenuCategorySubtitleClassName}>
        {category.subtitle}
      </p>
    </div>
  );
}

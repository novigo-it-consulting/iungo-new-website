import { SOLUCOES_MEGA_MENU_CATEGORIES } from "./solucoesMegaMenu.constants";
import SolucoesMegaMenuCategorySection from "./SolucoesMegaMenuCategorySection";
import {
  solucoesMobileCategoryItemClassName,
  solucoesMobileGroupPanelClassName,
} from "./solucoesMegaMenu.styles";

type SolucoesMegaMenuMobileCategoriesProps = {
  onProductNavigate?: () => void;
};

export default function SolucoesMegaMenuMobileCategories({
  onProductNavigate,
}: Readonly<SolucoesMegaMenuMobileCategoriesProps>) {
  return (
    <div
      className={solucoesMobileGroupPanelClassName}
      data-solucoes-mobile-nav-group-panel
    >
      {SOLUCOES_MEGA_MENU_CATEGORIES.map((category) => (
        <div
          key={category.id}
          data-solucoes-mobile-category={category.id}
          className={solucoesMobileCategoryItemClassName}
        >
          <SolucoesMegaMenuCategorySection
            category={category}
            onProductNavigate={onProductNavigate}
          />
        </div>
      ))}
    </div>
  );
}

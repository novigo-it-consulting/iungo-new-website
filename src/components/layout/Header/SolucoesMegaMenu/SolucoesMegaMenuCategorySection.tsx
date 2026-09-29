import type { SolucoesMegaMenuCategory } from "./solucoesMegaMenu.constants";
import { SOLUCOES_MEGA_MENU_VIEW_SOLUTION_LABEL } from "./solucoesMegaMenu.constants";
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
        label={SOLUCOES_MEGA_MENU_VIEW_SOLUTION_LABEL}
        href={category.viewSolutionHref}
        linkKind="view-solution"
        className={solucoesMegaMenuCategoryViewLinkClassName}
        onNavigate={onProductNavigate}
      />
    </>
  );
}

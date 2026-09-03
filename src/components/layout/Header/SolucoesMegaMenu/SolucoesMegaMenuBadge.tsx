import {
  solucoesMegaMenuCategoryBadgeClassName,
  solucoesMegaMenuCategoryBadgeTextClassName,
  solucoesMegaMenuFeaturedCaseBadgeClassName,
  solucoesMegaMenuProductBadgeClassName,
  solucoesMegaMenuProductBadgeTextClassName,
} from "./solucoesMegaMenu.styles";

export type SolucoesMegaMenuBadgeVariant =
  | "category"
  | "product"
  | "featured-case";

const BADGE_SHELL_CLASS_NAMES: Record<
  SolucoesMegaMenuBadgeVariant,
  string
> = {
  category: solucoesMegaMenuCategoryBadgeClassName,
  product: solucoesMegaMenuProductBadgeClassName,
  "featured-case": solucoesMegaMenuFeaturedCaseBadgeClassName,
};

const BADGE_TEXT_CLASS_NAMES: Record<
  SolucoesMegaMenuBadgeVariant,
  string | null
> = {
  category: solucoesMegaMenuCategoryBadgeTextClassName,
  product: solucoesMegaMenuProductBadgeTextClassName,
  "featured-case": null,
};

const BADGE_DATA_ATTRIBUTES: Record<
  SolucoesMegaMenuBadgeVariant,
  Record<string, true>
> = {
  category: { "data-solucoes-mega-menu-badge": true },
  product: { "data-solucoes-mega-menu-product-badge": true },
  "featured-case": { "data-solucoes-mega-menu-featured-case-badge": true },
};

type SolucoesMegaMenuBadgeProps = {
  variant: SolucoesMegaMenuBadgeVariant;
  label: string;
};

export default function SolucoesMegaMenuBadge({
  variant,
  label,
}: Readonly<SolucoesMegaMenuBadgeProps>) {
  const shellClassName = BADGE_SHELL_CLASS_NAMES[variant];
  const textClassName = BADGE_TEXT_CLASS_NAMES[variant];
  const dataAttributes = BADGE_DATA_ATTRIBUTES[variant];

  if (textClassName === null) {
    return (
      <span {...dataAttributes} className={shellClassName}>
        {label}
      </span>
    );
  }

  return (
    <span {...dataAttributes} className={shellClassName}>
      <span className={textClassName}>{label}</span>
    </span>
  );
}

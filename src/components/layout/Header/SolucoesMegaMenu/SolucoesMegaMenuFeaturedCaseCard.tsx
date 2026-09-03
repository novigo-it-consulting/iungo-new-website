import { SOLUCOES_MEGA_MENU_FEATURED_CASE } from "./solucoesMegaMenu.featuredCase.constants";
import SolucoesMegaMenuArrowLink from "./SolucoesMegaMenuArrowLink";
import SolucoesMegaMenuBadge from "./SolucoesMegaMenuBadge";
import {
  solucoesMegaMenuFeaturedCaseCardClassName,
  solucoesMegaMenuFeaturedCaseReadLinkClassName,
  solucoesMegaMenuFeaturedCaseSubtitleClassName,
  solucoesMegaMenuFeaturedCaseTitleClassName,
} from "./solucoesMegaMenu.styles";

type SolucoesMegaMenuFeaturedCaseCardProps = {
  onNavigate?: () => void;
};

export default function SolucoesMegaMenuFeaturedCaseCard({
  onNavigate,
}: Readonly<SolucoesMegaMenuFeaturedCaseCardProps>) {
  const featuredCase = SOLUCOES_MEGA_MENU_FEATURED_CASE;

  return (
    <article
      data-solucoes-mega-menu-featured-case={featuredCase.id}
      className={solucoesMegaMenuFeaturedCaseCardClassName}
    >
      <SolucoesMegaMenuBadge
        variant="featured-case"
        label={featuredCase.badgeLabel}
      />

      <h3
        data-solucoes-mega-menu-featured-case-title
        className={solucoesMegaMenuFeaturedCaseTitleClassName}
      >
        {featuredCase.title}
      </h3>

      <p
        data-solucoes-mega-menu-featured-case-subtitle
        className={solucoesMegaMenuFeaturedCaseSubtitleClassName}
      >
        {featuredCase.subtitle}
      </p>

      <SolucoesMegaMenuArrowLink
        label={featuredCase.readCaseLabel}
        href={featuredCase.readCaseHref}
        linkKind={
          featuredCase.readCaseHref ? "featured-case" : "featured-case-pending"
        }
        className={solucoesMegaMenuFeaturedCaseReadLinkClassName}
        onNavigate={onNavigate}
      />
    </article>
  );
}

"use client";

import { useTranslations } from "next-intl";

import { isAvailableHref } from "@/constants/routes";
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
  const t = useTranslations("megaMenu");
  const featuredCase = SOLUCOES_MEGA_MENU_FEATURED_CASE;
  const canReadFeaturedCase = isAvailableHref(featuredCase.readCaseHref);

  return (
    <article
      data-solucoes-mega-menu-featured-case={featuredCase.id}
      className={solucoesMegaMenuFeaturedCaseCardClassName}
    >
      <SolucoesMegaMenuBadge
        variant="featured-case"
        label={t("featuredCase.badge")}
      />

      <h3
        data-solucoes-mega-menu-featured-case-title
        className={solucoesMegaMenuFeaturedCaseTitleClassName}
      >
        {t("featuredCase.title")}
      </h3>

      <p
        data-solucoes-mega-menu-featured-case-subtitle
        className={solucoesMegaMenuFeaturedCaseSubtitleClassName}
      >
        {t("featuredCase.subtitle")}
      </p>

      <SolucoesMegaMenuArrowLink
        label={t("featuredCase.readCase")}
        href={featuredCase.readCaseHref}
        linkKind={canReadFeaturedCase ? "featured-case" : "featured-case-pending"}
        className={solucoesMegaMenuFeaturedCaseReadLinkClassName}
        onNavigate={onNavigate}
      />
    </article>
  );
}

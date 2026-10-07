import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

import {
  homeHeroContentClassName,
  homeHeroCopyClassName,
  homeHeroDescriptionClassName,
  homeHeroTitleClassName,
  homeHeroTitleHighlightClassName,
  homeHeroTitleLineClassName,
} from "./homeHero.styles";

function renderHeroLine(chunks: ReactNode) {
  return <span className={homeHeroTitleLineClassName}>{chunks}</span>;
}

function renderHeroHighlight(chunks: ReactNode) {
  return (
    <span data-hero-highlight className={homeHeroTitleHighlightClassName}>
      {chunks}
    </span>
  );
}

export default async function HeroContent() {
  const t = await getTranslations("home.hero");

  return (
    <div data-hero-content className={homeHeroContentClassName}>
      <div data-hero-copy className={homeHeroCopyClassName}>
        <h1
          id="hero-title"
          data-hero-title
          data-gradient-heading
          data-page-content-anchor="hero"
          className={homeHeroTitleClassName}
        >
          {t.rich("title", {
            line: renderHeroLine,
            highlight: renderHeroHighlight,
          })}
        </h1>
        <p data-hero-description className={homeHeroDescriptionClassName}>
          {t("description")}
        </p>
      </div>
    </div>
  );
}

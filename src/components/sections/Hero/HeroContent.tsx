import { getTranslations } from "next-intl/server";

import {
  homeHeroContentClassName,
  homeHeroCopyClassName,
  homeHeroDescriptionClassName,
  homeHeroTitleClassName,
  homeHeroTitleHighlightClassName,
  homeHeroTitleLineClassName,
} from "./homeHero.styles";

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
            line: (chunks) => (
              <span className={homeHeroTitleLineClassName}>{chunks}</span>
            ),
            highlight: (chunks) => (
              <span
                data-hero-highlight
                className={homeHeroTitleHighlightClassName}
              >
                {chunks}
              </span>
            ),
          })}
        </h1>
        <p data-hero-description className={homeHeroDescriptionClassName}>
          {t("description")}
        </p>
      </div>
    </div>
  );
}

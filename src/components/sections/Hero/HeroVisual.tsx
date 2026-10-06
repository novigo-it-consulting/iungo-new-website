import { getTranslations } from "next-intl/server";
import Image from "next/image";

import {
  homeHeroImageClassName,
  homeHeroImageSizes,
  homeHeroVisualClassName,
} from "./homeHero.styles";

export default async function HeroVisual() {
  const t = await getTranslations("home.hero");

  return (
    <div data-hero-visual className={homeHeroVisualClassName}>
      <Image
        src="/images/hero/hero-platform-icons.png"
        alt={t("imageAlt")}
        fill
        preload
        sizes={homeHeroImageSizes}
        className={homeHeroImageClassName}
      />
    </div>
  );
}

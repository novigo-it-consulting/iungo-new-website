import { getTranslations } from "next-intl/server";

import ProductHeroCta from "@/components/sections/shared/Hero/ProductHeroCta";
import ProductHeroLayout from "@/components/sections/shared/Hero/ProductHeroLayout";
import ProductHeroVisual from "@/components/sections/shared/Hero/ProductHeroVisual";

import { CONVERT_HERO_IMAGE } from "./convertHero.constants";
import ConvertHeroContent from "./ConvertHeroContent";

export default async function ConvertHeroSection() {
  const t = await getTranslations("productPages.convert.hero");

  return (
    <ProductHeroLayout
      scope="convert"
      titleId="convert-hero-title"
      gradientClassName="bg-[linear-gradient(180deg,rgba(255,255,255,0.10)_29%,rgba(0,120,170,0.10)_100%)]"
      content={<ConvertHeroContent />}
      visual={
        <ProductHeroVisual
          productSlug="convert"
          src={CONVERT_HERO_IMAGE.src}
          alt={t("imageAlt")}
          width={CONVERT_HERO_IMAGE.width}
          height={CONVERT_HERO_IMAGE.height}
        />
      }
      cta={<ProductHeroCta productSlug="convert" />}
    />
  );
}

import { getTranslations } from "next-intl/server";

import ProductHeroCta from "@/components/sections/shared/Hero/ProductHeroCta";
import ProductHeroLayout from "@/components/sections/shared/Hero/ProductHeroLayout";
import ProductHeroVisual from "@/components/sections/shared/Hero/ProductHeroVisual";

import { ATTENDANT_HERO_IMAGE } from "./attendantHero.constants";
import AttendantHeroContent from "./AttendantHeroContent";

export default async function AttendantHeroSection() {
  const t = await getTranslations("productPages.attendant.hero");

  return (
    <ProductHeroLayout
      scope="attendant"
      titleId="attendant-hero-title"
      gradientClassName="bg-[linear-gradient(180deg,rgba(255,255,255,0.10)_29%,rgba(59,55,192,0.10)_100%)]"
      content={<AttendantHeroContent />}
      visual={
        <ProductHeroVisual
          productSlug="attendant"
          src={ATTENDANT_HERO_IMAGE.src}
          alt={t("imageAlt")}
          width={ATTENDANT_HERO_IMAGE.width}
          height={ATTENDANT_HERO_IMAGE.height}
        />
      }
      cta={<ProductHeroCta productSlug="attendant" />}
    />
  );
}

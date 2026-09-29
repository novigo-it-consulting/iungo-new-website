import ProductHeroCta from "@/components/sections/shared/Hero/ProductHeroCta";
import ProductHeroLayout from "@/components/sections/shared/Hero/ProductHeroLayout";
import ProductHeroVisual from "@/components/sections/shared/Hero/ProductHeroVisual";

import { ATTENDANT_HERO_IMAGE } from "./attendantHero.constants";
import AttendantHeroContent from "./AttendantHeroContent";

export default function AttendantHeroSection() {
  return (
    <ProductHeroLayout
      scope="attendant"
      titleId="attendant-hero-title"
      gradientClassName="bg-[linear-gradient(180deg,rgba(255,255,255,0.10)_29%,rgba(59,55,192,0.10)_100%)]"
      content={<AttendantHeroContent />}
      visual={
        <ProductHeroVisual productSlug="attendant" {...ATTENDANT_HERO_IMAGE} />
      }
      cta={<ProductHeroCta productSlug="attendant" />}
    />
  );
}

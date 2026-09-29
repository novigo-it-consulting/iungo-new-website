import ProductHeroCta from "@/components/sections/shared/Hero/ProductHeroCta";
import ProductHeroLayout from "@/components/sections/shared/Hero/ProductHeroLayout";
import ProductHeroVisual from "@/components/sections/shared/Hero/ProductHeroVisual";

import ConciergeHeroContent from "./ConciergeHeroContent";

export default function ConciergeHeroSection() {
  return (
    <ProductHeroLayout
      scope="concierge"
      titleId="concierge-hero-title"
      gradientClassName="bg-[linear-gradient(180deg,rgba(255,255,255,0.10)_29%,rgba(167,33,33,0.10)_100%)]"
      content={<ConciergeHeroContent />}
      visual={
        <ProductHeroVisual
          productSlug="concierge"
          src="/images/products/concierge/concierge-hero.png"
          alt="Ilustração do Iungo Concierge conectando pessoas, processos e objetivos"
          width={900}
          height={900}
        />
      }
      cta={<ProductHeroCta productSlug="concierge" compact />}
    />
  );
}

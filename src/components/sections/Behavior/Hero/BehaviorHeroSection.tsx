import ProductHeroCta from "@/components/sections/shared/Hero/ProductHeroCta";
import ProductHeroLayout from "@/components/sections/shared/Hero/ProductHeroLayout";
import ProductHeroVisual from "@/components/sections/shared/Hero/ProductHeroVisual";

import BehaviorHeroContent from "./BehaviorHeroContent";

export default function BehaviorHeroSection() {
  return (
    <ProductHeroLayout
      scope="behavior"
      titleId="behavior-hero-title"
      gradientClassName="bg-[linear-gradient(180deg,rgba(255,255,255,0.10)_29%,rgba(91,108,124,0.10)_100%)]"
      content={<BehaviorHeroContent />}
      visual={
        <ProductHeroVisual
          productSlug="behavior"
          src="/images/products/behavior/behavior-hero.png"
          alt="Ilustração do Iungo Behavior com radar comportamental, perfil e métricas em tempo real"
          width={900}
          height={900}
        />
      }
      cta={<ProductHeroCta productSlug="behavior" compact />}
    />
  );
}

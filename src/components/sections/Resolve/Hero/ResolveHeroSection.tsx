import ProductHeroCta from "@/components/sections/shared/Hero/ProductHeroCta";
import ProductHeroLayout from "@/components/sections/shared/Hero/ProductHeroLayout";
import ProductHeroVisual from "@/components/sections/shared/Hero/ProductHeroVisual";

import ResolveHeroContent from "./ResolveHeroContent";

export default function ResolveHeroSection() {
  return (
    <ProductHeroLayout
      scope="resolve"
      titleId="resolve-hero-title"
      gradientClassName="bg-[linear-gradient(180deg,rgba(255,255,255,0.10)_29%,rgba(200,79,4,0.10)_100%)]"
      sectionClassName="xl:pb-[49px]"
      content={<ResolveHeroContent />}
      visual={
        <ProductHeroVisual
          productSlug="resolve"
          src="/images/products/resolve/resolve-hero.png"
          alt="Ilustração do Iungo Resolve com fluxos de atendimento e módulos conectados."
          width={900}
          height={900}
        />
      }
      cta={<ProductHeroCta productSlug="resolve" />}
    />
  );
}

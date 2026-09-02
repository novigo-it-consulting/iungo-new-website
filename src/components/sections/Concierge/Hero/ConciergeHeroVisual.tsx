import Image from "next/image";

import {
  productHeroImageClassName,
  productHeroImageSizes,
  productHeroVisualWrapperClassName,
} from "@/components/sections/shared/Hero/productHero.styles";

export default function ConciergeHeroVisual() {
  return (
    <div
      data-concierge-hero-visual
      className={productHeroVisualWrapperClassName}
    >
      <Image
        src="/images/products/concierge/concierge-hero.png"
        alt="Ilustração do Iungo Concierge conectando pessoas, processos e objetivos"
        width={900}
        height={900}
        priority
        sizes={productHeroImageSizes}
        className={productHeroImageClassName}
      />
    </div>
  );
}

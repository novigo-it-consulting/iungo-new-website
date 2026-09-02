import Image from "next/image";

import {
  productHeroImageClassName,
  productHeroImageSizes,
  productHeroVisualWrapperClassName,
} from "@/components/sections/shared/Hero/productHero.styles";

export default function BehaviorHeroVisual() {
  return (
    <div data-behavior-hero-visual className={productHeroVisualWrapperClassName}>
      <Image
        src="/images/products/behavior/behavior-hero.png"
        alt="Ilustração do Iungo Behavior com radar comportamental, perfil e métricas em tempo real"
        width={900}
        height={900}
        priority
        sizes={productHeroImageSizes}
        className={productHeroImageClassName}
      />
    </div>
  );
}

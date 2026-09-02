import Image from "next/image";

import {
  productHeroImageClassName,
  productHeroImageSizes,
  productHeroVisualWrapperClassName,
} from "@/components/sections/shared/Hero/productHero.styles";

export default function ResolveHeroVisual() {
  return (
    <div data-resolve-hero-visual className={productHeroVisualWrapperClassName}>
      <Image
        src="/images/products/resolve/resolve-hero.png"
        alt="Ilustração do Iungo Resolve com fluxos de atendimento e módulos conectados."
        width={900}
        height={900}
        priority
        sizes={productHeroImageSizes}
        className={productHeroImageClassName}
      />
    </div>
  );
}

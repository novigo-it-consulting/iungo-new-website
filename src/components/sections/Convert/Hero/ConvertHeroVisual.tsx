import Image from "next/image";

import {
  productHeroImageClassName,
  productHeroImageSizes,
  productHeroVisualWrapperClassName,
} from "@/components/sections/shared/Hero/productHero.styles";

import { CONVERT_HERO_IMAGE } from "./convertHero.constants";

export default function ConvertHeroVisual() {
  return (
    <div data-convert-hero-visual className={productHeroVisualWrapperClassName}>
      {CONVERT_HERO_IMAGE.available ? (
        <Image
          src={CONVERT_HERO_IMAGE.src}
          alt={CONVERT_HERO_IMAGE.alt}
          width={CONVERT_HERO_IMAGE.width}
          height={CONVERT_HERO_IMAGE.height}
          priority
          sizes={productHeroImageSizes}
          className={productHeroImageClassName}
        />
      ) : (
        <div
          data-convert-hero-visual-placeholder
          aria-hidden="true"
          className="aspect-square w-full max-w-[min(450px,100%)] bg-[#F4F4F5]"
        />
      )}
    </div>
  );
}

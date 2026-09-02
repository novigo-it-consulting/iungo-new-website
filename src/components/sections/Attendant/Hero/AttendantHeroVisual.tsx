import Image from "next/image";

import {
  productHeroImageClassName,
  productHeroImageSizes,
  productHeroVisualWrapperClassName,
} from "@/components/sections/shared/Hero/productHero.styles";

import { ATTENDANT_HERO_IMAGE } from "./attendantHero.constants";

export default function AttendantHeroVisual() {
  return (
    <div
      data-attendant-hero-visual
      className={productHeroVisualWrapperClassName}
    >
      {ATTENDANT_HERO_IMAGE.available ? (
        <Image
          src={ATTENDANT_HERO_IMAGE.src}
          alt={ATTENDANT_HERO_IMAGE.alt}
          width={ATTENDANT_HERO_IMAGE.width}
          height={ATTENDANT_HERO_IMAGE.height}
          priority
          sizes={productHeroImageSizes}
          className={productHeroImageClassName}
        />
      ) : (
        <div
          data-attendant-hero-visual-placeholder
          aria-hidden="true"
          className="aspect-square w-full max-w-[min(450px,100%)] bg-[#F4F4F5]"
        />
      )}
    </div>
  );
}

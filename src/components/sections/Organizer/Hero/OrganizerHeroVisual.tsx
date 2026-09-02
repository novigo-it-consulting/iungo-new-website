import Image from "next/image";

import {
  productHeroImageClassName,
  productHeroImageSizes,
} from "@/components/sections/shared/Hero/productHero.styles";

export default function OrganizerHeroVisual() {
  return (
    <div
      data-organizer-hero-visual
      className="relative aspect-square w-full min-w-0 max-w-[min(450px,100%)] justify-self-center lg:justify-self-end"
    >
      <Image
        src="/images/products/organizer/organizer-hero.png"
        alt="Interface visual do Iungo Organizer"
        width={450}
        height={450}
        priority
        sizes={productHeroImageSizes}
        className={productHeroImageClassName}
      />
    </div>
  );
}

import Image from "next/image";

import { CONVERT_HERO_IMAGE } from "./convertHero.constants";

export default function ConvertHeroVisual() {
  return (
    <div
      data-convert-hero-visual
      className="mt-8 flex min-w-0 justify-center xl:mt-0 xl:justify-end"
    >
      {CONVERT_HERO_IMAGE.available ? (
        <Image
          src={CONVERT_HERO_IMAGE.src}
          alt={CONVERT_HERO_IMAGE.alt}
          width={CONVERT_HERO_IMAGE.width}
          height={CONVERT_HERO_IMAGE.height}
          priority
          sizes="(min-width: 1280px) 450px, calc(100vw - 48px)"
          className="block h-auto w-full max-w-[450px] object-contain"
        />
      ) : (
        <div
          data-convert-hero-visual-placeholder
          aria-hidden="true"
          className="aspect-square w-full max-w-[450px] bg-[#F4F4F5]"
        />
      )}
    </div>
  );
}

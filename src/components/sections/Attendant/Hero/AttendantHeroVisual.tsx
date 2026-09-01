import Image from "next/image";

import { ATTENDANT_HERO_IMAGE } from "./attendantHero.constants";

export default function AttendantHeroVisual() {
  return (
    <div
      data-attendant-hero-visual
      className="mt-8 flex min-w-0 justify-center xl:mt-0 xl:justify-end"
    >
      {ATTENDANT_HERO_IMAGE.available ? (
        <Image
          src={ATTENDANT_HERO_IMAGE.src}
          alt={ATTENDANT_HERO_IMAGE.alt}
          width={ATTENDANT_HERO_IMAGE.width}
          height={ATTENDANT_HERO_IMAGE.height}
          priority
          sizes="(min-width: 1280px) 450px, calc(100vw - 48px)"
          className="block h-auto w-full max-w-[450px] object-contain"
        />
      ) : (
        <div
          data-attendant-hero-visual-placeholder
          aria-hidden="true"
          className="aspect-square w-full max-w-[450px] bg-[#F4F4F5]"
        />
      )}
    </div>
  );
}

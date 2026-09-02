import Image from "next/image";

import { IOT_HERO_IMAGE } from "./iotHero.constants";

export default function IoTHeroVisual() {
  return (
    <div
      data-iot-hero-visual
      className="mt-8 flex min-w-0 justify-center xl:mt-0 xl:justify-end"
    >
      <Image
        src={IOT_HERO_IMAGE.src}
        alt={IOT_HERO_IMAGE.alt}
        width={IOT_HERO_IMAGE.width}
        height={IOT_HERO_IMAGE.height}
        priority
        sizes="(min-width: 1280px) 450px, calc(100vw - 48px)"
        className="block h-auto w-full max-w-[450px] object-contain"
      />
    </div>
  );
}

import Image from "next/image";

import {
  productHeroImageClassName,
  productHeroImageSizes,
  productHeroVisualWrapperClassName,
} from "@/components/sections/shared/Hero/productHero.styles";

import { IOT_HERO_IMAGE } from "./iotHero.constants";

export default function IoTHeroVisual() {
  return (
    <div data-iot-hero-visual className={productHeroVisualWrapperClassName}>
      <Image
        src={IOT_HERO_IMAGE.src}
        alt={IOT_HERO_IMAGE.alt}
        width={IOT_HERO_IMAGE.width}
        height={IOT_HERO_IMAGE.height}
        priority
        sizes={productHeroImageSizes}
        className={productHeroImageClassName}
      />
    </div>
  );
}

import ProductHeroCta from "@/components/sections/shared/Hero/ProductHeroCta";
import ProductHeroLayout from "@/components/sections/shared/Hero/ProductHeroLayout";
import ProductHeroVisual from "@/components/sections/shared/Hero/ProductHeroVisual";

import IoTHeroContent from "./IoTHeroContent";
import { IOT_HERO_IMAGE } from "./iotHero.constants";

export default function IoTHeroSection() {
  return (
    <ProductHeroLayout
      scope="iot"
      titleId="iot-hero-title"
      gradientClassName="bg-[linear-gradient(180deg,rgba(255,255,255,0.10)_29%,rgba(184,134,11,0.10)_100%)]"
      content={<IoTHeroContent />}
      visual={<ProductHeroVisual productSlug="iot" {...IOT_HERO_IMAGE} />}
      cta={<ProductHeroCta productSlug="iot" />}
    />
  );
}

import { getTranslations } from "next-intl/server";

import ProductHeroCta from "@/components/sections/shared/Hero/ProductHeroCta";
import ProductHeroLayout from "@/components/sections/shared/Hero/ProductHeroLayout";
import ProductHeroVisual from "@/components/sections/shared/Hero/ProductHeroVisual";

import IoTHeroContent from "./IoTHeroContent";
import { IOT_HERO_IMAGE } from "./iotHero.constants";

export default async function IoTHeroSection() {
  const t = await getTranslations("productPages.iot.hero");

  return (
    <ProductHeroLayout
      scope="iot"
      titleId="iot-hero-title"
      gradientClassName="bg-[linear-gradient(180deg,rgba(255,255,255,0.10)_29%,rgba(184,134,11,0.10)_100%)]"
      content={<IoTHeroContent />}
      visual={
        <ProductHeroVisual
          productSlug="iot"
          src={IOT_HERO_IMAGE.src}
          alt={t("imageAlt")}
          width={IOT_HERO_IMAGE.width}
          height={IOT_HERO_IMAGE.height}
        />
      }
      cta={<ProductHeroCta productSlug="iot" />}
    />
  );
}

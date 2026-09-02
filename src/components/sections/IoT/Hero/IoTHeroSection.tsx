import ProductHeroLayout from "@/components/sections/shared/Hero/ProductHeroLayout";

import IoTHeroContent from "./IoTHeroContent";
import IoTHeroVisual from "./IoTHeroVisual";

export default function IoTHeroSection() {
  return (
    <ProductHeroLayout
      scope="iot"
      titleId="iot-hero-title"
      gradientClassName="bg-[linear-gradient(180deg,rgba(255,255,255,0.10)_29%,rgba(184,134,11,0.10)_100%)]"
    >
      <IoTHeroContent />
      <IoTHeroVisual />
    </ProductHeroLayout>
  );
}

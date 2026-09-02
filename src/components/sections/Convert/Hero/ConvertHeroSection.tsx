import ProductHeroLayout from "@/components/sections/shared/Hero/ProductHeroLayout";

import ConvertHeroContent from "./ConvertHeroContent";
import ConvertHeroVisual from "./ConvertHeroVisual";

export default function ConvertHeroSection() {
  return (
    <ProductHeroLayout
      scope="convert"
      titleId="convert-hero-title"
      gradientClassName="bg-[linear-gradient(180deg,rgba(255,255,255,0.10)_29%,rgba(0,120,170,0.10)_100%)]"
    >
      <ConvertHeroContent />
      <ConvertHeroVisual />
    </ProductHeroLayout>
  );
}

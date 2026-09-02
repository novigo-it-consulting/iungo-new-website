import ProductHeroLayout from "@/components/sections/shared/Hero/ProductHeroLayout";

import ConciergeHeroContent from "./ConciergeHeroContent";
import ConciergeHeroVisual from "./ConciergeHeroVisual";

export default function ConciergeHeroSection() {
  return (
    <ProductHeroLayout
      scope="concierge"
      titleId="concierge-hero-title"
      gradientClassName="bg-[linear-gradient(180deg,rgba(255,255,255,0.10)_29%,rgba(167,33,33,0.10)_100%)]"
    >
      <ConciergeHeroContent />
      <ConciergeHeroVisual />
    </ProductHeroLayout>
  );
}

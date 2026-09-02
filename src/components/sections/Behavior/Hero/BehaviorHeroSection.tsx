import ProductHeroLayout from "@/components/sections/shared/Hero/ProductHeroLayout";

import BehaviorHeroContent from "./BehaviorHeroContent";
import BehaviorHeroVisual from "./BehaviorHeroVisual";

export default function BehaviorHeroSection() {
  return (
    <ProductHeroLayout
      scope="behavior"
      titleId="behavior-hero-title"
      gradientClassName="bg-[linear-gradient(180deg,rgba(255,255,255,0.10)_29%,rgba(91,108,124,0.10)_100%)]"
    >
      <BehaviorHeroContent />
      <BehaviorHeroVisual />
    </ProductHeroLayout>
  );
}

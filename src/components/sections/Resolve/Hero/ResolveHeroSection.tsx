import ProductHeroLayout from "@/components/sections/shared/Hero/ProductHeroLayout";

import ResolveHeroContent from "./ResolveHeroContent";
import ResolveHeroVisual from "./ResolveHeroVisual";

export default function ResolveHeroSection() {
  return (
    <ProductHeroLayout
      scope="resolve"
      titleId="resolve-hero-title"
      gradientClassName="bg-[linear-gradient(180deg,rgba(255,255,255,0.10)_29%,rgba(200,79,4,0.10)_100%)]"
      sectionClassName="xl:pb-[49px]"
    >
      <ResolveHeroContent />
      <ResolveHeroVisual />
    </ProductHeroLayout>
  );
}

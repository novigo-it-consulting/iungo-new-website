import ProductHeroLayout from "@/components/sections/shared/Hero/ProductHeroLayout";

import AttendantHeroContent from "./AttendantHeroContent";
import AttendantHeroVisual from "./AttendantHeroVisual";

export default function AttendantHeroSection() {
  return (
    <ProductHeroLayout
      scope="attendant"
      titleId="attendant-hero-title"
      gradientClassName="bg-[linear-gradient(180deg,rgba(255,255,255,0.10)_29%,rgba(59,55,192,0.10)_100%)]"
    >
      <AttendantHeroContent />
      <AttendantHeroVisual />
    </ProductHeroLayout>
  );
}

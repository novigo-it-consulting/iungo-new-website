import CasesSection from "@/components/sections/Cases/CasesSection";
import HeroSection from "@/components/sections/Hero/HeroSection";
import MetricsSection from "@/components/sections/Metrics/MetricsSection";
import ProductsSection from "@/components/sections/Products/ProductsSection";
import RoiCalculatorSection from "@/components/sections/RoiCalculator/RoiCalculatorSection";
import ScaleProofSection from "@/components/sections/ScaleProof/ScaleProofSection";
import { setLocale, type LocaleParams } from "@/i18n/locale";

export default async function Home({ params }: LocaleParams) {
  await setLocale(params);

  return (
    <main className="bg-white pt-px">
      <HeroSection />
      <ScaleProofSection />
      <MetricsSection />
      <ProductsSection />
      <CasesSection />
      <RoiCalculatorSection />
    </main>
  );
}

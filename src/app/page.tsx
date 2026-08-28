import CasesSection from "@/components/sections/Cases/CasesSection";
import HeroSection from "@/components/sections/Hero/HeroSection";
import MetricsSection from "@/components/sections/Metrics/MetricsSection";
import ProductsSection from "@/components/sections/Products/ProductsSection";
import RoiCalculatorSection from "@/components/sections/RoiCalculator/RoiCalculatorSection";

export default function Home() {
  return (
    <main className="bg-white pt-px">
      <HeroSection />
      <MetricsSection />
      <ProductsSection />
      <CasesSection />
      <RoiCalculatorSection />
    </main>
  );
}

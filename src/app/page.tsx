import HeroSection from "@/components/sections/Hero/HeroSection";
import MetricsSection from "@/components/sections/Metrics/MetricsSection";
import ProductsSection from "@/components/sections/Products/ProductsSection";

export default function Home() {
  return (
    <main className="bg-white pt-px">
      <HeroSection />
      <MetricsSection />
      <ProductsSection />
    </main>
  );
}

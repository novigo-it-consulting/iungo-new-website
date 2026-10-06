import { getTranslations } from "next-intl/server";

import CasesSection from "@/components/sections/Cases/CasesSection";
import HeroSection from "@/components/sections/Hero/HeroSection";
import MetricsSection from "@/components/sections/Metrics/MetricsSection";
import ProductsSection from "@/components/sections/Products/ProductsSection";
import RoiCalculatorSection from "@/components/sections/RoiCalculator/RoiCalculatorSection";
import ScaleProofSection from "@/components/sections/ScaleProof/ScaleProofSection";
import { setLocale, type LocalePageProps, type LocaleParams } from "@/i18n/locale";
import { createPageMetadata } from "@/i18n/pageMetadata";

export async function generateMetadata({ params }: LocaleParams) {
  const locale = await setLocale(params);
  const t = await getTranslations({ locale, namespace: "metadata" });

  return createPageMetadata(params, "/", {
    title: t("title"),
    description: t("description"),
  });
}

export default async function Home({ params }: LocalePageProps) {
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

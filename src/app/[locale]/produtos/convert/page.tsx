import ConvertContentSection from "@/components/sections/Convert/ConvertContentSection";
import ConvertCtaSection from "@/components/sections/Convert/Cta/ConvertCtaSection";
import ConvertHeroSection from "@/components/sections/Convert/Hero/ConvertHeroSection";
import { CONVERT_HREF } from "@/constants/routes";
import { setLocale, type LocaleParams } from "@/i18n/locale";
import { createHeroPageMetadata } from "@/i18n/pageMetadata";

export function generateMetadata({ params }: LocaleParams) {
  return createHeroPageMetadata(params, CONVERT_HREF, "productPages.convert");
}

export default async function IungoConvertPage({ params }: LocaleParams) {
  await setLocale(params);

  return (
    <main className="min-w-0 flex-1 bg-white">
      <ConvertHeroSection />
      <ConvertContentSection />
      <ConvertCtaSection />
    </main>
  );
}

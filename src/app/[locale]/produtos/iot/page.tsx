import IoTContentSection from "@/components/sections/IoT/IoTContentSection";
import IoTCtaSection from "@/components/sections/IoT/Cta/IoTCtaSection";
import IoTHeroSection from "@/components/sections/IoT/Hero/IoTHeroSection";
import { IOT_HREF } from "@/constants/routes";
import { setLocale, type LocalePageProps, type LocaleParams } from "@/i18n/locale";
import { createHeroPageMetadata } from "@/i18n/pageMetadata";

export function generateMetadata({ params }: LocaleParams) {
  return createHeroPageMetadata(params, IOT_HREF, "productPages.iot");
}

export default async function IungoIoTPage({ params }: LocalePageProps) {
  await setLocale(params);

  return (
    <main className="min-w-0 flex-1 bg-white">
      <IoTHeroSection />
      <IoTContentSection />
      <IoTCtaSection />
    </main>
  );
}

import IoTContentSection from "@/components/sections/IoT/IoTContentSection";
import IoTCtaSection from "@/components/sections/IoT/Cta/IoTCtaSection";
import IoTHeroSection from "@/components/sections/IoT/Hero/IoTHeroSection";
import { IOT_HREF } from "@/constants/routes";
import { setLocale, type LocaleParams } from "@/i18n/locale";
import { createPageMetadata } from "@/i18n/pageMetadata";

export function generateMetadata({ params }: LocaleParams) {
  return createPageMetadata(params, IOT_HREF);
}

export default async function IungoIoTPage({ params }: LocaleParams) {
  await setLocale(params);

  return (
    <main className="min-w-0 flex-1 bg-white">
      <IoTHeroSection />
      <IoTContentSection />
      <IoTCtaSection />
    </main>
  );
}

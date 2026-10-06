import AttendantContentSection from "@/components/sections/Attendant/AttendantContentSection";
import AttendantCtaSection from "@/components/sections/Attendant/Cta/AttendantCtaSection";
import AttendantHeroSection from "@/components/sections/Attendant/Hero/AttendantHeroSection";
import { ATTENDANT_HREF } from "@/constants/routes";
import { setLocale, type LocaleParams } from "@/i18n/locale";
import { createPageMetadata } from "@/i18n/pageMetadata";

export function generateMetadata({ params }: LocaleParams) {
  return createPageMetadata(params, ATTENDANT_HREF);
}

export default async function IungoAttendantPage({ params }: LocaleParams) {
  await setLocale(params);

  return (
    <main className="min-w-0 flex-1 bg-white">
      <AttendantHeroSection />
      <AttendantContentSection />
      <AttendantCtaSection />
    </main>
  );
}

import AttendantContentSection from "@/components/sections/Attendant/AttendantContentSection";
import AttendantCtaSection from "@/components/sections/Attendant/Cta/AttendantCtaSection";
import AttendantHeroSection from "@/components/sections/Attendant/Hero/AttendantHeroSection";
import { ATTENDANT_HREF } from "@/constants/routes";
import { setLocale, type LocalePageProps, type LocaleParams } from "@/i18n/locale";
import { createHeroPageMetadata } from "@/i18n/pageMetadata";

export function generateMetadata({ params }: LocaleParams) {
  return createHeroPageMetadata(params, ATTENDANT_HREF, "productPages.attendant");
}

export default async function IungoAttendantPage({ params }: LocalePageProps) {
  await setLocale(params);

  return (
    <main className="min-w-0 flex-1 bg-white">
      <AttendantHeroSection />
      <AttendantContentSection />
      <AttendantCtaSection />
    </main>
  );
}

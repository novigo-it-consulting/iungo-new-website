import ConciergeCtaSection from "@/components/sections/Concierge/Cta/ConciergeCtaSection";
import ConciergeHeroSection from "@/components/sections/Concierge/Hero/ConciergeHeroSection";
import ConciergeJourneyStudioSection from "@/components/sections/Concierge/JourneyStudio/ConciergeJourneyStudioSection";
import ConciergeSystemScreensSection from "@/components/sections/Concierge/SystemScreens/ConciergeSystemScreensSection";
import ConciergeTestimonialsSection from "@/components/sections/Concierge/Testimonials/ConciergeTestimonialsSection";
import ConciergeTriggersSection from "@/components/sections/Concierge/Triggers/ConciergeTriggersSection";
import { CONCIERGE_HREF } from "@/constants/routes";
import { setLocale, type LocaleParams } from "@/i18n/locale";
import { createHeroPageMetadata } from "@/i18n/pageMetadata";

export function generateMetadata({ params }: LocaleParams) {
  return createHeroPageMetadata(params, CONCIERGE_HREF, "productPages.concierge");
}

export default async function IungoConciergePage({ params }: LocaleParams) {
  await setLocale(params);

  return (
    <main className="min-w-0 flex-1 bg-white">
      <ConciergeHeroSection />
      <ConciergeTriggersSection />
      <ConciergeJourneyStudioSection />
      <ConciergeSystemScreensSection />
      <ConciergeTestimonialsSection />
      <ConciergeCtaSection />
    </main>
  );
}

import OrganizerCta from "@/components/sections/Organizer/OrganizerCta";
import OrganizerCapabilitiesSection from "@/components/sections/Organizer/Capabilities/OrganizerCapabilitiesSection";
import OrganizerHero from "@/components/sections/Organizer/Hero/OrganizerHero";
import OrganizerStepsSection from "@/components/sections/Organizer/Steps/OrganizerStepsSection";
import OrganizerSystemScreensSection from "@/components/sections/Organizer/SystemScreens/OrganizerSystemScreensSection";
import OrganizerComparisonSection from "@/components/sections/Organizer/Comparison/OrganizerComparisonSection";
import OrganizerCaseStudySection from "@/components/sections/Organizer/CaseStudy/OrganizerCaseStudySection";
import { ORGANIZER_HREF } from "@/constants/routes";
import { setLocale, type LocaleParams } from "@/i18n/locale";
import { createPageMetadata } from "@/i18n/pageMetadata";

export function generateMetadata({ params }: LocaleParams) {
  return createPageMetadata(params, ORGANIZER_HREF);
}

export default async function IungoOrganizerPage({ params }: LocaleParams) {
  await setLocale(params);

  return (
    <main className="min-w-0 flex-1 bg-white">
      <OrganizerHero />
      <OrganizerStepsSection />
      <OrganizerCapabilitiesSection />
      <OrganizerSystemScreensSection />
      <OrganizerComparisonSection />
      <OrganizerCaseStudySection />
      <OrganizerCta />
    </main>
  );
}

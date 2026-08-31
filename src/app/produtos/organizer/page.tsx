import OrganizerCta from "@/components/sections/Organizer/OrganizerCta";
import OrganizerCapabilitiesSection from "@/components/sections/Organizer/Capabilities/OrganizerCapabilitiesSection";
import OrganizerHero from "@/components/sections/Organizer/Hero/OrganizerHero";
import OrganizerStepsSection from "@/components/sections/Organizer/Steps/OrganizerStepsSection";
import OrganizerComparisonSection from "@/components/sections/Organizer/Comparison/OrganizerComparisonSection";
import OrganizerCaseStudySection from "@/components/sections/Organizer/CaseStudy/OrganizerCaseStudySection";

export default function IungoOrganizerPage() {
  return (
    <main className="min-w-0 flex-1 bg-white">
      <OrganizerHero />
      <OrganizerStepsSection />
      <OrganizerCapabilitiesSection />
      <OrganizerComparisonSection />
      <OrganizerCaseStudySection />
      <OrganizerCta />
    </main>
  );
}

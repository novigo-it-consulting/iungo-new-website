import OrganizerCase from "@/components/sections/Organizer/OrganizerCase";
import OrganizerComparison from "@/components/sections/Organizer/OrganizerComparison";
import OrganizerCta from "@/components/sections/Organizer/OrganizerCta";
import OrganizerCapabilitiesSection from "@/components/sections/Organizer/Capabilities/OrganizerCapabilitiesSection";
import OrganizerHero from "@/components/sections/Organizer/Hero/OrganizerHero";
import OrganizerStepsSection from "@/components/sections/Organizer/Steps/OrganizerStepsSection";

export default function IungoOrganizerPage() {
  return (
    <main className="min-w-0 flex-1">
      <OrganizerHero />
      <OrganizerStepsSection />
      <OrganizerCapabilitiesSection />
      <OrganizerComparison />
      <OrganizerCase />
      <OrganizerCta />
    </main>
  );
}

import ConciergeCtaSection from "@/components/sections/Concierge/ConciergeCtaSection";
import ConciergeHeroSection from "@/components/sections/Concierge/ConciergeHeroSection";
import ConciergeJourneyStudioSection from "@/components/sections/Concierge/ConciergeJourneyStudioSection";
import ConciergeSystemScreensSection from "@/components/sections/Concierge/ConciergeSystemScreensSection";
import ConciergeTestimonialsSection from "@/components/sections/Concierge/ConciergeTestimonialsSection";
import ConciergeTriggersSection from "@/components/sections/Concierge/ConciergeTriggersSection";

export default function IungoConciergePage() {
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

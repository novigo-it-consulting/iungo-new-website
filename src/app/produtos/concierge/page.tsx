import ConciergeHeroSection from "@/components/sections/Concierge/ConciergeHeroSection";
import ConciergeTriggersSection from "@/components/sections/Concierge/ConciergeTriggersSection";

export default function IungoConciergePage() {
  return (
    <main className="min-w-0 flex-1 bg-white">
      <ConciergeHeroSection />
      <ConciergeTriggersSection />
    </main>
  );
}

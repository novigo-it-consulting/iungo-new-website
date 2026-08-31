import BehaviorCdpOverviewSection from "@/components/sections/Behavior/CdpOverview/BehaviorCdpOverviewSection";
import BehaviorHeroSection from "@/components/sections/Behavior/Hero/BehaviorHeroSection";
import BehaviorTestimonialSection from "@/components/sections/Behavior/Testimonial/BehaviorTestimonialSection";

export default function IungoBehaviorPage() {
  return (
    <main className="min-w-0 flex-1 bg-white">
      <BehaviorHeroSection />
      <BehaviorCdpOverviewSection />
      <BehaviorTestimonialSection />
    </main>
  );
}

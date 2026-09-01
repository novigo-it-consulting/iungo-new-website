import BehaviorCdpOverviewSection from "@/components/sections/Behavior/CdpOverview/BehaviorCdpOverviewSection";
import BehaviorHeroSection from "@/components/sections/Behavior/Hero/BehaviorHeroSection";
import BehaviorSystemScreensSection from "@/components/sections/Behavior/SystemScreens/BehaviorSystemScreensSection";
import BehaviorTestimonialSection from "@/components/sections/Behavior/Testimonial/BehaviorTestimonialSection";
import BehaviorCtaSection from "@/components/sections/Behavior/Cta/BehaviorCtaSection";
import BehaviorTestimonialsSection from "@/components/sections/Behavior/Testimonials/BehaviorTestimonialsSection";

export default function IungoBehaviorPage() {
  return (
    <main className="min-w-0 flex-1 bg-white">
      <BehaviorHeroSection />
      <BehaviorCdpOverviewSection />
      <BehaviorTestimonialSection />
      <BehaviorSystemScreensSection />
      <BehaviorTestimonialsSection />
      <BehaviorCtaSection />
    </main>
  );
}

import BehaviorCdpOverviewSection from "@/components/sections/Behavior/CdpOverview/BehaviorCdpOverviewSection";
import BehaviorHeroSection from "@/components/sections/Behavior/Hero/BehaviorHeroSection";
import BehaviorSystemScreensSection from "@/components/sections/Behavior/SystemScreens/BehaviorSystemScreensSection";
import BehaviorTestimonialSection from "@/components/sections/Behavior/Testimonial/BehaviorTestimonialSection";
import BehaviorCtaSection from "@/components/sections/Behavior/Cta/BehaviorCtaSection";
import BehaviorTestimonialsSection from "@/components/sections/Behavior/Testimonials/BehaviorTestimonialsSection";
import { BEHAVIOR_HREF } from "@/constants/routes";
import { setLocale, type LocalePageProps, type LocaleParams } from "@/i18n/locale";
import { createHeroPageMetadata } from "@/i18n/pageMetadata";

export function generateMetadata({ params }: LocaleParams) {
  return createHeroPageMetadata(params, BEHAVIOR_HREF, "productPages.behavior");
}

export default async function IungoBehaviorPage({ params }: LocalePageProps) {
  await setLocale(params);

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

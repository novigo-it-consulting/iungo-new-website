import PageContainer from "@/components/layout/PageContainer";
import ProductTestimonialsSection from "@/components/sections/shared/Testimonials/ProductTestimonialsSection";

import { BEHAVIOR_TESTIMONIALS } from "./behaviorTestimonials.constants";

export default function BehaviorTestimonialsSection() {
  return (
    <>
      <div
        data-behavior-testimonials-spacer
        aria-hidden="true"
        className="h-[73px] w-full bg-white"
      />

      <div
        data-behavior-testimonials-section
        className="w-full min-w-0 bg-[#FAFAF9] py-16 xl:py-[96px]"
      >
        <PageContainer
          data-behavior-testimonials-container
          size="content1152"
          className="flex min-w-0 flex-col items-center"
        >
          <ProductTestimonialsSection
            productSlug="behavior"
            title="Quem ativou, sentiu."
            description="Líderes de growth e CRM que substituíram Segment + ferramentas avulsas pela stack unificada."
            testimonials={BEHAVIOR_TESTIMONIALS}
            variant="behavior"
          />
        </PageContainer>
      </div>
    </>
  );
}

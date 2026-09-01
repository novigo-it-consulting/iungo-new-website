import PageContainer from "@/components/layout/PageContainer";
import ProductTestimonialsCards from "@/components/sections/shared/Testimonials/ProductTestimonialsCards";
import ProductTestimonialsDisclaimer from "@/components/sections/shared/Testimonials/ProductTestimonialsDisclaimer";
import ProductTestimonialsHeader from "@/components/sections/shared/Testimonials/ProductTestimonialsHeader";

import { BEHAVIOR_TESTIMONIALS } from "./behaviorTestimonials.constants";

export default function BehaviorTestimonialsSection() {
  return (
    <>
      <div
        data-behavior-testimonials-spacer
        aria-hidden="true"
        className="h-[73px] w-full bg-white"
      />

      <section
        data-behavior-testimonials-section
        aria-labelledby="behavior-testimonials-title"
        className="w-full min-w-0 bg-[#FAFAF9] py-16 xl:py-[96px]"
      >
        <PageContainer
          data-behavior-testimonials-container
          size="content1152"
          className="flex min-w-0 flex-col items-center"
        >
          <ProductTestimonialsHeader
            productSlug="behavior"
            title="Quem ativou, sentiu."
            description="Líderes de growth e CRM que substituíram Segment + ferramentas avulsas pela stack unificada."
          />

          <ProductTestimonialsCards
            productSlug="behavior"
            testimonials={BEHAVIOR_TESTIMONIALS}
            variant="behavior"
          />

          <ProductTestimonialsDisclaimer productSlug="behavior" />
        </PageContainer>
      </section>
    </>
  );
}

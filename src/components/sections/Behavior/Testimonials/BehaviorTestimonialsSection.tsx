import PageContainer from "@/components/layout/PageContainer";

import BehaviorTestimonialsCards from "./BehaviorTestimonialsCards";
import BehaviorTestimonialsDisclaimer from "./BehaviorTestimonialsDisclaimer";
import BehaviorTestimonialsHeader from "./BehaviorTestimonialsHeader";

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
          <BehaviorTestimonialsHeader />

          <BehaviorTestimonialsCards />

          <BehaviorTestimonialsDisclaimer />
        </PageContainer>
      </section>
    </>
  );
}

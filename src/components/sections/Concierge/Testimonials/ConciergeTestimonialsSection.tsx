import PageContainer from "@/components/layout/PageContainer";

import ConciergeTestimonialsCards from "./ConciergeTestimonialsCards";
import ConciergeTestimonialsDisclaimer from "./ConciergeTestimonialsDisclaimer";
import ConciergeTestimonialsHeader from "./ConciergeTestimonialsHeader";

export default function ConciergeTestimonialsSection() {
  return (
    <>
      <div
        data-concierge-testimonials-spacer
        aria-hidden="true"
        className="h-[72px] w-full bg-white"
      />

      <section
        data-concierge-testimonials-section
        aria-labelledby="concierge-testimonials-title"
        className="w-full min-w-0 bg-[#FAFAF9] pt-16 xl:pt-[96px]"
      >
        <PageContainer size="content1280">
          <div
            data-concierge-testimonials-container
            className="flex w-full flex-col items-center pb-16 xl:pb-[96px]"
          >
            <ConciergeTestimonialsHeader />

            <ConciergeTestimonialsCards />

            <ConciergeTestimonialsDisclaimer />
          </div>
        </PageContainer>
      </section>
    </>
  );
}

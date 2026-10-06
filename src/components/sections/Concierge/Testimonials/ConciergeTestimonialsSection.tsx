import { getTranslations } from "next-intl/server";

import PageContainer from "@/components/layout/PageContainer";

import ProductTestimonialsCards from "@/components/sections/shared/Testimonials/ProductTestimonialsCards";
import ProductTestimonialsDisclaimer from "@/components/sections/shared/Testimonials/ProductTestimonialsDisclaimer";

import ConciergeTestimonialsHeader from "./ConciergeTestimonialsHeader";
import { CONCIERGE_TESTIMONIALS } from "./conciergeTestimonials.constants";

export default async function ConciergeTestimonialsSection() {
  const t = await getTranslations("productPages.concierge.testimonials");
  const [patricia, eduardo] = CONCIERGE_TESTIMONIALS;

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

            <ProductTestimonialsCards
              productSlug="concierge"
              testimonials={[
                {
                  ...patricia,
                  quote: t("patricia.quote"),
                  name: t("patricia.name"),
                  role: t("patricia.role"),
                  metricValue: t("patricia.metricValue"),
                  metricLabel: t("patricia.metricLabel"),
                },
                {
                  ...eduardo,
                  quote: t("eduardo.quote"),
                  name: t("eduardo.name"),
                  role: t("eduardo.role"),
                  metricValue: t("eduardo.metricValue"),
                  metricLabel: t("eduardo.metricLabel"),
                },
              ]}
              variant="default"
              listClassName="mt-10 grid w-full max-w-[1088px] grid-cols-1 gap-6 lg:grid-cols-2 xl:min-h-[339px]"
            />

            <ProductTestimonialsDisclaimer productSlug="concierge" />
          </div>
        </PageContainer>
      </section>
    </>
  );
}

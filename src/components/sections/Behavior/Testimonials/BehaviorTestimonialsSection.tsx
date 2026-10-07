import { getTranslations } from "next-intl/server";

import PageContainer from "@/components/layout/PageContainer";
import ProductTestimonialsSection from "@/components/sections/shared/Testimonials/ProductTestimonialsSection";

import { BEHAVIOR_TESTIMONIALS } from "./behaviorTestimonials.constants";

export default async function BehaviorTestimonialsSection() {
  const t = await getTranslations("productPages.behavior.testimonials");
  const [camila, bruno] = BEHAVIOR_TESTIMONIALS;

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
            title={t("title")}
            description={t("description")}
            testimonials={[
              {
                ...camila,
                quote: t("camila.quote"),
                name: t("camila.name"),
                role: t("camila.role"),
                metricLabel: t("camila.metricLabel"),
              },
              {
                ...bruno,
                quote: t("bruno.quote"),
                name: t("bruno.name"),
                role: t("bruno.role"),
                metricLabel: t("bruno.metricLabel"),
              },
            ]}
            variant="behavior"
          />
        </PageContainer>
      </div>
    </>
  );
}

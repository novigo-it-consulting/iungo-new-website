import { getTranslations } from "next-intl/server";

import PageContainer from "@/components/layout/PageContainer";

import AttendantCompliance from "./Compliance/AttendantCompliance";
import AttendantSupportedOperations from "./SupportedOperations/AttendantSupportedOperations";
import AttendantSystemScreens from "./SystemScreens/AttendantSystemScreens";
import ProductTestimonialsSection from "@/components/sections/shared/Testimonials/ProductTestimonialsSection";

import { ATTENDANT_TESTIMONIALS } from "./Testimonials/attendantTestimonials.constants";

export default async function AttendantContentSection() {
  const t = await getTranslations("productPages.attendant");
  const tQuotes = await getTranslations("productPages.attendant.testimonials");
  const [sandra, henrique] = ATTENDANT_TESTIMONIALS;

  return (
    <section
      data-attendant-content-section
      aria-label={t("contentAria")}
      className="box-border w-full min-w-0 bg-white pt-[60px]"
    >
      <div className="mx-auto w-[calc(100%_-_48px)] min-w-0 max-w-[960px] sm:w-[calc(100%_-_64px)]">
        <AttendantCompliance />
      </div>

      <PageContainer
        data-attendant-system-screens-container
        size="content1280"
        className="min-w-0 mt-[120px]"
      >
        <AttendantSystemScreens />
      </PageContainer>

      <PageContainer
        data-attendant-testimonials-container
        size="content1152"
        className="min-w-0 mt-[281px]"
      >
        <ProductTestimonialsSection
          productSlug="attendant"
          title={tQuotes("title")}
          description={tQuotes("description")}
          testimonials={[
            {
              ...sandra,
              quote: tQuotes("sandra.quote"),
              name: tQuotes("sandra.name"),
              role: tQuotes("sandra.role"),
              metricLabel: tQuotes("sandra.metricLabel"),
            },
            {
              ...henrique,
              quote: tQuotes("henrique.quote"),
              name: tQuotes("henrique.name"),
              role: tQuotes("henrique.role"),
              metricLabel: tQuotes("henrique.metricLabel"),
            },
          ]}
          variant="attendant"
        />
      </PageContainer>

      <PageContainer
        data-attendant-supported-operations-container
        size="content1152"
        className="min-w-0 mt-[155px]"
      >
        <AttendantSupportedOperations />
      </PageContainer>
    </section>
  );
}

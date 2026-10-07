import { getTranslations } from "next-intl/server";

import PageContainer from "@/components/layout/PageContainer";

import IoTApplicationAreasSection from "./ApplicationAreas/IoTApplicationAreasSection";
import IoTAssetCloudSection from "./AssetCloud/IoTAssetCloudSection";
import IoTCaseStudySection from "./CaseStudy/IoTCaseStudySection";
import IoTMetricsSection from "./Metrics/IoTMetricsSection";
import IoTTechnologiesSection from "./Technologies/IoTTechnologiesSection";
import ProductTestimonialsSection from "@/components/sections/shared/Testimonials/ProductTestimonialsSection";

import { IOT_TESTIMONIALS } from "./Testimonials/iotTestimonials.constants";

export default async function IoTContentSection() {
  const t = await getTranslations("productPages.iot");
  const tQuotes = await getTranslations("productPages.iot.testimonials");
  const [luis, claudia] = IOT_TESTIMONIALS;

  return (
    <section
      data-iot-content-section
      aria-label={t("contentAria")}
      className="w-full min-w-0 bg-white"
    >
      <IoTMetricsSection />
      <IoTApplicationAreasSection />
      <IoTTechnologiesSection />
      <IoTAssetCloudSection />
      <IoTCaseStudySection />

      <PageContainer
        data-iot-testimonials-container
        size="content1152"
        className="min-w-0 mt-[205px]"
      >
        <ProductTestimonialsSection
          productSlug="iot"
          title={tQuotes("title")}
          description={tQuotes("description")}
          testimonials={[
            {
              ...luis,
              quote: tQuotes("luis.quote"),
              name: tQuotes("luis.name"),
              role: tQuotes("luis.role"),
              metricLabel: tQuotes("luis.metricLabel"),
            },
            {
              ...claudia,
              quote: tQuotes("claudia.quote"),
              name: tQuotes("claudia.name"),
              role: tQuotes("claudia.role"),
              metricLabel: tQuotes("claudia.metricLabel"),
            },
          ]}
          variant="iot"
        />
      </PageContainer>
    </section>
  );
}

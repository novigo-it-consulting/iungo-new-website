import PageContainer from "@/components/layout/PageContainer";

import IoTApplicationAreasSection from "./ApplicationAreas/IoTApplicationAreasSection";
import IoTAssetCloudSection from "./AssetCloud/IoTAssetCloudSection";
import IoTCaseStudySection from "./CaseStudy/IoTCaseStudySection";
import IoTMetricsSection from "./Metrics/IoTMetricsSection";
import IoTTechnologiesSection from "./Technologies/IoTTechnologiesSection";
import ProductTestimonialsSection from "@/components/sections/shared/Testimonials/ProductTestimonialsSection";

import { IOT_TESTIMONIALS } from "./Testimonials/iotTestimonials.constants";

export default function IoTContentSection() {
  return (
    <section
      data-iot-content-section
      aria-label="Conteúdo do Iungo IoT"
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
          title="Quem rastreia ativo crítico, fala."
          description="Diretores de TI e supply chain que reduziram prejuízo, fechamento contábil e auditoria física."
          testimonials={IOT_TESTIMONIALS}
          variant="iot"
        />
      </PageContainer>
    </section>
  );
}

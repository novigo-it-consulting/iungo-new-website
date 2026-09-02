import IoTApplicationAreasSection from "./ApplicationAreas/IoTApplicationAreasSection";
import IoTAssetCloudSection from "./AssetCloud/IoTAssetCloudSection";
import IoTCaseStudySection from "./CaseStudy/IoTCaseStudySection";
import IoTMetricsSection from "./Metrics/IoTMetricsSection";
import IoTTechnologiesSection from "./Technologies/IoTTechnologiesSection";

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
    </section>
  );
}

import PageContainer from "@/components/layout/PageContainer";

import IoTCaseStudyCard from "./IoTCaseStudyCard";

export default function IoTCaseStudySection() {
  return (
    <section
      data-iot-case-study-section
      aria-label="Case de sucesso Iungo IoT"
      className="box-border w-full min-w-0 bg-white py-[96px]"
    >
      <PageContainer data-iot-case-study-container size="organizerComparison">
        <IoTCaseStudyCard />
      </PageContainer>
    </section>
  );
}

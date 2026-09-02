import PageContainer from "@/components/layout/PageContainer";

import IoTMetricsContent from "./IoTMetricsContent";

export default function IoTMetricsSection() {
  return (
    <section
      data-iot-metrics-section
      aria-labelledby="iot-metrics-title"
      className="box-border w-full min-w-0 border-y border-[#E4E4E7] bg-white py-[80px]"
    >
      <PageContainer data-iot-metrics-container size="content1152" className="min-w-0">
        <IoTMetricsContent />
      </PageContainer>
    </section>
  );
}

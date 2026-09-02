import IoTMetricsSection from "./Metrics/IoTMetricsSection";

export default function IoTContentSection() {
  return (
    <section
      data-iot-content-section
      aria-label="Conteúdo do Iungo IoT"
      className="w-full min-w-0 bg-white"
    >
      <IoTMetricsSection />
    </section>
  );
}

import { IOT_METRICS, IOT_METRICS_TITLE } from "./iotMetrics.constants";
import IoTMetricItem from "./IoTMetricItem";

export default function IoTMetricsContent() {
  return (
    <div
      data-iot-metrics-content
      className="mx-auto flex w-full max-w-[1088px] min-w-0 flex-col items-center gap-6"
    >
      <h2
        id="iot-metrics-title"
        data-iot-metrics-title
        className="m-0 w-full text-center font-reddit text-xs font-normal leading-4 tracking-[1.2px] text-[#71717A] uppercase"
      >
        {IOT_METRICS_TITLE}
      </h2>

      <ul
        data-iot-metrics-list
        className="m-0 grid w-full min-w-0 list-none grid-cols-1 gap-12 p-0 sm:grid-cols-2 xl:grid-cols-4 xl:gap-8"
      >
        {IOT_METRICS.map((metric) => (
          <IoTMetricItem key={metric.id} metric={metric} />
        ))}
      </ul>
    </div>
  );
}

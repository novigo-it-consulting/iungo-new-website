import type { IoTMetric } from "./iotMetrics.constants";

interface IoTMetricItemProps {
  metric: IoTMetric;
}

export default function IoTMetricItem({ metric }: Readonly<IoTMetricItemProps>) {
  return (
    <li className="min-w-0">
      <div
        data-iot-metric-item={metric.id}
        className="flex h-[60px] w-full min-w-0 flex-col items-center justify-center gap-1 text-center xl:max-w-[248px]"
      >
        <p
          data-iot-metric-value={metric.id}
          className="m-0 w-full font-reddit text-[40px] !leading-[40px] font-bold tracking-[-0.8px] text-[#B8860B]"
        >
          {metric.value}
        </p>

        <p
          data-iot-metric-label={metric.id}
          className="m-0 w-full font-reddit text-xs font-normal leading-4 tracking-[0px] text-[#71717A]"
        >
          {metric.label}
        </p>
      </div>
    </li>
  );
}

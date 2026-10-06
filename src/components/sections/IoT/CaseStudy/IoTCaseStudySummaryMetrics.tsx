import type { IoTCaseStudySummaryMetric } from "./iotCaseStudy.constants";

const metricLabelClassName =
  "m-0 font-reddit text-[14px] font-normal leading-5 tracking-[0px]";

const metricValueClassName =
  "m-0 font-reddit text-[14px] font-bold leading-5 tracking-[-0.28px]";

type IoTCaseStudySummaryMetricRowProps = {
  metric: IoTCaseStudySummaryMetric;
  isLast: boolean;
};

function IoTCaseStudySummaryMetricRow({
  metric,
  isLast,
}: Readonly<IoTCaseStudySummaryMetricRowProps>) {
  const { label, value, highlighted = false } = metric;

  const rowClassName = isLast
    ? "box-border flex h-[28px] w-full min-w-0 items-center justify-between pt-2"
    : "box-border flex h-[29px] w-full min-w-0 items-center justify-between border-b border-white/10 pb-2";

  return (
    <div data-iot-case-study-summary-metric-row className={rowClassName}>
      <dt
        className={[
          metricLabelClassName,
          highlighted ? "text-[#B8860B]" : "text-white/60",
        ].join(" ")}
      >
        {label}
      </dt>
      <dd
        className={[
          metricValueClassName,
          highlighted ? "text-[#B8860B]" : "text-white",
        ].join(" ")}
      >
        {value}
      </dd>
    </div>
  );
}

type IoTCaseStudySummaryMetricsProps = {
  metrics: readonly IoTCaseStudySummaryMetric[];
};

export default function IoTCaseStudySummaryMetrics({
  metrics,
}: Readonly<IoTCaseStudySummaryMetricsProps>) {
  const lastMetricIndex = metrics.length - 1;

  return (
    <div
      data-iot-case-study-summary-metrics
      className="w-full min-w-0 pt-3"
    >
      <dl className="m-0 flex w-full flex-col gap-3">
        {metrics.map((metric, index) => (
          <IoTCaseStudySummaryMetricRow
            key={metric.id}
            metric={metric}
            isLast={index === lastMetricIndex}
          />
        ))}
      </dl>
    </div>
  );
}

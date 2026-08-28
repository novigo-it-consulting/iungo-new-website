import type { CaseMetric } from "./cases.constants";

interface MetricItemProps {
  metric: CaseMetric;
  valueClassName: string;
}

function MetricItem({ metric, valueClassName }: MetricItemProps) {
  return (
    <div className="flex flex-1 flex-col gap-0">
      <span
        className={`font-reddit text-[24px] font-bold leading-[32px] tracking-[-0.01em] ${valueClassName}`}
      >
        {metric.value}
      </span>
      <span className="font-reddit text-[12px] font-normal leading-[16px] text-[#909090]">
        {metric.label}
      </span>
    </div>
  );
}

interface CaseCardMetricsProps {
  caseId: string;
  metrics: readonly CaseMetric[];
  valueClassName?: string;
}

export default function CaseCardMetrics({
  caseId,
  metrics,
  valueClassName = "text-[#A72121]",
}: CaseCardMetricsProps) {
  return (
    <div
      data-case-metrics={caseId}
      className="flex w-full flex-row items-start gap-4"
    >
      {metrics.map((metric) => (
        <MetricItem
          key={metric.label}
          metric={metric}
          valueClassName={valueClassName}
        />
      ))}
    </div>
  );
}

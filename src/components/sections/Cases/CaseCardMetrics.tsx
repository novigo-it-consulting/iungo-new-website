import type { CaseMetric } from "./cases.constants";
import {
  caseCardMetricItemClassName,
  caseCardMetricLabelClassName,
  caseCardMetricValueClassName,
  caseCardMetricsClassName,
} from "./casesSection.styles";

interface MetricItemProps {
  metric: CaseMetric;
  valueClassName: string;
}

function MetricItem({ metric, valueClassName }: MetricItemProps) {
  return (
    <div className={caseCardMetricItemClassName}>
      <span className={`${caseCardMetricValueClassName} ${valueClassName}`}>
        {metric.value}
      </span>
      <span className={caseCardMetricLabelClassName}>{metric.label}</span>
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
      className={caseCardMetricsClassName}
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

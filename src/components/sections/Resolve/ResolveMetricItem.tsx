import type { ResolveMetric } from "./resolveMetrics.constants";
import {
  resolveMetricComplementClassName,
  resolveMetricDescriptionClassName,
  resolveMetricItemClassName,
  resolveMetricValueClassName,
} from "./resolveMetrics.styles";

interface ResolveMetricItemProps {
  metric: ResolveMetric;
}

export default function ResolveMetricItem({ metric }: Readonly<ResolveMetricItemProps>) {
  return (
    <div
      data-resolve-metric-item={metric.id}
      className={resolveMetricItemClassName}
    >
      <p
        data-resolve-metric-value={metric.id}
        className={resolveMetricValueClassName}
      >
        {metric.value}
      </p>

      <p
        data-resolve-metric-description={metric.id}
        className={resolveMetricDescriptionClassName}
      >
        {metric.description}
      </p>

      <p
        data-resolve-metric-complement={metric.id}
        className={resolveMetricComplementClassName}
      >
        {metric.complement}
      </p>
    </div>
  );
}

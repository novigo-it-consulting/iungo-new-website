import type { ResolveMetric } from "./resolveMetrics.constants";

interface ResolveMetricItemProps {
  metric: ResolveMetric;
}

export default function ResolveMetricItem({ metric }: ResolveMetricItemProps) {
  return (
    <div
      data-resolve-metric-item={metric.id}
      className="flex min-w-0 flex-col items-center gap-1 text-center"
    >
      <p
        data-resolve-metric-value={metric.id}
        className="m-0 w-full text-center font-reddit text-[48px] font-bold leading-[48px] tracking-[-0.96px] text-[#C84F04]"
      >
        {metric.value}
      </p>

      <p
        data-resolve-metric-description={metric.id}
        className="m-0 w-full text-center font-reddit text-sm font-medium leading-5 tracking-normal text-[#27272A]"
      >
        {metric.description}
      </p>

      <p
        data-resolve-metric-complement={metric.id}
        className="m-0 w-full text-center font-reddit text-xs font-normal leading-4 tracking-normal text-[#71717A]"
      >
        {metric.complement}
      </p>
    </div>
  );
}

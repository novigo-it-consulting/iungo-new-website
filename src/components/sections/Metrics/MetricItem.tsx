interface MetricItemProps {
  metricId: string;
  value: string;
  description: string;
}

export default function MetricItem({
  metricId,
  value,
  description,
}: MetricItemProps) {
  return (
    <div
      data-metric-item={metricId}
      className="mx-auto flex min-w-0 w-full max-w-[180px] self-start flex-col items-center gap-[6.06px]"
    >
      <dd
        data-metric-value={metricId}
        className="h-auto w-fit self-center whitespace-nowrap text-left font-reddit text-[48.46px] font-bold leading-[72.7px] tracking-[0] text-[#0024AE]"
      >
        {value}
      </dd>

      <dt
        data-metric-description={metricId}
        className="h-auto w-full text-center font-reddit text-[13.63px] font-normal leading-[24.2px] tracking-[0] text-[#909090]"
      >
        {description}
      </dt>
    </div>
  );
}

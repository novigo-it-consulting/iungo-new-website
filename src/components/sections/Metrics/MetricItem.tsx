interface MetricItemProps {
  metricId: string;
  value: string;
  description: string;
  itemClassName: string;
  descriptionClassName: string;
}

export default function MetricItem({
  metricId,
  value,
  description,
  itemClassName,
  descriptionClassName,
}: MetricItemProps) {
  return (
    <div
      data-metric-item={metricId}
      className={`flex w-full max-w-[210px] flex-col items-center gap-2 xl:w-[210px] xl:shrink-0 ${itemClassName}`}
    >
      <dt
        data-metric-description={metricId}
        className={`order-2 flex w-full items-start justify-center text-center font-reddit text-[16px] font-normal leading-[28px] tracking-[0px] text-[#909090] 2xl:w-[210px] 2xl:text-[18px] 2xl:leading-[32px] ${descriptionClassName}`}
      >
        {description}
      </dt>

      <dd
        data-metric-value={metricId}
        className="order-1 flex h-[72px] w-full max-w-[196px] shrink-0 items-center justify-center whitespace-nowrap text-center font-reddit text-[48px] font-bold leading-[72px] tracking-[0px] text-[#0024AE] 2xl:h-[96px] 2xl:w-[196px] 2xl:text-[64px] 2xl:leading-[96px]"
      >
        {value}
      </dd>
    </div>
  );
}

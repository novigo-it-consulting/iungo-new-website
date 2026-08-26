import Image from "next/image";
import MetricItem from "./MetricItem";
import { METRICS } from "./metrics.constants";

export default function MetricsSection() {
  return (
    <section data-metrics-section className="w-full bg-white">
      <div className="mx-auto flex w-full max-w-[1728px] flex-col items-center px-4 pt-8 md:px-8 2xl:px-0 2xl:pt-[41px]">
        <div
          data-metrics-client-logo
          className="relative h-[52px] w-[180px] 2xl:h-[71px] 2xl:w-[247px]"
        >
          <Image
            src="/images/rd-saude-logo.png"
            alt="RD Saúde — por uma sociedade mais saudável"
            fill
            sizes="(min-width: 1536px) 247px, 180px"
            className="object-contain"
          />
        </div>

        <h2
          data-metrics-heading
          className="mt-4 flex w-full max-w-[1672px] items-center justify-center text-center font-reddit text-[28px] font-semibold leading-[40px] tracking-[-0.28px] text-[#424241] md:text-[32px] md:leading-[48px] md:tracking-[-0.32px] 2xl:mt-[21px] 2xl:h-[113px] 2xl:text-[40px] 2xl:leading-[89px] 2xl:tracking-[-0.4px]"
        >
          Métricas que decisores enterprise levam a sério.
        </h2>

        <div
          data-metrics-card
          className="mt-6 flex items-center justify-center min-h-[240px] w-full max-w-[1669px] box-border rounded-[20.03px] border border-[#D3D5D8] bg-white 2xl:-mt-[10px] 2xl:h-[315px] 2xl:translate-x-[1.5px]"
        >
          <dl
            data-metrics-list
            className="flex w-full flex-col items-center gap-8 py-8 xl:w-[85%] xl:flex-row xl:items-start xl:justify-between xl:gap-0 2xl:h-[232px] 2xl:w-full 2xl:max-w-[1414px] 2xl:p-0"
          >
            {METRICS.map((metric) => (
              <MetricItem
                key={metric.id}
                metricId={metric.id}
                value={metric.value}
                description={metric.description}
                itemClassName={metric.itemClassName}
                descriptionClassName={metric.descriptionClassName}
              />
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

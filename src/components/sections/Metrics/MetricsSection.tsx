import Image from "next/image";
import MetricItem from "./MetricItem";
import { METRICS } from "./metrics.constants";
import PageSideRails from "@/components/layout/PageSideRails";

export default function MetricsSection() {
  return (
    <section
      data-metrics-section
      data-page-rail-section="metrics"
      className="w-full bg-white"
    >
      <PageSideRails scope="metrics">
        <div className="mx-auto flex w-full max-w-[1728px] flex-col items-center px-4 pt-8 md:px-8 2xl:max-w-none 2xl:px-0 2xl:pt-[41px]">
          <div
            data-metrics-client-logo
            className="relative h-[46px] w-[160px] md:h-[54px] md:w-[187px]"
          >
            <Image
              src="/images/rd-saude-logo.png"
              alt="RD Saúde — por uma sociedade mais saudável"
              fill
              sizes="(min-width: 768px) 187px, 160px"
              className="object-contain"
            />
          </div>

          <h2
            data-metrics-heading
            className="mt-4 w-full max-w-[900px] text-center font-reddit text-[20px] font-medium leading-[28px] text-[#424241] md:text-[22px] md:leading-[30px] lg:text-[24px] lg:leading-[32px] 2xl:mt-[21px]"
          >
            Métricas que decisores enterprise levam a sério.
          </h2>

          <div
            data-metrics-card
            data-page-content-anchor="metrics"
            className="mt-[31px] flex w-full max-w-[1264px] box-border items-center justify-center rounded-[20.03px] border border-[#D3D5D8] bg-white xl:py-[31px]"
          >
            <dl
              data-metrics-list
              className="grid w-full grid-cols-1 items-start justify-items-center gap-y-8 py-8 md:grid-cols-2 md:gap-x-12 md:gap-y-8 xl:h-[176px] xl:max-w-[1071px] xl:grid-cols-4 xl:gap-x-[144px] xl:gap-y-0 xl:py-0"
            >
              {METRICS.map((metric) => (
                <MetricItem
                  key={metric.id}
                  metricId={metric.id}
                  value={metric.value}
                  description={metric.description}
                />
              ))}
            </dl>
          </div>
        </div>
      </PageSideRails>
    </section>
  );
}

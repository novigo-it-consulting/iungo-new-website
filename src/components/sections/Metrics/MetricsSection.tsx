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
          <h2
            data-metrics-heading
            className="w-full max-w-[900px] text-center font-reddit text-[30px] font-semibold leading-[72.7px] tracking-[-0.01em] text-[#424241] 2xl:mt-[50px]"
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

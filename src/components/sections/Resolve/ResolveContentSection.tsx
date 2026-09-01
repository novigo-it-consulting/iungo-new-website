import PageContainer from "@/components/layout/PageContainer";

import ResolveDifferentials from "./ResolveDifferentials";
import ResolveMetricItem from "./ResolveMetricItem";
import { RESOLVE_METRICS } from "./resolveMetrics.constants";
import ResolveSystemScreens from "./SystemScreens/ResolveSystemScreens";

export default function ResolveContentSection() {
  return (
    <section
      data-resolve-content-section
      aria-label="Conteúdo do Iungo Resolve"
      // Reserva provisória de altura no desktop; reavaliar quando os três containers estiverem completos.
      className="w-full min-w-0 bg-white xl:min-h-[3225px] xl:pt-[109px]"
    >
      <PageContainer
        data-resolve-first-content-container
        size="content1152"
        className="min-w-0"
      >
        <div
          data-resolve-metrics
          className="mx-auto grid w-full max-w-[1088px] grid-cols-1 gap-8 md:grid-cols-3"
        >
          {RESOLVE_METRICS.map((metric) => (
            <ResolveMetricItem key={metric.id} metric={metric} />
          ))}
        </div>

        <ResolveDifferentials />
      </PageContainer>

      <PageContainer
        data-resolve-system-screens-container
        size="content1280"
        className="min-w-0 mt-[149px]"
      >
        <ResolveSystemScreens />
      </PageContainer>
    </section>
  );
}

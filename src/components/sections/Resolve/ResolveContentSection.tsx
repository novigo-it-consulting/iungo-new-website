import PageContainer from "@/components/layout/PageContainer";

import ResolveDifferentials from "./ResolveDifferentials";
import ResolveMetricItem from "./ResolveMetricItem";
import { RESOLVE_METRICS } from "./resolveMetrics.constants";
import ResolveSystemScreens from "./SystemScreens/ResolveSystemScreens";
import ResolveTestimonials from "./Testimonials/ResolveTestimonials";

export default function ResolveContentSection() {
  return (
    <section
      data-resolve-content-section
      aria-label="Conteúdo do Iungo Resolve"
      className="w-full min-w-0 bg-white xl:pt-[109px]"
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

      <PageContainer
        data-resolve-testimonials-container
        size="content1152"
        className="min-w-0 mt-[193px]"
      >
        <ResolveTestimonials />
      </PageContainer>
    </section>
  );
}

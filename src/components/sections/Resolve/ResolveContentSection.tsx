import PageContainer from "@/components/layout/PageContainer";

import ResolveDifferentials from "./Differentials/ResolveDifferentials";
import ResolveMetricItem from "./ResolveMetricItem";
import { RESOLVE_METRICS } from "./resolveMetrics.constants";
import {
  resolveContentSectionClassName,
  resolveMetricsGridClassName,
} from "./resolveMetrics.styles";
import ResolveSystemScreens from "./SystemScreens/ResolveSystemScreens";
import ProductTestimonialsSection from "@/components/sections/shared/Testimonials/ProductTestimonialsSection";

import { RESOLVE_TESTIMONIALS } from "./Testimonials/resolveTestimonials.constants";

export default function ResolveContentSection() {
  return (
    <section
      data-resolve-content-section
      aria-label="Conteúdo do Iungo Resolve"
      className={resolveContentSectionClassName}
    >
      <PageContainer
        data-resolve-first-content-container
        size="content1152"
        className="min-w-0"
      >
        <div
          data-resolve-metrics
          className={resolveMetricsGridClassName}
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
        <ProductTestimonialsSection
          productSlug="resolve"
          title="CX que cresce sem inflar headcount."
          description="Líderes de atendimento que automatizaram L1/L2 sem perder qualidade nem CSAT."
          testimonials={RESOLVE_TESTIMONIALS}
          variant="resolve"
        />
      </PageContainer>
    </section>
  );
}

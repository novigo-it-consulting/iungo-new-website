import { getTranslations } from "next-intl/server";

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

type MetricsTranslator = Awaited<
  ReturnType<typeof getTranslations<"productPages.resolve.metrics">>
>;

function metricCopy(t: MetricsTranslator, id: (typeof RESOLVE_METRICS)[number]["id"]) {
  switch (id) {
    case "automated-resolution":
      return {
        description: t("automatedResolution.description"),
        complement: t("automatedResolution.complement"),
      };
    case "response-time":
      return {
        description: t("responseTime.description"),
        complement: t("responseTime.complement"),
      };
    case "ticket-cost":
      return {
        description: t("ticketCost.description"),
        complement: t("ticketCost.complement"),
      };
  }
}

export default async function ResolveContentSection() {
  const t = await getTranslations("productPages.resolve");
  const tMetrics = await getTranslations("productPages.resolve.metrics");
  const tQuotes = await getTranslations("productPages.resolve.testimonials");
  const [renata, felipe] = RESOLVE_TESTIMONIALS;

  return (
    <section
      data-resolve-content-section
      aria-label={t("contentAria")}
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
            <ResolveMetricItem
              key={metric.id}
              metric={{ ...metric, ...metricCopy(tMetrics, metric.id) }}
            />
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
          title={tQuotes("title")}
          description={tQuotes("description")}
          testimonials={[
            {
              ...renata,
              quote: tQuotes("renata.quote"),
              name: tQuotes("renata.name"),
              role: tQuotes("renata.role"),
              metricLabel: tQuotes("renata.metricLabel"),
            },
            {
              ...felipe,
              quote: tQuotes("felipe.quote"),
              name: tQuotes("felipe.name"),
              role: tQuotes("felipe.role"),
              metricLabel: tQuotes("felipe.metricLabel"),
            },
          ]}
          variant="resolve"
        />
      </PageContainer>
    </section>
  );
}

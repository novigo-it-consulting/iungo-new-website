import { getTranslations } from "next-intl/server";

import PageContainer from "@/components/layout/PageContainer";
import { homeSectionTitleClassName } from "@/components/ui/sectionTitle.styles";

import MetricItem from "./MetricItem";
import { METRICS } from "./metrics.constants";

type MetricsTranslator = Awaited<ReturnType<typeof getTranslations<"home.metrics">>>;
type MetricDescriptionKey = (typeof METRICS)[number]["descriptionKey"];

function metricDescription(
  descriptionKey: MetricDescriptionKey,
  t: MetricsTranslator,
): string {
  switch (descriptionKey) {
    case "revenue":
      return t("revenue");
    case "conversion":
      return t("conversion");
    case "automation":
      return t("automation");
    case "trackedAssets":
      return t("trackedAssets");
    default: {
      const exhaustive: never = descriptionKey;
      return exhaustive;
    }
  }
}

export default async function MetricsSection() {
  const t = await getTranslations("home.metrics");

  return (
    <section data-metrics-section className="w-full bg-white">
      <PageContainer
        size="content1264"
        data-page-main-content="metrics"
        className="flex flex-col items-center pt-8 2xl:pt-[41px]"
      >
        <h2
          data-metrics-heading
          className={`${homeSectionTitleClassName} max-w-[900px] 2xl:mt-[50px]`}
        >
          {t("title")}
        </h2>

        <div
          data-metrics-card
          data-page-content-anchor="metrics"
          className="mt-[31px] flex w-full box-border items-center justify-center rounded-[20.03px] border border-[#D3D5D8] bg-white xl:py-[31px]"
        >
          <dl
            data-metrics-list
            className="mx-auto box-border grid w-full min-w-0 max-w-[1070.57px] grid-cols-1 items-start justify-items-center gap-y-8 py-8 md:grid-cols-2 md:gap-x-12 md:gap-y-8 xl:grid-cols-4 xl:gap-x-[116px] xl:gap-y-0 xl:py-0"
          >
            {METRICS.map((metric) => (
              <MetricItem
                key={metric.id}
                metricId={metric.id}
                value={metric.value}
                description={metricDescription(metric.descriptionKey, t)}
              />
            ))}
          </dl>
        </div>
      </PageContainer>
    </section>
  );
}

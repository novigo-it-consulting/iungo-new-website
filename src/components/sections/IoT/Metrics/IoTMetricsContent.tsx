import { getTranslations } from "next-intl/server";

import { IOT_METRIC_IDS, type IoTMetric } from "./iotMetrics.constants";
import IoTMetricItem from "./IoTMetricItem";

type MetricsTranslator = Awaited<
  ReturnType<typeof getTranslations<"productPages.iot.metrics">>
>;

function metricCopy(
  t: MetricsTranslator,
  id: (typeof IOT_METRIC_IDS)[number],
): IoTMetric {
  switch (id) {
    case "tracked-assets":
      return {
        id,
        value: t("trackedAssets.value"),
        label: t("trackedAssets.label"),
      };
    case "connected-stores":
      return {
        id,
        value: t("connectedStores.value"),
        label: t("connectedStores.label"),
      };
    case "inventory-accuracy":
      return {
        id,
        value: t("inventoryAccuracy.value"),
        label: t("inventoryAccuracy.label"),
      };
    case "counting-cost":
      return {
        id,
        value: t("countingCost.value"),
        label: t("countingCost.label"),
      };
  }
}

export default async function IoTMetricsContent() {
  const t = await getTranslations("productPages.iot.metrics");

  return (
    <div
      data-iot-metrics-content
      className="mx-auto flex w-full max-w-[1088px] min-w-0 flex-col items-center gap-6"
    >
      <h2
        id="iot-metrics-title"
        data-iot-metrics-title
        className="m-0 w-full text-center font-reddit text-xs font-normal leading-4 tracking-[1.2px] text-[#71717A] uppercase"
      >
        {t("title")}
      </h2>

      <ul
        data-iot-metrics-list
        className="m-0 grid w-full min-w-0 list-none grid-cols-1 gap-12 p-0 sm:grid-cols-2 xl:grid-cols-4 xl:gap-8"
      >
        {IOT_METRIC_IDS.map((id) => (
          <IoTMetricItem key={id} metric={metricCopy(t, id)} />
        ))}
      </ul>
    </div>
  );
}

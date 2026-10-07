import { getTranslations } from "next-intl/server";

import CheckIcon from "@/components/icons/CheckIcon";

const topicTextClassName =
  "font-reddit text-[14px] font-normal leading-5 tracking-[0px] text-white/80";

const TOPIC_IDS = [
  "blind-inventory",
  "geofence",
  "audit-trail",
  "multi-tenant",
  "pim-connector",
] as const;

type TopicsTranslator = Awaited<
  ReturnType<typeof getTranslations<"productPages.iot.assetCloud">>
>;

function topicLabel(
  t: TopicsTranslator,
  id: (typeof TOPIC_IDS)[number],
) {
  switch (id) {
    case "blind-inventory":
      return t("blindInventory");
    case "geofence":
      return t("geofence");
    case "audit-trail":
      return t("auditTrail");
    case "multi-tenant":
      return t("multiTenant");
    case "pim-connector":
      return t("pimConnector");
  }
}

export default async function IoTAssetCloudTopics() {
  const t = await getTranslations("productPages.iot.assetCloud");
  const lastTopicIndex = TOPIC_IDS.length - 1;

  return (
    <div data-iot-asset-cloud-topics className="w-full min-w-0 pt-2">
      <ul className="m-0 flex list-none flex-col gap-3 p-0">
        {TOPIC_IDS.map((id, index) => {
          const isLastTopic = index === lastTopicIndex;

          return (
            <li
              key={id}
              data-iot-asset-cloud-topic-item
              className={[
                "flex min-h-[22px] w-full min-w-0 gap-3",
                isLastTopic ? "items-start xl:items-center" : "items-start",
              ].join(" ")}
            >
              <span
                aria-hidden="true"
                className="inline-flex h-[22px] w-3 shrink-0 items-center justify-center text-[#B8860B]"
              >
                <CheckIcon
                  focusable="false"
                  className="h-[22px] w-3 shrink-0"
                />
              </span>
              <span
                className={[
                  topicTextClassName,
                  isLastTopic
                    ? "min-w-0 flex-1 xl:shrink-0 xl:flex-none xl:whitespace-nowrap"
                    : "min-w-0 flex-1",
                ].join(" ")}
              >
                {topicLabel(t, id)}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

import CheckIcon from "@/components/icons/CheckIcon";

import { IOT_ASSET_CLOUD_TOPICS } from "./iotAssetCloud.constants";

const topicTextClassName =
  "font-reddit text-[14px] font-normal leading-5 tracking-[0px] text-white/80";

export default function IoTAssetCloudTopics() {
  const lastTopicIndex = IOT_ASSET_CLOUD_TOPICS.length - 1;

  return (
    <div data-iot-asset-cloud-topics className="w-full min-w-0 pt-2">
      <ul className="m-0 flex list-none flex-col gap-3 p-0">
        {IOT_ASSET_CLOUD_TOPICS.map((topic, index) => {
          const isLastTopic = index === lastTopicIndex;

          return (
            <li
              key={topic}
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
                {topic}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

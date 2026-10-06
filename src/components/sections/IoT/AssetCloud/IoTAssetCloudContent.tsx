import { getTranslations } from "next-intl/server";

import DarkSectionEyebrow from "@/components/sections/shared/SectionHeader/DarkSectionEyebrow";

import IoTAssetCloudTopics from "./IoTAssetCloudTopics";

export default async function IoTAssetCloudContent() {
  const t = await getTranslations("productPages.iot.assetCloud");

  return (
    <div
      data-iot-asset-cloud-content-column
      className="flex w-full min-w-0 max-w-[551px] flex-col gap-4"
    >
      <div data-iot-asset-cloud-eyebrow>
        <DarkSectionEyebrow
          label={t("eyebrow")}
          dataAttribute="data-iot-asset-cloud-eyebrow-badge"
        />
      </div>

      <div data-iot-asset-cloud-title className="pt-2">
        <h2
          id="iot-asset-cloud-title"
          className="m-0 w-full font-reddit text-[48px] font-bold leading-[48px] tracking-[-0.96px] text-white"
        >
          {t("title")}
        </h2>
      </div>

      <div data-iot-asset-cloud-description-primary className="pt-2">
        <p className="m-0 w-full font-reddit text-base font-normal leading-6 tracking-[0px] text-white/70">
          {t("primary")}
        </p>
      </div>

      <div data-iot-asset-cloud-description-secondary>
        <p className="m-0 w-full font-reddit text-base font-normal leading-6 tracking-[0px] text-white/60">
          {t("secondary")}
        </p>
      </div>

      <IoTAssetCloudTopics />
    </div>
  );
}

import { getTranslations } from "next-intl/server";

import IoTCaseStudyDetailsLink from "./IoTCaseStudyDetailsLink";
import IoTCaseStudyDetailsPhases from "./IoTCaseStudyDetailsPhases";

export default async function IoTCaseStudyDetailsPanel() {
  const t = await getTranslations("productPages.iot.caseStudy");

  return (
    <div
      data-iot-case-study-details
      className="flex min-h-[431.6px] min-w-0 flex-col gap-4 bg-white px-10 pt-10 pb-[55px]"
    >
      <div data-iot-case-study-details-title className="w-full min-w-0">
        <h3 className="m-0 w-full font-reddit text-[24px] font-bold leading-8 tracking-[-0.48px] text-[#27272A]">
          {t("detailsTitle")}
        </h3>
      </div>

      <div data-iot-case-study-details-description className="w-full min-w-0">
        <p className="m-0 w-full font-reddit text-[14px] font-normal leading-5 tracking-[0px] text-[#71717A]">
          {t("detailsDescription")}
        </p>
      </div>

      <IoTCaseStudyDetailsPhases />

      <IoTCaseStudyDetailsLink />
    </div>
  );
}

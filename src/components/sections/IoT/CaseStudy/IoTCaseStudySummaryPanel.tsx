import DarkSectionEyebrow from "@/components/sections/shared/SectionHeader/DarkSectionEyebrow";

import {
  IOT_CASE_STUDY_SUMMARY,
  IOT_CASE_STUDY_SUMMARY_METRICS,
} from "./iotCaseStudy.constants";
import IoTCaseStudySummaryMetrics from "./IoTCaseStudySummaryMetrics";

export default function IoTCaseStudySummaryPanel() {
  const { eyebrow, title, description } = IOT_CASE_STUDY_SUMMARY;

  return (
    <div
      data-iot-case-study-summary
      className="flex min-h-[431.82px] min-w-0 flex-col gap-3 bg-[#0A0B14] p-10"
    >
      <div data-iot-case-study-summary-eyebrow>
        <DarkSectionEyebrow
          label={eyebrow}
          dataAttribute="data-iot-case-study-summary-eyebrow-badge"
        />
      </div>

      <div data-iot-case-study-summary-title className="w-full min-w-0 pt-1">
        <h2 className="m-0 w-full font-reddit text-[30px] font-bold leading-9 tracking-[-0.6px] text-white">
          {title}
        </h2>
      </div>

      <div data-iot-case-study-summary-description className="w-full min-w-0">
        <p className="m-0 w-full font-reddit text-[14px] font-normal leading-5 tracking-[0px] text-white/60">
          {description}
        </p>
      </div>

      <IoTCaseStudySummaryMetrics metrics={IOT_CASE_STUDY_SUMMARY_METRICS} />
    </div>
  );
}

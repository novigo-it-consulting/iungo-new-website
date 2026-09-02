import { IOT_CASE_STUDY_DETAILS, IOT_CASE_STUDY_PHASES } from "./iotCaseStudy.constants";
import IoTCaseStudyDetailsLink from "./IoTCaseStudyDetailsLink";
import IoTCaseStudyDetailsPhases from "./IoTCaseStudyDetailsPhases";

export default function IoTCaseStudyDetailsPanel() {
  const { title, description } = IOT_CASE_STUDY_DETAILS;

  return (
    <div
      data-iot-case-study-details
      className="flex min-h-[431.6px] min-w-0 flex-col gap-4 bg-white px-10 pt-10 pb-[55px]"
    >
      <div data-iot-case-study-details-title className="w-full min-w-0">
        <h3 className="m-0 w-full font-reddit text-[24px] font-bold leading-8 tracking-[-0.48px] text-[#27272A]">
          {title}
        </h3>
      </div>

      <div data-iot-case-study-details-description className="w-full min-w-0">
        <p className="m-0 w-full font-reddit text-[14px] font-normal leading-5 tracking-[0px] text-[#71717A]">
          {description}
        </p>
      </div>

      <IoTCaseStudyDetailsPhases phases={IOT_CASE_STUDY_PHASES} />

      <IoTCaseStudyDetailsLink />
    </div>
  );
}

import Link from "next/link";

import { IOT_CASE_STUDY_CTA } from "./iotCaseStudy.constants";

export default function IoTCaseStudyDetailsLink() {
  const { label, arrow, href } = IOT_CASE_STUDY_CTA;

  return (
    <div
      data-iot-case-study-details-link
      className="box-border w-full min-w-0 border-t border-[#E4E4E7] pt-[26px]"
    >
      <Link
        data-iot-case-study-details-link-anchor
        href={href}
        className="inline-flex w-full min-w-0 items-center gap-1 self-start font-reddit text-[14px] font-medium leading-5 tracking-[0px] text-[#B8860B] transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8860B] focus-visible:ring-offset-2"
      >
        <span>{label}</span>
        <span aria-hidden="true" className="shrink-0">
          {arrow}
        </span>
      </Link>
    </div>
  );
}

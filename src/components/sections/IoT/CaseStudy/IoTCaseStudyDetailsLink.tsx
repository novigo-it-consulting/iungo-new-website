import Link from "next/link";

import { isAvailableHref } from "@/constants/routes";

import { IOT_CASE_STUDY_CTA } from "./iotCaseStudy.constants";

const caseStudyLinkClassName =
  "inline-flex w-full min-w-0 cursor-pointer items-center gap-1 self-start font-reddit text-[14px] font-medium leading-5 tracking-[0px] text-[#B8860B] transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8860B] focus-visible:ring-offset-2";

export default function IoTCaseStudyDetailsLink() {
  const { label, arrow, href } = IOT_CASE_STUDY_CTA;
  const content = (
    <>
      <span>{label}</span>
      <span aria-hidden="true" className="shrink-0">
        {arrow}
      </span>
    </>
  );

  return (
    <div
      data-iot-case-study-details-link
      className="box-border w-full min-w-0 border-t border-[#E4E4E7] pt-[26px]"
    >
      {isAvailableHref(href) ? (
        <Link
          data-iot-case-study-details-link-anchor
          href={href}
          className={caseStudyLinkClassName}
        >
          {content}
        </Link>
      ) : (
        <span
          data-iot-case-study-details-link-anchor
          className={caseStudyLinkClassName}
        >
          {content}
        </span>
      )}
    </div>
  );
}

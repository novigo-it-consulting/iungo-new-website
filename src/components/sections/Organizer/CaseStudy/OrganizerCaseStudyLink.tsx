import Link from "next/link";

import { isAvailableHref } from "@/constants/routes";

import { CASE_STUDY_CTA } from "./organizerCaseStudy.constants";

const caseStudyLinkClassName =
  "inline-flex w-full min-w-0 cursor-pointer items-center gap-1 self-start font-reddit text-[14px] font-medium leading-[20px] tracking-[0px] text-[#1E9F67] transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E9F67] focus-visible:ring-offset-2";

export default function OrganizerCaseStudyLink() {
  const { label, arrow, href } = CASE_STUDY_CTA;
  const content = (
    <>
      <span>{label}</span>
      <span aria-hidden="true" className="shrink-0">
        {arrow}
      </span>
    </>
  );

  if (isAvailableHref(href)) {
    return (
      <Link
        data-organizer-case-study-link
        href={href}
        className={caseStudyLinkClassName}
      >
        {content}
      </Link>
    );
  }

  return (
    <span data-organizer-case-study-link className={caseStudyLinkClassName}>
      {content}
    </span>
  );
}

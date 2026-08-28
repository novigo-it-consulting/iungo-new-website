import Link from "next/link";
import { CASE_STUDY_CTA } from "./organizerCaseStudy.constants";

export default function OrganizerCaseStudyLink() {
  return (
    <Link
      data-organizer-case-study-link
      href={CASE_STUDY_CTA.href}
      className="inline-flex w-full min-w-0 items-center gap-1 self-start font-reddit text-[14px] font-medium leading-[20px] tracking-[0px] text-[#1E9F67] transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E9F67] focus-visible:ring-offset-2"
    >
      <span>{CASE_STUDY_CTA.label}</span>
      <span aria-hidden="true" className="shrink-0">
        {CASE_STUDY_CTA.arrow}
      </span>
    </Link>
  );
}
